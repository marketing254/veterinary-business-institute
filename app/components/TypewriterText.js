"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../../lib/utils";

export default function TypewriterText({
  words = [],
  typingSpeed = 95,
  deletingSpeed = 55,
  pauseDuration = 1200,
  className,
  cursorClassName,
}) {
  const items = useMemo(() => words.filter(Boolean), [words]);
  const normalizedWords = useMemo(
    () => items.map((item) => (typeof item === "string" ? { word: item } : item)),
    [items]
  );
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const timeoutRef = useRef(null);
  const blinkRef = useRef(null);

  const currentWord = normalizedWords.length
    ? normalizedWords[wordIndex % normalizedWords.length].word
    : "";
  const maxLength = useMemo(
    () =>
      normalizedWords.reduce(
        (longest, item) => Math.max(longest, item.word.length),
        1
      ),
    [normalizedWords]
  );

  useEffect(() => {
    if (!normalizedWords.length) {
      return undefined;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!isDeleting && charIndex < currentWord.length) {
      timeoutRef.current = window.setTimeout(() => {
        setDisplayed(currentWord.slice(0, charIndex + 1));
        setCharIndex((value) => value + 1);
      }, typingSpeed);
    } else if (!isDeleting && charIndex === currentWord.length) {
      timeoutRef.current = window.setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting && charIndex > 0) {
      timeoutRef.current = window.setTimeout(() => {
        setDisplayed(currentWord.slice(0, charIndex - 1));
        setCharIndex((value) => value - 1);
      }, deletingSpeed);
    } else if (isDeleting && charIndex === 0) {
      timeoutRef.current = window.setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((value) => (value + 1) % normalizedWords.length);
      }, pauseDuration);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    charIndex,
    currentWord,
    deletingSpeed,
    isDeleting,
    normalizedWords.length,
    pauseDuration,
    typingSpeed,
  ]);

  useEffect(() => {
    if (!isDeleting) {
      setCharIndex(0);
      setDisplayed("");
    }
  }, [wordIndex, isDeleting]);

  useEffect(() => {
    blinkRef.current = window.setInterval(() => {
      setShowCursor((value) => !value);
    }, 520);

    return () => {
      if (blinkRef.current) {
        clearInterval(blinkRef.current);
      }
    };
  }, []);

  return (
    <span
      aria-live="polite"
      className={cn("typewriter-inline", className)}
      style={{ minWidth: `${maxLength}ch` }}
    >
      <span>{displayed}</span>
      <span
        aria-hidden="true"
        className={cn("typewriter-cursor", cursorClassName)}
        style={{ opacity: showCursor ? 1 : 0 }}
      />
    </span>
  );
}
