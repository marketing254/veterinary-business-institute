import Link from "next/link";
import { eventPanels } from "../../lib/site-data";
import WebinarReplayDetail from "../../components/live/WebinarReplayDetail";
import { breadcrumbSchema, jsonLd, absoluteUrl, OG_IMAGE } from "../../lib/seo";

function isoDate(value) {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}

export function generateStaticParams() {
  return eventPanels.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const panel = eventPanels.find((p) => p.slug === slug);
  if (!panel) {
    return { title: "Webinar Replay | Veterinary Business Institute" };
  }
  const canonical = `/webinars/${panel.slug}`;
  const description = panel.summary || panel.subtitle || panel.title;
  return {
    title: `${panel.title} | Webinar Replay | Veterinary Business Institute`,
    description,
    alternates: { canonical },
    openGraph: {
      title: panel.title,
      description,
      type: "video.other",
      url: canonical,
      images: [panel.image || OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: panel.title,
      description,
      images: [panel.image || OG_IMAGE],
    },
  };
}

export default async function WebinarReplayPage({ params }) {
  const { slug } = await params;
  const panel = eventPanels.find((p) => p.slug === slug) || eventPanels[0];

  const videoLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: panel.title,
    description: panel.summary || panel.subtitle || panel.title,
    thumbnailUrl: panel.image ? [absoluteUrl(panel.image)] : undefined,
    uploadDate: isoDate(panel.date),
    contentUrl: panel.href || undefined,
    embedUrl: panel.href || undefined,
    publisher: {
      "@type": "Organization",
      name: "Veterinary Business Institute",
      logo: { "@type": "ImageObject", url: absoluteUrl("/assets/logo-vbi.png") },
    },
  };
  const breadcrumbLd = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Webinars", path: "/webinars" },
    { name: panel.title, path: `/webinars/${panel.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={jsonLd(videoLd)} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={jsonLd(breadcrumbLd)} />
      <section className="page-hero wrd-hero">
        <div className="container">
          <Link href="/events" className="wrd-back text-accent">
            &larr; Back to all replays
          </Link>
          <span className="eyebrow text-accent" style={{ display: "block", marginTop: "1rem" }}>
            {panel.category || "Webinar Replay"}
          </span>
          <h1 className="wrd-title">{panel.title}</h1>
          {panel.subtitle ? <p className="hero-lead wrd-subtitle">{panel.subtitle}</p> : null}
          <div className="wrd-hero-meta">
            {panel.date ? <span>{panel.date}</span> : null}
            {panel.duration ? <span>&middot; {panel.duration}</span> : null}
            <span className="wrd-free-pill">Free Replay</span>
          </div>
        </div>
      </section>

      <WebinarReplayDetail initial={panel} slug={slug} />

      <section className="section section-final-cta">
        <div className="container final-cta-inner">
          <div className="final-cta-copy">
            <span className="eyebrow text-accent">Keep Learning</span>
            <h2 className="final-cta-heading">Explore more veterinary panels &amp; replays.</h2>
          </div>
          <div className="final-cta-buttons">
            <Link className="button button-primary" href="/events">
              Browse All Replays
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
