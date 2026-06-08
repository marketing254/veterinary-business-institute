import { Calendar, Clock, Users } from "lucide-react";
import { withBasePath } from "../../../lib/base-path";
import {
  registrationEvents,
  registrationStats,
  testimonials,
} from "../../../lib/site-data";
import CountdownTimer from "../../../components/CountdownTimer";
import EventRegistrationForm from "../../../components/EventRegistrationForm";
import AnimatedCounter from "../../../components/AnimatedCounter";

function speakerInitials(name) {
  return name
    .replace(/,.*$/, "")
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export async function generateStaticParams() {
  return registrationEvents.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = registrationEvents.find((e) => e.slug === slug);
  if (!event) return { title: "Register" };
  return {
    title: `${event.title} | Free Live Panel | VBI`,
    description: event.description,
  };
}

export default async function EventRegisterPage({ params }) {
  const { slug } = await params;
  const event = registrationEvents.find((e) => e.slug === slug);

  if (!event) {
    return (
      <section className="section" style={{ textAlign: "center" }}>
        <div className="container">
          <h1>Event not found</h1>
          <p className="muted-text">The registration page you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </section>
    );
  }

  const eventDate = new Date(event.date);
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

  const usedTestimonials = event.testimonialIndices.map((i) => testimonials[i]);

  return (
    <>
      {/* ── Hero ── */}
      <section className="reg-hero">
        <div className="container">
          <div className="reg-hero-grid">
            {/* Left: event info */}
            <div className="reg-hero-copy">
              <div className="reg-badges">
                <span className="reg-badge reg-badge--live">
                  <span className="reg-live-dot" />
                  Live Webinar
                </span>
                <span className="reg-badge">
                  <Users size={13} strokeWidth={2.5} />
                  {event.speakers.length}-Speaker Expert Panel
                </span>
              </div>

              <h1 className="reg-headline">
                {event.titleAccent
                  ? <>
                      {event.title.replace(event.titleAccent, "")}
                      <em>{event.titleAccent}</em>
                    </>
                  : event.title}
              </h1>

              <p className="reg-description">{event.description}</p>

              <div className="reg-meta">
                <div className="reg-meta-item">
                  <Calendar size={16} />
                  <div>
                    <span className="reg-meta-label">Date</span>
                    <span>{displayDate}</span>
                  </div>
                </div>
                <div className="reg-meta-item">
                  <Clock size={16} />
                  <div>
                    <span className="reg-meta-label">Time</span>
                    <span>{displayTime}</span>
                  </div>
                </div>
                <div className="reg-meta-item">
                  <Users size={16} />
                  <div>
                    <span className="reg-meta-label">Format</span>
                    <span>{event.format}</span>
                  </div>
                </div>
              </div>

              <CountdownTimer targetDate={event.date} />
            </div>

            {/* Right: registration form */}
            <EventRegistrationForm eventSlug={event.slug} eventTitle={event.title} />
          </div>
        </div>
      </section>

      {/* ── Speakers ── */}
      <section className="section reg-speakers-section">
        <div className="container">
          <div className="section-heading" style={{ textAlign: "center", margin: "0 auto 34px" }}>
            <span className="eyebrow text-accent">Meet the Panel</span>
            <h2>{event.speakers.length} Leaders, 1 Conversation</h2>
            <p style={{ maxWidth: "54ch", margin: "0 auto" }}>
              Each panelist brings a different lens — from marketing to clinical operations to practice growth strategy.
            </p>
          </div>
          <div className="reg-speakers-grid">
            {event.speakers.map((s) => (
              <div key={s.name} className="reg-speaker-card">
                <div className="reg-speaker-avatar">
                  {s.image ? (
                    <img src={s.image} alt={s.name} width={100} height={100} loading="lazy" />
                  ) : (
                    <span className="reg-speaker-initials" aria-hidden="true">
                      {speakerInitials(s.name)}
                    </span>
                  )}
                </div>
                <h3 className="reg-speaker-name">{s.name}</h3>
                <span className="reg-speaker-role">{s.role}</span>
                <p className="reg-speaker-bio">{s.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Agenda ── */}
      <section className="section section-muted">
        <div className="container">
          <div className="section-heading" style={{ textAlign: "center", margin: "0 auto 34px" }}>
            <span className="eyebrow text-accent">Panel Agenda</span>
            <h2>What We&apos;ll Cover</h2>
          </div>
          <div className="reg-agenda-grid">
            {event.discussionPoints.map((point, i) => (
              <div key={i} className="reg-agenda-card">
                <span className="reg-agenda-number">{i + 1}</span>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "6px" }}>
                    {point.title}
                  </h3>
                  <p style={{ color: "var(--ink-500)", lineHeight: 1.7, fontSize: "0.95rem" }}>
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Audience ── */}
      <section className="section">
        <div className="container">
          <div className="section-heading" style={{ textAlign: "center", margin: "0 auto 34px" }}>
            <span className="eyebrow text-accent">Is This For You?</span>
            <h2>This Panel Is Built For</h2>
          </div>
          <div className="reg-audience-grid">
            {event.audience.map((a) => (
              <div key={a.title} className="reg-audience-card">
                <span className="reg-audience-icon">{a.icon}</span>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "6px" }}>
                  {a.title}
                </h3>
                <p style={{ color: "var(--ink-500)", lineHeight: 1.7, fontSize: "0.95rem" }}>
                  {a.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="reg-stats-bar">
        <div className="container">
          <div className="reg-stats-grid">
            {registrationStats.map((s) => (
              <div key={s.label} className="reg-stat">
                <span className="reg-stat-value">
                  <AnimatedCounter end={s.value} suffix={s.suffix} />
                </span>
                <span className="reg-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      {usedTestimonials.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-heading" style={{ textAlign: "center", margin: "0 auto 34px" }}>
              <span className="eyebrow text-accent">What Attendees Say</span>
              <h2>Trusted by Veterinary Leaders</h2>
            </div>
            <div className="reg-testimonials-grid">
              {usedTestimonials.map((t, i) => (
                <div key={i} className="reg-testimonial-card">
                  <div className="reg-testimonial-stars">
                    {Array.from({ length: t.rating }, (_, j) => (
                      <span key={j}>&#9733;</span>
                    ))}
                  </div>
                  <p className="reg-testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
                  <div className="reg-testimonial-author">
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Final CTA ── */}
      <section className="reg-final-cta">
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#fff", marginBottom: "16px" }}>
            {event.speakers.length} Experts. 60 Minutes. Strategies You Can Use Monday.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", maxWidth: "48ch", margin: "0 auto 28px", lineHeight: 1.7 }}>
            {event.speakers.length} veterinary experts break down what&apos;s actually working in 2026.
            Register now — it&apos;s free and the replay is included.
          </p>
          <a href="#registration-form" className="reg-cta-button">
            Register Free Now &rarr;
          </a>
        </div>
      </section>

      {/* ── Schema ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: event.title,
            description: event.description,
            startDate: event.date,
            eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            location: {
              "@type": "VirtualLocation",
              url: `https://veterinarybusinessinstitute.com/events/${event.slug}/register`,
            },
            organizer: {
              "@type": "Organization",
              name: "Veterinary Business Institute",
              url: "https://veterinarybusinessinstitute.com",
            },
            performer: event.speakers.map((s) => ({
              "@type": "Person",
              name: s.name,
              jobTitle: s.role,
            })),
            isAccessibleForFree: true,
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
          }),
        }}
      />
    </>
  );
}
