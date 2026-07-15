"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchPodcasts, fetchWebinars } from "../lib/sheets-client";
import { podcastSlug } from "../lib/sheets-core";

// First webinar dated today or later (list arrives soonest-first); falls back
// to the first row so the slot never goes empty.
function pickUpcoming(rows) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (
    (rows || []).find((w) => {
      const d = new Date(w.dateIso);
      return !Number.isNaN(d.getTime()) && d >= today;
    }) || (rows || [])[0]
  );
}

/**
 * Top announcement bar — latest podcast + next upcoming live webinar, linking
 * to their dedicated pages ON THIS SITE (not external). Seeded with build-time
 * `items` for SSR, then live-refreshed from the sheet.
 */
export default function TopBar({ items = [] }) {
  const [links, setLinks] = useState(() => items.map((i) => ({ ...i, internal: i.internal ?? false })));

  useEffect(() => {
    let alive = true;
    Promise.all([fetchPodcasts(), fetchWebinars()])
      .then(([pods, webinars]) => {
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
        const wb = pickUpcoming(webinars);
        if (wb) {
          next.push({
            label: "Next Live Webinar",
            copy: `${wb.day} ${wb.monthYear}: ${wb.title}`,
            href: "/webinars/registration",
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
