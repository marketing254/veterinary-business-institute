/**
 * Client-side (browser) Google Sheets fetchers for the 7 dynamic VET surfaces.
 * Live, uncached reads via gviz so the site reflects sheet edits on the next
 * visit with no rebuild. Components seed initial state from site-data.js
 * (build-time defaults) and swap in these results via the useLive hook.
 */
"use client";

import { gvizUrl, TABS } from "./sheets-config";
import { parseGviz } from "./sheets-core";
import {
  normalizePodcast,
  normalizeEventPanel,
  normalizeEvent,
  normalizeSpeaker,
  normalizeReview,
  normalizeTeamMember,
  normalizeCaseStudy,
  normalizeFaq,
} from "./sheets-normalize";

async function fetchTab(tab) {
  try {
    const res = await fetch(gvizUrl(tab), { cache: "no-store" });
    if (!res.ok) return [];
    return parseGviz(await res.text());
  } catch (_) {
    return [];
  }
}

const map = (rows, fn, keep) => rows.filter(keep).map(fn).filter(Boolean);

export async function fetchPodcasts() {
  return map(await fetchTab(TABS.podcasts), normalizePodcast, (r) => r.episode || r.title).sort(
    (a, b) => (parseInt(b.number) || 0) - (parseInt(a.number) || 0)
  );
}
export async function fetchEventPanels() {
  return map(await fetchTab(TABS.eventPanels), normalizeEventPanel, (r) => r.title);
}
// Webinar & summit replays share the event-panels schema (Vimeo + Google-Doc
// description/transcript + Drive thumbnail); newest first for the listing.
const byDateDesc = (a, b) => (new Date(b.date).getTime() || 0) - (new Date(a.date).getTime() || 0);
export async function fetchWebinarReplays() {
  return map(await fetchTab(TABS.webinarReplays), normalizeEventPanel, (r) => r.title).sort(byDateDesc);
}
export async function fetchSummitReplays() {
  return map(await fetchTab(TABS.summitReplays), normalizeEventPanel, (r) => r.title).sort(byDateDesc);
}
const byDateAsc = (a, b) =>
  (new Date(a.dateIso).getTime() || 0) - (new Date(b.dateIso).getTime() || 0);

export async function fetchEvents() {
  // Soonest-first so the page can show the next upcoming event as [0].
  return map(await fetchTab(TABS.events), normalizeEvent, (r) => r.title).sort(byDateAsc);
}
export async function fetchWebinars() {
  // Webinars share the events schema (date_iso, register_url, "Name : link" images).
  return map(await fetchTab(TABS.webinars), normalizeEvent, (r) => r.title).sort(byDateAsc);
}
export async function fetchSpeakers() {
  return map(await fetchTab(TABS.featuredSpeakers), normalizeSpeaker, (r) => r.name);
}
export async function fetchReviews() {
  return map(await fetchTab(TABS.reviews), normalizeReview, (r) => r.reviewer_name || r.review_text);
}
export async function fetchTeam() {
  return map(await fetchTab(TABS.experts), normalizeTeamMember, (r) => r.name);
}
export async function fetchCaseStudies() {
  return map(await fetchTab(TABS.caseStudies), normalizeCaseStudy, (r) => r.clinic);
}
export async function fetchFaqs() {
  return map(await fetchTab(TABS.faqs), normalizeFaq, (r) => r.question);
}
