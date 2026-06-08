"use client";

import { useLive } from "../../lib/use-live";
import { fetchReviews } from "../../lib/sheets-client";

const initials = (name) =>
  String(name || "")
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

/** Guest reviews grid — build-time initial reviews, live-refreshed from the sheet. */
export default function LiveGuestReviews({ initial = [] }) {
  const guestReviews = useLive(initial, fetchReviews);

  return (
    <div className="reviews-grid">
      {guestReviews.map((r, i) => (
        <article className="guest-review-card" key={`${r.name}-${i}`}>
          <div className="guest-review-stars" aria-label="5 out of 5 stars">
            &#9733;&#9733;&#9733;&#9733;&#9733;
          </div>
          <span className="guest-review-source">{r.source}</span>
          <p className="guest-review-quote">&ldquo;{r.quote}&rdquo;</p>
          <div className="guest-review-author">
            <span className="guest-review-avatar" aria-hidden="true">
              {initials(r.name)}
            </span>
            <div className="guest-review-meta">
              <strong>{r.name}</strong>
              <span>{r.title}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
