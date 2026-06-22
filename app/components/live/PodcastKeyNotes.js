"use client";

import { useEffect, useState } from "react";
import { fetchPodcasts } from "../../lib/sheets-client";
import { APPS_SCRIPT_URL } from "../../lib/sheets-config";
import { docExportUrl, parseKeyNotes } from "../../lib/sheets-core";

/**
 * "About This Episode" body. When the page is baked, `initialNotes` is the
 * key-notes Doc already parsed at build time, so the full description + Key
 * Takeaways render in the server HTML with NO flash of the short summary. It
 * then refreshes live from the sheet (browser → Apps Script proxy) so edits
 * appear without a rebuild. Before notes exist it falls back to the summary.
 */
export default function PodcastKeyNotes({ episodeNumber, fallbackSummary, initialNotes = null }) {
  const [notes, setNotes] = useState(initialNotes);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const rows = await fetchPodcasts();
        const ep = rows.find((e) => String(e.number) === String(episodeNumber));
        const docUrl = ep?.keyNotesUrl || "";
        if (!docUrl || !APPS_SCRIPT_URL || /PASTE_VET_EXEC_ID/.test(APPS_SCRIPT_URL)) return;

        const proxied = `${APPS_SCRIPT_URL}?docUrl=${encodeURIComponent(docExportUrl(docUrl))}`;
        const res = await fetch(proxied);
        const text = await res.text();
        if (!alive) return;
        if (text && !text.startsWith("ERROR")) {
          const parsed = parseKeyNotes(text);
          if (parsed.paragraphs.length || parsed.takeaways.length) setNotes(parsed);
        }
      } catch (_) {
        /* keep whatever we already have (baked notes or the summary) */
      }
    })();
    return () => {
      alive = false;
    };
  }, [episodeNumber]);

  if (notes) {
    return (
      <>
        {notes.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {notes.takeaways.length > 0 && (
          <div className="pod-takeaways">
            <h3>Key Takeaways</h3>
            <ul>
              {notes.takeaways.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        )}
      </>
    );
  }

  return fallbackSummary ? <p>{fallbackSummary}</p> : null;
}
