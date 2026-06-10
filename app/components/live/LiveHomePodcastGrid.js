"use client";

import Link from "next/link";
import { useLive } from "../../lib/use-live";
import { fetchPodcasts } from "../../lib/sheets-client";
import { podcastSlug } from "../../lib/sheets-core";

/**
 * Homepage "latest episodes" grid — newest first from the sheet (by ep number),
 * build-time seeded, live-refreshed. Hides episodes with no link (#14) and
 * links to each episode's dedicated page (#2/#6).
 */
export default function LiveHomePodcastGrid({ initial = [], limit = 9 }) {
  const episodes = useLive(initial, fetchPodcasts)
    .filter((ep) => ep.appleId || ep.href || ep.audioUrl)
    .slice(0, limit);

  return (
    <div className="ep-photo-grid">
      {episodes.map((ep) => (
        <Link key={ep.number} href={`/podcast/${podcastSlug(ep)}`} className="ep-photo-card">
          <div className="ep-photo-thumb">
            <img src={ep.image} alt={`Episode ${ep.number}`} />
          </div>
          <span className="ep-photo-badge">EPISODE {ep.number}</span>
          <h3>{ep.title}</h3>
          <p className="ep-photo-date">{ep.date}</p>
        </Link>
      ))}
    </div>
  );
}
