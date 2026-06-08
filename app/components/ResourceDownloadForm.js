"use client";

import { useState } from "react";
import { trackEvent } from "../lib/analytics";
import { submitLead } from "../lib/submit-lead";

export default function ResourceDownloadForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setStatus("sending");
    trackEvent("form_submit", { form_name: "resource_download" });
    const res = await submitLead("resource_download", data);
    setStatus(res.ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <div className="contact-form contact-form-success">
        <span className="contact-form-success-icon" aria-hidden="true">&#10003;</span>
        <h3>Check Your Inbox!</h3>
        <p>
          Thank you! The Veterinary Practice Growth Blueprint is on its way to the email
          you provided. If you don&rsquo;t see it within a few minutes, check your spam folder.
        </p>
      </div>
    );
  }

  return (
    <form className="contact-form res-download-form" onSubmit={handleSubmit}>
      <span className="contact-form-badge">
        <span className="contact-form-badge-dot" aria-hidden="true" />
        Free Download — No Credit Card Required
      </span>
      <h3 className="contact-form-title">Get the free guide</h3>
      <p className="contact-form-sub">
        Enter your details and we&rsquo;ll send the 17-page blueprint straight to your inbox.
      </p>

      <div className="contact-field">
        <label>Your Name *</label>
        <input type="text" name="name" required placeholder="Dr. Jane Smith" />
      </div>

      <div className="contact-field">
        <label>Work Email *</label>
        <input type="email" name="email" required placeholder="name@vetpractice.com" />
      </div>

      <div className="contact-field">
        <label>Practice Name *</label>
        <input type="text" name="practice" required placeholder="Your veterinary practice" />
      </div>

      <button type="submit" className="contact-form-submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send Me the Free Guide →"}
      </button>

      {status === "error" && (
        <p className="contact-form-note" style={{ color: "#c0392b" }}>
          Something went wrong. Please try again or email team@veterinarybusinessinstitute.com.
        </p>
      )}

      <p className="contact-form-note">
        <span aria-hidden="true">&#128274;</span> We respect your privacy. Unsubscribe anytime.
      </p>
    </form>
  );
}
