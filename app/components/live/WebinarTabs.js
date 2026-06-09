"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { APPS_SCRIPT_URL } from "../../lib/sheets-config";
import { docExportUrl, parseTranscriptSegments } from "../../lib/sheets-core";

const isUrl = (s) => /^https?:\/\//i.test(String(s || "").trim());
const proxyReady = APPS_SCRIPT_URL && !/PASTE_VET_EXEC_ID/.test(APPS_SCRIPT_URL);

// Returns { status: 'ready'|'fallback'|'none', text, src }
async function loadDoc(src) {
  if (!src) return { status: "none", text: "", src: "" };
  if (!isUrl(src)) return { status: "ready", text: src, src }; // already plain text
  if (!proxyReady) return { status: "fallback", text: "", src };
  try {
    const target = docExportUrl(src) || src;
    const res = await fetch(`${APPS_SCRIPT_URL}?docUrl=${encodeURIComponent(target)}`);
    const text = await res.text();
    if (text && !text.startsWith("ERROR")) return { status: "ready", text, src };
    return { status: "fallback", text: "", src };
  } catch (_) {
    return { status: "fallback", text: "", src };
  }
}

function highlight(text, q) {
  if (!q) return text;
  const parts = text.split(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig"));
  return parts.map((p, i) =>
    p.toLowerCase() === q.toLowerCase() ? <mark key={i} className="ts-hit">{p}</mark> : p
  );
}

// Render a description doc as paragraphs + bullet lists.
function renderProse(text) {
  const blocks = String(text || "").replace(/\r/g, "").split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  return blocks.map((block, i) => {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    const bullets = lines.filter((l) => /^[•*\-–]/.test(l));
    if (bullets.length && bullets.length >= lines.length - 1) {
      return (
        <ul key={i} className="rep-prose-list">
          {lines.map((l, j) => (
            <li key={j}>{l.replace(/^[•*\-–]\s*/, "")}</li>
          ))}
        </ul>
      );
    }
    // short standalone line with no end punctuation → treat as a sub-heading
    if (lines.length === 1 && lines[0].length < 70 && !/[.!?:]$/.test(lines[0])) {
      return <h3 key={i} className="rep-prose-h">{lines[0]}</h3>;
    }
    return <p key={i}>{block}</p>;
  });
}

export default function WebinarTabs({ descriptionSrc, transcriptSrc }) {
  const hasDesc = Boolean(descriptionSrc);
  const hasTrans = Boolean(transcriptSrc);
  const [tab, setTab] = useState(hasDesc ? "description" : "transcript");
  const [cache, setCache] = useState({});
  const [query, setQuery] = useState("");

  const ensure = useCallback(
    async (key, src) => {
      if (cache[key]) return;
      setCache((c) => ({ ...c, [key]: { status: "loading", text: "", src } }));
      const result = await loadDoc(src);
      setCache((c) => ({ ...c, [key]: result }));
    },
    [cache]
  );

  useEffect(() => {
    if (tab === "description" && hasDesc) ensure("description", descriptionSrc);
    if (tab === "transcript" && hasTrans) ensure("transcript", transcriptSrc);
  }, [tab, hasDesc, hasTrans, descriptionSrc, transcriptSrc, ensure]);

  const current = cache[tab] || { status: "loading" };

  const segments = useMemo(
    () => (tab === "transcript" && current.status === "ready" ? parseTranscriptSegments(current.text) : []),
    [tab, current]
  );
  const visibleSegs = useMemo(() => {
    if (!query) return segments;
    const q = query.toLowerCase();
    return segments.filter((s) => s.text.toLowerCase().includes(q) || s.speaker.toLowerCase().includes(q));
  }, [segments, query]);

  if (!hasDesc && !hasTrans) return null;

  const Fallback = ({ src, label }) => (
    <div className="wrd-transcript-placeholder">
      <span className="wrd-placeholder-badge">{label}</span>
      <p>
        This {label.toLowerCase()} is available.{" "}
        {src ? (
          <a href={src} target="_blank" rel="noreferrer" className="text-accent" style={{ textDecoration: "underline" }}>
            Open it &rarr;
          </a>
        ) : null}
      </p>
    </div>
  );

  return (
    <div className="rep-tabs">
      <div className="rep-tabbar" role="tablist">
        {hasDesc && (
          <button
            type="button"
            role="tab"
            aria-selected={tab === "description"}
            className={`rep-tab${tab === "description" ? " is-active" : ""}`}
            onClick={() => setTab("description")}
          >
            Description
          </button>
        )}
        {hasTrans && (
          <button
            type="button"
            role="tab"
            aria-selected={tab === "transcript"}
            className={`rep-tab${tab === "transcript" ? " is-active" : ""}`}
            onClick={() => setTab("transcript")}
          >
            Transcript
          </button>
        )}
        {tab === "transcript" && current.status === "ready" && (
          <div className="rep-tab-search">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search transcript…"
              aria-label="Search transcript"
            />
          </div>
        )}
      </div>

      <div className="rep-tabpanel" role="tabpanel">
        {current.status === "loading" && <p className="muted-text">Loading…</p>}

        {tab === "description" && current.status === "ready" && (
          <div className="rep-prose">{renderProse(current.text)}</div>
        )}
        {tab === "description" && current.status === "fallback" && <Fallback src={current.src} label="Description" />}

        {tab === "transcript" && current.status === "ready" && (
          <div className="ts-body rep-tab-transcript">
            {visibleSegs.length ? (
              visibleSegs.map((s, i) => (
                <div className="ts-seg" key={i}>
                  {s.time ? <span className="ts-time">{s.time}</span> : <span className="ts-time ts-time-empty" />}
                  <div className="ts-seg-body">
                    {s.speaker ? <span className="ts-speaker">{highlight(s.speaker, query)}</span> : null}
                    <p>{highlight(s.text, query)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="muted-text">No matches for &ldquo;{query}&rdquo;.</p>
            )}
          </div>
        )}
        {tab === "transcript" && current.status === "fallback" && <Fallback src={current.src} label="Transcript" />}
      </div>
    </div>
  );
}
