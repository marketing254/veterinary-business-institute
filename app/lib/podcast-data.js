/**
 * Build-time episode source for the podcast detail route.
 *
 * Merges the static seed (site-data.js) with the LIVE `podcasts` sheet so that
 * every episode in the sheet gets a real, pre-rendered page on each deploy
 * (good SEO + instant audio/notes/transcript). The seed is the resilient
 * fallback: if the sheet is unreachable at build time, the build still succeeds
 * with the seed episodes, and the client-side rescue in not-found.js covers any
 * sheet episode that isn't baked yet.
 *
 * NOTE: plain `fetch` (no `no-store`) on purpose — this runs at BUILD time for a
 * static export, so the result is fetched once per build and baked into HTML.
 */
import { episodes as seedEpisodes } from "./site-data";
import { gvizUrl, TABS } from "./sheets-config";
import { parseGviz, podcastSlug, docExportUrl, parseKeyNotes } from "./sheets-core";
import { normalizePodcast } from "./sheets-normalize";

async function fetchSheetEpisodes() {
  try {
    const res = await fetch(gvizUrl(TABS.podcasts));
    if (!res.ok) return [];
    const rows = parseGviz(await res.text());
    return rows
      .filter((r) => r.episode || r.title)
      .map(normalizePodcast)
      .filter((e) => e && (e.number || e.title));
  } catch (_) {
    return [];
  }
}

function keyOf(ep) {
  return String(ep.number || "").trim() || podcastSlug(ep);
}

// Sheet values win where present; the seed fills any gaps and survives a failed fetch.
function mergeEpisodes(seed, sheet) {
  const byKey = new Map();
  for (const ep of seed) byKey.set(keyOf(ep), { ...ep });
  for (const ep of sheet) {
    const k = keyOf(ep);
    const merged = { ...(byKey.get(k) || {}) };
    for (const [field, value] of Object.entries(ep)) {
      if (value != null && String(value).trim() !== "") merged[field] = value;
    }
    byKey.set(k, merged);
  }
  return [...byKey.values()].sort(
    (a, b) => (parseInt(b.number) || 0) - (parseInt(a.number) || 0)
  );
}

let _cache;
/** Memoized for the build process: seed ∪ sheet, newest first. */
export function getMergedEpisodes() {
  if (!_cache) {
    _cache = (async () => mergeEpisodes(seedEpisodes, await fetchSheetEpisodes()))();
  }
  return _cache;
}

/**
 * Fetch + parse an episode's "key notes" Google Doc at BUILD time so the
 * description + Key Takeaways are baked into the HTML (no client-side flash of
 * the short summary first). The server can read docs.google.com directly — no
 * Apps Script proxy needed (that exists only to dodge browser CORS). Returns
 * null on any failure, so the page falls back to the live client fetch.
 */
export async function fetchKeyNotes(keyNotesUrl) {
  const exportUrl = docExportUrl(keyNotesUrl);
  if (!exportUrl) return null;
  try {
    const res = await fetch(exportUrl);
    if (!res.ok) return null;
    const text = await res.text();
    if (!text || text.trim().startsWith("<")) return null; // HTML = not public / not a doc
    const parsed = parseKeyNotes(text);
    return parsed.paragraphs.length || parsed.takeaways.length ? parsed : null;
  } catch (_) {
    return null;
  }
}
