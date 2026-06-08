"use client";

import { useState } from "react";
import { trackEvent } from "../lib/analytics";
import { submitLead } from "../lib/submit-lead";

const SUBJECTS = [
  "General Enquiry",
  "Partnership",
  "Podcast / Guest",
  "Marketing Help",
  "Webinar / Event",
  "Tools / Calculators",
  "Other",
];

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [subject, setSubject] = useState("General Enquiry");

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    trackEvent("form_submit", { form_name: "contact" });
    const res = await submitLead("contact", { ...data, subject });
    setStatus(res.ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <div className="contact-form contact-form-success">
        <span className="contact-form-success-icon" aria-hidden="true">&#10003;</span>
        <h3>Message Received!</h3>
        <p>
          Thank you for reaching out to the Veterinary Business Institute. A member of
          our team will review your message and reply within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <span className="contact-form-badge">
        <span className="contact-form-badge-dot" aria-hidden="true" />
        We&rsquo;re Online
      </span>
      <h3 className="contact-form-title">Send Us a Message</h3>
      <p className="contact-form-sub">
        Fill in the form below and we&rsquo;ll get back to you within 1 business day.
      </p>

      <div className="contact-form-row">
        <div className="contact-field">
          <label>First Name *</label>
          <input type="text" name="firstName" required placeholder="Jane" />
        </div>
        <div className="contact-field">
          <label>Last Name</label>
          <input type="text" name="lastName" placeholder="Doe" />
        </div>
      </div>

      <div className="contact-field">
        <label>Email Address *</label>
        <input type="email" name="email" required placeholder="name@vetpractice.com" />
      </div>

      <div className="contact-field">
        <label>Phone Number *</label>
        <input type="tel" name="phone" required placeholder="(555) 000-0000" />
      </div>

      <div className="contact-field">
        <label>Subject *</label>
        <div className="contact-form-pills">
          {SUBJECTS.map((s) => (
            <button
              type="button"
              key={s}
              className={`contact-pill${subject === s ? " is-selected" : ""}`}
              onClick={() => setSubject(s)}
              aria-pressed={subject === s}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="contact-field">
        <label>Message *</label>
        <textarea name="message" required rows="5" placeholder="Tell us how we can help…" />
      </div>

      <button type="submit" className="contact-form-submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send Message →"}
      </button>

      {status === "error" && (
        <p className="contact-form-note" style={{ color: "#c0392b" }}>
          Something went wrong. Please try again, or email{" "}
          <a href="mailto:team@veterinarybusinessinstitute.com" style={{ color: "#c0392b", textDecoration: "underline" }}>
            team@veterinarybusinessinstitute.com
          </a>
          .
        </p>
      )}

      <p className="contact-form-note">
        <span aria-hidden="true">&#128274;</span> Your information is kept private and
        never sold or shared.
      </p>
    </form>
  );
}
