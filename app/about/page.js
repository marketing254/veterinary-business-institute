import Link from "next/link";
import { withBasePath } from "../lib/base-path";
import { pillarIcons } from "../lib/pillar-icons";
import {
  focusAreas,
  homepageMetrics,
  hosts,
  servicePillars,
} from "../lib/site-data";
import SignalMarquee from "../components/SignalMarquee";
import ParallaxCard from "../components/ParallaxCard";
import AnimatedCounter from "../components/AnimatedCounter";
import AttractButton from "../components/AttractButton";

const storyPoints = [
  "Leadership, retention, and staffing decisions are now central to veterinary growth.",
  "Marketing and visibility matter because a great practice still needs to be found.",
  "Technology and client experience are part of business strategy, not side topics.",
];

const signalRows = [
  [
    {
      label: "Our Mission",
      title: "Practical business education for veterinary leaders.",
      body: "VBI translates business concepts into usable guidance for veterinary owners, managers, and teams working through real operating decisions.",
    },
    {
      label: "Our Story",
      title: "A focused education brand, supported by deeper marketing experience.",
      body: "VBI is framed as a focused education brand backed by the Ekwa marketing ecosystem — built around podcasts, panels, webinars, and strategy support.",
    },
    {
      label: "Our Approach",
      title: "Education is the front door. Action paths keep it working.",
      body: "Visitors can move naturally from institute story into listening, watching, exploring strategy, or contacting the team with a concrete reason.",
    },
  ],
  hosts.map((host) => ({
    label: "Team",
    title: host.name,
    body: host.body,
  })),
];

const reverseMarqueeItems = [
  "Institute Mission",
  "Education First",
  "Practical Guidance",
  "Podcast Archive",
  "Event Panels",
  "Webinar Replays",
  "Strategy Support",
  "Veterinary Leaders",
  "Business Judgment",
  "Practice Resilience",
];

export const metadata = {
  title: "About | Veterinary Business Institute",
  description:
    "Learn how Veterinary Business Institute connects podcast conversations, webinar education, and marketing guidance for veterinary leaders.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow text-accent">About Veterinary Business Institute</span>
            <p className="hero-kicker">Practical business education for a changing veterinary market.</p>
            <h1>
              The <em style={{ fontStyle: 'italic', color: '#2e7d5c' }}>Team</em> Behind the Veterinary{' '}
              <span
                className="outline-txt"
                style={{ WebkitTextStroke: '2px #2e7d5c', color: 'transparent' }}
              >
                Business
              </span>{' '}
              Institute.
            </h1>
            <p className="hero-lead">
              VBI exists to help veterinary professionals grow past generic advice and into practical
              business education around leadership, culture, operations, marketing, and long-term
              practice resilience.
            </p>
            <div className="button-row">
              <Link className="button button-primary" href="/podcast">
                Explore the Podcast
              </Link>
              <Link className="button button-secondary" href="/events">
                Explore Event Panels
              </Link>
              <Link className="button button-secondary" href="/webinars">
                Watch Webinar Replays
              </Link>
            </div>
          </div>

          <div className="image-frame">
            <img src={withBasePath("/assets/about-hero.jpg")} alt="Veterinary team members in conversation" />
          </div>
        </div>
      </section>

      {/* ── Signal Marquee ── */}
      <SignalMarquee
        heading="The institute, its people, and its story — presented as one visual system."
        rows={signalRows}
      />

      {/* ── Ghost Text Stats Section ── */}
      <section className="section section-stats-ghost">
        <div className="ghost-text" aria-hidden="true">INSTITUTE</div>
        <div className="container stats-ghost-grid">
          <div className="stats-ghost-counters">
            <div className="ghost-counter-item">
              <AnimatedCounter end={103} suffix="+" />
              <p>Podcast episodes published through the life of the institute</p>
            </div>
            <div className="ghost-counter-item">
              <AnimatedCounter end={12} />
              <p>Replay-ready event panels hosted on Vimeo with expert veterinary voices</p>
            </div>
            <div className="ghost-counter-item">
              <AnimatedCounter end={16000} suffix="+" duration={2500} />
              <p>Positive testimonials across the wider Ekwa marketing ecosystem</p>
            </div>
          </div>
          <div className="stats-ghost-copy">
            <span className="eyebrow text-accent">Mission</span>
            <h2>
              A Unique Platform for{' '}
              <em style={{ fontStyle: 'italic', color: '#2e7d5c' }}>Outstanding</em> Veterinary Leaders.
            </h2>
            <p>
              VBI exists for veterinary professionals who want better business judgment around
              leadership, staffing, client experience, marketing, technology, and long-term practice
              resilience. The goal is not abstract inspiration — it is usable insight for owners,
              associates, managers, and teams making real operating decisions.
            </p>
            <ul className="check-list">
              {storyPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="button-row">
              <Link className="button button-primary" href="/podcast">
                Explore the Podcast
              </Link>
              <AttractButton href="/consultation">
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
            <span className="eyebrow text-accent">What We Cover</span>
            <h2>
              Eight <em style={{ fontStyle: 'italic', color: '#2e7d5c' }}>pillars</em> of veterinary business education.
            </h2>
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

      {/* ── Marketing Split: Why VBI deserves its own identity ── */}
      <section className="section">
        <div className="container marketing-split">
          <div className="marketing-split-image">
            <img src={withBasePath("/assets/about-team.jpg")} alt="Veterinary professionals and business education imagery" />
            <div className="marketing-split-badge">
              ★ Trusted by Veterinary Practices Nationwide
            </div>
          </div>
          <div className="marketing-split-copy">
            <span className="eyebrow text-accent">Platform Value</span>
            <h2>
              Why VBI deserves its own <em style={{ fontStyle: 'italic', color: '#2e7d5c' }}>identity</em>.
            </h2>
            <p>
              VBI is more than a podcast. It is a broader educational layer around veterinary
              business growth, giving practices one place to engage with interviews, webinars,
              recurring panel discussions, and strategic guidance.
            </p>
            <ul className="check-list">
              <li>A focused education brand supported by deeper marketing experience</li>
              <li>Interview archive, panel library, and webinar replays in one place</li>
              <li>Clear transitions into strategy support when a visitor is ready</li>
              <li>Backed by the Ekwa marketing ecosystem and veterinary expertise</li>
            </ul>
            <div className="button-row">
              <Link className="button button-primary" href="/marketing">
                See the Marketing Offer
              </Link>
              <Link className="button button-secondary" href="/consultation">
                Book a Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Founder feature card ── */}
      <section className="section section-muted">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">Host &amp; Founder</span>
            <h2>
              The person behind the <em style={{ fontStyle: 'italic', color: '#2e7d5c' }}>platform</em>.
            </h2>
          </div>
          <article className="about-founder">
            <div className="about-founder-photo">
              <img src={hosts[0].image} alt={hosts[0].name} />
            </div>
            <div className="about-founder-copy">
              <h3>{hosts[0].name}</h3>
              <span className="about-founder-role">{hosts[0].role}</span>
              <div className="about-founder-stats">
                <div><strong>20+</strong><span>Years in Marketing</span></div>
                <div><strong>2,200+</strong><span>Practices Coached</span></div>
                <div><strong>188</strong><span>Countries Reached</span></div>
              </div>
              <p>{hosts[0].body}</p>
              <div className="button-row">
                <Link className="button button-primary" href="/podcast">
                  Listen to the Podcast
                </Link>
                <a
                  className="button button-secondary"
                  href="https://www.linkedin.com/company/veterinary-business-podcast/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ── Meet the Team ── */}
      <section className="section">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">Meet the Team</span>
            <h2>
              The <em style={{ fontStyle: 'italic', color: '#2e7d5c' }}>co-hosts</em> shaping each conversation.
            </h2>
          </div>
          <div className="about-team-grid">
            {hosts.slice(1).map((member) => (
              <article className="about-team-card" key={member.name}>
                <div className="about-team-photo">
                  <img src={member.image} alt={member.name} loading="lazy" />
                </div>
                <h3>{member.name}</h3>
                <span className="about-team-role">{member.role}</span>
                <p>{member.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── VetTech Dark Glassmorphic Cards ── */}
      <section className="section section-dark section-vettech">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">How the Institute Works</span>
            <h2 style={{ color: "rgba(255,255,255,0.95)" }}>
              Four <em style={{ fontStyle: 'italic', color: '#c6f800' }}>formats</em> that make VBI education{' '}
              <span className="outline-txt">practical</span> and usable.
            </h2>
          </div>
          <div className="vettech-grid">
            <article className="vettech-card">
              <div className="vettech-icon">{pillarIcons.monitor}</div>
              <h3>Podcast Conversations</h3>
              <p>Long-form interviews with veterinary leaders on leadership, staffing, growth, and the real levers behind practice performance.</p>
            </article>
            <article className="vettech-card">
              <div className="vettech-icon">{pillarIcons["bar-chart"]}</div>
              <h3>Event Panels</h3>
              <p>Recurring expert panel discussions on culture, management, risk, client experience, and the decisions that shape modern practices.</p>
            </article>
            <article className="vettech-card">
              <div className="vettech-icon">{pillarIcons.target}</div>
              <h3>Webinar Replays</h3>
              <p>On-demand webinar sessions for teams that want deeper, structured guidance across marketing, operations, and financial resilience.</p>
            </article>
            <article className="vettech-card">
              <div className="vettech-icon">{pillarIcons.shield}</div>
              <h3>Strategy Support</h3>
              <p>Clear pathways from education into marketing audits, strategy meetings, and hands-on support from the wider VBI and Ekwa team.</p>
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
        <div className="ghost-text ghost-text-cta" aria-hidden="true">GROW</div>
        <div className="container final-cta-inner">
          <div className="final-cta-copy">
            <span className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>Ready to Grow?</span>
            <h2 className="final-cta-heading">
              Build Professional Authority with an Exclusive VBI Podcast{' '}
              <em>Episode.</em>
            </h2>
            <p className="final-cta-sub">
              Book a free strategy session with the Veterinary Business Institute team to map your
              practice growth priorities. We will walk you through marketing, leadership, and visibility
              levers — then outline the fastest path to a feature on the VBI podcast.
            </p>
          </div>
          <div className="final-cta-buttons">
            <AttractButton href="/consultation">
              Book Free Strategy Call
            </AttractButton>
            <Link className="button button-secondary button-dark" href="/contact">
              Contact the Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
