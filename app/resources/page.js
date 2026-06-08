import Link from "next/link";
import SolarIcon from "../components/SolarIcon";
import ResourceDownloadForm from "../components/ResourceDownloadForm";
import ResourceUnlockModal from "../components/ResourceUnlockModal";

export const metadata = {
  title: "Free Veterinary Marketing Resources & Guides | Veterinary Business Institute",
  description:
    "Download free veterinary marketing resources: the Practice Growth Blueprint, SEO and Google Business Profile guides, social media playbooks, email templates, and practice-management toolkits. All free — no credit card needed.",
};

const blueprintPoints = [
  "How to rank on page 1 of Google for your services + city",
  "Building a 5-star review system that generates trust automatically",
  "The content strategy that converts pet owners before they call",
  "A 10-point self-assessment so you know exactly where to focus",
  "A 90-day action plan to start implementing immediately",
];

const marketingGuides = [
  {
    icon: "target",
    meta: "SEO · 12 min read",
    title: "The Complete Veterinary SEO Guide 2026",
    body: "Master local SEO: keyword research, on-page optimization, Google Business Profile, citations, link building, and a 90-day action plan.",
    cta: "Read Guide →",
    href: "/blog",
  },
  {
    icon: "mapPin",
    meta: "Local Search · 9 min read",
    title: "Google Business Profile for Veterinary Practices 2026",
    body: "A fully optimized GBP puts your practice in the local 3-Pack that captures the majority of clicks. Complete setup and ongoing management guide.",
    cta: "Read Guide →",
    href: "/blog",
  },
  {
    icon: "megaphone",
    meta: "Social Media · 10 min read",
    title: "Veterinary Social Media Strategy 2026",
    body: "The 4-content-type framework, platform priorities (Instagram, Facebook, YouTube, TikTok), a weekly system, and ROI measurement.",
    cta: "Read Guide →",
    href: "/blog",
  },
  {
    icon: "barChart",
    meta: "Paid Ads · 11 min read",
    title: "Veterinary PPC & Google Ads Guide 2026",
    body: "Campaign structure, keyword strategy, ad-copy formulas, landing pages, bidding strategies, budget guidance, and conversion tracking.",
    cta: "Read Guide →",
    href: "/blog",
  },
  {
    icon: "mail",
    meta: "Email Marketing · 10 min read",
    title: "Veterinary Email Marketing Guide 2026",
    body: "A 5-email nurture sequence, list building, segmentation, 10 subject-line formulas, compliance, platform recommendations, and benchmarks.",
    cta: "Read Guide →",
    href: "/blog",
  },
  {
    icon: "calendar",
    meta: "Free Strategy Session",
    title: "Get a Custom Digital Marketing Plan",
    body: "Our team will build a personalized digital marketing roadmap for your services, city, and growth goals — in one free 30-minute session.",
    cta: "Book Free Session →",
    href: "/consultation",
    highlight: true,
  },
];

const opsGuides = [
  {
    icon: "checkCircle",
    meta: "Operations · 13 min read",
    title: "Veterinary Practice Management Guide 2026",
    body: "The 5 core operational systems every practice needs: intake, scheduling, records, billing, and team communication — plus a 90-day improvement plan.",
    cta: "Read Guide →",
    href: "/blog",
  },
  {
    icon: "star",
    meta: "Client Experience · 11 min read",
    title: "The Client Experience Blueprint for Veterinary Practices",
    body: "Map the moments of truth in every visit, set communication standards, build a review-generation system, and measure client satisfaction.",
    cta: "Read Guide →",
    href: "/blog",
  },
  {
    icon: "barChart",
    meta: "KPI Toolkit",
    title: "Veterinary KPI Dashboard Template",
    body: "Track the metrics that predict practice growth — new clients, average transaction, rebooking rate, retention, client satisfaction, and more.",
    cta: "Request Template →",
    href: "/consultation",
    highlight: true,
  },
];

const techGuides = [
  {
    icon: "globe",
    meta: "Practice Tech · 14 min read",
    title: "Veterinary Technology Guide 2026",
    body: "Practice management software, online booking, client-communication tools, telemedicine, payment systems, and a 6-month tech modernization roadmap.",
    cta: "Read Guide →",
    href: "/blog",
  },
  {
    icon: "graduationCap",
    meta: "Artificial Intelligence · 12 min read",
    title: "AI for Veterinary Practices 2026",
    body: "Practical AI applications: client-intake chatbots, scribe and transcription tools, drafting assistance, scheduling automation, and a 90-day AI adoption plan.",
    cta: "Read Guide →",
    href: "/blog",
  },
  {
    icon: "users",
    meta: "Team & Wellness",
    title: "Veterinary Team Retention Checklist",
    body: "A 25-point checklist covering onboarding, mentorship, scheduling, compensation, and culture to help you keep your best people.",
    cta: "Request Checklist →",
    href: "/consultation",
    highlight: true,
  },
];

function GuideGrid({ guides }) {
  return (
    <div className="res-grid">
      {guides.map((g) => (
        <article
          className={`res-card${g.highlight ? " res-card-cta" : ""}`}
          key={g.title}
        >
          <span className="res-card-icon" aria-hidden="true">
            <SolarIcon name={g.icon} size={22} />
          </span>
          <span className="res-card-meta">{g.meta}</span>
          <h3>{g.title}</h3>
          <p>{g.body}</p>
          <Link className="res-card-link" href={g.href}>
            {g.cta}
          </Link>
        </article>
      ))}
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <ResourceUnlockModal />

      {/* ── Hero + featured preview ── */}
      <section className="page-hero section-about-vbi community-hero">
        <div className="about-vbi-ghost-word" aria-hidden="true">FREE</div>
        <div className="container community-hero-grid">
          <div className="hero-copy community-hero-copy">
            <span className="community-hero-pill">Free Veterinary Resources</span>
            <h1>
              Everything you need to grow your practice —{" "}
              <span className="outline-txt">100% free.</span>
            </h1>
            <p className="hero-lead">
              Guides, templates, checklists, and tools built specifically for veterinary
              practice owners and hospital directors. No credit card. No catch.
            </p>
          </div>

          <div className="res-feature-card">
            <span className="res-feature-icon" aria-hidden="true">
              <SolarIcon name="bookOpen" size={28} />
            </span>
            <h3>The Veterinary Practice Growth Blueprint</h3>
            <p>
              10 proven strategies to dominate your local market in 2026 — 17 pages,
              completely free.
            </p>
            <ul className="res-feature-checks">
              <li>17 pages</li>
              <li>Self-assessment</li>
              <li>90-day plan</li>
            </ul>
            <span className="res-feature-badge">Free Download — No Credit Card Required</span>
          </div>
        </div>
      </section>

      {/* ── Featured download + form ── */}
      <section className="section section-muted res-featured">
        <div className="container res-featured-grid">
          <div className="res-featured-copy">
            <span className="eyebrow text-accent">Featured Download</span>
            <h2>The Veterinary Practice Growth Blueprint 2026</h2>
            <p>
              This 17-page guide gives you the exact 10-strategy framework our team uses to help
              veterinary practices go from invisible to dominant in their local markets.
            </p>
            <strong className="res-featured-subhead">Inside you&rsquo;ll discover:</strong>
            <ul className="check-list">
              {blueprintPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <div className="res-featured-form">
            <ResourceDownloadForm />
          </div>
        </div>
      </section>

      {/* ── Digital Marketing guides ── */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow text-accent">Digital Marketing</span>
            <h2>Veterinary digital marketing guides.</h2>
            <p>
              Comprehensive, step-by-step guides to dominating every digital marketing channel —
              written specifically for veterinary practice owners and hospital directors.
            </p>
          </div>
          <GuideGrid guides={marketingGuides} />
        </div>
      </section>

      {/* ── Practice Management guides ── */}
      <section className="section section-muted">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow text-accent">Practice Management</span>
            <h2>Veterinary operations &amp; growth guides.</h2>
            <p>
              Build the systems, processes, and client experience that transform your practice
              into a scalable, profitable business.
            </p>
          </div>
          <GuideGrid guides={opsGuides} />
        </div>
      </section>

      {/* ── Technology guides ── */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow text-accent">Technology</span>
            <h2>Veterinary technology &amp; AI guides.</h2>
            <p>
              Stay ahead of the technology curve. These guides help you choose the right tools,
              implement AI safely, and build a tech stack that gives your practice a competitive edge.
            </p>
          </div>
          <GuideGrid guides={techGuides} />
        </div>
      </section>

      {/* ── Next-step CTA ── */}
      <section className="section res-next">
        <div className="container res-next-inner">
          <span className="eyebrow text-accent">Next Step</span>
          <h2>Want a personalized growth plan for your practice?</h2>
          <p>
            The resources above will get you started. A free strategy session with our team will
            get you there faster — with a custom plan built around your specific market, services,
            and goals.
          </p>
          <Link className="button button-primary" href="/consultation">
            Book Free Strategy Session &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
