"use client";

import { useLive } from "../../lib/use-live";
import { fetchPodcasts } from "../../lib/sheets-client";
import PodcastEpisodes from "../PodcastEpisodes";

/** Podcast list — build-time initial episodes, live-refreshed from the sheet. */
export default function LivePodcastEpisodes({ initial = [] }) {
  const episodes = useLive(initial, fetchPodcasts);
  return <PodcastEpisodes episodes={episodes} />;
}
