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
 * Fetch a Google-Doc's plain-text export at BUILD time. The server can read
 * docs.google.com directly (no Apps Script proxy needed — that only exists to
 * dodge browser CORS). Hard-guarded so the build can never hang or throw:
 *   • returns "" immediately if the URL isn't a valid Google-Doc link
 *   • aborts after `timeoutMs` (default 15s) so one slow doc can't stall a build
 *   • returns "" on any non-OK response, network error, or when Google serves an
 *     HTML login/error page (i.e. the doc isn't shared publicly)
 * Never throws — callers get "" and gracefully fall back to the live client fetch.
 */
async function fetchDocText(url, timeoutMs = 15000) {
  const exportUrl = docExportUrl(url);
  if (!exportUrl) return "";
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(exportUrl, { signal: controller.signal });
    if (!res.ok) return "";
    const text = await res.text();
    // A leading "<" means Google returned HTML (not-public / not a doc), not text.
    if (!text || text.trim().startsWith("<")) return "";
    return text;
  } catch (_) {
    return "";
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Fetch + parse the "key notes" Google Doc (description + Key Takeaways) so it's
 * baked into the HTML with no client-side flash. Returns null on any failure.
 */
export async function fetchKeyNotes(keyNotesUrl) {
  const text = await fetchDocText(keyNotesUrl);
  if (!text) return null;
  const parsed = parseKeyNotes(text);
  return parsed.paragraphs.length || parsed.takeaways.length ? parsed : null;
}

/**
 * Fetch the raw transcript Google-Doc text so the full transcript is baked into
 * the server HTML (crawlable + citable by AI, indexable by Google). Returns ""
 * on any failure, so the component falls back to the live client fetch.
 */
export async function fetchTranscriptText(transcriptUrl) {
  return fetchDocText(transcriptUrl);
}
