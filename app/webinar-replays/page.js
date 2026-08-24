import { REPLAY_KINDS } from "../lib/replays-kinds";
import { getReplays } from "../lib/replays-data";
import LiveReplayList from "../components/live/LiveReplayList";
import FaqSection from "../components/FaqSection";
import { breadcrumbSchema, jsonLd, absoluteUrl, OG_IMAGE } from "../lib/seo";
import { isoDuration } from "../lib/sheets-core";

const KIND = "webinar";
const cfg = REPLAY_KINDS[KIND];

const FAQS = [
  {
    question: "Are the webinar replays free to watch?",
    answer:
      "Yes. Every webinar replay from the Veterinary Business Institute is free to watch on demand — no payment, membership, or sign-up required.",
  },
  {
    question: "Do I need to register to watch a webinar replay?",
    answer:
      "No. All webinar replays play instantly in your browser. Registration is only for upcoming live webinars, where registrants also receive the replay afterward.",
  },
  {
    question: "What topics do the veterinary webinars cover?",
    answer:
      "The monthly webinars cover practice growth, team culture, finance, marketing, technology, and leadership — practical strategies for independent veterinary practice owners and managers.",
  },
  {
    question: "Is a transcript available for each webinar?",
    answer:
      "Yes. Every replay page includes the full session transcript next to the video, so you can read, search, or reference the discussion without watching.",
  },
];

function isoDate(value) {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}

export const metadata = {
  title: `${cfg.plural} — Free On-Demand Veterinary Webinars | Veterinary Business Institute`,
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

export default async function WebinarReplaysPage() {
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

      <FaqSection items={FAQS} heading="Webinar Replays — Frequently Asked Questions" />
    </>
  );
}
