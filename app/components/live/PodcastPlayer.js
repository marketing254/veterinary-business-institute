"use client";

import { useEffect, useState } from "react";
import { fetchPodcasts } from "../../lib/sheets-client";
import { driveFileUrl } from "../../lib/sheets-core";

const APPLE_SHOW_ID = "1712053291";

/**
 * Episode audio player. Server-renders from the build-time seed, then swaps in
 * the LIVE audio source from the sheet on mount — so when an episode's
 * `audio_source` is changed (e.g. a Drive link replaced with a libsyn .mp3),
 * the player reflects it without a rebuild. `driveFileUrl` converts Drive links
 * to a streamable URL and passes direct media URLs (libsyn, etc.) through.
 */
export default function PodcastPlayer({ episodeNumber, audioUrl, appleId, href }) {
  const [src, setSrc] = useState({ audioUrl, appleId, href });

  useEffect(() => {
    let alive = true;
    fetchPodcasts()
      .then((rows) => {
        const ep = rows.find((e) => String(e.number) === String(episodeNumber));
        if (alive && ep) {
          setSrc((prev) => ({
            audioUrl: ep.audioUrl || prev.audioUrl,
            appleId: ep.appleId || prev.appleId,
            href: ep.href || prev.href,
          }));
        }
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [episodeNumber]);

  if (src.audioUrl) {
    return (
      <audio controls preload="none" src={driveFileUrl(src.audioUrl)} style={{ width: "100%", borderRadius: "12px" }}>
        Your browser does not support the audio element.
      </audio>
    );
  }
  if (src.appleId) {
    return (
      <iframe
        className="podcast-page-player"
        title={`Listen to episode ${episodeNumber}`}
        allow="autoplay *; encrypted-media *; clipboard-write"
        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
        src={`https://embed.podcasts.apple.com/us/podcast/id${APPLE_SHOW_ID}?i=${src.appleId}&theme=auto`}
      />
    );
  }
  return (
    <div className="button-row" style={{ justifyContent: "center" }}>
      <a className="button button-primary" href={src.href} target="_blank" rel="noreferrer">
        Listen on Apple Podcasts
      </a>
    </div>
  );
}
