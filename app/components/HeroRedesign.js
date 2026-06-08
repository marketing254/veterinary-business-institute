"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./HeroRedesign.module.css";
import { withBasePath } from "../lib/base-path";
import { episodes } from "../lib/site-data";
import AttractButton from "./AttractButton";
import ConicGradientBorder from "./ConicGradientBorder";
import SolarIcon from "./SolarIcon";
import StarCloudBackdrop from "./StarCloudBackdrop";
import TypewriterText from "./TypewriterText";

const heroWords = [
  "stronger practices.",
  "healthier teams.",
  "clearer visibility.",
  "smarter growth.",
];

export default function HeroRedesign() {
  const sectionRef = useRef(null);
  const featuredEpisode = episodes?.[0] || { href: "/podcast" };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    let frame = 0;

    function updateHeroImageScroll() {
      frame = 0;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const progress = Math.min(1, Math.max(0, (viewportHeight - rect.top) / (rect.height + viewportHeight)));
      const compact = window.innerWidth <= 720;
      const imageShift = (progress - 0.5) * (compact ? 9 : 18);
      const imageTilt = (progress - 0.5) * (compact ? 2.2 : 4.4);
      const sheenShift = (progress - 0.5) * (compact ? 44 : 88);

      section.style.setProperty("--hero-image-shift", `${imageShift}%`);
      section.style.setProperty("--hero-image-tilt", `${imageTilt}deg`);
      section.style.setProperty("--hero-image-sheen-shift", `${sheenShift}px`);
    }

    function requestUpdate() {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateHeroImageScroll);
    }

    updateHeroImageScroll();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section className={styles.heroSection} ref={sectionRef}>
      <div className={styles.starCloudBackdrop} aria-hidden="true">
        <StarCloudBackdrop />
      </div>

      <svg className={`${styles.curvyGraph} ${styles.animatePath}`} viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path
          d="M0,50 Q150,90 250,50 T500,50 T750,50 T1000,50"
          fill="none"
          stroke="rgba(63, 123, 79, 0.4)"
          strokeWidth="2"
          strokeDasharray="8 8"
        />
        <circle cx="250" cy="50" r="6" fill="#2f6b45" />
        <circle cx="500" cy="50" r="6" fill="#2f6b45" />
        <text className={styles.animateFade} x="240" y="30" fontSize="12" fill="#2f6b45" fontWeight="bold">
          90%
        </text>
      </svg>

      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <span
            className={`${styles.eyebrow} ${styles.animateReveal}`}
            style={{ color: "var(--teal-500)", marginBottom: "1rem", display: "block", fontWeight: 700, "--delay": "0.1s" }}
          >
            For Veterinary Leaders Ready to Grow
          </span>
          <h1 className={`${styles.headline} ${styles.animateReveal}`} style={{ "--delay": "0.3s" }}>
            <span className={styles.headlineStatic}>Practical insight for veterinary teams building</span>
            <span className={styles.typewriterFrame}>
              <TypewriterText
                words={heroWords}
                typingSpeed={88}
                deletingSpeed={54}
                pauseDuration={1400}
                className={styles.typewriterWord}
                cursorClassName={styles.typewriterCursor}
              />
            </span>
          </h1>
          <p className={`${styles.description} ${styles.animateReveal}`} style={{ "--delay": "0.5s" }}>
            Veterinary Business Institute now centers its strongest assets in one place: podcast conversations, event
            panel replays, webinar education, and strategy content.
          </p>

          <div className={`${styles.buttonGroup} ${styles.animateReveal}`} style={{ "--delay": "0.7s" }}>
            <ConicGradientBorder
              borderColor="#2f6b45"
              overlayBorderColor="rgba(47, 107, 69, 0.2)"
              backgroundColor="rgba(255, 255, 255, 0.03)"
              borderRadius={50}
              animationDuration={4}
              blurRadius={3}
              overlayMargin={1.5}
            >
              <Link href="/community" className={styles.getStartedBtn}>
                <span className={styles.primaryButtonLabel}>Explore the Hub</span>
                <span aria-hidden="true" className={styles.primaryButtonArrow}>
                  <span className={styles.primaryButtonChevron} />
                </span>
              </Link>
            </ConicGradientBorder>
            <AttractButton href="/consultation">
              Free Strategy Call
            </AttractButton>
          </div>

          <div className={`${styles.trustedSection} ${styles.animateReveal}`} style={{ "--delay": "0.9s" }}>
            <span className={styles.trustedLabel}>Core Pillars</span>
            <div className={styles.logoRow}>
              <div className={styles.logoBrand} title="Education">
                <SolarIcon name="graduationCap" size={20} />
              </div>
              <div className={styles.logoBrand} title="Podcast">
                <SolarIcon name="microphone" size={20} />
              </div>
              <div className={styles.logoBrand} title="Event Panels">
                <SolarIcon name="video" size={20} />
              </div>
              <div className={styles.logoBrand} title="Growth Strategy">
                <SolarIcon name="barChart" size={20} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.heroVisuals}>
          <div className={styles.circleWire1}></div>
          <div className={styles.circleWire2}></div>

          <div className={`${styles.mainCircle} ${styles.animateReveal}`} style={{ "--delay": "0.8s" }}>
            <div className={styles.heroImageMask}>
              <img src={withBasePath("/assets/hero-vet.png")} alt="Veterinary Professional" className={styles.personImg} />
              <span aria-hidden="true" className={styles.heroImageSheen} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
