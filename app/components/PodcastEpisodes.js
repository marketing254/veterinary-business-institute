"use client";

import { useState } from "react";
import SolarIcon from "./SolarIcon";

const APPLE_SHOW_ID = "1712053291";

export default function PodcastEpisodes({ episodes }) {
  const [playerId, setPlayerId] = useState(null);
  const [playerTitle, setPlayerTitle] = useState("");
  const [playerHref, setPlayerHref] = useState("");

  function openPlayer(ep) {
    if (!ep.appleId) {
      if (ep.href) window.open(ep.href, "_blank", "noopener,noreferrer");
      return;
    }
    setPlayerId(ep.appleId);
    setPlayerTitle(ep.title);
    setPlayerHref(ep.href || "");
    document.body.style.overflow = "hidden";
  }

  function closePlayer() {
    setPlayerId(null);
    document.body.style.overflow = "";
  }

  return (
    <>
      <div className="podcast-episode-list">
        {episodes.map((ep) => (
          <article className="podcast-episode-card" key={ep.number + ep.title}>
            <button
              type="button"
              className="podcast-episode-thumb"
              onClick={() => openPlayer(ep)}
              aria-label={`Play episode ${ep.number}: ${ep.title}`}
            >
              <img src={ep.image} alt={`Episode ${ep.number}`} loading="lazy" />
              <span className="podcast-episode-play" aria-hidden="true">
                <SolarIcon name="playCircle" size={34} />
              </span>
            </button>
            <div className="podcast-episode-body">
              <div className="podcast-episode-meta">
                <span className="podcast-episode-num">Episode #{ep.number}</span>
                <span className="podcast-episode-date">{ep.date}</span>
                {ep.duration && (
                  <span className="podcast-episode-dur">{ep.duration}</span>
                )}
              </div>
              <h3>{ep.title}</h3>
              <p>{ep.summary}</p>
              <button
                type="button"
                className="podcast-episode-link"
                onClick={() => openPlayer(ep)}
              >
                &#9654; Listen Now
              </button>
            </div>
          </article>
        ))}
      </div>

      {playerId && (
        <div className="podcast-player-overlay" onClick={closePlayer}>
          <div className="podcast-player-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="podcast-player-close"
              onClick={closePlayer}
              aria-label="Close player"
            >
              &times;
            </button>
            <span className="podcast-player-eyebrow">Now Playing</span>
            <h3 className="podcast-player-title">{playerTitle}</h3>
            <iframe
              className="podcast-player-frame"
              title={playerTitle}
              allow="autoplay *; encrypted-media *; clipboard-write"
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
              src={`https://embed.podcasts.apple.com/us/podcast/id${APPLE_SHOW_ID}?i=${playerId}&theme=auto`}
            />
            {playerHref && (
              <a
                className="podcast-player-applelink"
                href={playerHref}
                target="_blank"
                rel="noreferrer"
              >
                Open in Apple Podcasts &rarr;
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}
