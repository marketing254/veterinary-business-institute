"use client";

import { useLive } from "../../lib/use-live";
import { fetchWebinars } from "../../lib/sheets-client";
import ReserveCard from "./ReserveCard";

/**
 * Webinar registration page body — the soonest webinar as a big "Reserve My Spot"
 * card, the rest as a grid below. Every reserve button goes to the sheet's
 * register_url (new tab). Fetched from the "webinars" sheet tab, seeded for SSR.
 */
export default function LiveWebinarList({ initial = [] }) {
  const items = useLive(initial, fetchWebinars);
  if (!items || items.length === 0) return null;

  const [top, ...rest] = items;

  return (
    <>
      <section className="section section-muted evt-live" id="reserve">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">Next Live Webinar</span>
            <h2>{top.title}</h2>
          </div>
          <ReserveCard ev={top} />
        </div>
      </section>

      {rest.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-heading section-heading-centered">
              <span className="eyebrow text-accent">More Upcoming Webinars</span>
              <h2>Save your spot.</h2>
            </div>
            <div className="evt-reg-grid">
              {rest.map((ev, i) => (
                <article className={`evt-reg-card${ev.bannerImage ? " has-banner" : ""}`} key={i}>
                  {ev.bannerImage ? (
                    <div className="evt-reg-poster">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={ev.bannerImage} alt={ev.title || "Webinar banner"} loading="lazy" />
                      <span className="evt-reg-poster-date">
                        <span className="evt-reg-day">{ev.day}</span>
                        <span className="evt-reg-month">{ev.monthYear}</span>
                      </span>
                    </div>
                  ) : (
                    <div className="evt-reg-date">
                      <span className="evt-reg-day">{ev.day}</span>
                      <span className="evt-reg-month">{ev.monthYear}</span>
                    </div>
                  )}
                  <div className="evt-reg-body">
                    <h3>{ev.title}</h3>
                    {ev.time ? <p className="evt-reg-time">{ev.time}</p> : null}
                    {Array.isArray(ev.speakers) && ev.speakers.length > 0 ? (
                      <p className="evt-reg-panelists">
                        {ev.speakers.map((s) => s.name).join(" · ")}
                      </p>
                    ) : null}
                    <a
                      className="button button-primary button-compact evt-reg-cta"
                      href={ev.registerUrl || "#"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Reserve Spot &rarr;
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
