/**
 * Brand icons for podcast listening platforms.
 *
 * Each known platform renders as its real, self-coloured brand tile (a purple
 * Apple Podcasts squircle, a red YouTube Music disc, etc.) so it reads correctly
 * on BOTH light and dark backgrounds without any theme-specific CSS. Unknown
 * platforms fall back to a neutral microphone that uses `currentColor`, so it
 * still adapts to the surrounding text colour in either mode.
 */
export default function PlatformIcon({ label, size = 28 }) {
  const l = (label || "").toLowerCase();
  const common = { width: size, height: size, viewBox: "0 0 24 24" };

  // ── Apple Podcasts ──────────────────────────────────────────────
  if (l.includes("apple")) {
    return (
      <svg {...common} role="img" aria-label="Apple Podcasts">
        <defs>
          <linearGradient id="vbi-apple-pod" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#822CBE" />
            <stop offset="1" stopColor="#D772FB" />
          </linearGradient>
        </defs>
        <rect width="24" height="24" rx="5.4" fill="url(#vbi-apple-pod)" />
        {/* head */}
        <circle cx="12" cy="7.5" r="2.35" fill="#fff" />
        {/* shoulders arc */}
        <path
          fill="#fff"
          d="M12 11.1c-2.5 0-4.3 1.85-4.3 4 0 .62.5 1.05 1.1 1.05.52 0 .92-.34 1.06-.85.3-1.16 1.12-1.95 2.14-1.95s1.84.79 2.14 1.95c.14.51.54.85 1.06.85.6 0 1.1-.43 1.1-1.05 0-2.15-1.8-4-4.3-4z"
        />
        {/* body */}
        <path
          fill="#fff"
          d="M12 16c-1.35 0-2.3 1.05-1.95 2.4.22.82.99 1.55 1.95 1.55s1.73-.73 1.95-1.55C14.3 17.05 13.35 16 12 16z"
        />
      </svg>
    );
  }

  // ── YouTube Music (red disc) vs YouTube (red rounded rect) ──────
  if (l.includes("youtube") || l.includes("you tube")) {
    if (l.includes("music")) {
      return (
        <svg {...common} role="img" aria-label="YouTube Music">
          <circle cx="12" cy="12" r="11" fill="#FF0000" />
          <circle cx="12" cy="12" r="6.9" fill="none" stroke="#fff" strokeWidth="1.2" />
          <path fill="#fff" d="M10.2 8.9 15.1 12l-4.9 3.1z" />
        </svg>
      );
    }
    return (
      <svg {...common} role="img" aria-label="YouTube">
        <rect x="1" y="5" width="22" height="14" rx="4.2" fill="#FF0000" />
        <path fill="#fff" d="M10 8.5v7l6-3.5z" />
      </svg>
    );
  }

  // ── Spotify ─────────────────────────────────────────────────────
  if (l.includes("spotify")) {
    return (
      <svg {...common} role="img" aria-label="Spotify">
        <circle cx="12" cy="12" r="11" fill="#1DB954" />
        <g fill="none" stroke="#fff" strokeLinecap="round">
          <path strokeWidth="1.7" d="M6.7 9.5c3.3-1 7-.7 9.9 1.1" />
          <path strokeWidth="1.45" d="M7.4 12.5c2.7-.8 5.8-.5 8.2 1" />
          <path strokeWidth="1.2" d="M8 15.2c2.1-.6 4.4-.4 6.4.8" />
        </g>
      </svg>
    );
  }

  // ── Fallback: neutral mic (adapts to theme via currentColor) ────
  return (
    <svg {...common} fill="currentColor" aria-hidden="true">
      <path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3zm7 9a7 7 0 0 1-6 6.92V21h-2v-3.08A7 7 0 0 1 5 11h2a5 5 0 0 0 10 0h2z" />
    </svg>
  );
}
