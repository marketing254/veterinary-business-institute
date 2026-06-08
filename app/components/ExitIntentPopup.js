"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only trigger once per session
    if (sessionStorage.getItem("vbi-exit-intent")) return;

    const handleMouseLeave = (e) => {
      if (e.clientY <= 0) {
        setShow(true);
        sessionStorage.setItem("vbi-exit-intent", "true");
        window.removeEventListener("mouseout", handleMouseLeave);
      }
    };

    window.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (!show) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setShow(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [show]);

  if (!show) return null;

  return (
    <div
      onClick={() => setShow(false)}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(16, 35, 32, 0.4)",
        backdropFilter: "blur(6px)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem"
      }}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-intent-title"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "var(--paper)",
          padding: "3rem 2rem",
          borderRadius: "24px",
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
          position: "relative",
          boxShadow: "0 24px 60px rgba(16,35,32,0.12)"
        }}>
        <button 
          onClick={() => setShow(false)}
          style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "var(--ink-400)" }}
          aria-label="Close"
        >
          &times;
        </button>
        
        <span className="eyebrow text-accent">Before You Go</span>
        <h2 id="exit-intent-title" style={{ marginTop: "1rem" }}>Are you leaving growth on the table?</h2>
        <p style={{ marginTop: "1rem", color: "var(--ink-500)" }}>
          The strongest veterinary businesses run on structure, not guesswork.
          Book a free strategy consultation to figure out exactly what your
          practice needs next.
        </p>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "2rem" }}>
          <Link className="button button-primary" href="/consultation" onClick={() => setShow(false)}>
            Book a Free Consultation
          </Link>
          <button 
            onClick={() => setShow(false)} 
            style={{ background: "none", border: "none", color: "var(--ink-400)", cursor: "pointer", textDecoration: "underline", fontSize: "0.95rem" }}
          >
            No thanks, I'm good for now
          </button>
        </div>
      </div>
    </div>
  );
}
