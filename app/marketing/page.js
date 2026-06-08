import Link from "next/link";
import { withBasePath } from "../lib/base-path";
import {
  focusAreas,
  servicePillars,
  marketingPageLink,
} from "../lib/site-data";
import { pillarIcons } from "../lib/pillar-icons";
import SignalMarquee from "../components/SignalMarquee";
import ParallaxCard from "../components/ParallaxCard";
import AnimatedCounter from "../components/AnimatedCounter";
import AttractButton from "../components/AttractButton";

const marketingSignalRows = [
  [
    {
      label: "Audit",
      title: "Six-factor visibility review",
      body: "A disciplined 4 to 6 hour review across the ranking signals that matter for veterinary local search.",
    },
    {
      label: "Local SEO",
      title: "Market and competitor analysis",
      body: "Recommendations grounded in your geography, competition, and the gaps between you and the top-ranked practices.",
    },
    {
      label: "Growth",
      title: "Custom marketing plan",
      body: "A VIP team and a tailored plan designed around veterinary practices, not a generic SEO template.",
    },
  ],
  focusAreas.map((item) => ({
    label: "Focus Area",
    title: item.title,
    body: item.body,
  })),
];

const reverseMarqueeItems = [
  "Local SEO",
  "Google Rankings",
  "Website Conversions",
  "Reputation",
  "Paid Search",
  "Client Acquisition",
  "Content Strategy",
  "Analytics",
  "Brand Visibility",
  "Review Growth",
];

export const metadata = {
  title: "Marketing | Veterinary Business Institute",
  description:
    "A clearer VBI marketing page built around the audit process, local search visibility, and practical growth support for veterinary practices.",
};

export default function MarketingPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="page-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow text-accent">Veterinary Marketing</span>
            <p className="hero-kicker">Audit-first marketing support built for veterinary practices that want better visibility.</p>
            <h1>
              Visibility <em>strategy</em> for practices that want more of the <span className="outline-txt">right</span> clients.
            </h1>
            <p className="hero-lead">
              VBI&apos;s marketing offer is centered on a structured review of your practice&apos;s digital
              presence, your local competition, and the specific gaps affecting visibility,
              conversion, and long-term growth.
            </p>
            <div className="button-row">
              <AttractButton href="/consultation">
                Free Strategy Call
              </AttractButton>
              <a className="button button-secondary" href={marketingPageLink} target="_blank" rel="noreferrer">
                Open Live Marketing Page
              </a>
            </div>
          </div>

          <div className="image-frame">
            <img src={withBasePath("/assets/marketing-hero.png")} alt="Marketing analysis and performance visuals" />
          </div>
        </div>
      </section>

      {/* ── Signal Marquee ── */}
      <SignalMarquee
        heading="Marketing signals that move veterinary practices from invisible to in demand."
        rows={marketingSignalRows}
      />

      {/* ── Ghost Text Stats ── */}
      <section className="section section-stats-ghost">
        <div className="ghost-text" aria-hidden="true">REACH</div>
        <div className="container stats-ghost-grid">
          <div className="stats-ghost-counters">
            <div className="ghost-counter-item">
              <AnimatedCounter end={6} />
              <p>Ranking factors reviewed in every veterinary marketing audit</p>
            </div>
            <div className="ghost-counter-item">
              <AnimatedCounter end={6} suffix="h" />
              <p>Hours invested reviewing your practice before the strategy call</p>
            </div>
            <div className="ghost-counter-item">
              <AnimatedCounter end={16000} suffix="+" duration={2500} />
              <p>Positive testimonials referenced across the Ekwa marketing ecosystem</p>
            </div>
          </div>
          <div className="stats-ghost-copy">
            <span className="eyebrow text-accent">Marketing &amp; Visibility</span>
            <h2 className="tools-teaser-heading">Audit-led marketing built for veterinary <em>growth.</em></h2>
            <p>
              The marketing offer begins with discovery, not delivery. The team reviews your
              visibility, your competition, and your conversion path before recommending any plan.
            </p>
            <div className="button-row">
              <AttractButton href="/consultation">
                Free Strategy Call
              </AttractButton>
              <Link className="button button-secondary" href="/consultation">
                Book a Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8-Pillar Grid ── */}
      <section className="section section-muted">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">What We Strengthen</span>
            <h2 className="tools-teaser-heading">Eight pillars of veterinary marketing and <em>growth.</em></h2>
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

      {/* ── Marketing SEO Split ── */}
      <section className="section-marketing-seo">
        <div className="container marketing-seo-split">
          <div className="marketing-seo-copy">
            <span className="eyebrow text-accent">The Marketing Offer</span>
            <h2 className="tools-teaser-heading">
              Get Found by More of the <em>Right Pet Owners.</em>
            </h2>
            <p>
              Most practices need stronger local visibility before they can convert more of the
              right pet owners. The audit maps exactly where the gaps are and how to close them.
            </p>
            <ul className="marketing-seo-list">
              <li>Local SEO that lifts your practice in Google map-pack results across your community</li>
              <li>Reputation and review growth workflows that turn happy clients into trusted social proof</li>
              <li>Content and thought leadership that positions your veterinarians as the local experts</li>
              <li>Social media presence that keeps your practice top-of-mind for current and future clients</li>
            </ul>
            <div className="button-row">
              <AttractButton href="/consultation">
                Explore Marketing &rarr;
              </AttractButton>
              <Link className="button button-secondary" href="/consultation">
                Book a Free Consultation
              </Link>
            </div>
          </div>
          <div className="marketing-seo-image">
            <img src={withBasePath("/assets/webinar-mar26.jpg")} alt="Veterinary marketing strategy" />
            <div className="marketing-seo-image-badge">
              &#9733; Trusted by Veterinary Practices Nationwide
            </div>
          </div>
        </div>
      </section>

      {/* ── 3-Card Marketing Services Row ── */}
      <section className="section section-muted">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">Marketing Services</span>
            <h2 className="tools-teaser-heading">Three service lanes built around veterinary practice <em>reality.</em></h2>
          </div>
          <div className="practice-mgmt-grid">
            <ParallaxCard as="article" className="card practice-mgmt-card" tiltDepth={6}>
              <div className="practice-mgmt-icon">{pillarIcons["trending-up"]}</div>
              <h3>Local SEO &amp; Visibility</h3>
              <p>Rank higher in your community with structured local SEO, map pack optimization, and review growth.</p>
              <div className="practice-mgmt-tags">
                <span className="tag-pill">SEO</span>
                <span className="tag-pill">Local Search</span>
                <span className="tag-pill">Maps</span>
              </div>
            </ParallaxCard>
            <ParallaxCard as="article" className="card practice-mgmt-card" tiltDepth={6}>
              <div className="practice-mgmt-icon">{pillarIcons.target}</div>
              <h3>Website &amp; Conversion</h3>
              <p>Sharpen messaging, page structure, and calls-to-action so more visitors become booked clients.</p>
              <div className="practice-mgmt-tags">
                <span className="tag-pill">Website</span>
                <span className="tag-pill">Copy</span>
                <span className="tag-pill">Conversion</span>
              </div>
            </ParallaxCard>
            <ParallaxCard as="article" className="card practice-mgmt-card" tiltDepth={6}>
              <div className="practice-mgmt-icon">{pillarIcons["bar-chart"]}</div>
              <h3>Reporting &amp; Strategy</h3>
              <p>Track the metrics that matter and adjust the plan with a VIP team that stays accountable.</p>
              <div className="practice-mgmt-tags">
                <span className="tag-pill">Analytics</span>
                <span className="tag-pill">Strategy</span>
                <span className="tag-pill">VIP Team</span>
              </div>
            </ParallaxCard>
          </div>
        </div>
      </section>

      {/* ── 4-Card Dark Marketing Systems ── */}
      <section className="section section-dark section-vettech">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">Marketing Tools &amp; Systems</span>
            <h2 className="final-cta-heading" style={{ color: "rgba(255,255,255,0.95)" }}>
              The systems behind a high-performing veterinary marketing <em>engine.</em>
            </h2>
          </div>
          <div className="vettech-grid">
            <article className="vettech-card">
              <div className="vettech-icon">{pillarIcons.monitor}</div>
              <h3>Audit &amp; Diagnostics</h3>
              <p>A structured 4 to 6 hour review across six ranking factors that influence veterinary search visibility.</p>
            </article>
            <article className="vettech-card">
              <div className="vettech-icon">{pillarIcons["bar-chart"]}</div>
              <h3>Analytics &amp; Reporting</h3>
              <p>Measure what matters — new client acquisition, call volume, ranking movement, and marketing ROI.</p>
            </article>
            <article className="vettech-card">
              <div className="vettech-icon">{pillarIcons.target}</div>
              <h3>Automation &amp; Follow-Up</h3>
              <p>Automate the repetitive parts of client outreach so your team stays focused on patient care.</p>
            </article>
            <article className="vettech-card">
              <div className="vettech-icon">{pillarIcons.shield}</div>
              <h3>Reputation Systems</h3>
              <p>Review growth, response workflows, and reputation monitoring designed for veterinary practices.</p>
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
              Book a free strategy call and find out what&apos;s holding your visibility <em>back.</em>
            </h2>
            <p className="final-cta-sub">
              On your strategy call, a senior marketing strategist will walk you through a live
              review of your practice&apos;s local search footprint, competitor positioning, website
              conversion path, and reputation signals. You&apos;ll leave the call with specific,
              prioritized recommendations tailored to your market — no commitments, no generic
              pitches, and no pressure to sign anything.
            </p>
          </div>
          <div className="final-cta-buttons">
            <AttractButton href="/consultation">
              Free Strategy Call
            </AttractButton>
            <Link className="button button-secondary button-dark" href="/contact">
              Ask a Question First
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
