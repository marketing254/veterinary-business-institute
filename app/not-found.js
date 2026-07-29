"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { podcastSlug } from "./lib/sheets-core";
import { fetchPodcasts, fetchWebinarReplays, fetchSummitReplays } from "./lib/sheets-client";
import { REPLAY_KINDS, replayKindFromPath } from "./lib/replays-kinds";
import EpisodeArticle from "./components/EpisodeArticle";
import ReplayArticle from "./components/ReplayArticle";

const quickLinks = [
  { href: "/podcast", label: "The Podcast" },
  { href: "/webinar-replays", label: "Webinar Replays" },
  { href: "/summit-replays", label: "Summit Replays" },
  { href: "/events", label: "Live Events" },
  { href: "/resources", label: "Free Resources" },
  { href: "/contact", label: "Contact Us" },
];

const REPLAY_FETCHERS = { webinar: fetchWebinarReplays, summit: fetchSummitReplays };

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
 * Static export only pre-renders content known at build time, so a brand-new
 * podcast episode / webinar-replay / summit-replay that's already in the sheet
 * would 404 until the next deploy. GitHub Pages serves this page for any
 * unmatched path, so we "rescue" those URLs: look the slug up in the LIVE sheet
 * and render the full page instantly. Everything else falls back to the 404.
 */
export default function NotFound() {
  const [view, setView] = useState({ status: "checking" });

  useEffect(() => {
    const path = decodeURIComponent(window.location.pathname).replace(/\/+$/, "");
    let alive = true;

    // ── Replay rescue (/webinar-replays/<slug> or /summit-replays/<slug>) ──
    const replayKind = replayKindFromPath(path);
    const replayMatch = path.match(/\/(?:webinar|summit)-replays\/([^/]+)$/);
    if (replayKind && replayMatch) {
      const slug = replayMatch[1];
      REPLAY_FETCHERS[replayKind]()
        .then((rows) => {
          if (!alive) return;
          const idx = rows.findIndex((r) => r.slug === slug);
          if (idx === -1) {
            setView({ status: "missing" });
            return;
          }
          const r = rows[idx];
          if (typeof document !== "undefined") {
            document.title = `${r.title} | ${REPLAY_KINDS[replayKind].single} | Veterinary Business Institute`;
          }
          setView({
            status: "replay",
            replay: r,
            kind: REPLAY_KINDS[replayKind],
            newer: idx > 0 ? rows[idx - 1] : null,
            older: idx < rows.length - 1 ? rows[idx + 1] : null,
          });
        })
        .catch(() => {
          if (alive) setView({ status: "missing" });
        });
      return () => {
        alive = false;
      };
    }

    // ── Podcast rescue (/podcast/<slug>) ──
    const podMatch = path.match(/\/podcast\/([^/]+)$/);
    if (podMatch) {
      const slug = podMatch[1];
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
    }

    setView({ status: "missing" });
    return () => {
      alive = false;
    };
  }, []);

  if (view.status === "episode") {
    return <EpisodeArticle ep={view.ep} newer={view.newer} older={view.older} />;
  }
  if (view.status === "replay") {
    return <ReplayArticle replay={view.replay} newer={view.newer} older={view.older} kind={view.kind} />;
  }

  if (view.status === "checking") {
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
