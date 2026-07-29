"use client";

import { useEffect, useMemo, useState } from "react";
import { APPS_SCRIPT_URL } from "../../lib/sheets-config";
import { docExportUrl } from "../../lib/sheets-core";
import { parseTranscript } from "../../lib/transcript-parse";

function highlight(text, q) {
  if (!q) return text;
  const parts = text.split(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig"));
  return parts.map((p, i) =>
    p.toLowerCase() === q.toLowerCase() ? <mark key={i} className="ts-hit">{p}</mark> : p
  );
}

/**
 * Generic transcript panel driven by a Google-Doc URL (proxied through the Apps
 * Script). Same UI + parser as the podcast transcript, reusable for replays.
 */
export default function LiveTranscript({ transcriptUrl, heading = "Transcript", initialText = "" }) {
  // Baked `initialText` renders immediately (SSR); a failed live refresh must
  // never downgrade it — the live fetch only ever upgrades to fresher text.
  const [state, setState] = useState({
    status: initialText ? "ready" : transcriptUrl ? "loading" : "none",
    text: initialText || "",
    docUrl: transcriptUrl || "",
  });
  const [query, setQuery] = useState("");
  const hasBaked = Boolean(initialText);

  useEffect(() => {
    if (!transcriptUrl) {
      if (!hasBaked) setState({ status: "none", text: "", docUrl: "" });
      return;
    }
    let alive = true;
    (async () => {
      try {
        if (!APPS_SCRIPT_URL || /PASTE_VET_EXEC_ID/.test(APPS_SCRIPT_URL)) {
          if (alive && !hasBaked) setState({ status: "fallback", text: "", docUrl: transcriptUrl });
          return;
        }
        const proxied = `${APPS_SCRIPT_URL}?docUrl=${encodeURIComponent(docExportUrl(transcriptUrl))}`;
        const res = await fetch(proxied);
        const text = await res.text();
        if (!alive) return;
        if (text && !text.startsWith("ERROR")) setState({ status: "ready", text, docUrl: transcriptUrl });
        else if (!hasBaked) setState({ status: "fallback", text: "", docUrl: transcriptUrl });
      } catch (_) {
        if (alive && !hasBaked) setState((s) => ({ ...s, status: "fallback" }));
      }
    })();
    return () => {
      alive = false;
    };
  }, [transcriptUrl, hasBaked]);

  const segments = useMemo(() => parseTranscript(state.text), [state.text]);
  const visible = useMemo(() => {
    if (!query) return segments;
    const q = query.toLowerCase();
    return segments.filter((s) => s.text.toLowerCase().includes(q) || s.speaker.toLowerCase().includes(q));
  }, [segments, query]);

  if (state.status === "none") return null;

  return (
    <div className="ts-wrap">
      <div className="ts-head">
        <h2>{heading}</h2>
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
            The full transcript for this session is available.{" "}
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
