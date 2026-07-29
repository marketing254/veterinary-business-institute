"use client";

import { useEffect, useState } from "react";
import { APPS_SCRIPT_URL } from "../../lib/sheets-config";
import { docExportUrl, parseKeyNotes } from "../../lib/sheets-core";

/**
 * Renders a Google-Doc "description" (paragraphs + an optional "Key Takeaways"
 * list) for any content type. `initialNotes` is the doc parsed at build time so
 * the full content is in the server HTML with no flash; it then refreshes live
 * from the sheet's doc via the Apps Script proxy. Falls back to `fallbackSummary`.
 */
export default function LiveDocNotes({ docUrl, initialNotes = null, fallbackSummary }) {
  const [notes, setNotes] = useState(initialNotes);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
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
        /* keep baked notes or the summary */
      }
    })();
    return () => {
      alive = false;
    };
  }, [docUrl]);

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
