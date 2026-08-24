import { REPLAY_KINDS } from "../lib/replays-kinds";
import { getReplays } from "../lib/replays-data";
import LiveReplayList from "../components/live/LiveReplayList";
import FaqSection from "../components/FaqSection";
import { breadcrumbSchema, jsonLd, absoluteUrl, OG_IMAGE } from "../lib/seo";
import { isoDuration } from "../lib/sheets-core";

const KIND = "summit";
const cfg = REPLAY_KINDS[KIND];

const FAQS = [
  {
    question: "Are the summit replays free?",
    answer:
      "Yes. All Veterinary Business Institute summit replays are free to watch on demand, with no sign-up or payment required.",
  },
  {
    question: "What is a veterinary summit?",
    answer:
      "Each monthly summit is a multi-speaker deep dive where veterinarians, consultants, and industry leaders discuss the forces shaping the future of veterinary practice — from finance and leadership to marketing and technology.",
  },
  {
    question: "How long are the summit replays?",
    answer:
      "Summit replays typically run one to two hours, covering several expert perspectives in a single session. Each replay page lists its exact duration and a full transcript.",
  },
  {
    question: "Do I need to register to watch a summit replay?",
    answer:
      "No. Summit replays stream instantly in your browser with no registration or account needed.",
  },
];

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

      <FaqSection items={FAQS} heading="Summit Replays — Frequently Asked Questions" />
    </>
  );
}
