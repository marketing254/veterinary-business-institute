"use client";

import Link from "next/link";
import { useLive } from "../../lib/use-live";
import { fetchWebinarReplays, fetchSummitReplays } from "../../lib/sheets-client";

const FETCHERS = { webinar: fetchWebinarReplays, summit: fetchSummitReplays };

/**
 * Replay listing grid (webinar or summit). Seeds from the build-time list, then
 * swaps in the live sheet rows. Thumbnail-forward cards linking to each replay.
 */
export default function LiveReplayList({ initial, kind, basePath, singleLabel }) {
  const replays = useLive(initial, FETCHERS[kind]);

  if (!replays.length) {
    return (
      <section className="section">
        <div className="container">
          <p className="muted-text" style={{ textAlign: "center" }}>
            Replays are on the way — check back soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="rep-grid">
          {replays.map((r) => (
            <Link key={r.slug} href={`${basePath}/${r.slug}`} className="rep-card">
              <div className="rep-card-media">
                {r.image ? (
                  <img src={r.image} alt={r.title} className="rep-card-thumb" loading="lazy" />
                ) : (
                  <div className="rep-card-thumb rep-card-thumb-empty" aria-hidden="true" />
                )}
                <span className="rep-card-play" aria-hidden="true">&#9654;</span>
                {r.duration ? <span className="rep-card-duration">{r.duration}</span> : null}
              </div>
              <div className="rep-card-body">
                {r.category ? <span className="rep-card-cat">{r.category}</span> : null}
                <h3 className="rep-card-title">{r.title}</h3>
                {r.summary ? <p className="rep-card-summary">{r.summary}</p> : null}
                <div className="rep-card-foot">
                  <span className="rep-card-date">{r.date}</span>
                  <span className="rep-card-watch">Watch {singleLabel} &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
