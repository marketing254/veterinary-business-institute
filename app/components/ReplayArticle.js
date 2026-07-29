import Link from "next/link";
import { vimeoEmbed, isoDuration } from "../lib/sheets-core";
import { breadcrumbSchema, jsonLd, absoluteUrl, OG_IMAGE } from "../lib/seo";
import LiveDocNotes from "./live/LiveDocNotes";
import LiveTranscript from "./live/LiveTranscript";

function isoDate(value) {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}

/**
 * Full replay page body (webinar or summit). No "use client" directive so it
 * renders on the server for baked replays (SEO) AND inside the client rescue for
 * sheet replays not yet baked. Mirrors the podcast layout: Vimeo player → baked
 * description + Key Takeaways → transcript. `kind` is a REPLAY_KINDS entry.
 */
export default function ReplayArticle({
  replay,
  newer,
  older,
  kind,
  initialNotes = null,
  initialTranscript = "",
  videoThumb = "",
}) {
  if (!replay || !kind) return null;

  const embed = vimeoEmbed(replay.href);
  const description = replay.summary || replay.subtitle || replay.title;

  // Prefer the crawlable Vimeo CDN thumbnail; fall back to the sheet image.
  const thumb = videoThumb || replay.image || "";
  const thumbAbs = thumb ? (/^https?:\/\//.test(thumb) ? thumb : absoluteUrl(thumb)) : "";

  const videoLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: replay.title,
    description,
    thumbnailUrl: thumbAbs ? [thumbAbs] : undefined,
    uploadDate: isoDate(replay.date),
    duration: isoDuration(replay.duration),
    inLanguage: "en",
    embedUrl: embed || replay.href || undefined,
    publisher: {
      "@type": "Organization",
      name: "Veterinary Business Institute",
      logo: { "@type": "ImageObject", url: absoluteUrl("/assets/logo-vbi.png") },
    },
  };
  const breadcrumbLd = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: kind.plural, path: kind.basePath },
    { name: replay.title, path: `${kind.basePath}/${replay.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={jsonLd(videoLd)} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={jsonLd(breadcrumbLd)} />

      <section className="page-hero" style={{ paddingBottom: "1.25rem" }}>
        <div className="container">
          <Link href={kind.basePath} className="wrd-back text-accent">
            &larr; {kind.backLabel}
          </Link>
          <span className="card-label" style={{ display: "block", marginTop: "1.2rem" }}>
            {replay.category || kind.single}
          </span>
          <h1 style={{ marginTop: "0.4rem" }}>{replay.title}</h1>
          {replay.subtitle ? <p className="hero-lead" style={{ marginTop: "0.6rem" }}>{replay.subtitle}</p> : null}
          <p className="muted-text" style={{ marginTop: "0.5rem" }}>
            {replay.date}
            {replay.duration ? ` · ${replay.duration}` : ""}
            <span className="rep-free-inline"> · Free Replay</span>
          </p>
        </div>
      </section>

      {/* ── Video ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          {embed ? (
            <div className="wrd-video-frame">
              <iframe
                src={`${embed}${embed.includes("?") ? "&" : "?"}title=0&byline=0&portrait=0`}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={replay.title}
              />
            </div>
          ) : (
            <div className="wrd-video-frame wrd-video-soon">
              <span>Replay video coming soon.</span>
            </div>
          )}
        </div>
      </section>

      {/* ── Description + Transcript with a sidebar ── */}
      <section className="section section-muted">
        <div className="container pod-detail-grid">
          <div className="pod-detail-main">
            <div className="pod-about">
              <span className="eyebrow text-accent">Session Overview</span>
              <h2>About This {kind.single === "Summit Replay" ? "Summit" : "Webinar"}</h2>
              <LiveDocNotes docUrl={replay.description} initialNotes={initialNotes} fallbackSummary={replay.summary} />
            </div>
            <LiveTranscript transcriptUrl={replay.transcript} heading="Session Transcript" initialText={initialTranscript} />
          </div>

          <aside className="pod-detail-aside">
            <div className="card podcast-listen-card">
              {replay.image ? (
                <img
                  src={replay.image}
                  alt={replay.title}
                  className="rep-aside-thumb"
                  loading="lazy"
                />
              ) : null}
              <span className="eyebrow text-accent">Keep Watching</span>
              <h3>More {kind.plural}</h3>
              <p className="muted-text" style={{ marginBottom: "1rem" }}>
                Every session is a free, on-demand replay. Browse the full library or register for what&rsquo;s next.
              </p>
              <div className="rep-aside-actions">
                <Link href={kind.basePath} className="button button-primary">
                  All {kind.plural} &rarr;
                </Link>
                <Link href="/webinars/registration" className="button button-secondary">
                  Register for Upcoming
                </Link>
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
              <Link className="podcast-epnav-card" href={`${kind.basePath}/${older.slug}`}>
                <span className="podcast-epnav-dir">&larr; Previous {kind.single}</span>
                <span className="podcast-epnav-title">{older.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {newer ? (
              <Link className="podcast-epnav-card podcast-epnav-next" href={`${kind.basePath}/${newer.slug}`}>
                <span className="podcast-epnav-dir">Next {kind.single} &rarr;</span>
                <span className="podcast-epnav-title">{newer.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </section>
      )}

      {/* ── Keep learning CTA ── */}
      <section className="section res-next">
        <div className="container res-next-inner">
          <span className="eyebrow text-accent">Keep Learning</span>
          <h2>Explore more veterinary panels &amp; replays.</h2>
          <p>
            Free, on-demand sessions with veterinarians, consultants, and industry leaders on building a
            thriving practice.
          </p>
          <div className="button-row" style={{ justifyContent: "center" }}>
            <Link className="button button-primary" href={kind.key === "webinar" ? "/summit-replays" : "/webinar-replays"}>
              {kind.key === "webinar" ? "Browse Summit Replays" : "Browse Webinar Replays"} &rarr;
            </Link>
            <Link className="button button-secondary" href="/podcast">
              Listen to the Podcast
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export { isoDate };
