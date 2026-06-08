"use client";

import { useRef, useEffect, useState } from "react";

/**
 * ConicGradientBorder — a rotating conic-gradient border effect.
 * Inspired by the Framer "Conic Gradient Component" by @7VxZ.
 * Re-implemented as a pure React / CSS component (no framer-motion dep).
 */
export default function ConicGradientBorder({
  children,
  borderColor = "#2f6b45",
  animationDuration = 4,
  blurRadius = 2,
  borderRadius = 50,
  backgroundColor = "rgba(255, 255, 255, 0.06)",
  overlayBorderColor = "rgba(47, 107, 69, 0.25)",
  overlayMargin = 1.5,
  className = "",
  style = {},
}) {
  const id = useRef(`conic-${Math.random().toString(36).slice(2, 8)}`);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: `${borderRadius}px`,
        minWidth: "12px",
        minHeight: "12px",
        ...style,
      }}
    >
      {/* Spinning conic gradient layer */}
      <div
        style={{
          position: "absolute",
          top: "-450%",
          left: 0,
          right: 0,
          bottom: 0,
          height: "1000%",
          background: `conic-gradient(transparent 200deg, ${borderColor})`,
          borderRadius: `${borderRadius}px`,
          zIndex: 1,
          animation: `conicSpin ${animationDuration}s linear infinite`,
        }}
      />

      {/* Inner overlay / frosted glass fill */}
      <div
        style={{
          position: "absolute",
          top: `${overlayMargin}px`,
          left: `${overlayMargin}px`,
          right: `${overlayMargin}px`,
          bottom: `${overlayMargin}px`,
          backdropFilter: `blur(${blurRadius}px)`,
          WebkitBackdropFilter: `blur(${blurRadius}px)`,
          backgroundColor,
          border: `1px solid ${overlayBorderColor}`,
          borderRadius: `${Math.max(0, borderRadius - overlayMargin)}px`,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Content (buttons etc.) */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

