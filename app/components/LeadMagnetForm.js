"use client";

import { useState } from "react";
import { withBasePath } from "../lib/base-path";
import { trackEvent } from "../lib/analytics";
import { submitLead } from "../lib/submit-lead";

export default function LeadMagnetForm({ title }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.includes("@")) {
      trackEvent("form_submit", { form_name: "lead_magnet" });
      submitLead("lead_magnet", { email, asset: title });
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div style={{ marginTop: "1.5rem", padding: "1rem", backgroundColor: "var(--background-muted)", borderRadius: "8px", border: "1px solid var(--accent)", textAlign: "center" }}>
        <p style={{ fontWeight: "600", fontSize: "0.95rem", color: "var(--ink-700)", marginBottom: "0.5rem" }}>
          Success! Check your inbox shortly.
        </p>
        <p className="muted-text" style={{ fontSize: "0.85rem", marginBottom: "1rem" }}>
          In a rush? You can also grab it directly here:
        </p>
        <a 
          className="button button-primary" 
          href={withBasePath("/assets/dummy-magnet.pdf")} // Placeholder file link
          download
          target="_blank"
          rel="noreferrer"
        >
          Download "{title}"
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--ink-600)" }}>
        Email Address:
      </label>
      <div style={{ display: "flex", gap: "0.5rem", flexDirection: "column" }}>
        <input 
          type="email" 
          placeholder="your@practice.com" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)", width: "100%" }}
        />
        <button type="submit" className="button button-secondary" style={{ padding: "0.75rem", width: "100%" }}>
          Get Secure Access
        </button>
      </div>
    </form>
  );
}
