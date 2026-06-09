"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CONSENT_KEY = "vbi-cookie-consent";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false); // drives the slide-in

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) {
      setShow(true);
      const t = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(t);
    }
  }, []);

  function decide(value) {
    localStorage.setItem(CONSENT_KEY, value);
    // Tell <Analytics /> so tracking can (de)activate without a reload.
    window.dispatchEvent(new Event("vbi-consent-change"));
    setVisible(false);
    setTimeout(() => setShow(false), 320);
  }

  if (!show) return null;

  return (
    <div
      className={`vbi-cookie${visible ? " is-visible" : ""}`}
      role="dialog"
      aria-label="Cookie consent"
    >
      <span className="vbi-cookie-icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5z" />
          <circle cx="9" cy="11" r="1" />
          <circle cx="14" cy="15" r="1" />
          <circle cx="15.5" cy="9.5" r="1" />
        </svg>
      </span>

      <div className="vbi-cookie-text">
        <strong>We value your privacy</strong>
        <p>
          We use cookies to improve your experience and understand how the site is used. See our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link> for details.
        </p>
      </div>

      <div className="vbi-cookie-actions">
        <button type="button" className="vbi-cookie-btn vbi-cookie-decline" onClick={() => decide("declined")}>
          Decline
        </button>
        <button type="button" className="vbi-cookie-btn vbi-cookie-accept" onClick={() => decide("accepted")}>
          Accept All
        </button>
      </div>
    </div>
  );
}
