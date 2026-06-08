/**
 * SolarIcon — Solar Minimalistic icon system for VBI.
 *
 * All icons follow the exact Solar Minimalistic spec extracted from:
 * https://framer.com/m/Calendar-Minimalistic-YQAd.js
 *
 * Style: stroke-width 1.5, stroke-linecap round, stroke-linejoin round,
 *        fill none, viewBox 0 0 24 24, 24×24 base grid.
 */

const defaults = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const paths = {
  /* Calendar — the reference icon from the Framer asset */
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M3 9h18" />
      <path d="M8 2v2M16 2v2" />
    </>
  ),

  /* Microphone / Podcast */
  microphone: (
    <>
      <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
      <path d="M12 19v3M9 22h6" />
    </>
  ),

  /* Graduation cap / Education */
  graduationCap: (
    <>
      <path d="M12 3 2 8l10 5 10-5-10-5Z" />
      <path d="M6 10.5v5c2 2 8 2 12 0v-5" />
      <path d="M22 8v5" />
    </>
  ),

  /* Trophy / Award */
  trophy: (
    <>
      <path d="M6 4h12v6a6 6 0 0 1-12 0V4Z" />
      <path d="M4 4h2M18 4h2" />
      <path d="M4 7a2 2 0 0 1-2-2V4h2" />
      <path d="M20 7a2 2 0 0 0 2-2V4h-2" />
      <path d="M12 16v4M8 20h8" />
    </>
  ),

  /* Megaphone / Marketing */
  megaphone: (
    <>
      <path d="M3 10v4l3 1v-6l-3 1Z" />
      <path d="M6 11v2l4 1.5v-5L6 11Z" />
      <path d="M10 9.5v5L19 17V7l-9 2.5Z" />
      <path d="M7 15l1 4" />
    </>
  ),

  /* Bar chart / Growth */
  barChart: (
    <>
      <path d="M6 20v-6M12 20V4M18 20v-10" />
    </>
  ),

  /* Target circle / Goal */
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),

  /* Star / Achievement */
  star: (
    <>
      <path d="M12 2l2.9 5.9L21 9l-4.5 4.4 1.1 6.4L12 17l-5.6 2.8 1.1-6.4L3 9l6.1-1.1L12 2Z" />
    </>
  ),

  /* Video / Event Panels */
  video: (
    <>
      <rect x="2" y="6" width="14" height="12" rx="2" />
      <path d="M16 10l5-3v10l-5-3V10Z" />
    </>
  ),

  /* Play circle / Podcast episodes */
  playCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5l6 3.5-6 3.5V8.5Z" />
    </>
  ),

  /* Book open / Webinars */
  bookOpen: (
    <>
      <path d="M3 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14l-4-2-4 2V5Z" />
      <path d="M13 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14l-4-2-4 2V5Z" />
    </>
  ),

  /* Arrow right chevron / Navigation */
  arrowRight: (
    <>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </>
  ),

  /* Phone / Contact */
  phone: (
    <>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2C7 21 3 8.5 3 6a2 2 0 0 1 2-2Z" />
    </>
  ),

  /* Mail / Email */
  mail: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </>
  ),

  /* Map pin / Location */
  mapPin: (
    <>
      <path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7Z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),

  /* Link external */
  externalLink: (
    <>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6M10 14 21 3" />
    </>
  ),

  /* Check circle */
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),

  /* Users / Team / Community */
  users: (
    <>
      <path d="M16 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M8 21v-2a4 4 0 0 1 4-4h4" />
      <path d="M1 21v-2a4 4 0 0 1 4-4" />
      <circle cx="7" cy="7" r="4" />
    </>
  ),

  /* Globe / Digital/Web */
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
    </>
  ),
};

/**
 * Usage: <SolarIcon name="calendar" size={24} color="currentColor" strokeWidth={1.5} className="" />
 */
export default function SolarIcon({
  name,
  size = 24,
  color = "currentColor",
  strokeWidth = 1.5,
  className = "",
  style = {},
}) {
  const content = paths[name];
  if (!content) {
    console.warn(`SolarIcon: unknown icon "${name}"`);
    return null;
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
      role="presentation"
    >
      {content}
    </svg>
  );
}
