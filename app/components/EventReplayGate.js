"use client";

import { useEffect, useState } from "react";
import { submitLead } from "../lib/submit-lead";

const UNLOCK_KEY = "vbi-replays-unlocked";

function vimeoId(href) {
  const m = (href || "").match(/vimeo\.com\/(\d+)/);
  return m ? m[1] : null;
}

function durationLabel(d) {
  if (!d) return null;
  const parts = String(d).split(":").map((n) => parseInt(n, 10));
  if (parts.some(Number.isNaN)) return null;
  let mins = 0;
  if (parts.length === 3) mins = parts[0] * 60 + parts[1];
  else if (parts.length === 2) mins = parts[0];
  return mins ? `${mins} min` : null;
}

export default function EventReplayGate({ panels }) {
  const [unlocked, setUnlocked] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [pendingHref, setPendingHref] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    practice: "",
  });

  useEffect(() => {
    if (sessionStorage.getItem(UNLOCK_KEY)) setUnlocked(true);
  }, []);

  function lockScroll() {
    document.body.style.overflow = "hidden";
  }
  function freeScroll() {
    document.body.style.overflow = "";
  }

  // Click a replay: play in place if unlocked, otherwise open the gate form first.
  function handleReplayClick(href) {
    if (!href) return;
    if (unlocked) {
      openPlayer(href);
    } else {
      setPendingHref(href);
      setFormOpen(true);
      lockScroll();
    }
  }

  function openPlayer(href) {
    const id = vimeoId(href);
    if (!id) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    setPlayerId(id);
    lockScroll();
  }

  function closeForm() {
    setFormOpen(false);
    setPendingHref(null);
    freeScroll();
  }

  function closePlayer() {
    setPlayerId(null);
    freeScroll();
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    submitLead("webinar_replay", { ...form });
    sessionStorage.setItem(UNLOCK_KEY, "1");
    setUnlocked(true);
    setFormOpen(false);
    const href = pendingHref;
    setPendingHref(null);
    // go straight into the player for the replay they clicked
    if (href) {
      const id = vimeoId(href);
      if (id) {
        setPlayerId(id);
      } else {
        freeScroll();
        window.open(href, "_blank", "noopener,noreferrer");
      }
    } else {
      freeScroll();
    }
  }

  return (
    <>
      <div className="evt-replay-grid">
        {panels.map((p) => {
          const playable = Boolean(p.href);
          return (
            <article className="evt-replay-card" key={p.slug}>
              <button
                type="button"
                className="evt-replay-thumb"
                onClick={() => handleReplayClick(p.href)}
                disabled={!playable}
                aria-label={`Watch replay: ${p.title}`}
              >
                <img src={p.image} alt={p.title} loading="lazy" />
                {!playable ? (
                  <span className="evt-replay-lock evt-replay-soon-badge" aria-hidden="true">
                    Coming soon
                  </span>
                ) : unlocked ? (
                  <span className="evt-replay-play" aria-hidden="true">&#9654;</span>
                ) : (
                  <span className="evt-replay-lock" aria-hidden="true">&#128274;</span>
                )}
              </button>
              <div className="evt-replay-body">
                <span className="evt-replay-meta">
                  {p.date} &middot; {p.category}
                  {durationLabel(p.duration) ? ` · ${durationLabel(p.duration)}` : ""}
                  {" "}
                  <span className="evt-replay-free">Free</span>
                </span>
                <h3>{p.title}</h3>
                {!playable ? (
                  <span className="evt-replay-soon">Replay coming soon</span>
                ) : (
                  <button
                    type="button"
                    className={unlocked ? "evt-replay-watch" : "evt-replay-unlock-btn"}
                    onClick={() => handleReplayClick(p.href)}
                  >
                    {unlocked ? "▶ Watch Replay" : "\u{1F512} Click to Unlock"}
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Lead-capture gate */}
      {formOpen && (
        <div className="evt-modal-overlay" onClick={closeForm}>
          <div
            className="evt-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Free replay access"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="evt-modal-close"
              onClick={closeForm}
              aria-label="Close"
            >
              &times;
            </button>
            <span className="evt-modal-eyebrow">Free Replay Access</span>
            <h3>Watch This On-Demand Session</h3>
            <p className="evt-modal-sub">
              Fill in your details to unlock every webinar replay. It&apos;s completely free.
            </p>
            <form onSubmit={handleSubmit} className="evt-modal-form">
              <div className="evt-modal-row">
                <div className="evt-modal-field">
                  <label htmlFor="rg-first">First Name *</label>
                  <input
                    id="rg-first"
                    name="firstName"
                    required
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                  />
                </div>
                <div className="evt-modal-field">
                  <label htmlFor="rg-last">Last Name *</label>
                  <input
                    id="rg-last"
                    name="lastName"
                    required
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                  />
                </div>
              </div>
              <div className="evt-modal-field">
                <label htmlFor="rg-email">Email *</label>
                <input
                  id="rg-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@yourpractice.com"
                />
              </div>
              <div className="evt-modal-field">
                <label htmlFor="rg-mobile">Phone *</label>
                <input
                  id="rg-mobile"
                  name="mobile"
                  type="tel"
                  required
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="evt-modal-field">
                <label htmlFor="rg-practice">Practice Name *</label>
                <input
                  id="rg-practice"
                  name="practice"
                  required
                  value={form.practice}
                  onChange={handleChange}
                  placeholder="Your veterinary practice"
                />
              </div>
              <button type="submit" className="evt-modal-submit">
                Watch Replay Now &rarr;
              </button>
              <p className="evt-modal-note">No spam. Your details are kept private.</p>
            </form>
          </div>
        </div>
      )}

      {/* In-place video player */}
      {playerId && (
        <div className="evt-player-overlay" onClick={closePlayer}>
          <div className="evt-player-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="evt-player-close"
              onClick={closePlayer}
              aria-label="Close player"
            >
              &times;
            </button>
            <div className="evt-player-frame">
              <iframe
                src={`https://player.vimeo.com/video/${playerId}?autoplay=1&title=0&byline=0&portrait=0`}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Veterinary panel replay"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
