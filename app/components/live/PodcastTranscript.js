"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchPodcasts } from "../../lib/sheets-client";
import { APPS_SCRIPT_URL } from "../../lib/sheets-config";

function docExportUrl(url) {
  const m = String(url || "").match(/\/d\/([\w-]{20,})/) || String(url || "").match(/[?&]id=([\w-]{20,})/);
  return m ? `https://docs.google.com/document/d/${m[1]}/export?format=txt` : "";
}

// "Speaker Name:" at the start of a line → {speaker, text}. Speaker must be a
// short label (≤ 4 words), not a whole sentence that happens to contain a colon.
function speakerColon(line) {
  const m = String(line).match(/^([A-Za-z][\w .'&-]{0,40}?):\s+(.+)$/);
  if (!m || m[1].trim().split(/\s+/).length > 4) return null;
  return { speaker: m[1].trim(), text: m[2].trim() };
}

// A line that looks like a bare speaker label: short, title-cased, no trailing
// sentence punctuation (so a real sentence is never mistaken for a name).
function looksLikeNameLine(t) {
  if (!t || t.length > 45) return false;
  if (/[.!?,;:"”'’]$/.test(t)) return false;
  const words = t.split(/\s+/);
  if (words.length > 5) return false;
  const caps = words.filter((w) => /^[A-Z0-9]/.test(w)).length;
  return caps >= words.length - 1; // allow one lowercase particle (de, van, …)
}

// Transcript with NO timestamps but speaker labels. Handles both:
//   • inline:   "Adeesha: text…"  (one turn per line; wrapped lines continue it)
//   • stacked:  a speaker name on its own line, then its paragraph(s) below —
//               with NO colons and NO blank lines between paragraphs.
function parseSpeakerOnly(clean) {
  const nonEmpty = clean.split(/\n/).map((l) => l.trim()).filter(Boolean);

  // 1) Inline "Name: text" format.
  const colonHits = nonEmpty.filter((l) => speakerColon(l)).length;
  if (colonHits >= 2 && colonHits >= nonEmpty.length * 0.3) {
    const segs = [];
    for (const line of nonEmpty) {
      const sc = speakerColon(line);
      if (sc) segs.push({ time: "", speaker: sc.speaker, text: sc.text });
      else if (segs.length) segs[segs.length - 1].text += " " + line;
      else segs.push({ time: "", speaker: "", text: line });
    }
    return segs;
  }

  // 2) Stacked format: the speaker labels are the short, punctuation-free lines
  //    that RECUR through the transcript (a host/guest speak many times). Split
  //    a turn at each such line; render one segment per paragraph so multi-
  //    paragraph turns stay readable, with the name shown on the first only.
  const freq = new Map();
  for (const l of nonEmpty) {
    if (looksLikeNameLine(l)) freq.set(l, (freq.get(l) || 0) + 1);
  }
  const names = new Set([...freq.entries()].filter(([, n]) => n >= 2).map(([k]) => k));

  if (names.size) {
    const segs = [];
    let pending = "";
    for (const line of nonEmpty) {
      if (names.has(line)) {
        pending = line.replace(/:$/, "").trim();
        continue;
      }
      segs.push({ time: "", speaker: pending, text: line });
      pending = ""; // only the first paragraph of a turn carries the name
    }
    if (segs.length) return segs.filter((s) => s.text);
  }

  // 3) Fallback: plain paragraphs (blank-line separated, else line-by-line).
  const blocks = clean
    .split(/\n{2,}/)
    .map((b) => b.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);
  return (blocks.length > 1 ? blocks : nonEmpty).map((t) => ({ time: "", speaker: "", text: t }));
}

// Parse timestamped transcripts into segments. Accepts these formats:
//   • range:        "[00:00:00.080 --> 00:01:55.080] Speaker: text…"
//   • single:       "[00:00:00] Speaker: text…"  (also [MM:SS])
//   • speaker-only: no timestamps, just "Speaker: text…" or stacked names
function parseSegments(text) {
  const clean = String(text || "").replace(/\r/g, "");
  const re = /\[(\d{1,2}:\d{2}(?::\d{2})?)(?:\.\d+)?(?:\s*-->\s*[\d:.]+)?\]/g;
  const matches = [...clean.matchAll(re)];
  if (!matches.length) {
    return parseSpeakerOnly(clean.trim());
  }
  const segs = [];
  for (let i = 0; i < matches.length; i++) {
    const cur = matches[i];
    const start = cur.index + cur[0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index : clean.length;
    let chunk = clean.slice(start, end).trim();
    let speaker = "";
    const sp = chunk.match(/^([A-Za-z][\w .'&-]{0,40}):\s*/);
    if (sp) {
      speaker = sp[1].trim();
      chunk = chunk.slice(sp[0].length);
    }
    chunk = chunk.replace(/\s*\n\s*/g, " ").trim();
    if (chunk) segs.push({ time: cur[1], speaker, text: chunk });
  }
  return segs;
}

function highlight(text, q) {
  if (!q) return text;
  const parts = text.split(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig"));
  return parts.map((p, i) =>
    p.toLowerCase() === q.toLowerCase() ? <mark key={i} className="ts-hit">{p}</mark> : p
  );
}

export default function PodcastTranscript({ episodeNumber }) {
  const [state, setState] = useState({ status: "loading", text: "", docUrl: "" });
  const [query, setQuery] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const rows = await fetchPodcasts();
        const ep = rows.find((e) => String(e.number) === String(episodeNumber));
        const docUrl = ep?.transcriptUrl || "";
        if (!docUrl) {
          if (alive) setState({ status: "none", text: "", docUrl: "" });
          return;
        }
        if (!APPS_SCRIPT_URL || /PASTE_VET_EXEC_ID/.test(APPS_SCRIPT_URL)) {
          if (alive) setState({ status: "fallback", text: "", docUrl });
          return;
        }
        const proxied = `${APPS_SCRIPT_URL}?docUrl=${encodeURIComponent(docExportUrl(docUrl))}`;
        const res = await fetch(proxied);
        const text = await res.text();
        if (!alive) return;
        if (text && !text.startsWith("ERROR")) setState({ status: "ready", text, docUrl });
        else setState({ status: "fallback", text: "", docUrl });
      } catch (_) {
        if (alive) setState((s) => ({ ...s, status: "fallback" }));
      }
    })();
    return () => {
      alive = false;
    };
  }, [episodeNumber]);

  const segments = useMemo(() => parseSegments(state.text), [state.text]);
  const visible = useMemo(() => {
    if (!query) return segments;
    const q = query.toLowerCase();
    return segments.filter((s) => s.text.toLowerCase().includes(q) || s.speaker.toLowerCase().includes(q));
  }, [segments, query]);

  if (state.status === "none") return null;

  return (
    <div className="ts-wrap">
      <div className="ts-head">
        <h2>Episode Transcript</h2>
        {state.status === "ready" && (
          <div className="ts-search">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the transcript…"
              aria-label="Search transcript"
            />
          </div>
        )}
      </div>

      {state.status === "loading" && <p className="muted-text">Loading transcript…</p>}

      {state.status === "fallback" && (
        <div className="wrd-transcript-placeholder">
          <span className="wrd-placeholder-badge">Transcript</span>
          <p>
            The full transcript for this episode is available.{" "}
            {state.docUrl ? (
              <a href={state.docUrl} target="_blank" rel="noreferrer" className="text-accent" style={{ textDecoration: "underline" }}>
                Open the transcript &rarr;
              </a>
            ) : null}
          </p>
        </div>
      )}

      {state.status === "ready" && (
        <div className="ts-body">
          {visible.length ? (
            visible.map((s, i) => (
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
    </div>
  );
}
