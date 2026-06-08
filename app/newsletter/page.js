import Link from "next/link";
import NewsletterForm from "../components/NewsletterForm";
import SignalMarquee from "../components/SignalMarquee";
import AnimatedCounter from "../components/AnimatedCounter";
import AttractButton from "../components/AttractButton";
import ParallaxCard from "../components/ParallaxCard";
import { withBasePath } from "../lib/base-path";
import { pillarIcons } from "../lib/pillar-icons";
import {
  contactDetails,
  episodes,
  eventPanels,
  focusAreas,
  servicePillars,
  webinars,
} from "../lib/site-data";

export const metadata = {
  title: "Newsletter Integration | Veterinary Business Institute",
  description: "Subscribe to the VBI Newsletter for recurring practice growth insights.",
};

const signalRows = [
  [
    { label: "Podcast", title: episodes[0].title, body: episodes[0].summary },
    { label: "Event Panels", title: eventPanels[0].title, body: eventPanels[0].summary },
    { label: "Webinars", title: webinars[0].title, body: webinars[0].summary },
  ],
  focusAreas.map((item) => ({ label: "Focus Area", title: item.title, body: item.body })),
];

const reverseMarqueeItems = [
  "Weekly Digest",
  "Podcast Drops",
  "Panel Invites",
  "Webinar Replays",
  "Leadership Notes",
  "Marketing Briefs",
  "Growth Ideas",
  "Exclusive Content",
];

export default function NewsletterPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow text-accent">VBI Newsletter</span>
            <h1>
              Build a stronger <em>foundation.</em>
            </h1>
            <p className="hero-lead">
              Our automated email sequences and recurring newsletters deliver
              no-fluff veterinary business ideas, podcast summaries, and
              exclusive event invites straight to your inbox.
            </p>
          </div>
        </div>
      </section>

      {/* ── Signal Marquee ── */}
      <SignalMarquee heading="One subscription plugs you into every VBI channel." rows={signalRows} />

      {/* ── Ghost Text Stats ── */}
      <section className="section section-stats-ghost">
        <div className="ghost-text" aria-hidden="true">INBOX</div>
        <div className="container stats-ghost-grid">
          <div className="stats-ghost-counters">
            <div className="ghost-counter-item">
              <AnimatedCounter end={103} suffix="+" />
              <p>Podcast episodes summarized and surfaced through the newsletter</p>
            </div>
            <div className="ghost-counter-item">
              <AnimatedCounter end={12} />
              <p>Replay-ready event panels with subscriber-only early access</p>
            </div>
            <div className="ghost-counter-item">
              <AnimatedCounter end={16000} suffix="+" duration={2500} />
              <p>Positive testimonials across the Ekwa marketing ecosystem</p>
            </div>
          </div>
          <div className="stats-ghost-copy">
            <span className="eyebrow text-accent">Signal, Not Noise</span>
            <h2>A newsletter veterinarians actually open.</h2>
            <p>
              The VBI newsletter is written for busy practice leaders. Each issue is short,
              tactical, and tied to a specific podcast episode, panel, or webinar you can act on.
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

      {/* ── Newsletter Signup (kept as primary) ── */}
      <section className="section">
        <div className="container split-grid">
          <div className="section-copy">
            <span className="eyebrow text-accent">Newsletter Strategy</span>
            <h2>What happens after you subscribe?</h2>
            <p>Our automated sequence is designed not to spam, but to educate.</p>
            <ul className="check-list" style={{ marginTop: "1.5rem" }}>
              <li><strong>Weekly Summaries</strong> detailing our latest podcast drops.</li>
              <li><strong>Leadership Guides</strong> breaking down operations and culture.</li>
              <li><strong>Early Access</strong> to panels and webinar registration.</li>
            </ul>
          </div>

          <div className="form-wrapper">
            <NewsletterForm email={contactDetails[2].label} dark={true} />
            <p className="muted-text" style={{ marginTop: "1.5rem", fontSize: "0.85rem", textAlign: "center" }}>
              Your email is secure. Review our <Link href="/privacy-policy" style={{ textDecoration: "underline" }}>Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ── 8-Pillar Grid ── */}
      <section className="section section-muted">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">What You&apos;ll Read About</span>
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
            <img src={withBasePath("/assets/webinar-mar26.jpg")} alt="Veterinary newsletter insights" />
            <div className="marketing-split-badge">
              Newsletter Insights Backed By Real Audits
            </div>
          </div>
          <div className="marketing-split-copy">
            <span className="eyebrow text-accent">Where The Ideas Come From</span>
            <h2>Every issue starts with what we learned this month.</h2>
            <p>
              Newsletter topics are shaped by the same conversations powering the podcast and
              panels — plus the patterns our Ekwa marketing team sees in audits across practices.
            </p>
            <ul className="check-list">
              <li>Summaries of the strongest podcast episodes each month</li>
              <li>Short essays on leadership, operations, and client experience</li>
              <li>Early access to new event panels and webinar sessions</li>
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
            <h2>Subscribe now, then plan the next move.</h2>
            <p>
              The newsletter handles your ongoing education. A free strategy call handles the
              specific, tactical questions your clinic is facing right now.
            </p>
          </div>
          <div className="final-cta-buttons">
            <AttractButton href="/consultation">
              Book Free Strategy Call
            </AttractButton>
            <Link className="button button-secondary button-dark" href="/podcast">
              Listen to the Podcast
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
