import Link from "next/link";
import { featuredSpeakers } from "../lib/featured-speakers";
import LiveSpeakers from "../components/live/LiveSpeakers";
import { breadcrumbSchema, jsonLd } from "../lib/seo";

export const metadata = {
  title: "Featured Speakers | Veterinary Business Institute",
  description:
    "Meet the veterinary leaders, practice owners, consultants, and innovators featured on Veterinary Business Institute expert panels and the Veterinary Business Podcast.",
  alternates: { canonical: "/speakers" },
  openGraph: {
    title: "Featured Speakers | Veterinary Business Institute",
    description:
      "The veterinary experts featured on VBI panels and the Veterinary Business Podcast — owners, consultants, and innovators shaping the profession.",
    type: "website",
    url: "/speakers",
    images: ["/assets/og-cover.jpg"],
  },
};

// ItemList of Person entities — strong structured data covering every speaker.
const speakerListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Veterinary Business Institute Featured Speakers",
  numberOfItems: featuredSpeakers.length,
  itemListElement: featuredSpeakers.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Person",
      name: s.name,
      jobTitle: s.title || undefined,
      worksFor: s.company ? { "@type": "Organization", name: s.company } : undefined,
      description: s.bio || undefined,
      sameAs: [s.linkedin, s.website].filter(Boolean),
    },
  })),
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Speakers", path: "/speakers" },
]);

export default function SpeakersPage() {
  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={jsonLd(speakerListSchema)} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={jsonLd(breadcrumb)} />

      <section className="page-hero">
        <div className="container" style={{ textAlign: "center" }}>
          <div className="hero-copy" style={{ maxWidth: "820px", margin: "0 auto" }}>
            <span className="eyebrow text-accent">Featured Speakers</span>
            <h1 style={{ maxWidth: "none", marginLeft: "auto", marginRight: "auto" }}>
              Learn From the{" "}
              <em style={{ fontStyle: "italic", color: "#2e7d5c" }}>Experts</em> Behind Our{" "}
              <span className="outline-txt" style={{ WebkitTextStroke: "2px #2e7d5c", color: "transparent" }}>
                Panels
              </span>
              .
            </h1>
            <p className="hero-lead" style={{ margin: "1.5rem auto 0" }}>
              Our webinars and expert panels feature accomplished veterinary leaders, consultants,
              and practice owners. Meet the experts who share their knowledge with the
              Veterinary Business Institute community.
            </p>
            <div className="button-row" style={{ justifyContent: "center" }}>
              <Link className="button button-primary" href="/events#replays">Watch Webinar Replays &rarr;</Link>
              <Link className="button button-secondary" href="/guest-speaker">Become a Speaker</Link>
            </div>
          </div>
        </div>
      </section>

      <LiveSpeakers initial={featuredSpeakers} />
    </>
  );
}
