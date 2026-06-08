"use client";

import { useEffect, useState } from "react";

export default function EventRegistrationForm({ eventSlug, eventTitle }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", mobile: "", questions: "" });
  const [partner, setPartner] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [loadTime] = useState(() => Date.now());
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPartner(params.get("partner") || "");
  }, []);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (honeypot) return; // bot trap
    if (Date.now() - loadTime < 2000) return; // too fast = bot

    setStatus("sending");

    const payload = {
      ...form,
      partner,
      eventSlug,
      eventTitle,
      submittedAt: new Date().toISOString(),
    };

    const webhookUrl = process.env.NEXT_PUBLIC_REGISTRATION_WEBHOOK;

    if (webhookUrl) {
      try {
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Webhook failed");
        setStatus("success");
      } catch {
        setStatus("error");
      }
    } else {
      // No webhook configured — show success for now (dev mode)
      await new Promise((r) => setTimeout(r, 800));
      setStatus("success");
    }
  }

  if (status === "success") {
    return (
      <div className="reg-form-card" id="registration-form">
        <div style={{ textAlign: "center", padding: "32px 0" }}>
          <div style={{ fontSize: "2.4rem", marginBottom: "12px" }}>&#10003;</div>
          <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "8px" }}>
            You&apos;re Registered!
          </h3>
          <p style={{ color: "var(--ink-500)", lineHeight: 1.7 }}>
            Check your email for the calendar invitation and Zoom link.
            Can&apos;t make it live? Don&apos;t worry — the replay will be sent within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="reg-form-card" id="registration-form">
      <div className="reg-seats-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        Limited Seats Available
      </div>

      <h2 style={{ fontSize: "1.6rem", fontWeight: 700, textAlign: "center", margin: "16px 0 4px" }}>
        Reserve Your Spot
      </h2>
      <p style={{ textAlign: "center", color: "var(--ink-500)", fontSize: "0.95rem", marginBottom: "20px" }}>
        Free to attend — replay sent to all registrants
      </p>

      <div className="reg-bonus-callout">
        <span style={{ fontSize: "1.2rem" }}>&#128203;</span>
        <span>
          Attendees will be eligible for a{" "}
          <strong>special strategy meeting from VBI</strong> after the event
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Honeypot — hidden from real users */}
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", opacity: 0 }}
        />

        <div className="reg-field-row">
          <div className="reg-field">
            <label htmlFor="reg-firstName">First Name *</label>
            <input
              id="reg-firstName"
              name="firstName"
              type="text"
              required
              placeholder="First name"
              value={form.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="reg-field">
            <label htmlFor="reg-lastName">Last Name *</label>
            <input
              id="reg-lastName"
              name="lastName"
              type="text"
              required
              placeholder="Last name"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="reg-field">
          <label htmlFor="reg-email">Email Address *</label>
          <input
            id="reg-email"
            name="email"
            type="email"
            required
            placeholder="you@yourpractice.com"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="reg-field">
          <label htmlFor="reg-mobile">Mobile Number *</label>
          <input
            id="reg-mobile"
            name="mobile"
            type="tel"
            required
            placeholder="+1 (555) 123-4567"
            value={form.mobile}
            onChange={handleChange}
          />
        </div>

        <div className="reg-field">
          <label htmlFor="reg-questions">What questions do you have? (optional)</label>
          <textarea
            id="reg-questions"
            name="questions"
            rows={3}
            placeholder="Anything you'd like the panel to cover?"
            value={form.questions}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="reg-submit-btn"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Registering..." : "Register Free — Save My Seat \u2192"}
        </button>

        {status === "error" && (
          <p style={{ color: "#c0392b", fontSize: "0.88rem", marginTop: "10px", textAlign: "center" }}>
            Something went wrong. Please try again or email{" "}
            <a href="mailto:team@veterinarybusinessinstitute.com" style={{ color: "#c0392b", textDecoration: "underline" }}>
              team@veterinarybusinessinstitute.com
            </a>
          </p>
        )}

        <div className="reg-privacy-note">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Your info is secure. We never spam — unsubscribe anytime.
        </div>
      </form>
    </div>
  );
}
