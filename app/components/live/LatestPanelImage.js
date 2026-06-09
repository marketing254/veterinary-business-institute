"use client";

import { useEffect, useState } from "react";
import { fetchEventPanels } from "../../lib/sheets-client";

/**
 * Renders the image of the latest webinar replay (newest event-panel) from the
 * sheet, live. Seeded with `fallback` for SSR/first paint.
 */
export default function LatestPanelImage({ fallback, alt = "", className }) {
  const [src, setSrc] = useState(fallback);

  useEffect(() => {
    let alive = true;
    fetchEventPanels()
      .then((rows) => {
        const img = rows?.[0]?.image;
        if (alive && img) setSrc(img);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  return <img src={src} alt={alt} className={className} />;
}
