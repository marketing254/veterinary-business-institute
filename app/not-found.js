"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { podcastSlug } from "./lib/sheets-core";
import { fetchPodcasts } from "./lib/sheets-client";
import EpisodeArticle from "./components/EpisodeArticle";

const quickLinks = [
  { href: "/podcast", label: "The Podcast" },
  { href: "/webinars", label: "Webinar Replays" },
  { href: "/events", label: "Live Events" },
  { href: "/blog", label: "Blog & Insights" },
  { href: "/resources", label: "Free Resources" },
  { href: "/contact", label: "Contact Us" },
];

function DefaultNotFound() {
  return (
    <section className="page-hero">
      <div className="container" style={{ textAlign: "center", paddingBlock: "3.5rem" }}>
        <span className="eyebrow text-accent">Error 404</span>
        <h1>We couldn&rsquo;t find that page.</h1>
        <p className="hero-lead" style={{ margin: "1rem auto 2rem", maxWidth: "52ch" }}>
          The page you&rsquo;re looking for may have moved or no longer exists. Here are some
          helpful places to pick up where you left off.
        </p>

        <div className="button-row" style={{ justifyContent: "center" }}>
          <Link className="button button-primary" href="/">Back to Home</Link>
          <Link className="button button-secondary" href="/podcast">Browse the Podcast</Link>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.6rem",
            marginTop: "2.5rem",
          }}
        >
          {quickLinks.map((l) => (
            <Link key={l.href} href={l.href} className="button button-secondary button-compact">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Static export only pre-renders episodes known at build time, so a brand-new
 * episode that's already in the sheet would 404 until the next deploy. GitHub
 * Pages serves this page for any unmatched path, so we "rescue" /podcast/<slug>
 * URLs: look the slug up in the LIVE sheet and render the full episode instantly.
 * Everything else falls back to the normal 404.
 */
export default function NotFound() {
  const [view, setView] = useState({ status: "checking" });

  useEffect(() => {
    const path = decodeURIComponent(window.location.pathname).replace(/\/+$/, "");
    const m = path.match(/\/podcast\/([^/]+)$/);
    if (!m) {
      setView({ status: "missing" });
      return;
    }
    const slug = m[1];
    let alive = true;
    fetchPodcasts()
      .then((eps) => {
        if (!alive) return;
        const idx = eps.findIndex((e) => podcastSlug(e) === slug);
        if (idx === -1) {
          setView({ status: "missing" });
          return;
        }
        const ep = eps[idx];
        if (typeof document !== "undefined") {
          document.title = `Ep ${ep.number}: ${ep.title} | Veterinary Business Podcast`;
        }
        setView({
          status: "episode",
          ep,
          newer: idx > 0 ? eps[idx - 1] : null,
          older: idx < eps.length - 1 ? eps[idx + 1] : null,
        });
      })
      .catch(() => {
        if (alive) setView({ status: "missing" });
      });
    return () => {
      alive = false;
    };
  }, []);

  if (view.status === "episode") {
    return <EpisodeArticle ep={view.ep} newer={view.newer} older={view.older} />;
  }

  if (view.status === "checking") {
    // Brief neutral state so a podcast URL doesn't flash the 404 before the
    // sheet responds. Non-podcast paths skip straight to the 404 above.
    return (
      <section className="page-hero">
        <div className="container" style={{ textAlign: "center", paddingBlock: "3.5rem" }}>
          <p className="muted-text">Loading…</p>
        </div>
      </section>
    );
  }

  return <DefaultNotFound />;
}
