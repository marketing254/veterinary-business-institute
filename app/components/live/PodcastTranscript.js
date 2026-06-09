"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchPodcasts } from "../../lib/sheets-client";
import { APPS_SCRIPT_URL } from "../../lib/sheets-config";

function docExportUrl(url) {
  const m = String(url || "").match(/\/d\/([\w-]{20,})/) || String(url || "").match(/[?&]id=([\w-]{20,})/);
  if (!m) return "";
  return `https://docs.google.com/document/d/${m[1]}/export?format=txt`;
}

function highlight(text, q) {
  if (!q) return text;
  const parts = text.split(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig"));
  return parts.map((p, i) =>
    p.toLowerCase() === q.toLowerCase() ? <mark key={i} className="ts-hit">{p}</mark> : p
  );
}

/**
 * Podcast transcript viewer. Pulls the episode's transcript Google Doc (by ep
 * number) from the sheet, fetches its plain text through the Apps Script proxy
 * (?docUrl=…export?format=txt), and renders it with a live search box.
 *
 * Needs NEXT_PUBLIC_APPS_SCRIPT_URL set + the script deployed; until then it
 * shows a graceful "open transcript" fallback.
 */
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
        const exportUrl = docExportUrl(docUrl);
        const proxied = `${APPS_SCRIPT_URL}?docUrl=${encodeURIComponent(exportUrl)}`;
        const res = await fetch(proxied);
        const text = await res.text();
        if (!alive) return;
        if (text && !/PASTE_VET_EXEC_ID/.test(APPS_SCRIPT_URL) && !text.startsWith("ERROR")) {
          setState({ status: "ready", text, docUrl });
        } else {
          setState({ status: "fallback", text: "", docUrl });
        }
      } catch (_) {
        if (alive) setState((s) => ({ ...s, status: "fallback" }));
      }
    })();
    return () => {
      alive = false;
    };
  }, [episodeNumber]);

  const paragraphs = useMemo(
    () =>
      state.text
        .replace(/\r/g, "")
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean),
    [state.text]
  );

  const visible = useMemo(
    () => (query ? paragraphs.filter((p) => p.toLowerCase().includes(query.toLowerCase())) : paragraphs),
    [paragraphs, query]
  );

  if (state.status === "none") return null;

  return (
    <div className="ts-wrap">
      <div className="ts-head">
        <h2>Transcript</h2>
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
            visible.map((p, i) => <p key={i}>{highlight(p, query)}</p>)
          ) : (
            <p className="muted-text">No matches for &ldquo;{query}&rdquo;.</p>
          )}
        </div>
      )}
    </div>
  );
}
