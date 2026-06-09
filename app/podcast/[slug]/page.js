import Link from "next/link";
import { episodes, listeningPlatforms } from "../../lib/site-data";
import { driveFileUrl } from "../../lib/sheets-core";
import PodcastTranscript from "../../components/live/PodcastTranscript";

const APPLE_SHOW_ID = "1712053291";

function PlatformIcon({ label }) {
  const l = (label || "").toLowerCase();
  if (l.includes("apple")) {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-3.3 19.44c-.05-.7-.1-1.86.02-2.66.11-.73.74-4.65.74-4.65s-.19-.38-.19-.94c0-.88.51-1.54 1.15-1.54.54 0 .8.41.8.9 0 .55-.35 1.36-.53 2.12-.15.63.32 1.15.94 1.15 1.13 0 2-1.19 2-2.91 0-1.52-1.09-2.58-2.65-2.58-1.81 0-2.87 1.35-2.87 2.75 0 .54.21 1.12.47 1.44.05.06.06.12.04.18l-.18.73c-.03.12-.1.15-.22.09-.83-.39-1.35-1.6-1.35-2.58 0-2.1 1.53-4.03 4.4-4.03 2.31 0 4.11 1.65 4.11 3.85 0 2.3-1.45 4.15-3.46 4.15-.68 0-1.31-.35-1.53-.77l-.42 1.58c-.15.58-.55 1.31-.83 1.76A10 10 0 1 0 12 2z" />
      </svg>
    );
  }
  if (l.includes("youtube")) {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 2a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm-1.5 3.2v5.6l4.8-2.8-4.8-2.8z" />
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

      {/* ── Show notes + listen ── */}
      <article className="section section-muted">
        <div className="container split-grid">
          <div>
            <span className="eyebrow text-accent">Episode Show Notes</span>
            <h2>About This Episode</h2>
            <p>{ep.summary}</p>
          </div>

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
        </div>
      </article>

      {/* ── Transcript (with search) ── */}
      <section className="section">
        <div className="container">
          <PodcastTranscript episodeNumber={ep.number} />
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
