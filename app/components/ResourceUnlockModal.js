"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SolarIcon from "./SolarIcon";
import { trackEvent } from "../lib/analytics";
import { submitLead } from "../lib/submit-lead";

// One unlock grants access to every gated resource page (Free Downloads + Tools).
const UNLOCK_KEY = "vbi-resources-unlocked";
const WHATS_NEW_KEY = "vbi-whats-new-dismissed";

const ROLES = [
  "Veterinarian / DVM",
  "Practice Owner",
  "Hospital Director",
  "Associate Veterinarian",
  "Practice Manager",
  "Veterinary Technician",
  "Marketing Lead",
  "Other Veterinary Professional",
];

export default function ResourceUnlockModal() {
  // `null` = still deciding (avoids a flash); `true`/`false` = locked or unlocked.
  const [locked, setLocked] = useState(null);
  const modalRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const unlocked = sessionStorage.getItem(UNLOCK_KEY);
    if (unlocked) {
      setLocked(false);
      return;
    }
    // Gate is up: suppress the site-wide "What's New" popup and lock scroll.
    sessionStorage.setItem(WHATS_NEW_KEY, "1");
    setLocked(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    trackEvent("form_submit", { form_name: "resource_unlock" });
    // Capture the lead (non-blocking — never trap the visitor behind a network call).
    submitLead("resource_unlock", data);
    sessionStorage.setItem(UNLOCK_KEY, "1");
    document.body.style.overflow = "";
    setLocked(false);
  }

  // No access without unlocking — closing sends the visitor back to the home page.
  function handleClose() {
    document.body.style.overflow = "";
    router.push("/");
  }

  // Keyboard: Escape closes; Tab is trapped inside the dialog (WCAG 2.1.2 / dialog pattern).
  useEffect(() => {
    if (!locked) return undefined;
    const getFocusable = () =>
      modalRef.current
        ? Array.from(
            modalRef.current.querySelectorAll(
              'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
          ).filter((el) => el.offsetParent !== null)
        : [];
    const focusables = getFocusable();
    if (focusables.length) focusables[0].focus();
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
        return;
      }
      if (e.key !== "Tab") return;
      const f = getFocusable();
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locked]);

  if (!locked) return null;

  return (
    <>
      <div className="runlock-overlay" onClick={handleClose} />
      <div ref={modalRef} className="runlock-modal" role="dialog" aria-modal="true" aria-label="Unlock your free resource library">
        <button className="runlock-close" onClick={handleClose} aria-label="Close and return home">
          &times;
        </button>
        <form className="runlock-form" onSubmit={handleSubmit}>
          <span className="runlock-icon" aria-hidden="true">
            <SolarIcon name="bookOpen" size={24} />
          </span>
          <span className="runlock-eyebrow">Free Resources — Veterinary Professionals Only</span>
          <h2>Unlock your free resource library</h2>
          <p className="runlock-sub">
            Get instant, free access to all Veterinary Business Institute templates, guides,
            tools, and checklists — built specifically for veterinary practice owners and teams.
            Just tell us where to send them.
          </p>

          <div className="contact-form-row">
            <div className="contact-field">
              <label>First Name *</label>
              <input type="text" name="firstName" required placeholder="e.g. Sarah" />
            </div>
            <div className="contact-field">
              <label>Last Name *</label>
              <input type="text" name="lastName" required placeholder="e.g. Mitchell" />
            </div>
          </div>

          <div className="contact-field">
            <label>Email Address *</label>
            <input type="email" name="email" required placeholder="you@yourpractice.com" />
          </div>

          <div className="contact-field">
            <label>Practice Name *</label>
            <input type="text" name="practice" required placeholder="Greenfield Animal Hospital" />
          </div>

          <div className="contact-field">
            <label>Your Role *</label>
            <select name="role" required defaultValue="" aria-label="Your Role">
              <option value="" disabled>— Select your role —</option>
              {ROLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="contact-form-submit runlock-submit">
            Get Free Access &rarr; Unlock All Resources
          </button>

          <p className="runlock-note">
            <span aria-hidden="true">&#128274;</span> We respect your privacy. No spam, no
            selling your data. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </>
  );
}
