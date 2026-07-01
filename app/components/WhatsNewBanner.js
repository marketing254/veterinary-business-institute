"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { episodes, webinars, eventPanels } from "../lib/site-data";
import { podcastSlug } from "../lib/sheets-core";
import { fetchPodcasts } from "../lib/sheets-client";

const DISMISS_KEY = "vbi-whats-new-dismissed";

export default function WhatsNewBanner() {
  const [visible, setVisible] = useState(false);
  // Seed with the build-time newest, then swap in the LIVE newest from the sheet
  // so the popup matches the marquee (both reflect episodes added after build).
  const [latestEpisode, setLatestEpisode] = useState(episodes[0]);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(DISMISS_KEY);
    if (!dismissed) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    let alive = true;
    fetchPodcasts()
      .then((rows) => {
        if (alive && rows && rows.length) setLatestEpisode(rows[0]);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  function handleDismiss() {
    setVisible(false);
    sessionStorage.setItem(DISMISS_KEY, "1");
  }

  if (!visible) return null;

  const latestWebinar = webinars[0];
  const latestPanel = eventPanels[0];

  return (
    <>
      <div className="wnb-overlay" onClick={handleDismiss} />
      <div className="wnb-container" role="dialog" aria-label="What's new on VBI">
        {/* Top strip */}
        <div className="wnb-strip">
          <span className="wnb-strip-label">What&apos;s New on VBI</span>
          <span className="wnb-strip-cta">Don&apos;t miss these &rarr;</span>
          <button
            className="wnb-close"
            onClick={handleDismiss}
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="wnb-body">
          {/* Latest Podcast */}
          <div className="wnb-card">
            <div className="wnb-card-badge">
              <span className="wnb-badge-dot" />
              Latest Podcast
            </div>
            <div className="wnb-podcast-row">
              {latestEpisode.image && (
                <img
                  src={latestEpisode.image}
                  alt={`Episode ${latestEpisode.number}`}
                  width={56}
                  height={56}
                  className="wnb-podcast-thumb"
                />
              )}
              <div>
                <p className="wnb-episode-label">Episode #{latestEpisode.number}</p>
                <p className="wnb-episode-title">{latestEpisode.title}</p>
              </div>
            </div>
            <Link
              href={`/podcast/${podcastSlug(latestEpisode)}`}
              onClick={handleDismiss}
              className="wnb-btn wnb-btn-primary"
            >
              &#9654; Listen Now
            </Link>
          </div>

          {/* Divider */}
          <div className="wnb-divider" />

          {/* Latest Webinar */}
          <div className="wnb-card">
            <div className="wnb-card-badge wnb-badge-webinar">
              <span className="wnb-badge-dot wnb-dot-webinar" />
              Latest Webinar
            </div>
            <p className="wnb-event-date">{latestWebinar.date}</p>
            <p className="wnb-event-title">{latestWebinar.title}</p>
            <p className="wnb-event-summary">{latestWebinar.summary}</p>
            <Link href="/webinars" onClick={handleDismiss} className="wnb-btn wnb-btn-outline">
              Watch Replay &rarr;
            </Link>
          </div>

          {/* Divider */}
          <div className="wnb-divider" />

          {/* Next Event Panel */}
          <div className="wnb-card">
            <div className="wnb-card-badge wnb-badge-event">
              <span className="wnb-badge-dot wnb-dot-event" />
              Latest Event Panel
            </div>
            <p className="wnb-event-date">{latestPanel.date}</p>
            <p className="wnb-event-title">{latestPanel.title}</p>
            <p className="wnb-event-summary">{latestPanel.summary}</p>
            <Link
              href={`/webinars/${latestPanel.slug}`}
              onClick={handleDismiss}
              className="wnb-btn wnb-btn-outline"
            >
              Watch Now &rarr;
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
