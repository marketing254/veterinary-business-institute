"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("vbi-cookie-consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("vbi-cookie-consent", "true");
    // Notify <Analytics /> so tracking can load immediately, without a reload.
    window.dispatchEvent(new Event("vbi-consent-change"));
    setShow(false);
  };

  const declineCookies = () => {
    localStorage.setItem("vbi-cookie-consent", "declined");
    window.dispatchEvent(new Event("vbi-consent-change"));
    setShow(false);
  };

  if (!show) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "#102320",
      color: "#ffffff",
      padding: "1rem 1.5rem",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      gap: "1.5rem",
      zIndex: 100,
      width: "calc(100% - 40px)",
      maxWidth: "800px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
      justifyContent: "space-between",
      flexWrap: "wrap"
    }}>
      <p style={{ margin: 0, fontSize: "0.95rem", flex: "1 1 auto" }}>
        We use cookies to improve your experience, analyze local visibility trends, and suggest the right content for your practice.
      </p>
      <div style={{ display: "flex", gap: "0.75rem", flexShrink: 0 }}>
        <button 
          onClick={declineCookies} 
          style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", padding: "0.5rem 1rem", borderRadius: "8px", cursor: "pointer" }}
        >
          Decline
        </button>
        <button 
          onClick={acceptCookies} 
          style={{ background: "#2f6b45", border: "none", color: "#fff", padding: "0.5rem 1rem", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
