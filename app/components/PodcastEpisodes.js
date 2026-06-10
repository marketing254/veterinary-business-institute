"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SolarIcon from "./SolarIcon";
import { podcastSlug } from "../lib/sheets-core";

const PAGE_SIZE = 9;

// An episode is "playable" (worth showing) only if it links somewhere.
function hasLink(ep) {
  return Boolean(ep.appleId || ep.href || ep.audioUrl);
}

export default function PodcastEpisodes({ episodes }) {
  const [activeCat, setActiveCat] = useState("All");
  const [page, setPage] = useState(1);

  // (#14) Only show episodes that actually have a link.
  const linked = useMemo(() => (episodes || []).filter(hasLink), [episodes]);

  // (#17) Category filter options derived from the data.
  const categories = useMemo(() => {
    const set = new Set();
    linked.forEach((e) => e.category && set.add(e.category));
    return ["All", ...Array.from(set)];
  }, [linked]);

  const filtered = useMemo(
    () => (activeCat === "All" ? linked : linked.filter((e) => e.category === activeCat)),
    [linked, activeCat]
  );

  // (#10) Pagination.
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function choose(cat) {
    setActiveCat(cat);
    setPage(1);
  }

  return (
    <>
      {categories.length > 1 && (
        <div className="pod-filter-bar">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={`pod-filter-chip${activeCat === c ? " is-active" : ""}`}
              onClick={() => choose(c)}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="podcast-episode-list">
        {pageItems.map((ep) => (
          <article className="podcast-episode-card" key={ep.number + ep.title}>
            <Link
              href={`/podcast/${podcastSlug(ep)}`}
              className="podcast-episode-thumb"
              aria-label={`Open episode ${ep.number}: ${ep.title}`}
            >
              <img src={ep.image} alt={`Episode ${ep.number}`} loading="lazy" />
              <span className="podcast-episode-play" aria-hidden="true">
                <SolarIcon name="playCircle" size={34} />
              </span>
            </Link>
            <div className="podcast-episode-body">
              <div className="podcast-episode-meta">
                <span className="podcast-episode-num">Episode #{ep.number}</span>
                <span className="podcast-episode-date">{ep.date}</span>
                {ep.duration && <span className="podcast-episode-dur">{ep.duration}</span>}
              </div>
              <h3>{ep.title}</h3>
              <p>{ep.summary}</p>
              <Link href={`/podcast/${podcastSlug(ep)}`} className="podcast-episode-link">
                &#9654; Listen Now
              </Link>
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="vbi-pagination">
          <button
            type="button"
            className="vbi-page-btn"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            aria-label="Previous page"
          >
            &larr;
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              className={`vbi-page-btn${n === safePage ? " is-active" : ""}`}
              onClick={() => setPage(n)}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            className="vbi-page-btn"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            aria-label="Next page"
          >
            &rarr;
          </button>
        </div>
      )}
    </>
  );
}
