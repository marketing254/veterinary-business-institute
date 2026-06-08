"use client";

import { useEffect, useRef } from "react";

const STAR_COLORS = [
  [255, 255, 255, 0.96],
  [231, 248, 242, 0.96],
  [183, 216, 192, 0.94],
  [47, 107, 69, 0.82],
];

function seededUnit(seed) {
  const value = Math.sin(seed * 12.9898) * 43758.5453123;
  return value - Math.floor(value);
}

export default function StarCloudBackdrop({
  starCount = 220,
  starSize = 2.4,
  cloudSize = 1200,
  baseSpeed = 0.9,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Build star data once
    const stars = Array.from({ length: starCount }, (_, i) => ({
      x: (seededUnit((i + 1) * 1.17) - 0.5) * cloudSize,
      y: (seededUnit((i + 1) * 2.31) - 0.5) * cloudSize,
      z: seededUnit((i + 1) * 3.53) * cloudSize,
      color: STAR_COLORS[Math.floor(seededUnit((i + 1) * 4.79) * STAR_COLORS.length)],
    }));

    const mouse = { x: 0, y: 0 };
    const center = { x: 0, y: 0 };
    let raf = null;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const isCompact = window.innerWidth <= 1024;
      center.x = canvas.width * (isCompact ? 0.5 : 0.72);
      center.y = canvas.height * (isCompact ? 0.34 : 0.48);
      mouse.x = center.x;
      mouse.y = center.y;
    }

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function draw() {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const dx = mouse.x - center.x;
      const dy = mouse.y - center.y;
      const distance = Math.sqrt(dx * dx + dy * dy) || 1;

      let moveX = 0, moveY = 0, moveZ = 0;
      const centerZone = 60;
      const transitionZone = 180;

      if (distance < centerZone) {
        moveZ = baseSpeed * 10;
      } else if (distance < centerZone + transitionZone) {
        const blend = (distance - centerZone) / transitionZone;
        const easedBlend = blend * blend * (3 - 2 * blend);
        moveZ = baseSpeed * 10 * (1 - easedBlend);
        const directionalSpeed = baseSpeed * (1200 / distance) * easedBlend;
        moveX = (-dx / distance) * directionalSpeed;
        moveY = (-dy / distance) * directionalSpeed;
      } else {
        const directionalSpeed = baseSpeed * (1200 / distance);
        moveX = (-dx / distance) * directionalSpeed;
        moveY = (-dy / distance) * directionalSpeed;
      }

      const cx = w / 2;
      const cy = h / 2;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.x += moveX;
        s.y += moveY;
        s.z += moveZ;

        if (s.x > cloudSize / 2) s.x = -cloudSize / 2;
        if (s.x < -cloudSize / 2) s.x = cloudSize / 2;
        if (s.y > cloudSize / 2) s.y = -cloudSize / 2;
        if (s.y < -cloudSize / 2) s.y = cloudSize / 2;
        if (s.z > cloudSize) s.z = 0;
        if (s.z < 0) s.z = cloudSize;

        const scale = 300 / (300 + s.z);
        const px = cx + s.x * scale;
        const py = cy + s.y * scale;
        const size = Math.max(0.5, starSize * scale);
        const opacity = Math.max(0.08, 1 - s.z / cloudSize);
        const [r, g, b] = s.color;

        ctx.beginPath();
        ctx.arc(px, py, size / 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [starCount, starSize, cloudSize, baseSpeed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="star-cloud-canvas"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}
