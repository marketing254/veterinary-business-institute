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
            backgroundColor: "var(--paper)",
            boxShadow: "0 10px 40px rgba(16,35,32,0.15)",
            borderRadius: "16px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            border: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              backgroundColor: "var(--ink-700)",
              color: "white",
              padding: "1.25rem 1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4 style={{ margin: 0, fontSize: "1rem", color: "white" }}>VBI Support Team</h4>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontSize: "1.25rem",
              }}
              aria-label="Close chat"
            >
              &times;
            </button>
          </div>

          <div
            style={{
              padding: "1.5rem",
              minHeight: "200px",
              backgroundColor: "var(--background-muted)",
            }}
          >
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--ink-500)",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              Support is typically online during business hours.
            </p>
            <div
              style={{
                backgroundColor: "white",
                padding: "1rem",
                borderRadius: "8px",
                border: "1px solid var(--border)",
              }}
            >
              <p style={{ margin: 0, fontSize: "0.95rem" }}>
                Hi there! Welcome to Veterinary Business Institute. How can we help you today with
                your practice growth goals?
              </p>
            </div>
          </div>

          <div
            style={{
              padding: "1rem",
              borderTop: "1px solid var(--border)",
              backgroundColor: "white",
            }}
          >
            <a
              className="button button-primary"
              href={`mailto:${contactDetails[2].label}?subject=Live%20Chat%20Inquiry`}
              style={{ width: "100%", textAlign: "center", display: "block", padding: "0.5rem" }}
            >
              Send an Email
            </a>
            <p
              className="muted-text"
              style={{
                fontSize: "0.75rem",
                textAlign: "center",
                marginTop: "0.5rem",
                padding: "0 0.5rem",
              }}
            >
              (Note: Connect this UI to Intercom or Drift for live websocket chat)
            </p>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "var(--accent)",
            color: "white",
            border: "none",
            boxShadow: "0 10px 25px rgba(232, 106, 51, 0.4)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Open Live Chat"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}
    </div>
  );
}
