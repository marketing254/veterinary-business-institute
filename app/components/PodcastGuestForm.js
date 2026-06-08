"use client";

import { useState } from "react";
import { trackEvent } from "../lib/analytics";
import { submitLead } from "../lib/submit-lead";

const EXPERTISE = [
  "Practice Ownership & Leadership",
  "Veterinary Marketing & SEO",
  "Practice Management & Operations",
  "Veterinary Technology & AI",
  "Team Wellness & Culture",
  "Finance & Business Growth",
  "Other",
];

export default function PodcastGuestForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setStatus("sending");
    trackEvent("form_submit", { form_name: "podcast_guest" });
    const res = await submitLead("podcast_guest", data);
    setStatus(res.ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <div className="contact-form contact-form-success">
        <span className="contact-form-success-icon" aria-hidden="true">&#10003;</span>
        <h3>Application Received!</h3>
        <p>
          Thanks for your interest in joining the Veterinary Business Podcast. Our team will
          review your application and reach out within 3 business days.
        </p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <span className="contact-form-badge">
        <span className="contact-form-badge-dot" aria-hidden="true" />
        Now Booking Guests
      </span>
      <h3 className="contact-form-title">Apply to be a guest</h3>

      <div className="contact-field">
        <label>Your Name *</label>
        <input type="text" name="name" required placeholder="Dr. Jane Smith" />
      </div>

      <div className="contact-field">
        <label>Email Address *</label>
        <input type="email" name="email" required placeholder="name@vetpractice.com" />
      </div>

      <div className="contact-field">
        <label>Area of Expertise *</label>
        <select name="expertise" required defaultValue="" aria-label="Area of Expertise">
          <option value="" disabled>— Select your area —</option>
          {EXPERTISE.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      <div className="contact-field">
        <label>Proposed Topic *</label>
        <textarea name="topic" required rows="3" placeholder="What would you love to talk about with our audience?" />
      </div>

      <button type="submit" className="contact-form-submit" disabled={status === "sending"}>
        {status === "sending" ? "Submitting…" : "Submit Guest Application →"}
      </button>

      {status === "error" && (
        <p className="contact-form-note" style={{ color: "#c0392b" }}>
          Something went wrong. Please try again or email team@veterinarybusinessinstitute.com.
        </p>
      )}
    </form>
  );
}
