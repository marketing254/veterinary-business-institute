import Link from "next/link";
import { episodes, listeningPlatforms } from "../../lib/site-data";
import SolarIcon from "../../components/SolarIcon";

const APPLE_SHOW_ID = "1712053291";

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
      <section className="page-hero" style={{ paddingBottom: "1.5rem" }}>
        <div className="container">
          <Link href="/podcast" className="text-accent" style={{ textDecoration: "underline", fontSize: "0.9rem" }}>
            &larr; Back to all episodes
          </Link>
          <span className="card-label" style={{ display: "block", marginTop: "1.4rem" }}>
            Episode #{ep.number}
          </span>
          <h1 style={{ marginTop: "0.5rem" }}>{ep.title}</h1>
          <p className="muted-text" style={{ marginTop: "0.5rem" }}>
            {ep.date}
            {ep.duration ? ` · ${ep.duration}` : ""} · The Veterinary Business Podcast
          </p>
        </div>
      </section>

      {/* ── Embedded player ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          {ep.appleId ? (
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
                Listen on Apple / Spotify
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── Show notes + listen options ── */}
      <article className="section section-muted">
        <div className="container split-grid">
          <div>
            <span className="eyebrow text-accent">Episode Show Notes</span>
            <h2>About This Episode</h2>
            <p>{ep.summary}</p>
            {ep.href && (
              <a
                className="button button-secondary"
                href={ep.href}
                target="_blank"
                rel="noreferrer"
                style={{ marginTop: "1.5rem" }}
              >
                Open in Apple Podcasts &rarr;
              </a>
            )}
          </div>

          <div className="card">
            <span className="eyebrow text-accent">Listen Anywhere</span>
            <h3>Subscribe to the Show</h3>
            <p className="muted-text" style={{ marginBottom: "1.25rem" }}>
              New episodes every week. Follow on your favorite platform so you never miss one.
            </p>
            <div className="podcast-listen-stack">
              {listeningPlatforms.map((p) => (
                <a
                  key={p.label}
                  className="podcast-listen-row"
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <SolarIcon name="microphone" size={18} />
                  <span>{p.label}</span>
                  <span className="podcast-listen-arrow">&rarr;</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* ── Prev / next ── */}
      {(newer || older) && (
        <section className="section">
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
          <Link className="button button-primary" href="/podcast#guest">
            Apply to Be a Guest &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
