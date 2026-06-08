import Link from "next/link";
import {
  episodes,
  eventPanels,
  focusAreas,
  freeResources,
  hosts,
  listeningPlatforms,
  servicePillars,
  socialLinks,
  webinars,
} from "./lib/site-data";
import { withBasePath } from "./lib/base-path";
import SignalMarquee from "./components/SignalMarquee";
import HeroRedesign from "./components/HeroRedesign";
import ParallaxCard from "./components/ParallaxCard";
import AnimatedCounter from "./components/AnimatedCounter";
import AttractButton from "./components/AttractButton";
import { pillarIcons } from "./lib/pillar-icons";

const signalRows = [
  [
    {
      label: "Podcast",
      title: episodes[0].title,
      body: episodes[0].summary,
    },
    {
      label: "Event Panels",
      title: eventPanels[0].title,
      body: eventPanels[0].summary,
    },
    {
      label: "Webinars",
      title: webinars[0].title,
      body: webinars[0].summary,
    },
  ],
  focusAreas.map((item) => ({
    label: "Focus Area",
    title: item.title,
    body: item.body,
  })),
];

const reverseMarqueeItems = [
  "Veterinary Leadership",
  "Practice Growth",
  "Team Culture",
  "Marketing Strategy",
  "Client Experience",
  "Financial Resilience",
  "Staffing Models",
  "Operational Efficiency",
  "Digital Visibility",
  "Succession Planning",
];

function toIsoDate(value) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString().split("T")[0];
}

function toIsoDuration(value) {
  const parts = value.split(":").map((item) => Number.parseInt(item, 10));
  if (parts.some((item) => Number.isNaN(item))) {
    return undefined;
  }

  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return `PT${hours}H${minutes}M${seconds}S`;
  }

  if (parts.length === 2) {
    const [minutes, seconds] = parts;
    return `PT${minutes}M${seconds}S`;
  }

  return undefined;
}

export const metadata = {
  title: "Veterinary Business Institute | Podcast, Panels, and Practice Growth",
  description:
    "The VBI homepage built around podcasts, event panels, webinar replays, and veterinary growth strategy.",
};

export default function HomePage() {
  const featuredEpisode = episodes[0];
  const featuredHost = hosts[0];
  const featuredPanel = eventPanels[0];
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Veterinary Business Institute Home",
    description:
      "The VBI homepage organized around podcast episodes, event panel replays, webinars, and veterinary growth support.",
    hasPart: [
      {
        "@type": "PodcastEpisode",
        name: featuredEpisode.title,
        url: featuredEpisode.href,
        datePublished: toIsoDate(featuredEpisode.date),
      },
      {
        "@type": "VideoObject",
        name: featuredPanel.title,
        url: featuredPanel.href,
        uploadDate: toIsoDate(featuredPanel.date),
        duration: toIsoDuration(featuredPanel.duration),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <HeroRedesign />

      {/* ── About Veterinary Business Institute ── */}
      <section className="section section-about-vbi">
        <div className="about-vbi-ghost-word" aria-hidden="true">VETERINARY</div>
        <div className="container about-vbi-inner">
          <div className="about-vbi-copy">
            <span className="eyebrow text-accent">About Veterinary Business Institute</span>
            <h2 className="about-vbi-heading">
              Built for Veterinarians.<br />
              Powered by <em>Years</em><br />
              of <span className="outline-txt">Expertise.</span>
            </h2>
            <p className="about-vbi-lead">
              Veterinary Business Institute is the go-to resource hub for practice owners and
              veterinary leaders who want to grow smarter &mdash; not just work harder. We cover
              every dimension of running a successful practice: from podcasts and live event
              panels to practical strategies you can use today.
            </p>
            <p className="about-vbi-lead">
              Backed by Ekwa Marketing &mdash; a leading digital marketing agency trusted by
              16,000+ healthcare professionals &mdash; every guide, tool review, and podcast
              episode is grounded in real results from real veterinary practices.
            </p>
            <div className="button-row">
              <Link className="button button-primary" href="/about">
                Our Story &rarr;
              </Link>
              <AttractButton href="/consultation">
                Free Strategy Call
              </AttractButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── Marketing & SEO ── */}
      <section className="section section-marketing-seo">
        <div className="container marketing-seo-split">
          <div className="marketing-seo-copy">
            <span className="eyebrow text-accent">Marketing &amp; SEO</span>
            <h2>Get Found by More of the Right Pet Owners.</h2>
            <p>
              Most veterinary practice websites are invisible to Google. We help you fix that
              &mdash; with SEO, reputation management, and content marketing built specifically for
              veterinary practices.
            </p>
            <ul className="marketing-seo-list">
              <li>
                <div className="marketing-seo-check" aria-hidden="true">&#10003;</div>
                <div>
                  <strong>Veterinary SEO That Actually Works</strong>
                  <span>Service pages, local SEO, and technical audits that move you up fast.</span>
                </div>
              </li>
              <li>
                <div className="marketing-seo-check" aria-hidden="true">&#10003;</div>
                <div>
                  <strong>Reputation &amp; Review Management</strong>
                  <span>Build a 5-star presence across Google, Yelp, and pet-owner directories &mdash; automatically.</span>
                </div>
              </li>
              <li>
                <div className="marketing-seo-check" aria-hidden="true">&#10003;</div>
                <div>
                  <strong>Content &amp; Thought Leadership</strong>
                  <span>Articles, videos, and podcasts that position your practice as the local expert before pet owners call.</span>
                </div>
              </li>
              <li>
                <div className="marketing-seo-check" aria-hidden="true">&#10003;</div>
                <div>
                  <strong>Social Media for Veterinary Practices</strong>
                  <span>Platform-specific strategies that build trust with pet owners and actually fill your schedule.</span>
                </div>
              </li>
            </ul>
            <div className="button-row">
              <Link className="button button-primary" href="/marketing">
                Explore Marketing &rarr;
              </Link>
              <Link className="button button-secondary" href="/consultation">
                Book a Free Consultation
              </Link>
            </div>
          </div>
          <div className="marketing-seo-image">
            <img src={withBasePath("/assets/marketing-hero.png")} alt="Veterinary marketing strategy" />
            <div className="marketing-seo-image-badge">
              &#9733; Trusted by Veterinary Practices Nationwide
            </div>
          </div>
        </div>
      </section>

      {/* ── Podcast Episodes Grid ── */}
      <section className="section section-ep-photo">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">The Podcast</span>
            <h2 style={{ color: "rgba(255,255,255,0.95)" }}>
              Latest veterinary business episodes.
            </h2>
          </div>
          <div className="ep-photo-grid">
            {episodes.slice(0, 9).map((ep) => (
              <a
                key={ep.number}
                href={ep.href}
                target="_blank"
                rel="noreferrer"
                className="ep-photo-card"
              >
                <div className="ep-photo-thumb">
                  <img src={ep.image} alt={`Episode ${ep.number}`} />
                </div>
                <span className="ep-photo-badge">EPISODE {ep.number}</span>
                <h3>{ep.title}</h3>
                <p className="ep-photo-date">{ep.date}</p>
              </a>
            ))}
          </div>

          {/* Host spotlight inline row */}
          <div className="pod-host-row">
            <img className="pod-host-img" src={featuredHost.image} alt={featuredHost.name} />
            <div className="pod-host-info">
              <span className="pod-host-label">Your Host</span>
              <h3>{featuredHost.name}</h3>
              <p className="pod-host-role">{featuredHost.role}</p>
              <p className="pod-host-bio">{featuredHost.body}</p>
              <div className="pod-host-links">
                {socialLinks.slice(0, 2).map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="pod-host-pill">
                    {link.label}
                  </a>
                ))}
                <Link href="/guest-speaker" className="pod-host-pill pod-host-pill-accent">
                  Be a Guest &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Listen on platforms bar */}
          <div className="pod-platforms-row">
            <span className="pod-platforms-label">Listen on:</span>
            {listeningPlatforms.map((p) => (
              <a key={p.label} href={p.href} target="_blank" rel="noreferrer" className="pod-platform-pill">
                {p.label}
              </a>
            ))}
            <Link href="/podcast" className="button button-primary pod-platforms-cta">
              All Episodes &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Signal Marquee ── */}
      <SignalMarquee heading="The strongest VBI ideas now move across the site as one visual system." rows={signalRows} />

      {/* ── Ghost Text Stats Section ── */}
      <section className="section section-stats-ghost">
        <div className="ghost-text" aria-hidden="true">VBI</div>
        <div className="container stats-ghost-grid">
          <div className="stats-ghost-counters">
            <div className="ghost-counter-item">
              <AnimatedCounter end={103} suffix="+" />
              <p>Podcast episodes published with expert veterinary business insights</p>
            </div>
            <div className="ghost-counter-item">
              <AnimatedCounter end={12} />
              <p>Replay-ready event panels hosted on Vimeo with expert veterinary voices</p>
            </div>
            <div className="ghost-counter-item">
              <AnimatedCounter end={16000} suffix="+" duration={2500} />
              <p>Positive testimonials across the Ekwa marketing ecosystem</p>
            </div>
          </div>
          <div className="stats-ghost-copy">
            <span className="eyebrow text-accent">Built for Veterinary Leaders</span>
            <h2>Powered by Years of Veterinary Business Expertise.</h2>
            <p>
              VBI brings together podcast conversations, expert panel replays, webinar education,
              and strategic marketing support into one platform designed for practice owners,
              managers, and growth-minded veterinary teams.
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

      {/* ── Service Pillars Grid ── */}
      <section className="section section-muted">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">What We Cover</span>
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

      {/* ── VetTech Dark Glassmorphic Cards ── */}
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

      {/* ── Free Tools Teaser (DL tools-teaser equivalent) ── */}
      <section className="section tools-teaser-sec">
        <div className="container">
          <div className="tools-teaser-grid">
            {/* Left: copy */}
            <div className="tools-teaser-copy">
              <div className="tools-teaser-badge">
                <span className="tools-teaser-dot" /> Free Veterinary Tools
              </div>
              <span className="eyebrow text-accent">Templates &amp; Practical Resources</span>
              <h2 className="tools-teaser-heading">
                Numbers That<br />
                <em>Actually Work</em><br />
                for Veterinary Practices
              </h2>
              <p className="tools-teaser-lead">
                Specialized checklists, SOPs, and tracking worksheets built for how veterinary
                owners actually think &mdash; team KPIs, onboarding flows, compliance audits, and
                growth scorecards. Free access for veterinary professionals.
              </p>
              <div className="tools-teaser-lock-note">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="5" y="11" width="14" height="11" rx="2" stroke="#c6f800" strokeWidth="1.8" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="#c6f800" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="12" cy="16.5" r="1.5" fill="#c6f800" />
                </svg>
                <span>Quick sign-up with your name, practice &amp; email &mdash; then instant free access to every resource.</span>
              </div>
              <div className="button-row" style={{ marginTop: 28 }}>
                <Link className="button button-primary" href="/resources">
                  Explore All Tools &rarr;
                </Link>
                <Link className="button button-secondary" href="/community">
                  Sign Up Free
                </Link>
              </div>
            </div>

            {/* Right: tool preview cards */}
            <div className="tools-teaser-right">
              {freeResources.map((item, index) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`tool-preview-card ${index === 0 ? "featured" : ""}`}
                >
                  <div className="tool-preview-icon">{pillarIcons[item.icon]}</div>
                  <div className="tool-preview-name">{item.title}</div>
                  <div className="tool-preview-desc">{item.body}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="section section-final-cta">
        <div className="ghost-text ghost-text-cta" aria-hidden="true">VET</div>
        <div className="container final-cta-inner">
          <div className="final-cta-copy">
            <span className="eyebrow text-accent">Ready to Grow?</span>
            <h2 className="final-cta-heading">
              Stop Leaving Growth<br />
              on the <em>Table.</em>
            </h2>
            <p className="final-cta-sub">
              Book your free 30-minute strategy session. We&apos;ll audit your current marketing,
              show you exactly what&apos;s costing you new clients, and map out a clear plan to fix
              it &mdash; at no charge.
            </p>
          </div>
          <div className="final-cta-buttons">
            <AttractButton href="/consultation">
              Book Free Strategy Call &rarr;
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
