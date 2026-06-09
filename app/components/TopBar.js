"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchPodcasts, fetchEventPanels } from "../lib/sheets-client";

/**
 * Top announcement bar — latest podcast + latest event panel, linking to their
 * dedicated pages ON THIS SITE (not external). Seeded with build-time `items`
 * for SSR, then live-refreshed from the sheet.
 */
export default function TopBar({ items = [] }) {
  const [links, setLinks] = useState(() => items.map((i) => ({ ...i, internal: false })));

  useEffect(() => {
    let alive = true;
    Promise.all([fetchPodcasts(), fetchEventPanels()])
      .then(([pods, panels]) => {
        if (!alive) return;
        const next = [];
        const ep = (pods || []).find((p) => p.appleId || p.href || p.audioUrl) || pods?.[0];
        if (ep) {
          next.push({
            label: "Latest Podcast",
            copy: `Episode #${ep.number}: ${ep.title}`,
            href: `/podcast/episode-${ep.number}`,
            internal: true,
          });
        }
        const panel = (panels || [])[0];
        if (panel) {
          next.push({
            label: "Latest Event Panel",
            copy: panel.title,
            href: `/webinars/${panel.slug}`,
            internal: true,
          });
        }
        if (next.length) setLinks(next);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  return (
    <header className="topbar">
      <div className="container topbar-grid">
        {links.map((item) =>
          item.internal ? (
            <Link className="topbar-item" href={item.href} key={item.label}>
              <span className="eyebrow">{item.label}</span>
              <span className="topbar-copy">{item.copy}</span>
            </Link>
          ) : (
            <a className="topbar-item" href={item.href} key={item.label} target="_blank" rel="noreferrer">
              <span className="eyebrow">{item.label}</span>
              <span className="topbar-copy">{item.copy}</span>
            </a>
          )
        )}
      </div>
    </header>
  );
}
