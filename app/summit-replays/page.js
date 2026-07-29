import { REPLAY_KINDS } from "../lib/replays-kinds";
import { getReplays } from "../lib/replays-data";
import LiveReplayList from "../components/live/LiveReplayList";
import { breadcrumbSchema, jsonLd, absoluteUrl, OG_IMAGE } from "../lib/seo";
import { isoDuration } from "../lib/sheets-core";

const KIND = "summit";
const cfg = REPLAY_KINDS[KIND];

function isoDate(value) {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}

export const metadata = {
  title: `${cfg.plural} — Free On-Demand Veterinary Summits | Veterinary Business Institute`,
  description: cfg.heroLead,
  alternates: { canonical: cfg.basePath },
  openGraph: {
    title: `${cfg.plural} | Veterinary Business Institute`,
    description: cfg.heroLead,
    type: "website",
    url: cfg.basePath,
    images: [OG_IMAGE],
  },
};

export default async function SummitReplaysPage() {
  const replays = await getReplays(KIND);

  const listLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Veterinary Business Institute ${cfg.plural}`,
    numberOfItems: replays.length,
    itemListElement: replays.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "VideoObject",
        name: r.title,
        description: r.summary || r.title,
        thumbnailUrl: r.image ? [absoluteUrl(r.image)] : undefined,
        uploadDate: isoDate(r.date),
        duration: isoDuration(r.duration),
        inLanguage: "en",
        embedUrl: r.href || undefined,
        url: absoluteUrl(`${cfg.basePath}/${r.slug}`),
      },
    })),
  };
  const breadcrumbLd = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: cfg.plural, path: cfg.basePath },
  ]);

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={jsonLd(listLd)} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={jsonLd(breadcrumbLd)} />

      <section className="page-hero">
        <div className="container" style={{ textAlign: "center" }}>
          <div className="hero-copy" style={{ maxWidth: "760px", margin: "0 auto" }}>
            <span className="eyebrow text-accent">{cfg.eyebrow}</span>
            <h1 style={{ maxWidth: "none", margin: "0 auto" }}>{cfg.plural}</h1>
            <p className="hero-lead" style={{ margin: "1.5rem auto 0" }}>{cfg.heroLead}</p>
          </div>
        </div>
      </section>

      <LiveReplayList initial={replays} kind={KIND} basePath={cfg.basePath} singleLabel={cfg.single} />
    </>
  );
}
