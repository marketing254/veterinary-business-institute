"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchPodcasts, fetchEventPanels } from "../lib/sheets-client";
import { podcastSlug } from "../lib/sheets-core";

/**
 * Top announcement bar — latest podcast + latest event panel, linking to their
 * dedicated pages ON THIS SITE (not external). Seeded with build-time `items`
 * for SSR, then live-refreshed from the sheet.
 */
export default function TopBar({ items = [] }) {
  const [links, setLinks] = useState(() => items.map((i) => ({ ...i, internal: i.internal ?? false })));

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
            href: `/podcast/${podcastSlug(ep)}`,
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

  // Repeat the base items so the row overflows the viewport, then duplicate the
  // whole row once — animating the track to -50% scrolls exactly one copy for a
  // seamless infinite marquee.
  const loop = [...links, ...links, ...links, ...links];
  const track = [...loop, ...loop];

  return (
    <div className="topbar" role="region" aria-label="Latest from Veterinary Business Institute">
      <div className="topbar-marquee">
        <div className="topbar-track">
          {track.map((item, i) => {
            const isDup = i >= loop.length;
            const common = {
              className: "topbar-item",
              "aria-hidden": isDup ? "true" : undefined,
              tabIndex: isDup ? -1 : undefined,
            };
            return item.internal ? (
              <Link key={i} href={item.href} {...common}>
                <span className="eyebrow">{item.label}</span>
                <span className="topbar-copy">{item.copy}</span>
              </Link>
            ) : (
              <a key={i} href={item.href} target="_blank" rel="noreferrer" {...common}>
                <span className="eyebrow">{item.label}</span>
                <span className="topbar-copy">{item.copy}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
