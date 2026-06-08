"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { trackEvent } from "../lib/analytics";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const TIME_SLOTS = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM"];

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export default function BookingCalendar() {
  const today = useMemo(() => startOfDay(new Date()), []);
  // Earliest bookable day = next weekday on/after today (weekends are disabled).
  // Used to open the calendar on a month that actually has open slots, so users
  // never land on a fully-greyed-out month near month-end.
  const firstBookable = useMemo(() => {
    const d = startOfDay(new Date(today));
    while (d.getDay() === 0 || d.getDay() === 6) {
      d.setDate(d.getDate() + 1);
    }
    return d;
  }, [today]);

  const [view, setView] = useState(() => ({
    year: firstBookable.getFullYear(),
    month: firstBookable.getMonth(),
  }));
  const [selected, setSelected] = useState(null);
  const [slot, setSlot] = useState(null);

  const timeZone = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || "Local time";
    } catch {
      return "Local time";
    }
  }, []);

  const cells = useMemo(() => {
    const firstDay = new Date(view.year, view.month, 1).getDay();
    const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
    const list = [];
    for (let i = 0; i < firstDay; i += 1) {
      list.push(null);
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = startOfDay(new Date(view.year, view.month, day));
      const weekend = date.getDay() === 0 || date.getDay() === 6;
      list.push({ day, date, disabled: date < firstBookable || weekend });
    }
    return list;
  }, [view, firstBookable]);

  const isCurrentMonthView =
    view.year === firstBookable.getFullYear() && view.month === firstBookable.getMonth();

  function goToToday() {
    setView({ year: firstBookable.getFullYear(), month: firstBookable.getMonth() });
  }

  function changeMonth(delta) {
    setView((prev) => {
      const next = new Date(prev.year, prev.month + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });
    setSelected(null);
    setSlot(null);
  }

  function selectDate(cell) {
    if (!cell || cell.disabled) {
      return;
    }
    setSelected(cell.date);
    setSlot(null);
  }

  const readableDate = selected
    ? selected.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })
    : null;

  return (
    <div className="booking-cal">
      <span className="booking-cal-pill">Limited Spots Available</span>
      <h2 className="booking-cal-title">Book Your Free Strategy Meeting</h2>
      <p className="booking-cal-sub">
        Select your preferred date and time below. You&rsquo;ll confirm your details
        on our secure scheduler and lock in your spot instantly.
      </p>

      <div className="booking-cal-card">
        <div className="booking-cal-toolbar">
          <button
            type="button"
            className="booking-cal-today"
            onClick={goToToday}
            disabled={isCurrentMonthView}
          >
            Today
          </button>
          <span className="booking-cal-month">
            {MONTHS[view.month]} {view.year}
          </span>
          <div className="booking-cal-nav">
            <button
              type="button"
              aria-label="Previous month"
              onClick={() => changeMonth(-1)}
              disabled={isCurrentMonthView}
            >
              &#8249;
            </button>
            <button type="button" aria-label="Next month" onClick={() => changeMonth(1)}>
              &#8250;
            </button>
          </div>
        </div>

        <div className="booking-cal-weekdays">
          {WEEKDAYS.map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>

        <div className="booking-cal-grid">
          {cells.map((cell, i) => {
            if (!cell) {
              return <span key={`empty-${i}`} className="booking-cal-day is-empty" />;
            }
            const isSelected = selected && cell.date.getTime() === selected.getTime();
            return (
              <button
                key={cell.day}
                type="button"
                className={`booking-cal-day${cell.disabled ? " is-disabled" : ""}${isSelected ? " is-selected" : ""}`}
                onClick={() => selectDate(cell)}
                disabled={cell.disabled}
              >
                {cell.day}
              </button>
            );
          })}
        </div>

        <div className="booking-cal-tz">
          <span className="booking-cal-tz-dot" aria-hidden="true" />
          Time zone&nbsp;&middot;&nbsp;{timeZone}
        </div>
      </div>

      {selected && (
        <div className="booking-cal-slots">
          <p className="booking-cal-slots-label">
            Available times for <strong>{readableDate}</strong>
          </p>
          <div className="booking-cal-slots-grid">
            {TIME_SLOTS.map((t) => (
              <button
                key={t}
                type="button"
                className={`booking-cal-slot${slot === t ? " is-selected" : ""}`}
                onClick={() => setSlot(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {slot ? (
        <Link
          className="booking-cal-confirm"
          href="/thank-you"
          onClick={() =>
            trackEvent("book_consultation", {
              category: "conversion",
              date: selected ? selected.toISOString().slice(0, 10) : undefined,
              time_slot: slot,
            })
          }
        >
          {`Confirm ${readableDate}, ${slot} →`}
        </Link>
      ) : (
        <span className="booking-cal-confirm" aria-disabled="true">
          Select a date &amp; time &rarr;
        </span>
      )}

      <p className="booking-cal-note">
        <span aria-hidden="true">&#128274;</span> Your information is secure. We never
        sell data or spam &mdash; unsubscribe anytime.
      </p>
    </div>
  );
}
