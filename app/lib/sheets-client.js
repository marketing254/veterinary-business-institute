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
