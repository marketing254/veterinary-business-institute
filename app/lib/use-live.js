"use client";

import { useEffect, useState } from "react";

/**
 * Render build-time `initial` data immediately (good SEO + instant paint on a
 * static export), then fetch the live sheet on mount and swap in fresh rows so
 * the page reflects sheet edits without a rebuild.
 *
 *   const episodes = useLive(initial, fetchPodcasts);
 *
 * `fetcher` is one of the client getters from sheets-client.js.
 * Falls back to `initial` if the live fetch errors or returns nothing.
 */
export function useLive(initial, fetcher) {
  const [data, setData] = useState(initial || []);

  useEffect(() => {
    let alive = true;
    fetcher()
      .then((rows) => {
        if (alive && Array.isArray(rows) && rows.length) setData(rows);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [fetcher]);

  return data;
}
