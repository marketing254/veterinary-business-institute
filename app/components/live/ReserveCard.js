"use client";

import CountdownTimer from "../CountdownTimer";

function initials(name) {
  return String(name || "")
    .replace(/,.*$/, "")
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function points(description) {
  return String(description || "")
    .split(/\r?\n+/)
    .map((s) => s.replace(/^[✅✓•\-\s]+/, "").trim())
    .filter(Boolean);
}

// Build a target timestamp from a date cell (ISO "2026-06-30" or US "6/10/2026")
// plus the start time parsed out of the time cell ("8:00 PM to 9:00 PM EDT").
export function eventDateTime(ev) {
  if (!ev || !ev.dateIso) return null;
  const base = new Date(ev.dateIso);
  if (Number.isNaN(base.getTime())) return null;
  const m = String(ev.time || "").match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (m) {
    let h = parseInt(m[1], 10) % 12;
    if (/PM/i.test(m[3])) h += 12;
    base.setHours(h, parseInt(m[2], 10), 0, 0);
  } else {
    base.setHours(19, 30, 0, 0);
  }
  return base.getTime();
}

/**
 * Presentational "Reserve My Spot" card for one event/webinar. Reserve button
 * opens the sheet's register_url in a new tab. Shared by the events page and the
 * webinar registration page.
 */
export default function ReserveCard({ ev, ctaLabel = "Reserve My Spot" }) {
  if (!ev) return null;
  const bullets = points(ev.description).slice(0, 6);
  const target = eventDateTime(ev);
  const speakers = Array.isArray(ev.speakers) ? ev.speakers : [];

  return (
    <div className="evt-live-card">
      <div className="evt-live-main">
        <div className="evt-live-meta">
          <span className="evt-live-datepill">
            <span className="evt-live-day">{ev.day}</span>
            <span className="evt-live-month">{ev.monthYear}</span>
          </span>
          <div className="evt-live-when">
            {ev.time ? <span className="evt-live-time">{ev.time}</span> : null}
            <span className="evt-live-free">Virtual &middot; Free to attend</span>
          </div>
        </div>

        {bullets.length > 0 && (
          <>
            <h3 className="evt-live-points-title">What we&rsquo;ll cover</h3>
            <ul className="evt-live-points">
              {bullets.map((p, i) => (
                <li key={i} style={{ "--i": i }}>
                  <span className="evt-live-check" aria-hidden="true">✓</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        <a
          className="button button-primary evt-live-cta"
          href={ev.registerUrl || "#"}
          target="_blank"
          rel="noreferrer"
        >
          {ctaLabel} &rarr;
        </a>
        <p className="evt-live-fine">
          Registration link sent instantly &middot; No credit card required
        </p>
      </div>

      <aside className="evt-live-aside">
        {target && (
          <div className="evt-live-countdown">
            <span className="evt-live-countdown-label">Event Starts In</span>
            <CountdownTimer targetDate={target} />
          </div>
        )}

        {speakers.length > 0 && (
          <div className="evt-live-speakers">
            <span className="evt-live-speakers-title">Panelists</span>
            <div className="evt-live-speakers-row">
              {speakers.map((s, i) => (
                <div className="evt-live-speaker" key={i} style={{ "--i": i }}>
                  <span className="evt-live-avatar">
                    {s.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.image} alt={s.name} loading="lazy" />
                    ) : (
                      initials(s.name)
                    )}
                  </span>
                  <span className="evt-live-speaker-name">{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
