"use client";

import { Phone } from "lucide-react";
import { motion, useAnimation } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function AttractButton({
  className,
  href,
  children = "Free Strategy Call",
  particleCount = 12,
  attractRadius = 50,
  ...props
}) {
  const [isAttracting, setIsAttracting] = useState(false);
  const [particles, setParticles] = useState([]);
  const particlesControl = useAnimation();

  useEffect(() => {
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 360 - 180,
      y: Math.random() * 360 - 180,
    }));
    setParticles(newParticles);
  }, [particleCount]);

  const handleInteractionStart = useCallback(async () => {
    setIsAttracting(true);
    await particlesControl.start({
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 10,
      },
    });
  }, [particlesControl]);

  const handleInteractionEnd = useCallback(async () => {
    setIsAttracting(false);
    await particlesControl.start((i) => ({
      x: particles[i]?.x ?? 0,
      y: particles[i]?.y ?? 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    }));
  }, [particlesControl, particles]);

  const Tag = href ? "a" : "button";
  const linkProps = href
    ? { href, target: href.startsWith("http") ? "_blank" : undefined, rel: href.startsWith("http") ? "noreferrer" : undefined }
    : {};

  return (
    <Tag
      className={cn(
        "attract-btn",
        isAttracting && "is-attracting",
        className
      )}
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
      {...linkProps}
      {...props}
    >
      {particles.map((p, index) => (
        <motion.div
          key={p.id}
          className={cn(
            "attract-particle",
            isAttracting ? "opacity-100" : "opacity-40"
          )}
          custom={index}
          initial={{ x: p.x, y: p.y }}
          animate={particlesControl}
        />
      ))}
      <span className="attract-btn-inner">
        <Phone
          className={cn(
            "attract-btn-icon",
            isAttracting && "scale-110"
          )}
          size={16}
          strokeWidth={2}
        />
        {isAttracting ? "Let's Talk →" : children}
      </span>
    </Tag>
  );
}
