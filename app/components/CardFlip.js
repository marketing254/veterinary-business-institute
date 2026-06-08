"use client";

import { ArrowRight, Repeat2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function CardFlip({
  title = "Design Systems",
  subtitle = "Explore the fundamentals",
  description = "Dive deep into the world of modern UI/UX design.",
  features = ["UI/UX", "Modern Design", "Tailwind CSS", "Kokonut UI"],
  ctaLabel = "Learn more",
  ctaHref,
  accent = "teal",
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const accentColor = accent === "teal" ? "var(--teal-500)" : accent;

  return (
    <div
      className="card-flip-wrap"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className={cn("card-flip-inner", isFlipped && "is-flipped")}>
        {/* Front */}
        <div className={cn("card-flip-face card-flip-front", isFlipped && "is-hidden")}>
          <div className="card-flip-front-bg">
            <div className="card-flip-rings">
              {[...Array(8)].map((_, i) => (
                <div className="card-flip-ring" key={i} style={{ animationDelay: `${i * 0.35}s` }} />
              ))}
            </div>
          </div>
          <div className="card-flip-front-content">
            <div className="card-flip-front-text">
              <h3 className="card-flip-title">{title}</h3>
              <p className="card-flip-subtitle">{subtitle}</p>
            </div>
            <Repeat2 size={16} style={{ color: accentColor, flexShrink: 0 }} />
          </div>
        </div>

        {/* Back */}
        <div className={cn("card-flip-face card-flip-back", isFlipped && "is-visible")}>
          <div className="card-flip-back-top">
            <h3 className="card-flip-title">{title}</h3>
            <p className="card-flip-desc">{description}</p>
          </div>
          <div className="card-flip-features">
            {features.map((feature, index) => (
              <div
                className="card-flip-feature"
                key={feature}
                style={{
                  transform: isFlipped ? "translateX(0)" : "translateX(-10px)",
                  opacity: isFlipped ? 1 : 0,
                  transitionDelay: `${index * 100 + 200}ms`,
                }}
              >
                <ArrowRight size={12} style={{ color: accentColor, flexShrink: 0 }} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          {ctaHref && (
            <div className="card-flip-cta">
              <a href={ctaHref} className="card-flip-cta-link">
                <span>{ctaLabel}</span>
                <ArrowRight size={14} style={{ color: accentColor }} />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
