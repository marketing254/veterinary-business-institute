import Link from "next/link";
import { withBasePath } from "../lib/base-path";
import { pillarIcons } from "../lib/pillar-icons";
import { focusAreas, hosts, servicePillars } from "../lib/site-data";
import LiveTeamGrid from "../components/live/LiveTeamGrid";
import SignalMarquee from "../components/SignalMarquee";
import ParallaxCard from "../components/ParallaxCard";
import AnimatedCounter from "../components/AnimatedCounter";
import AttractButton from "../components/AttractButton";

const teamMembers = [
  {
    name: "Naren Arulrajah",
    title: "Founder & CEO, Ekwa Marketing",
    bio: "Naren drives the marketing vision behind VBI, using data-driven local SEO and strategic visibility audits to help veterinary practices dominate their zip codes.",
    tags: ["Marketing", "Leadership", "Strategy"],
    image: withBasePath("/assets/host-naren.jpg"),
  },
  {
    name: "Dr. Sarah Jenkins",
    title: "Lead CSM Coach",
    bio: "With 15 years in multi-doctor practice ownership, Dr. Jenkins leads our one-on-one coaching strategies focusing on retention and operational flow.",
    tags: ["Coaching", "Operations", "Retention"],
    image: withBasePath("/assets/about-speaker.jpg"),
  },
  {
    name: "Marcus Thorne",
    title: "Director of Marketing Insights",
    bio: "Marcus leads the Ekwa audit review team, breaking down complex ranking factors into actionable strategy plans for VBI members.",
    tags: ["Analytics", "SEO", "Audits"],
    image: withBasePath("/assets/about-speaker.jpg"),
  },
];

const signalRows = [
  teamMembers.map((m) => ({ label: "Team", title: m.name, body: m.title })),
  focusAreas.map((item) => ({ label: "Focus Area", title: item.title, body: item.body })),
];

const reverseMarqueeItems = [
  "Leadership",
  "Coaching",
  "Strategy",
  "Marketing",
  "Operations",
  "Analytics",
  "Retention",
  "Culture",
  "Ownership",
  "Growth",
];

export const metadata = {
  title: "Our Team | Veterinary Business Institute",
  description: "Meet the leadership and coaching team behind the Veterinary Business Institute and Ekwa Marketing.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  const featuredHost = hosts[0];

  return (
    <>
      <section className="page-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow text-accent">Leadership</span>
            <h1>
              Meet the <em>Team.</em>
            </h1>
            <p className="hero-lead">
              The Veterinary Business Institute is built on a partnership between experienced
              clinical operators and the marketing leaders at Ekwa. Meet the team guiding our
              podcasts, content, and strategy.
            </p>
            <div className="button-row">
              <Link className="button button-primary" href="/guest-speaker">
                Invite a Speaker
              </Link>
              <AttractButton href="/msm">
                Free Strategy Call
              </AttractButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── Signal Marquee ── */}
      <SignalMarquee heading="A partnership team covering leadership, operations, marketing, and growth." rows={signalRows} />

      {/* ── Ghost Text Stats Section ── */}
      <section className="section section-stats-ghost">
        <div className="ghost-text" aria-hidden="true">TEAM</div>
        <div className="container stats-ghost-grid">
          <div className="stats-ghost-counters">
            <div className="ghost-counter-item">
              <AnimatedCounter end={15} suffix="+" />
              <p>Years of multi-doctor practice ownership and coaching experience</p>
            </div>
            <div className="ghost-counter-item">
              <AnimatedCounter end={103} suffix="+" />
              <p>Podcast episodes hosted by the VBI leadership team</p>
            </div>
            <div className="ghost-counter-item">
              <AnimatedCounter end={16000} suffix="+" duration={2500} />
              <p>Positive testimonials across the Ekwa marketing ecosystem</p>
            </div>
          </div>
          <div className="stats-ghost-copy">
            <span className="eyebrow text-accent">Leadership You Can Trust</span>
            <h2>A team built from real veterinary operators and marketing strategists.</h2>
            <p>
              VBI is led by people who have run practices, built marketing systems, and coached
              veterinary teams through the hardest growth decisions. Every conversation on the
              platform comes from that same lived experience.
            </p>
            <div className="button-row">
              <Link className="button button-primary" href="/about">
                Our Story
              </Link>
              <AttractButton href="/msm">
                Free Strategy Call
              </AttractButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service Pillars Grid ── */}
      <section className="section section-muted">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">Where the Team Leads</span>
            <h2>Eight pillars the VBI team guides veterinary practices through.</h2>
          </div>
          <div className="pillars-grid">
            {servicePillars.map((item) => (
              <Link key={item.title} href={item.href} style={{ display: "block" }}>
                <ParallaxCard as="div" className="card pillar-card" tiltDepth={6}>
                  <div className="pillar-icon">{pillarIcons[item.icon]}</div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <span className="pillar-arrow">&rarr;</span>
                </ParallaxCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team Member Row (primary content, styled as practice-mgmt) ── */}
      <section className="section">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">The Team</span>
            <h2>Meet the people guiding the Veterinary Business Institute.</h2>
          </div>
          <LiveTeamGrid initial={teamMembers} />
        </div>
      </section>

      {/* ── Marketing Split (Lead voice spotlight) ── */}
      <section className="section section-muted">
        <div className="container marketing-split">
          <div className="marketing-split-image">
            <img src={featuredHost.image} alt={featuredHost.name} />
            <div className="marketing-split-badge">
              Lead Voice of VBI
            </div>
          </div>
          <div className="marketing-split-copy">
            <span className="eyebrow text-accent">Lead Voice</span>
            <h2>{featuredHost.name}</h2>
            <p>{featuredHost.body}</p>
            <ul className="check-list">
              <li>Founder of the Veterinary Business Podcast</li>
              <li>CEO of Ekwa Marketing and local SEO expert</li>
              <li>Host of recurring VBI event panels and webinars</li>
              <li>Advisor to practice owners on growth and visibility</li>
            </ul>
            <div className="button-row">
              <Link className="button button-primary" href="/podcast">
                Listen to the Podcast
              </Link>
              <AttractButton href="/msm">
                Free Strategy Call
              </AttractButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── VetTech Dark Glassmorphic Cards ── */}
      <section className="section section-dark section-vettech">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">How the Team Helps</span>
            <h2 style={{ color: "rgba(255,255,255,0.95)" }}>
              Four ways the VBI leadership team supports veterinary practices.
            </h2>
          </div>
          <div className="vettech-grid">
            <article className="vettech-card">
              <div className="vettech-icon">{pillarIcons.users}</div>
              <h3>Coaching & Leadership</h3>
              <p>One-on-one coaching strategies for retention, culture, and operational flow.</p>
            </article>
            <article className="vettech-card">
              <div className="vettech-icon">{pillarIcons["trending-up"]}</div>
              <h3>Marketing Strategy</h3>
              <p>Data-driven local SEO and strategic visibility audits built for veterinary practices.</p>
            </article>
            <article className="vettech-card">
              <div className="vettech-icon">{pillarIcons["bar-chart"]}</div>
              <h3>Audit Reviews</h3>
              <p>Breaking down complex ranking factors into actionable strategy plans for members.</p>
            </article>
            <article className="vettech-card">
              <div className="vettech-icon">{pillarIcons.target}</div>
              <h3>Growth Planning</h3>
              <p>Expansion timing, succession planning, and the strategic thinking that separates growing practices from stuck ones.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ── Reverse Marquee ── */}
      <div className="reverse-marquee-band">
        <div className="reverse-marquee-track">
          {[...reverseMarqueeItems, ...reverseMarqueeItems].map((item, i) => (
            <span key={i} className="reverse-marquee-item">
              {item}
              <span className="reverse-marquee-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* ── Final CTA ── */}
      <section className="section section-final-cta">
        <div className="ghost-text ghost-text-cta" aria-hidden="true">LEAD</div>
        <div className="container final-cta-inner">
          <div className="final-cta-copy">
            <span className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>Next Step</span>
            <h2>Work directly with the VBI leadership team.</h2>
            <p>
              Book a strategy conversation or invite the team to speak at your next event,
              summit, or online panel on culture, marketing, or operations.
            </p>
          </div>
          <div className="final-cta-buttons">
            <AttractButton href="/msm">
              Book Free Strategy Call
            </AttractButton>
            <Link className="button button-secondary button-dark" href="/guest-speaker">
              Invite a Speaker
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
