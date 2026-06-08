import Link from "next/link";
import SignalMarquee from "../components/SignalMarquee";
import AnimatedCounter from "../components/AnimatedCounter";
import AttractButton from "../components/AttractButton";
import ParallaxCard from "../components/ParallaxCard";
import { withBasePath } from "../lib/base-path";
import { pillarIcons } from "../lib/pillar-icons";
import {
  episodes,
  eventPanels,
  focusAreas,
  servicePillars,
  webinars,
} from "../lib/site-data";
import LiveCaseStudies from "../components/live/LiveCaseStudies";

export const metadata = {
  title: "Case Studies | Veterinary Business Institute",
  description: "Detailed breakdowns of how VBI coaching and Ekwa marketing audits impact veterinary practices.",
};

const caseStudies = [
  {
    clinic: "Riverside Small Animal Hospital",
    challenge: "Struggling with local search visibility and a 20% drop in new patient acquisition over 12 months.",
    solution: "A full Ekwa Marketing Audit leading to targeted Local SEO restructuring and mobile-first speed optimizations.",
    result: "145% increase in organic new patient bookings within 6 months.",
    metric: "+145%",
    metricLabel: "New Patient Bookings",
  },
  {
    clinic: "Paws & Care Veterinary Clinic (Multi-Location)",
    challenge: "High turnover among associate veterinarians and front-desk logjams resulting in poor client experience scores.",
    solution: "Implementation of the VBI CSM Coaching playbook focusing on associate compensation restructuring and simplified SOPs.",
    result: "Reduced clinical turnover to zero over 18 months, with a 35% increase in operational efficiency.",
    metric: "0%",
    metricLabel: "DVM Turnover",
  },
];

const signalRows = [
  [
    { label: "Podcast", title: episodes[0].title, body: episodes[0].summary },
    { label: "Event Panels", title: eventPanels[0].title, body: eventPanels[0].summary },
    { label: "Webinars", title: webinars[0].title, body: webinars[0].summary },
  ],
  focusAreas.map((item) => ({ label: "Focus Area", title: item.title, body: item.body })),
];

const reverseMarqueeItems = [
  "Measured Results",
  "New Patient Growth",
  "Retention Wins",
  "SEO Turnarounds",
  "Culture Rebuilds",
  "Revenue Lift",
  "Team Stability",
  "Client Experience",
];

export default function CaseStudiesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow text-accent">Proof of Concept</span>
            <h1>
              Case <em>Studies.</em>
            </h1>
            <p className="hero-lead">
              While our <Link href="/reviews" style={{ textDecoration: "underline" }}>Reviews page</Link>
              {" "}shares subjective experiences, these case studies break down the hard
              metrics behind our coaching (CSM) and marketing (MSM) playbooks.
            </p>
          </div>
        </div>
      </section>

      {/* ── Signal Marquee ── */}
      <SignalMarquee heading="Numbers tell the story the testimonials hint at." rows={signalRows} />

      {/* ── Ghost Text Stats ── */}
      <section className="section section-stats-ghost">
        <div className="ghost-text" aria-hidden="true">WINS</div>
        <div className="container stats-ghost-grid">
          <div className="stats-ghost-counters">
            <div className="ghost-counter-item">
              <AnimatedCounter end={145} suffix="%" />
              <p>Average increase in organic new patient bookings after audit-led SEO</p>
            </div>
            <div className="ghost-counter-item">
              <AnimatedCounter end={0} suffix="%" />
              <p>DVM turnover achieved over 18 months of CSM coaching playbook work</p>
            </div>
            <div className="ghost-counter-item">
              <AnimatedCounter end={16000} suffix="+" duration={2500} />
              <p>Positive testimonials across the Ekwa marketing ecosystem</p>
            </div>
          </div>
          <div className="stats-ghost-copy">
            <span className="eyebrow text-accent">Measured Impact</span>
            <h2>Outcomes you can actually put on a scoreboard.</h2>
            <p>
              VBI coaching and Ekwa marketing audits are designed to produce measurable change —
              from new patient bookings to team retention to operational efficiency gains.
            </p>
            <div className="button-row">
              <Link className="button button-primary" href="/about">
                Our Story
              </Link>
              <AttractButton href="/consultation">
                Free Strategy Call
              </AttractButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── Case Studies Grid (kept) ── */}
      <section className="section">
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">Case Studies</span>
            <h2>Real practices. Real numbers.</h2>
          </div>
          <LiveCaseStudies initial={caseStudies} />
        </div>
      </section>

      {/* ── 8-Pillar Grid ── */}
      <section className="section section-muted">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">Where The Wins Happen</span>
            <h2>Eight pillars of veterinary business education.</h2>
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

      {/* ── Marketing Split ── */}
      <section className="section">
        <div className="container marketing-split">
          <div className="marketing-split-image">
            <img src={withBasePath("/assets/webinar-mar26.jpg")} alt="Veterinary audit outcomes" />
            <div className="marketing-split-badge">
              Audit-Driven Results You Can Defend
            </div>
          </div>
          <div className="marketing-split-copy">
            <span className="eyebrow text-accent">Marketing &amp; Growth</span>
            <h2>Every case study starts with a rigorous audit.</h2>
            <p>
              Before we make a recommendation, we measure. The Ekwa six-factor audit and the
              VBI coaching discovery are the foundation behind every case study on this page.
            </p>
            <ul className="check-list">
              <li>A disciplined six-factor audit across the ranking signals that matter</li>
              <li>Local market and competitor analysis tailored to your geography</li>
              <li>A VIP team and custom marketing plan built for veterinary practices</li>
              <li>Backed by 16,000+ positive testimonials from the Ekwa network</li>
            </ul>
            <div className="button-row">
              <Link className="button button-primary" href="/marketing">
                Explore Marketing
              </Link>
              <Link className="button button-secondary" href="/consultation">
                Book a Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Practice Management 3-Card Row ── */}
      <section className="section section-muted">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">Practice Management</span>
            <h2>Built for the realities of running a veterinary practice.</h2>
          </div>
          <div className="practice-mgmt-grid">
            {focusAreas.slice(0, 3).map((item, index) => (
              <ParallaxCard key={item.title} as="article" className="card practice-mgmt-card" tiltDepth={6}>
                <div className="practice-mgmt-icon">
                  {pillarIcons[["users", "briefcase", "trending-up"][index]]}
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <div className="practice-mgmt-tags">
                  {index === 0 && (
                    <>
                      <span className="tag-pill">Leadership</span>
                      <span className="tag-pill">Retention</span>
                      <span className="tag-pill">Culture</span>
                    </>
                  )}
                  {index === 1 && (
                    <>
                      <span className="tag-pill">Staffing</span>
                      <span className="tag-pill">Workflow</span>
                      <span className="tag-pill">Onboarding</span>
                    </>
                  )}
                  {index === 2 && (
                    <>
                      <span className="tag-pill">SEO</span>
                      <span className="tag-pill">Local Search</span>
                      <span className="tag-pill">Growth</span>
                    </>
                  )}
                </div>
              </ParallaxCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── VetTech Dark ── */}
      <section className="section section-dark section-vettech">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">VetTech &amp; Systems</span>
            <h2 style={{ color: "rgba(255,255,255,0.95)" }}>
              Modern tools and systems for smarter veterinary practices.
            </h2>
          </div>
          <div className="vettech-grid">
            <article className="vettech-card">
              <div className="vettech-icon">{pillarIcons.monitor}</div>
              <h3>Practice Management Software</h3>
              <p>Choose the right PIMS and supporting tools to streamline workflows and reduce daily friction.</p>
            </article>
            <article className="vettech-card">
              <div className="vettech-icon">{pillarIcons["bar-chart"]}</div>
              <h3>Analytics &amp; Reporting</h3>
              <p>Measure what matters — from new client acquisition to retention to marketing ROI.</p>
            </article>
            <article className="vettech-card">
              <div className="vettech-icon">{pillarIcons.target}</div>
              <h3>Automation &amp; Efficiency</h3>
              <p>Automate the repetitive parts of the client journey so your team can focus on patient care.</p>
            </article>
            <article className="vettech-card">
              <div className="vettech-icon">{pillarIcons.shield}</div>
              <h3>Client Experience Systems</h3>
              <p>Design the communication, reminders, and follow-up flows that build trust and loyalty.</p>
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
            <span className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>Next Step</span>
            <h2>What are your target metrics?</h2>
            <p>
              Let&apos;s find out what the numbers say about your market position, and plan the
              next six months of growth around measurable outcomes.
            </p>
          </div>
          <div className="final-cta-buttons">
            <AttractButton href="/consultation">
              Book Free Strategy Call
            </AttractButton>
            <Link className="button button-secondary button-dark" href="/consultation">
              Book a Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
