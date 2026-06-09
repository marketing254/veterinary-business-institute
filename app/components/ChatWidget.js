"use client";

import { useState } from "react";
import { contactDetails } from "../lib/site-data";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 90 }}>
      {isOpen ? (
        <div
          style={{
            width: "320px",
            backgroundColor: "var(--card)",
            color: "var(--ink-700)",
            boxShadow: "0 18px 50px rgba(0,0,0,0.28)",
            borderRadius: "16px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            border: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              backgroundColor: "var(--teal-500, #1f7a5c)",
              color: "#ffffff",
              padding: "1.1rem 1.25rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4 style={{ margin: 0, fontSize: "1rem", color: "#ffffff" }}>VBI Support Team</h4>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer", fontSize: "1.25rem", lineHeight: 1 }}
              aria-label="Close chat"
            >
              &times;
            </button>
          </div>

          <div style={{ padding: "1.25rem", minHeight: "180px", backgroundColor: "var(--background-muted)" }}>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-500)", marginBottom: "1rem", textAlign: "center" }}>
              Support is typically online during business hours.
            </p>
            <div
              style={{
                backgroundColor: "var(--card)",
                color: "var(--ink-700)",
                padding: "1rem",
                borderRadius: "10px",
                border: "1px solid var(--border)",
              }}
            >
              <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--ink-700)" }}>
                Hi there! Welcome to Veterinary Business Institute. How can we help you today with
                your practice growth goals?
              </p>
            </div>
          </div>

          <div style={{ padding: "1rem", borderTop: "1px solid var(--border)", backgroundColor: "var(--card)" }}>
            <a
              className="button button-primary"
              href={`mailto:${contactDetails[2].label}?subject=Live%20Chat%20Inquiry`}
              style={{ width: "100%", textAlign: "center", display: "block", padding: "0.55rem" }}
            >
              Send an Email
            </a>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "var(--teal-500, #1f7a5c)",
            color: "#ffffff",
            border: "2px solid rgba(255,255,255,0.85)",
            boxShadow: "0 10px 28px rgba(15,45,40,0.45)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Open Live Chat"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}
    </div>
  );
}
