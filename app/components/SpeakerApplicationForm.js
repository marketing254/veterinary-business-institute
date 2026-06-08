"use client";

import { useState } from "react";
import { trackEvent } from "../lib/analytics";
import { submitLead } from "../lib/submit-lead";

const APPLY_AS = ["Podcast Guest", "Speaker / Panelist (Events)", "Both — Guest & Speaker"];
const TOPICS = [
  "Practice Marketing & SEO",
  "Social Media for Veterinary Teams",
  "Practice Management & Operations",
  "Veterinary Technology & AI",
  "Client Experience & Retention",
  "Business Development & Growth",
  "Finance, Billing & Pricing",
  "Team Wellness & Culture",
  "Leadership",
  "Niche Practice Strategies",
  "Other",
];

export default function SpeakerApplicationForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setStatus("sending");
    trackEvent("form_submit", { form_name: "speaker_application" });
    const res = await submitLead("speaker_application", data);
    setStatus(res.ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <div className="contact-form contact-form-success">
        <span className="contact-form-success-icon" aria-hidden="true">&#10003;</span>
        <h3>Application Received!</h3>
        <p>
          Thank you! The Veterinary Business Institute team will review your application
          and get back to you within 3 business days at the email you provided.
        </p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <span className="contact-form-badge">
        <span className="contact-form-badge-dot" aria-hidden="true" />
        Apply Now — Open Spots Available
      </span>
      <h3 className="contact-form-title">Apply as a Guest or Speaker</h3>
      <p className="contact-form-sub">
        Tell us about yourself and what you&rsquo;d like to share. We review all applications
        within 3 business days.
      </p>

      <div className="contact-form-row">
        <div className="contact-field">
          <label>First Name *</label>
          <input type="text" name="firstName" required placeholder="Jane" />
        </div>
        <div className="contact-field">
          <label>Last Name *</label>
          <input type="text" name="lastName" required placeholder="Smith" />
        </div>
      </div>

      <div className="contact-form-row">
        <div className="contact-field">
          <label>Professional Title *</label>
          <input type="text" name="title" required placeholder="Practice Owner, DVM" />
        </div>
        <div className="contact-field">
          <label>Practice / Organization *</label>
          <input type="text" name="organization" required placeholder="Your clinic or company" />
        </div>
      </div>

      <div className="contact-form-row">
        <div className="contact-field">
          <label>Email Address *</label>
          <input type="email" name="email" required placeholder="name@vetpractice.com" />
        </div>
        <div className="contact-field">
          <label>Phone Number</label>
          <input type="tel" name="phone" placeholder="(555) 000-0000" />
        </div>
      </div>

      <div className="contact-field">
        <label>I&rsquo;m applying as a *</label>
        <select name="applyingAs" required defaultValue="" aria-label="I'm applying as a">
          <option value="" disabled>— Select —</option>
          {APPLY_AS.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      <div className="contact-field">
        <label>Proposed Topic / Area of Expertise *</label>
        <select name="topic" required defaultValue="" aria-label="Proposed Topic / Area of Expertise">
          <option value="" disabled>— Select the closest match —</option>
          {TOPICS.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      <div className="contact-field">
        <label>Brief Bio / Why You? *</label>
        <textarea name="bio" required rows="4" placeholder="What specific problem do you help veterinary practices solve?" />
      </div>

      <div className="contact-field">
        <label>Website / LinkedIn / Social Profiles</label>
        <input type="url" name="website" placeholder="https://linkedin.com/in/…" />
      </div>

      <button type="submit" className="contact-form-submit" disabled={status === "sending"}>
        {status === "sending" ? "Submitting…" : "Submit My Application →"}
      </button>

      {status === "error" && (
        <p className="contact-form-note" style={{ color: "#c0392b" }}>
          Something went wrong. Please try again or email{" "}
          <a href="mailto:team@veterinarybusinessinstitute.com" style={{ color: "#c0392b", textDecoration: "underline" }}>
            team@veterinarybusinessinstitute.com
          </a>
          .
        </p>
      )}

      <p className="contact-form-note">
        <span aria-hidden="true">&#128231;</span> Questions? Email team@veterinarybusinessinstitute.com
      </p>
    </form>
  );
}
