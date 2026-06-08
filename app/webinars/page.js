import Link from "next/link";
import { withBasePath } from "../lib/base-path";
import { pillarIcons } from "../lib/pillar-icons";
import {
  eventPanels,
  focusAreas,
  servicePillars,
  webinarArchiveLink,
  webinars,
} from "../lib/site-data";
import SignalMarquee from "../components/SignalMarquee";
import ParallaxCard from "../components/ParallaxCard";
import AnimatedCounter from "../components/AnimatedCounter";
import AttractButton from "../components/AttractButton";

const signalRows = [
  [
    { label: "Webinar", title: webinars[0].title, body: webinars[0].summary },
    { label: "Webinar", title: webinars[1].title, body: webinars[1].summary },
    { label: "Webinar", title: webinars[2].title, body: webinars[2].summary },
  ],
  focusAreas.map((item) => ({
    label: "Focus Area",
    title: item.title,
    body: item.body,
  })),
];

const reverseMarqueeItems = [
  "Replay Library",
  "Strategic Planning",
  "Team Culture",
  "Client Care",
  "Financial Resilience",
  "Marketing Systems",
  "Technology Stack",
  "Succession Planning",
  "Leadership Habits",
  "Growth Strategy",
];

export const metadata = {
  title: "Webinars | Veterinary Business Institute",
  description:
    "Browse replay-ready veterinary webinars focused on leadership, resilience, technology, marketing, and practice growth.",
};

export default function WebinarsPage() {
  const featuredReplay = webinars[0];
  const relatedPanel = eventPanels[1];

  return (
    <>
      <section className="page-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow text-accent">Replay Library</span>
            <p className="hero-kicker">Replay-ready education for teams working on resilience, growth, and performance.</p>
            <h1>
              Webinar replays for practices building a more <em>resilient future.</em>
            </h1>
            <p className="hero-lead">
              This replay library is designed to keep teaching after the live session ends, with
              stronger summaries, clearer priorities, and an easier path into related VBI content.
            </p>
            <div className="button-row">
              <Link className="button button-primary" href="/webinars/registration">
                Register for Next Live Session
              </Link>
              <a className="button button-secondary" href={featuredReplay.href} target="_blank" rel="noreferrer">
                Watch Featured Replay
              </a>
            </div>
          </div>

          <div className="image-frame">
            <img src={featuredReplay.image} alt={featuredReplay.title} />
          </div>
        </div>
      </section>

      {/* ── Signal Marquee ── */}
      <SignalMarquee heading="The webinar library now moves across the page as one editorial system." rows={signalRows} />

      {/* ── Ghost Text Stats ── */}
      <section className="section section-stats-ghost">
        <div className="ghost-text" aria-hidden="true">REPLAY</div>
        <div className="container stats-ghost-grid">
          <div className="stats-ghost-counters">
            <div className="ghost-counter-item">
              <AnimatedCounter end={webinars.length} suffix="+" />
              <p>Webinar replays available on demand with summaries and direct links</p>
            </div>
            <div className="ghost-counter-item">
              <AnimatedCounter end={90} suffix=" min" />
              <p>Average replay runtime packed with frameworks veterinary teams can apply immediately</p>
            </div>
            <div className="ghost-counter-item">
              <AnimatedCounter end={16000} suffix="+" duration={2500} />
              <p>Positive testimonials referenced across the broader Ekwa marketing ecosystem</p>
            </div>
          </div>
          <div className="stats-ghost-copy">
            <span className="eyebrow text-accent">Built for Veterinary Leaders</span>
            <h2>An on-demand education library built for veterinary teams.</h2>
            <p>
              Every webinar is designed to keep teaching after the live session ends. Watch alone,
              share with your team, and turn the frameworks into practice decisions.
            </p>
            <div className="button-row">
              <a className="button button-primary" href={webinarArchiveLink} target="_blank" rel="noreferrer">
                Open Live Archive
              </a>
              <AttractButton href="/consultation">
                Free Strategy Call
              </AttractButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8 Pillars Grid ── */}
      <section className="section section-muted">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">What Replays Cover</span>
            <h2>Eight themes our webinar library returns to every quarter.</h2>
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

      {/* ── Featured Replay Dark (existing primary) ── */}
      <section className="section section-dark">
        <div className="container">
          <article className="card card-dark feature-panel">
            <div className="panel-head">
              <span className="eyebrow text-accent">Featured Replay</span>
              <span className="meta-text">{featuredReplay.date}</span>
            </div>
            <div className="media-panel">
              <img src={featuredReplay.image} alt={featuredReplay.title} />
              <div>
                <h2>{featuredReplay.title}</h2>
                <p>{featuredReplay.summary}</p>
                <ul className="check-list">
                  <li>Marketing and visibility decisions that support growth.</li>
                  <li>Technology choices that improve the operating system of the practice.</li>
                  <li>Team productivity and financial resilience as linked decisions.</li>
                </ul>
                <div className="button-row">
                  <a className="button button-primary" href={featuredReplay.href} target="_blank" rel="noreferrer">
                    Watch Replay
                  </a>
                  <Link className="button button-secondary button-dark" href="/marketing">
                    Review the Marketing Offer
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ── Marketing Split ── */}
      <section className="section">
        <div className="container marketing-split">
          <div className="marketing-split-image">
            <img src={withBasePath("/assets/webinar-feb19.jpg")} alt="Veterinary webinar replay" />
            <div className="marketing-split-badge">
              Replay-First Education
            </div>
          </div>
          <div className="marketing-split-copy">
            <span className="eyebrow text-accent">Built to Keep Teaching</span>
            <h2>Replay-ready content your team can watch on their schedule.</h2>
            <p>
              VBI webinars are designed so the education does not expire the moment the live session
              ends. Each replay comes with summaries, frameworks, and links into deeper content.
            </p>
            <ul className="check-list">
              <li>Structured summaries that let teams scan before watching</li>
              <li>Frameworks that survive the transition from live to replay viewing</li>
              <li>Direct routes into panel discussions and podcast episodes on related topics</li>
              <li>A clean handoff into strategy conversations when the team is ready</li>
            </ul>
            <div className="button-row">
              <Link className="button button-primary" href="/marketing">
                Explore Marketing
              </Link>
              <Link className="button button-secondary" href="/events">
                Go to Event Panels
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Webinar Archive (primary content) ── */}
      <section className="section section-muted">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow text-accent">Archive</span>
            <h2>Recent VBI sessions grouped as a replay library, not a dated list.</h2>
          </div>
          <div className="grid-two">
            {webinars.map((item) => (
              <article className="card archive-card" key={item.title}>
                <img src={item.image} alt={item.title} />
                <span className="card-label">{item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <a href={item.href} target="_blank" rel="noreferrer">
                  Open Replay
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3-Card Practice Mgmt Row ── */}
      <section className="section">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">Replay Themes</span>
            <h2>Three areas our webinar library returns to most often.</h2>
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

      {/* ── 4-Card Dark VetTech ── */}
      <section className="section section-dark section-vettech">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">VetTech &amp; Systems</span>
            <h2 style={{ color: "rgba(255,255,255,0.95)" }}>
              Replay topics that help teams pick the right tools and systems.
            </h2>
          </div>
          <div className="vettech-grid">
            <article className="vettech-card">
              <div className="vettech-icon">{pillarIcons.monitor}</div>
              <h3>Practice Management Software</h3>
              <p>Replays on choosing a PIMS and supporting tools to streamline workflows.</p>
            </article>
            <article className="vettech-card">
              <div className="vettech-icon">{pillarIcons["bar-chart"]}</div>
              <h3>Analytics &amp; Reporting</h3>
              <p>Sessions on measuring acquisition, retention, and marketing ROI with discipline.</p>
            </article>
            <article className="vettech-card">
              <div className="vettech-icon">{pillarIcons.target}</div>
              <h3>Automation &amp; Efficiency</h3>
              <p>Replays on automating the repetitive parts of the client journey and team workflow.</p>
            </article>
            <article className="vettech-card">
              <div className="vettech-icon">{pillarIcons.shield}</div>
              <h3>Client Experience Systems</h3>
              <p>Webinars on communication, reminders, and follow-up flows that build loyalty.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ── Related Event Panel ── */}
      <section className="section">
        <div className="container split-grid">
          <article className="card">
            <span className="eyebrow text-accent">Related Event Panels</span>
            <h2>Panels give the replay system a more current, recurring cadence.</h2>
            <p>
              Webinar replays remain valuable, but the Vimeo panel series adds more frequent topic
              coverage. That helps VBI feel active between larger webinar moments.
            </p>
            <div className="button-row">
              <Link className="button button-primary" href="/events">
                Explore All Panels
              </Link>
              <a className="button button-secondary" href={relatedPanel.href} target="_blank" rel="noreferrer">
                Watch a Featured Panel
              </a>
            </div>
          </article>

          <article className="card archive-card">
            <img src={relatedPanel.image} alt={relatedPanel.title} />
            <span className="card-label">{relatedPanel.date}</span>
            <h3>{relatedPanel.title}</h3>
            <p>{relatedPanel.summary}</p>
          </article>
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
        <div className="ghost-text ghost-text-cta" aria-hidden="true">REPLAY</div>
        <div className="container final-cta-inner">
          <div className="final-cta-copy">
            <span className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>Next Step</span>
            <h2>Replays are the start. Strategy is the next step.</h2>
            <p>
              Use the library to educate your team, then move into a strategy conversation when
              your practice is ready for sharper visibility, stronger systems, and growth planning.
            </p>
          </div>
          <div className="final-cta-buttons">
            <AttractButton href="/consultation">
              Book Free Strategy Call
            </AttractButton>
            <Link className="button button-secondary button-dark" href="/webinars/registration">
              Register for Next Live Session
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
