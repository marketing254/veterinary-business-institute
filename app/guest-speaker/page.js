import Link from "next/link";
import SpeakerApplicationForm from "../components/SpeakerApplicationForm";
import SolarIcon from "../components/SolarIcon";
import { withBasePath } from "../lib/base-path";

export const metadata = {
  title: "Apply as a Guest or Speaker | Veterinary Business Institute",
  description:
    "Apply to be a guest or speaker on the Veterinary Business Podcast — reach veterinary practice owners and teams across North America. Share your expertise on practice growth, marketing, and leadership.",
};

const heroStats = [
  { value: "Veterinary", label: "Audience" },
  { value: "Global", label: "Reach" },
  { value: "30–45 Min", label: "Episodes" },
];

const whyCards = [
  {
    icon: "users",
    title: "A Growing Veterinary Audience",
    body: "Your expertise reaches a highly engaged audience of practice owners, hospital directors, and associate veterinarians across North America and beyond.",
  },
  {
    icon: "star",
    title: "Build Your Authority",
    body: "Being featured on the Veterinary Business Podcast positions you as a go-to expert. Gain credibility, increase referrals, and strengthen your personal brand.",
  },
  {
    icon: "globe",
    title: "Powerful Network Access",
    body: "Connect with the Ekwa Marketing network of veterinary practices, potential partners, referral sources, and industry leaders.",
  },
  {
    icon: "playCircle",
    title: "Multi-Platform Distribution",
    body: "Episodes are published on Spotify, Apple Podcasts, and YouTube, and shared across our social channels with a growing combined following.",
  },
  {
    icon: "video",
    title: "Professionally Produced",
    body: "High-quality audio, video, and show notes. We handle all production and editing so you just show up and share your knowledge.",
  },
  {
    icon: "bookOpen",
    title: "Evergreen Content Asset",
    body: "Your episode lives forever. It continues to drive traffic, referrals, and credibility to you and your practice for years after recording.",
  },
];

const topics = [
  "Practice Marketing",
  "Practice Management",
  "Veterinary Tech & AI",
  "Client Experience",
  "Business Growth",
  "Team Wellness",
  "Finance & Billing",
  "Social Media",
  "Hiring & Culture",
  "Local SEO",
  "Niche Strategies",
  "Leadership",
];

const topicStats = [
  { value: "Growing", label: "Monthly Listeners" },
  { value: "60+", label: "Episodes Published" },
  { value: "Multi", label: "Platform Reach" },
  { value: "40+", label: "Topics Represented" },
];

const fitCards = [
  {
    title: "Practice Owners & Hospital Directors",
    body: "Share how you've grown your practice, managed operations, or navigated challenges. Real-world experience resonates deeply with our audience.",
  },
  {
    title: "Veterinary Marketing Experts",
    body: "Got proven strategies for practice SEO, social media, content, or new-client growth? Our audience is hungry for tactical marketing knowledge.",
  },
  {
    title: "Veterinary Technology Innovators",
    body: "Building a product or platform for practices? Tell our audience about the future of veterinary technology, AI tools, and automation.",
  },
  {
    title: "Coaches, Consultants & Thought Leaders",
    body: "Practice coaches, business consultants, wellness advocates, and professional-development experts who serve the veterinary community.",
  },
];

export default function GuestSpeakerPage() {
  return (
    <>
      {/* ── Hero + host card ── */}
      <section className="page-hero section-about-vbi community-hero">
        <div className="about-vbi-ghost-word" aria-hidden="true">SPEAK</div>
        <div className="container community-hero-grid">
          <div className="hero-copy community-hero-copy">
            <span className="community-hero-pill">Veterinary Business Podcast</span>
            <h1>
              Share your expertise. Reach{" "}
              <span className="outline-txt">veterinary teams nationwide.</span>
            </h1>
            <p className="hero-lead">
              We&rsquo;re looking for veterinary industry experts, practice owners, marketing
              specialists, and innovators to join the Veterinary Business Podcast — the go-to
              show for teams serious about growing their practice.
            </p>
            <div className="button-row">
              <a className="button button-primary" href="#apply">
                Apply Now &rarr;
              </a>
              <Link className="button button-secondary" href="/podcast">
                Listen to the Podcast
              </Link>
            </div>
            <div className="community-hero-stats">
              {heroStats.map((s) => (
                <div className="community-stat" key={s.label}>
                  <span className="community-stat-value">{s.value}</span>
                  <span className="community-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="guest-host-card">
            <div className="guest-host-image">
              <img
                src={withBasePath("/assets/naren-arulrajah.jpg")}
                alt="Naren Arulrajah, host of the Veterinary Business Podcast"
              />
            </div>
            <strong>Naren Arulrajah</strong>
            <span>Founder &amp; Host — Veterinary Business Podcast</span>
            <span className="guest-host-role">CEO, Ekwa Marketing</span>
          </div>
        </div>
      </section>

      {/* ── Apply form ── */}
      <section className="section guest-apply" id="apply">
        <div className="container guest-apply-inner">
          <SpeakerApplicationForm />
        </div>
      </section>

      {/* ── Why VBI ── */}
      <section className="section section-muted community-benefits">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow text-accent">Why the Veterinary Business Podcast?</span>
            <h2>Reach the veterinary teams who are serious about growth.</h2>
            <p>
              Our audience is made up of ambitious practice owners and veterinary professionals
              who actively invest in learning, marketing, and scaling their practices.
            </p>
          </div>
          <div className="community-benefits-grid">
            {whyCards.map((c) => (
              <article className="community-benefit-card" key={c.title}>
                <span className="community-benefit-icon" aria-hidden="true">
                  <SolarIcon name={c.icon} size={22} />
                </span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Episode Topics ── */}
      <section className="section guest-topics">
        <div className="container guest-topics-grid">
          <div className="guest-topics-copy">
            <span className="eyebrow text-accent">Episode Topics</span>
            <h2>What we talk about on the show.</h2>
            <p>
              Every episode is focused on actionable strategies, real insights, and expert
              knowledge that veterinary teams can implement immediately in their practices.
            </p>
            <div className="guest-topic-tags">
              {topics.map((t) => (
                <span className="guest-topic-tag" key={t}>{t}</span>
              ))}
            </div>
            <Link className="button button-primary" href="/podcast">
              Listen to Past Episodes &rarr;
            </Link>
          </div>
          <div className="guest-topics-media">
            <div className="guest-topics-image">
              <img
                src={withBasePath("/assets/episode-100.jpg")}
                alt="Veterinary Business Podcast recording"
              />
            </div>
          </div>
        </div>
        <div className="container guest-topic-stats">
          {topicStats.map((s) => (
            <div className="guest-topic-stat" key={s.label}>
              <span className="guest-topic-stat-value">{s.value}</span>
              <span className="guest-topic-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Who We're Looking For ── */}
      <section className="section section-muted community-audience">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow text-accent">Who We&rsquo;re Looking For</span>
            <h2>Are you a good fit?</h2>
            <p>
              We welcome a diverse range of voices from across the veterinary industry and
              veterinary marketing space.
            </p>
          </div>
          <div className="community-audience-grid">
            {fitCards.map((c) => (
              <div className="community-audience-card" key={c.title}>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
