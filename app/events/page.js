import Link from "next/link";
import { eventPanels, registrationEvents } from "../lib/site-data";
import SolarIcon from "../components/SolarIcon";
import CountdownTimer from "../components/CountdownTimer";
import LiveWebinarReplays from "../components/live/LiveWebinarReplays";

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

const nextEvent = registrationEvents[0];

const eventDate = new Date(nextEvent.date);
const displayDate = eventDate.toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});
const displayTime = eventDate.toLocaleTimeString("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZoneName: "short",
});

const registerHref = `/events/${nextEvent.slug}/register`;

const upcomingEvents = registrationEvents.slice(1).map((e) => {
  const d = new Date(e.date);
  return {
    slug: e.slug,
    day: d.toLocaleDateString("en-US", { day: "2-digit", timeZone: "America/New_York" }),
    month: d.toLocaleDateString("en-US", { month: "long", timeZone: "America/New_York" }),
    title: e.title,
    panelists: e.speakers.map((s) => s.name).join(" · "),
    note: e.confirmation || "Limited seats · Register early",
  };
});

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

function initials(name) {
  return name
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

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
            <Link className="button button-primary" href={registerHref}>
              Reserve My Free Spot &rarr;
            </Link>
            <a className="button button-secondary" href="#replays">
              Watch Past Replays &rarr;
            </a>
          </div>
          <p className="evt-hero-note">
            Limited seats available — register early to secure your spot
          </p>
        </div>
      </section>

      {/* ── Next Event + countdown ── */}
      <section className="section section-muted evt-next">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">Next Event</span>
            <h2>{nextEvent.title}</h2>
          </div>

          <div className="evt-next-grid">
            <div className="evt-next-card">
              <div className="evt-next-meta">
                <span><SolarIcon name="calendar" size={16} /> {displayDate}</span>
                <span><SolarIcon name="star" size={16} /> {displayTime}</span>
                <span className="evt-next-free">Virtual &middot; Free</span>
              </div>
              <p className="evt-next-desc">{nextEvent.description}</p>
              <h3 className="evt-cover-heading">What We&apos;ll Cover</h3>
              <ul className="evt-cover-list">
                {nextEvent.discussionPoints.map((point) => (
                  <li key={point.title}>
                    <SolarIcon name="checkCircle" size={18} />
                    <span>{point.title}</span>
                  </li>
                ))}
              </ul>
              <Link className="button button-primary" href={registerHref}>
                Reserve My Free Spot Now &rarr;
              </Link>
              <p className="evt-next-fineprint">
                Secure registration · Zoom link sent instantly · No credit card required
              </p>
            </div>

            <aside className="evt-countdown-card">
              <span className="evt-countdown-label">Event Starts In</span>
              <CountdownTimer targetDate={nextEvent.date} />
              <div className="evt-panelists">
                <span className="evt-panelists-title">Panelists</span>
                <div className="evt-panelists-row">
                  {nextEvent.speakers.map((s) => (
                    <div className="evt-panelist" key={s.name}>
                      <span className="evt-panelist-avatar">{initials(s.name)}</span>
                      <span className="evt-panelist-name">{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── More Upcoming Events ── */}
      <section className="section evt-upcoming">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">More Upcoming Events</span>
            <h2>Already on the Calendar.</h2>
          </div>
          <div className="evt-upcoming-grid">
            {upcomingEvents.map((e) => (
              <article className="evt-upcoming-card" key={e.slug}>
                <div className="evt-upcoming-date">
                  <span className="evt-upcoming-day">{e.day}</span>
                  <span className="evt-upcoming-month">{e.month}</span>
                </div>
                <div className="evt-upcoming-body">
                  <h3>{e.title}</h3>
                  <p className="evt-upcoming-panelists">{e.panelists}</p>
                  <span className="evt-upcoming-note">{e.note}</span>
                  <Link className="evt-upcoming-link" href={`/events/${e.slug}/register`}>
                    Reserve Spot &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

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
          <Link className="button button-primary" href={registerHref}>
            Register for Free &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
