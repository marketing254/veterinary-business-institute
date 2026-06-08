"use client";

import { useRef, useState, useCallback } from "react";

/**
 * ParallaxCard — 3D mouse-tracking tilt with glare effect.
 *
 * Ported from the Framer ParallaxCardGrid component:
 * https://framer.com/m/ParallaxCardGrid-Mrje.js
 *
 * Works as a drop-in wrapper for any card element.
 * Uses no framer-motion — pure CSS transforms + React state.
 */
export default function ParallaxCard({
  children,
  className = "",
  style = {},
  tiltDepth = 8,
  shadowStrength = 0.1,
  enableGlare = true,
  as: Tag = "div",
}) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [hovered, setHovered] = useState(false);
  const rafRef = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      if (!cardRef.current) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        setTilt({ x: y * tiltDepth, y: -x * tiltDepth }); // rotateX, rotateY
        setGlare({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
          opacity: 0.12,
        });
      });
    },
    [tiltDepth]
  );

  const handleMouseEnter = useCallback(() => setHovered(true), []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlare((g) => ({ ...g, opacity: 0 }));
  }, []);

  const transform = hovered
    ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px) scale(1.01)`
    : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";

  const boxShadow = hovered
    ? `0 24px 48px rgba(0,0,0,${shadowStrength * 1.8}), 0 8px 16px rgba(0,0,0,${shadowStrength})`
    : `0 8px 24px rgba(0,0,0,${shadowStrength})`;

  return (
    <Tag
      ref={cardRef}
      className={className}
      style={{
        ...style,
        transformStyle: "preserve-3d",
        transform,
        boxShadow,
        transition:
          "transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s cubic-bezier(0.22,1,0.36,1)",
        position: "relative",
        overflow: "hidden",
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glare overlay */}
      {enableGlare && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 55%)`,
            pointerEvents: "none",
            zIndex: 9,
            borderRadius: "inherit",
            transition: "opacity 0.2s ease",
          }}
        />
      )}
      {children}
    </Tag>
  );
}
