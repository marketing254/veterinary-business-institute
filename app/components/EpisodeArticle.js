import Link from "next/link";
import { listeningPlatforms } from "../lib/site-data";
import { podcastSlug } from "../lib/sheets-core";
import PodcastTranscript from "./live/PodcastTranscript";
import PodcastPlayer from "./live/PodcastPlayer";
import PodcastKeyNotes from "./live/PodcastKeyNotes";
import PlatformIcon from "./PlatformIcon";
import { podcastEpisodeSchema, breadcrumbSchema, jsonLd } from "../lib/seo";

function isoDate(value) {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}

/**
 * The full episode page body. Deliberately has NO "use client" directive so it
 * renders on the server for baked episodes (SEO) AND inside the client-side
 * rescue (not-found.js) for sheet episodes that aren't baked yet. Its data
 * children (player, key notes, transcript) fetch live in the browser either way.
 */
export default function EpisodeArticle({ ep, newer, older, initialNotes = null }) {
  if (!ep) return null;

  const episodeLd = podcastEpisodeSchema({
    title: `Ep ${ep.number}: ${ep.title}`,
    description: ep.summary,
    path: `/podcast/${podcastSlug(ep)}`,
    image: ep.image,
    datePublished: isoDate(ep.date),
    audioUrl: ep.audioUrl,
  });
  const breadcrumbLd = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Podcast", path: "/podcast" },
    { name: `Episode ${ep.number}`, path: `/podcast/${podcastSlug(ep)}` },
  ]);

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={jsonLd(episodeLd)} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={jsonLd(breadcrumbLd)} />
      <section className="page-hero" style={{ paddingBottom: "1.25rem" }}>
        <div className="container">
          <Link href="/podcast" className="wrd-back text-accent">
            &larr; Back to all episodes
          </Link>
          <span className="card-label" style={{ display: "block", marginTop: "1.2rem" }}>
            Episode #{ep.number}
          </span>
          <h1 style={{ marginTop: "0.4rem" }}>{ep.title}</h1>
          <p className="muted-text" style={{ marginTop: "0.5rem" }}>
            {ep.date}
            {ep.duration ? ` · ${ep.duration}` : ""} · The Veterinary Business Podcast
          </p>
        </div>
      </section>

      {/* ── Player ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <PodcastPlayer episodeNumber={ep.number} audioUrl={ep.audioUrl} appleId={ep.appleId} href={ep.href} />
        </div>
      </section>

      {/* ── About + Transcript (main) with Listen sidebar ── */}
      <section className="section section-muted">
        <div className="container pod-detail-grid">
          <div className="pod-detail-main">
            <div className="pod-about">
              <span className="eyebrow text-accent">Episode Show Notes</span>
              <h2>About This Episode</h2>
              <PodcastKeyNotes episodeNumber={ep.number} fallbackSummary={ep.summary} initialNotes={initialNotes} />
            </div>
            <PodcastTranscript episodeNumber={ep.number} />
          </div>

          <aside className="pod-detail-aside">
            <div className="card podcast-listen-card">
              <span className="eyebrow text-accent">Listen Anywhere</span>
              <h3>Subscribe to the Show</h3>
              <p className="muted-text" style={{ marginBottom: "1rem" }}>
                New episodes every week. Follow on your favourite platform.
              </p>
              <div className="podcast-listen-stack">
                {listeningPlatforms.map((p) => (
                  <a key={p.label} className="podcast-listen-row" href={p.href} target="_blank" rel="noreferrer">
                    <span className="podcast-listen-ico"><PlatformIcon label={p.label} /></span>
                    <span>{p.label}</span>
                    <span className="podcast-listen-arrow">&rarr;</span>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Prev / next ── */}
      {(newer || older) && (
        <section className="section section-muted">
          <div className="container podcast-epnav">
            {older ? (
              <Link className="podcast-epnav-card" href={`/podcast/${podcastSlug(older)}`}>
                <span className="podcast-epnav-dir">&larr; Previous Episode</span>
                <span className="podcast-epnav-title">{older.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {newer ? (
              <Link className="podcast-epnav-card podcast-epnav-next" href={`/podcast/${podcastSlug(newer)}`}>
                <span className="podcast-epnav-dir">Next Episode &rarr;</span>
                <span className="podcast-epnav-title">{newer.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </section>
      )}

      {/* ── Be a guest CTA ── */}
      <section className="section res-next">
        <div className="container res-next-inner">
          <span className="eyebrow text-accent">Share Your Expertise</span>
          <h2>Want to be a guest on the show?</h2>
          <p>
            We&rsquo;re always looking for veterinarians, practice owners, and industry experts with
            valuable insights to share with our audience.
          </p>
          <Link className="button button-primary" href="/guest-speaker">
            Apply to Be a Guest &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
