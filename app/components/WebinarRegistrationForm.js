"use client";

import { useState } from "react";
import { trackEvent } from "../lib/analytics";

export default function WebinarRegistrationForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    trackEvent("form_submit", { form_name: "webinar_registration" });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ padding: "2rem", backgroundColor: "var(--background-muted)", borderRadius: "8px", border: "1px solid var(--accent)", textAlign: "center" }}>
        <h3 style={{ color: "var(--ink-700)", marginBottom: "0.5rem" }}>You're Registered!</h3>
        <p className="muted-text">
          Check your email for the calendar invitation and Zoom link. We look forward to seeing you there.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", backgroundColor: "white", padding: "2rem", borderRadius: "12px", border: "1px solid var(--border)", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
      <h3 style={{ margin: 0 }}>Secure Your Spot</h3>
      <p className="muted-text" style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>Registration is free, but live attendance is capped.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label style={{ fontSize: "0.85rem", fontWeight: "600" }}>First Name *</label>
        <input type="text" required placeholder="Dr. Jane" style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label style={{ fontSize: "0.85rem", fontWeight: "600" }}>Email Address *</label>
        <input type="email" required placeholder="name@vetpractice.com" style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label style={{ fontSize: "0.85rem", fontWeight: "600" }}>Role at Practice *</label>
        <select required aria-label="Role at Practice" style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: "white" }}>
          <option value="">Select your role</option>
          <option value="owner">Practice Owner / Partner</option>
          <option value="manager">Practice Manager</option>
          <option value="associate">Associate Veterinarian</option>
          <option value="marketing">Marketing Director</option>
        </select>
      </div>

      <button type="submit" className="button button-primary" style={{ width: "100%", marginTop: "1rem", padding: "1rem" }}>
        Register for Live Masterclass
      </button>
      <p style={{ fontSize: "0.75rem", color: "var(--ink-400)", textAlign: "center", marginTop: "0.5rem" }}>
        Can't make it live? Register anyway and we'll email you the replay.
      </p>
    </form>
  );
}
