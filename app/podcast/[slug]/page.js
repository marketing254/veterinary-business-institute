import Link from "next/link";
import { episodes, listeningPlatforms } from "../../lib/site-data";
import { driveFileUrl } from "../../lib/sheets-core";
import PodcastTranscript from "../../components/live/PodcastTranscript";

const APPLE_SHOW_ID = "1712053291";

function PlatformIcon({ label }) {
  const l = (label || "").toLowerCase();
  if (l.includes("apple")) {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <defs>
          <linearGradient id="ap-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#822CBE" />
            <stop offset="1" stopColor="#D772FB" />
          </linearGradient>
        </defs>
        <rect width="24" height="24" rx="5.4" fill="url(#ap-grad)" />
        <path
          fill="#fff"
          d="M12 13.6a2.3 2.3 0 0 0 2.3-2.3V7.7a2.3 2.3 0 0 0-4.6 0v3.6a2.3 2.3 0 0 0 2.3 2.3zm4-2.3a4 4 0 0 1-3.25 3.93V17h1.4a.6.6 0 0 1 0 1.2H9.85a.6.6 0 0 1 0-1.2h1.4v-1.77A4 4 0 0 1 8 11.3h1.2a2.8 2.8 0 0 0 5.6 0H16z"
        />
      </svg>
    );
  }
  if (l.includes("youtube")) {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path
          fill="#FF0000"
          d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896 19.104 8.076 19.104 12 15.924 19.104 12 19.104z"
        />
        <path fill="#FF0000" d="M9.6 7.8v8.4l7.2-4.2z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3zm7 9a7 7 0 0 1-6 6.92V21h-2v-3.08A7 7 0 0 1 5 11h2a5 5 0 0 0 10 0h2z" />
    </svg>
  );
}

export async function generateStaticParams() {
  return episodes.map((ep) => ({ slug: `episode-${ep.number}` }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const number = slug.replace("episode-", "");
  const ep = episodes.find((e) => e.number === number);
  if (!ep) return { title: "Episode | Veterinary Business Podcast" };
  return {
    title: `Ep ${ep.number}: ${ep.title} | Veterinary Business Podcast`,
    description: ep.summary,
    openGraph: {
      title: `Ep ${ep.number}: ${ep.title}`,
      description: ep.summary,
      images: ep.image ? [ep.image] : undefined,
      type: "article",
    },
  };
}

export default async function PodcastEpisodePage({ params }) {
  const { slug } = await params;
  const number = slug.replace("episode-", "");
  const idx = episodes.findIndex((e) => e.number === number);
  const ep = idx >= 0 ? episodes[idx] : episodes[0];
  const newer = idx > 0 ? episodes[idx - 1] : null;
  const older = idx >= 0 && idx < episodes.length - 1 ? episodes[idx + 1] : null;

  return (
    <>
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
          {ep.audioUrl ? (
            <audio controls preload="none" src={driveFileUrl(ep.audioUrl)} style={{ width: "100%", borderRadius: "12px" }}>
              Your browser does not support the audio element.
            </audio>
          ) : ep.appleId ? (
            <iframe
              className="podcast-page-player"
              title={`Listen to episode ${ep.number}`}
              allow="autoplay *; encrypted-media *; clipboard-write"
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
              src={`https://embed.podcasts.apple.com/us/podcast/id${APPLE_SHOW_ID}?i=${ep.appleId}&theme=auto`}
            />
          ) : (
            <div className="button-row" style={{ justifyContent: "center" }}>
              <a className="button button-primary" href={ep.href} target="_blank" rel="noreferrer">
                Listen on Apple Podcasts
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── About + Transcript (main) with Listen sidebar ── */}
      <section className="section section-muted">
        <div className="container pod-detail-grid">
          <div className="pod-detail-main">
            <div className="pod-about">
              <span className="eyebrow text-accent">Episode Show Notes</span>
              <h2>About This Episode</h2>
              <p>{ep.summary}</p>
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
              <Link className="podcast-epnav-card" href={`/podcast/episode-${older.number}`}>
                <span className="podcast-epnav-dir">&larr; Previous Episode</span>
                <span className="podcast-epnav-title">{older.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {newer ? (
              <Link className="podcast-epnav-card podcast-epnav-next" href={`/podcast/episode-${newer.number}`}>
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
