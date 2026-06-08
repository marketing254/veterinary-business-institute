/**
 * Central config for the VET Google Sheets backend.
 *
 * The site reads dynamic content from the Google Sheet via the public gviz
 * endpoint (browser-side, instant) and renders build-time defaults from
 * site-data.js for SEO/first paint. Only the tabs below are dynamic.
 *
 * ONE-TIME: Sheet → Share → "Anyone with the link = Viewer" (gviz reads need it).
 */

// VET — Website Data
export const SHEET_ID = "1xRjdnkT9pt82s1LAnxuZKvSgleWYSS-1YWBED-hNGX0";

// Apps Script /exec — only needed once forms are switched on (currently blocked).
export const APPS_SCRIPT_URL =
  process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ||
  "https://script.google.com/macros/s/PASTE_VET_EXEC_ID/exec";

// The ONLY tabs that are dynamic (must match the sheet tab names exactly).
export const TABS = {
  podcasts: "podcasts",
  eventPanels: "event-panels",
  events: "events",
  reviews: "reviews",
  experts: "experts",
  caseStudies: "case-studies",
  faqs: "faqs",
};

export const gvizUrl = (sheetName) =>
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&headers=1&sheet=${encodeURIComponent(
    sheetName
  )}`;
