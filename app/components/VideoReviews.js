"use client";

import { useRef, useState } from "react";

const PAGE_SIZE = 4;

const FILTERS = [
  { key: "all", label: "All reviews" },
  { key: "panel", label: "VET Panels" },
  { key: "podcast", label: "Podcast" },
];

const TYPE_LABEL = {
  panel: "VET Panel guest",
  podcast: "Podcast guest",
};

function initials(name) {
  return name
    .replace(/,.*$/, "")
    .replace(/^Dr\.?\s+/i, "")
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * Video testimonial grid with type filter + pagination.
 * Vimeo embeds: title/byline/portrait hidden, dnt=1, no autoplay — the
 * visitor presses play. Paginating keeps only a few players mounted at once.
 */
export default function VideoReviews({ reviews }) {
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const topRef = useRef(null);

  const filtered = filter === "all" ? reviews : reviews.filter((r) => r.type === filter);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const counts = reviews.reduce(
    (acc, r) => {
      acc.all += 1;
      acc[r.type] = (acc[r.type] || 0) + 1;
      return acc;
    },
    { all: 0 }
  );

  function scrollToTop() {
    const el = topRef.current;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  function changeFilter(key) {
    setFilter(key);
    setPage(1);
  }

  function changePage(next) {
    setPage(next);
    scrollToTop();
  }

  return (
    <div ref={topRef}>
      <div className="video-reviews-filters" role="tablist" aria-label="Filter reviews">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            role="tab"
            aria-selected={filter === f.key}
            className={`video-reviews-filter${filter === f.key ? " is-active" : ""}`}
            onClick={() => changeFilter(f.key)}
          >
            {f.label}
            <span className="video-reviews-count">{counts[f.key] || 0}</span>
          </button>
        ))}
      </div>

      <div className="panelist-grid">
        {visible.map((r) => (
          <article className="panelist-card" key={r.vimeoId}>
            <div className="panelist-video">
              <iframe
                src={`https://player.vimeo.com/video/${r.vimeoId}?title=0&byline=0&portrait=0&dnt=1`}
                title={`${r.name} – ${TYPE_LABEL[r.type]} testimonial`}
                allow="fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <div className="panelist-body">
              <span className="guest-review-source">{TYPE_LABEL[r.type]}</span>
              <div className="guest-review-stars" aria-label="5 out of 5 stars">
                &#9733;&#9733;&#9733;&#9733;&#9733;
              </div>
              <blockquote className="panelist-quote">&ldquo;{r.quote}&rdquo;</blockquote>
              <div className="guest-review-author">
                <span className="guest-review-avatar" aria-hidden="true">
                  {initials(r.name)}
                </span>
                <div className="guest-review-meta">
                  <strong>{r.name}</strong>
                  <span>{r.title}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {pageCount > 1 && (
        <nav className="video-reviews-pagination" aria-label="Reviews pagination">
          <button
            type="button"
            className="video-reviews-page-btn"
            onClick={() => changePage(current - 1)}
            disabled={current === 1}
          >
            &larr; Previous
          </button>
          <div className="video-reviews-pages">
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                className={`video-reviews-page-num${n === current ? " is-active" : ""}`}
                aria-current={n === current ? "page" : undefined}
                onClick={() => changePage(n)}
              >
                {n}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="video-reviews-page-btn"
            onClick={() => changePage(current + 1)}
            disabled={current === pageCount}
          >
            Next &rarr;
          </button>
        </nav>
      )}
    </div>
  );
}
