import Link from "next/link";
import AnimatedCounter from "../components/AnimatedCounter";
import BookingCalendar from "../components/BookingCalendar";
import SolarIcon from "../components/SolarIcon";
import { withBasePath } from "../lib/base-path";

export const metadata = {
  title: "Book a Free Marketing Strategy Meeting | Veterinary Business Institute",
  description:
    "Schedule a free 60-minute marketing strategy meeting. Our team will invest 4–5 hours preparing a customised plan for your veterinary practice.",
};

const processSteps = [
  {
    number: "1",
    title: "Submit Your Request",
    body: "Fill out the short form above with your practice details, location, and biggest marketing challenge. Takes less than 2 minutes.",
    tag: "Takes ~2 minutes",
  },
  {
    number: "2",
    title: "We Do the Homework",
    body: "Our team researches your website, Google rankings, reviews, social presence, and top competitors in your market — before we even meet.",
    tag: "We do the research",
  },
  {
    number: "3",
    title: "Your Strategy Session",
    body: "A 30-minute video call with a senior Ekwa specialist. You'll leave with a clear, actionable marketing roadmap customized for your practice.",
    tag: "30-min video call",
  },
];

const learnPoints = [
  {
    title: "Where You're Losing Clients Online",
    body: "We show you the specific gaps in your digital presence that are costing you new clients right now.",
  },
  {
    title: "Your Exact Keyword Opportunities",
    body: "The exact searches local pet owners are making that your practice isn't currently ranking for — and how to capture them.",
  },
  {
    title: "How Your Competitors Are Winning",
    body: "A real breakdown of what the top-ranked practices in your area are doing — and how to outperform them.",
  },
  {
    title: "Your 90-Day Quick-Win Plan",
    body: "Three to five specific actions you can take in the next 90 days to start booking more appointments.",
  },
  {
    title: "Long-Term Growth Strategy",
    body: "A 12-month marketing roadmap that builds sustainable client flow and practice authority in your local market.",
  },
];

const ekwaPoints = [
  "Exclusively focused on healthcare and veterinary marketing",
  "No long-term contracts required",
  "A dedicated account manager for every practice",
  "Transparent reporting — you always know what we're doing",
  "A proven track record across thousands of campaigns",
  "Full-service: SEO, PPC, social, web design & content",
];

const consultTestimonials = [
  {
    quote:
      "The strategy session was eye-opening. They showed me exactly which searches I wasn't ranking for and why. Within six months of following their plan, our new client bookings doubled.",
    name: "Dr. Sarah M.",
    role: "Practice Owner, Austin TX",
    initials: "SM",
  },
  {
    quote:
      "I was skeptical of 'free consultations,' but this was different. No sales pitch — just real, actionable insight I could put to work the very next day.",
    name: "Dr. Linda K.",
    role: "Clinic Director, Denver CO",
    initials: "LK",
  },
  {
    quote:
      "Ekwa's team genuinely understood the veterinary market. They came prepared, knew our area, and identified three growth opportunities we'd completely missed.",
    name: "Dr. Michael T.",
    role: "Managing Partner, Columbus OH",
    initials: "MT",
  },
];

const heroPoints = [
  {
    icon: "globe",
    title: "Full Digital Presence Audit",
    body: "We review your website, local SEO, Google Business Profile, reviews, and social media presence — and tell you exactly what's working and what isn't.",
  },
  {
    icon: "target",
    title: "Competitive Analysis",
    body: "We analyze your top local competitors — what keywords they rank for, how they convert, and where you have the opportunity to outrank them.",
  },
  {
    icon: "barChart",
    title: "Customized Growth Roadmap",
    body: "You leave with a prioritized, actionable marketing plan specific to your practice area, geography, and growth stage — not a generic template.",
  },
  {
    icon: "checkCircle",
    title: "No Sales Pitch. No Pressure.",
    body: "This is a genuine strategy session. If we're a good fit, great — but there's no obligation to work with us and no hard sell. Just honest, expert advice.",
  },
];

export default function ConsultationPage() {
  return (
    <>
      {/* ── Hero (kept) ── */}
      <section className="consult-page-hero">
        <div className="about-vbi-ghost-word" aria-hidden="true">STRATEGY</div>
        <div className="container">
          <div className="consult-hero-grid">
            <div className="consult-hero-inner">
              <span className="consult-hero-pill">Free &middot; 60 Minutes &middot; No Commitments</span>
              <h1 className="consult-hero-h1">
                The only <em>strategy meeting</em> needed for your <span className="outline-txt">veterinary practice.</span>
                <span className="free-pop" role="img" aria-label="Totally free">
                  <span className="free-pop-spark" aria-hidden="true">&#10022;</span>
                  100% Free
                </span>
              </h1>
              <p className="consult-hero-sub">
                Learn how you can leverage digital marketing to grow your
                veterinary practice — at no cost, with no commitments attached.
              </p>
              <div className="consult-hero-badge">
                <div className="consult-badge-left">
                  <span className="consult-badge-num">4–5</span>
                  <span className="consult-badge-unit">hours</span>
                </div>
                <p className="consult-badge-text">
                  Lila Stone &amp; her team invest 4–5 hours preparing a
                  customised marketing plan for your practice <strong>before</strong> the call.
                </p>
              </div>

              <ul className="consult-hero-points">
                {heroPoints.map((point) => (
                  <li key={point.title}>
                    <span className="consult-hero-point-icon" aria-hidden="true">
                      <SolarIcon name={point.icon} size={18} />
                    </span>
                    <div className="consult-hero-point-text">
                      <strong>{point.title}</strong>
                      <span>{point.body}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <BookingCalendar />
          </div>
        </div>
      </section>

      {/* ── 3-Step Process ── */}
      <section className="section consult-process">
        <div className="container">
          <div className="consult-process-head">
            <span className="eyebrow text-accent">Simple 3-Step Process</span>
            <h2 className="consult-process-title">From Request to Roadmap in 48 Hours</h2>
            <p className="consult-process-sub">
              We make it easy. Book in under 2 minutes, then let us do the
              research. You show up ready to grow.
            </p>
          </div>
          <div className="consult-process-grid">
            {processSteps.map((step) => (
              <div className="consult-process-card" key={step.number}>
                <span className="consult-process-num">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <span className="consult-process-tag">
                  <span aria-hidden="true">&rarr;</span> {step.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What You'll Learn ── */}
      <section className="section consult-learn">
        <div className="container">
          <div className="consult-learn-grid">
            <div className="consult-learn-media">
              <div className="consult-learn-image">
                <img
                  src={withBasePath("/assets/about-team.jpg")}
                  alt="Veterinarian holding a cat during a check-up"
                />
              </div>
              <div className="consult-learn-badge">
                <span className="consult-learn-badge-icon" aria-hidden="true">
                  <SolarIcon name="checkCircle" size={20} />
                </span>
                <div className="consult-learn-badge-text">
                  <strong>Personalized to Your Practice</strong>
                  <span>Not a generic template</span>
                </div>
              </div>
            </div>

            <div className="consult-learn-content">
              <span className="eyebrow text-accent">What&rsquo;s Covered</span>
              <h2 className="consult-learn-title">What You&rsquo;ll Learn in Your Session</h2>
              <ul className="consult-learn-list">
                {learnPoints.map((point) => (
                  <li key={point.title}>
                    <span className="consult-learn-check" aria-hidden="true">
                      <SolarIcon name="checkCircle" size={18} />
                    </span>
                    <div>
                      <strong>{point.title}</strong>
                      <span>{point.body}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Credibility bar + Testimonials ── */}
      <section className="section consult-proof">
        <div className="container">
          <div className="consult-proof-bar">
            <div className="consult-proof-stat consult-proof-brand">
              <span className="consult-proof-brand-title">
                Veterinary Practices
                <span className="consult-proof-brand-check" aria-hidden="true">
                  <SolarIcon name="checkCircle" size={18} />
                </span>
              </span>
              <span className="consult-proof-label">Helped by the Ekwa team</span>
            </div>
            <div className="consult-proof-stat">
              <span className="consult-proof-num">
                <AnimatedCounter end={98} suffix="%" />
              </span>
              <span className="consult-proof-label">Client Satisfaction Rate</span>
            </div>
            <div className="consult-proof-stat">
              <span className="consult-proof-num">4.9<span className="consult-proof-star">&#9733;</span></span>
              <span className="consult-proof-label">Average Review Score</span>
            </div>
            <div className="consult-proof-stat">
              <span className="consult-proof-num">
                <AnimatedCounter end={16} suffix="+" />
              </span>
              <span className="consult-proof-label">Years of Marketing Experience</span>
            </div>
          </div>

          <div className="consult-proof-grid">
            {consultTestimonials.map((t) => (
              <figure className="consult-proof-card" key={t.name}>
                <div className="consult-proof-stars" aria-label="5 out of 5 stars">
                  {"★★★★★"}
                </div>
                <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="consult-proof-author">
                  <span className="consult-proof-avatar" aria-hidden="true">{t.initials}</span>
                  <span className="consult-proof-author-text">
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Team Behind (Powered by Ekwa) ── */}
      <section className="section consult-team">
        <div className="container">
          <div className="consult-team-grid">
            <div className="consult-team-content">
              <span className="eyebrow text-accent">Who We Are</span>
              <h2 className="consult-team-title">
                The Team Behind <em>Your Growth.</em>
              </h2>
              <p className="consult-team-poweredby">
                <span>Powered by</span>
                <strong>Ekwa Marketing</strong>
              </p>
              <p className="consult-team-body">
                Ekwa Marketing is a specialized digital marketing agency dedicated to
                veterinary practices. With over 16 years of experience, we&rsquo;ve helped
                practices across North America build dominant online presences, generate
                consistent client flow, and grow profitable, thriving clinics.
              </p>
              <ul className="consult-team-list">
                {ekwaPoints.map((point) => (
                  <li key={point}>
                    <span className="consult-team-check" aria-hidden="true">
                      <SolarIcon name="checkCircle" size={18} />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="consult-team-buttons">
                <Link href="/about" className="button button-primary">
                  Learn More About Ekwa
                </Link>
                <Link href="/case-studies" className="button button-secondary">
                  Read Client Reviews
                </Link>
              </div>
            </div>

            <div className="consult-team-media">
              <div className="consult-team-image">
                <img
                  src={withBasePath("/assets/about-speaker.jpg")}
                  alt="Veterinary professional examining a dog during a check-up"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
