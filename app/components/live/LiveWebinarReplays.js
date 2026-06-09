"use client";

import { useState } from "react";
import Link from "next/link";
import { useLive } from "../../lib/use-live";
import { fetchEventPanels } from "../../lib/sheets-client";

const PAGE_SIZE = 9;

function durationLabel(d) {
  if (!d) return null;
  const parts = String(d).split(":").map((n) => parseInt(n, 10));
  if (parts.some(Number.isNaN)) return String(d);
  let mins = 0;
  if (parts.length === 3) mins = parts[0] * 60 + parts[1];
  else if (parts.length === 2) mins = parts[0];
  return mins ? `${mins} min` : null;
}

/**
 * Webinar-replay archive grid. Each card links to its own detail page
 * (/webinars/[slug]) which holds the Vimeo embed, description, and transcript.
 * Build-time initial panels, live-refreshed from the event-panels sheet tab.
 */
export default function LiveWebinarReplays({ initial = [] }) {
  const panels = useLive(initial, fetchEventPanels);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(panels.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = panels.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <>
    <div className="evt-replay-grid">
      {pageItems.map((p) => {
        const ready = Boolean(p.href);
        const meta = [p.date, p.category, durationLabel(p.duration)].filter(Boolean).join(" · ");
        return (
          <Link
            href={`/webinars/${p.slug}`}
            className="evt-replay-card evt-replay-card-link"
            key={p.slug}
            aria-label={`Open replay: ${p.title}`}
          >
            <span className="evt-replay-thumb evt-replay-thumb-static">
              {p.image ? <img src={p.image} alt={p.title} loading="lazy" /> : null}
              <span className="evt-replay-play" aria-hidden="true">&#9654;</span>
            </span>
            <span className="evt-replay-body">
              <span className="evt-replay-meta">
                {meta} <span className="evt-replay-free">Free</span>
              </span>
              <h3>{p.title}</h3>
              <span className="evt-replay-watch">
                {ready ? "Watch Replay →" : "View Details →"}
              </span>
            </span>
          </Link>
        );
      })}
    </div>

    {totalPages > 1 && (
      <div className="vbi-pagination">
        <button type="button" className="vbi-page-btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={safePage === 1} aria-label="Previous page">&larr;</button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button key={n} type="button" className={`vbi-page-btn${n === safePage ? " is-active" : ""}`} onClick={() => setPage(n)}>{n}</button>
        ))}
        <button type="button" className="vbi-page-btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={safePage === totalPages} aria-label="Next page">&rarr;</button>
      </div>
    )}
    </>
  );
}
