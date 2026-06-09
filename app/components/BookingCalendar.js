"use client";

/**
 * Free strategy-call scheduler. Embeds the live YouCanBookMe calendar inside the
 * existing booking UI shell (pill + title + sub), with rounded borders to match
 * the site. Replaces the old mock calendar.
 */
export default function BookingCalendar() {
  return (
    <div className="booking-cal">
      <span className="booking-cal-pill">Limited Spots Available</span>
      <h2 className="booking-cal-title">Book Your Free Strategy Meeting</h2>
      <p className="booking-cal-sub">
        Pick a time that works for you below. You&rsquo;ll get an instant confirmation
        and calendar invite — no back-and-forth emails.
      </p>

      <div className="ycbm-embed">
        <iframe
          src="https://ekwasales-emp2-withoutceo-vbi.youcanbook.me?embed=true"
          title="Book your free VBI strategy meeting"
          allow="payment"
          loading="lazy"
        />
      </div>

      <p className="booking-cal-note">
        <span aria-hidden="true">&#128274;</span> Your information is secure. We never
        sell data or spam &mdash; unsubscribe anytime.
      </p>
    </div>
  );
}
