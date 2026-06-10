"use client";

import { useLive } from "../../lib/use-live";
import { fetchEvents } from "../../lib/sheets-client";
import ReserveCard from "./ReserveCard";

/**
 * "Reserve My Spot" card for the next live event — fetched from the events sheet,
 * seeded for SSR. The reserve button links to the sheet's register_url (new tab);
 * there are no per-event pages.
 */
export default function LiveEventCard({ initial = [] }) {
  const events = useLive(initial, fetchEvents);
  const ev = events && events[0];
  if (!ev) return null;

  return (
    <section className="section section-muted evt-live" id="reserve">
      <div className="container">
        <div className="section-heading section-heading-centered">
          <span className="eyebrow text-accent">Next Live Event</span>
          <h2>{ev.title}</h2>
        </div>
        <ReserveCard ev={ev} />
      </div>
    </section>
  );
}
