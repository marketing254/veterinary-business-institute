import Link from "next/link";
import { eventPanels, eventsSeed } from "../lib/site-data";
import SolarIcon from "../components/SolarIcon";
import LiveWebinarReplays from "../components/live/LiveWebinarReplays";
import LiveEventCard from "../components/live/LiveEventCard";

export const metadata = {
  title: "Webinars & Events | Veterinary Business Institute",
  description:
    "Free virtual panel events, masterclasses, and workshops for veterinary practice owners. Register for the next live panel or watch past webinar replays on demand.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Webinars & Events | Veterinary Business Institute",
    description:
      "Free virtual panel events, masterclasses, and workshops for veterinary practice owners. Register for the next live panel or watch past replays.",
    type: "website",
    url: "/events",
    images: ["/assets/og-cover.jpg"],
  },
};

const whyEvents = [
  {
    icon: "target",
    title: "Pre-Qualified Audiences",
    body: "Everyone who registers for a veterinary growth panel is already thinking about building their practice. You reach the most motivated segment of your market.",
  },
  {
    icon: "users",
    title: "Trust Before Contact",
    body: "Attendees who watch you present for 60 minutes already know, like, and trust you before they ever reach out. Conversion runs far higher than cold outreach.",
  },
  {
    icon: "video",
    title: "Evergreen Content",
    body: "Every panel is recorded and becomes permanent content — repurposed into podcast episodes, social clips, and blog posts for months afterward.",
  },
];

export default function EventsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="page-hero section-about-vbi community-hero blog-soon-hero">
        <div className="about-vbi-ghost-word" aria-hidden="true">EVENTS</div>
        <div className="container blog-soon-inner">
          <span className="community-hero-pill">Panel Events &amp; Webinars</span>
          <h1>
            Live Events That Position You as the{" "}
            <span className="outline-txt">Trusted Expert</span> in Your Market.
          </h1>
          <p className="hero-lead">
            Quarterly virtual panel events, workshops, and masterclasses — all free, all designed
            to give veterinary practice owners the edge in their local markets.
          </p>
          <div className="button-row blog-soon-cta">
            <a className="button button-primary" href="#reserve">
              Reserve My Free Spot &rarr;
            </a>
            <a className="button button-secondary" href="#replays">
              Watch Past Replays &rarr;
            </a>
          </div>
          <p className="evt-hero-note">
            Limited seats available — register early to secure your spot
          </p>
        </div>
      </section>

      {/* ── Next Live Event (from the events sheet) ── */}
      <LiveEventCard initial={eventsSeed} />

      {/* ── Webinar Replays (gated) ── */}
      <section className="section section-muted" id="replays">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">Webinar Replays</span>
            <h2>Watch Past Training Sessions.</h2>
            <p>
              On-demand panel recordings for veterinary practice owners who want practical growth
              ideas without waiting for the next live event.
            </p>
          </div>
          <LiveWebinarReplays initial={eventPanels} />
        </div>
      </section>

      {/* ── Why Events Work ── */}
      <section className="section evt-why">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">Why Events Work</span>
            <h2>Why Panel Events Are Your Highest-Converting Channel.</h2>
          </div>
          <div className="evt-why-grid">
            {whyEvents.map((c) => (
              <article className="evt-why-card" key={c.title}>
                <span className="evt-why-icon">
                  <SolarIcon name={c.icon} size={26} />
                </span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Host Your Own Event ── */}
      <section className="section section-muted evt-host">
        <div className="container evt-host-inner">
          <div className="evt-host-copy">
            <span className="eyebrow text-accent">Host Your Own Event</span>
            <h2>Want to host a panel event for your own practice network?</h2>
            <p>
              Our team provides the complete framework, promotional templates, speaker outreach
              scripts, and technical setup guidance so you can host events that fill your pipeline.
              Download our free Panel Event Framework and start planning your first event today.
            </p>
            <Link className="button button-primary" href="/resources">
              Download Free Framework &rarr;
            </Link>
          </div>
          <div className="evt-host-card">
            <span className="evt-host-card-icon">
              <SolarIcon name="bookOpen" size={28} />
            </span>
            <h3>Free Panel Event Framework</h3>
            <p>Complete run-of-show, checklists, and scripts — ready to use at your practice.</p>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="section res-next">
        <div className="container res-next-inner">
          <span className="eyebrow text-accent">Register for Our Next Event</span>
          <h2>Seats are limited and fill up quickly.</h2>
          <p>
            Register now to secure your place at the next VBI panel event — and get early access to
            the recording and resources. Registration closes once capacity is reached.
          </p>
          <a className="button button-primary" href="#reserve">
            Register for Free &rarr;
          </a>
        </div>
      </section>
    </>
  );
}
