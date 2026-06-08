"use client";

import React, { useState } from "react";
import Link from "next/link";
import SolarIcon from "./SolarIcon";

/**
 * GlassyButton — A high-precision skeuomorphic button.
 * EXACT RECREATION of the reference image provided.
 */
export default function GlassyButton({ href, iconName, label, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  // Proportions from image (very rounded square)
  const size = 56;
  const radius = 18;

  const containerStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    textDecoration: "none",
    transition: "transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)",
    transform: pressed ? "scale(0.95)" : hovered ? "scale(1.02)" : "scale(1)"
  };

  const outerStyle = {
    width: size,
    height: size,
    borderRadius: radius,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // Base Surface Color (Matches the matte gray in reference)
    backgroundColor: "#cfcfcf",
    // 1. Thick Top Rim Highlight (High Intensity white)
    // 2. Diffuse Drop Shadows (Soft stack)
    borderTop: "2px solid rgba(255, 255, 255, 0.95)",
    borderLeft: "1px solid rgba(255, 255, 255, 0.4)",
    borderRight: "1px solid rgba(0, 0, 0, 0.05)",
    borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
    boxShadow: active 
      ? "0 4px 12px rgba(47, 107, 69, 0.3), inset 0 2px 4px rgba(0,0,0,0.1)"
      : `
        0 10px 20px rgba(0, 0, 0, 0.12), 
        0 4px 6px rgba(0, 0, 0, 0.08),
        inset 0 -1px 2px rgba(0, 0, 0, 0.1)
      `,
    transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
    overflow: "hidden"
  };

  return (
    <Link 
      href={href} 
      className={`glassy-button-wrapper ${active ? 'is-active' : ''}`}
      style={containerStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onClick={onClick}
    >
      <div style={outerStyle}>
        {/* Grain Noise Overlay (SVG Filter) */}
        <div style={{
          position: "absolute",
          inset: 0,
          opacity: 0.12,
          pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }} />

        {/* Global surface Gradient for 3D feel */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.05) 100%)",
          pointerEvents: "none"
        }} />

        {/* Active state highlight glow */}
        {active && (
          <div style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at center, rgba(47, 107, 69, 0.15) 0%, transparent 70%)"
          }} />
        )}

        {/* Icon Shadow Displacement (The "Emboss" effect) */}
        {/* Displacement Shadow (White highlight beneath icon) */}
        <div style={{
          position: "absolute",
          left: "50%",
          top: "50.5%", // Subtle offset downwards
          transform: "translate(-50%, -50%)",
          opacity: active ? 0 : 0.8,
          pointerEvents: "none",
          transition: "all 0.3s ease",
          zIndex: 1
        }}>
          <SolarIcon 
            name={iconName} 
            size={26} 
            strokeWidth={2} 
            style={{ color: "rgba(255, 255, 255, 0.9)" }} 
          />
        </div>

        {/* Main Icon */}
        <div style={{
          position: "relative",
          zIndex: 2,
          transition: "all 0.2s ease",
          transform: pressed ? "scale(0.92)" : "scale(1)",
          filter: active ? "drop-shadow(0 0 2px rgba(255,255,255,0.5))" : "none"
        }}>
          <SolarIcon 
            name={iconName} 
            size={26} 
            strokeWidth={2} 
            style={{ color: active ? "var(--teal-600)" : "#222" }} 
          />
        </div>
      </div>
      
      <span className="glassy-label">{label}</span>

      <style jsx>{`
        .glassy-label {
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--teal-600);
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          opacity: ${active || hovered ? 1 : 0};
          transform: translateY(${active || hovered ? '0px' : '4px'});
          pointer-events: none;
          position: absolute;
          bottom: -22px;
          white-space: nowrap;
        }
      `}</style>
    </Link>
  );
}

