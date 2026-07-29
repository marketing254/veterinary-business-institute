/**
 * Build-time source for the webinar-replay and summit-replay routes.
 *
 * Both content types share the event-panels schema (Vimeo video + Google-Doc
 * description + Google-Doc transcript + Drive thumbnail), so they reuse
 * `normalizeEventPanel`. Mirrors podcast-data.js: merge the static seed with the
 * LIVE sheet so every replay in the sheet gets a real pre-rendered page each
 * deploy, with the seed as a resilient fallback if the sheet is unreachable.
 */
import { webinarReplaysSeed, summitReplaysSeed } from "./replays-seed";
import { REPLAY_KINDS } from "./replays-kinds";
import { gvizUrl } from "./sheets-config";
import { parseGviz, slugify } from "./sheets-core";
import { normalizeEventPanel } from "./sheets-normalize";

const SEED_BY_KIND = { webinar: webinarReplaysSeed, summit: summitReplaysSeed };

export { REPLAY_KINDS };

async function fetchSheetReplays(tab) {
  try {
    const res = await fetch(gvizUrl(tab));
    if (!res.ok) return [];
    return parseGviz(await res.text())
      .filter((r) => r.title)
      .map(normalizeEventPanel)
      .filter((r) => r && r.title);
  } catch (_) {
    return [];
  }
}

const keyOf = (r) => (r.slug && r.slug !== "item" ? r.slug : slugify(r.title));

// Sheet values win where present; the seed fills gaps and survives a failed fetch.
function merge(seed, sheet) {
  const byKey = new Map();
  for (const r of seed) byKey.set(keyOf(r), { ...r });
  for (const r of sheet) {
    const k = keyOf(r);
    const merged = { ...(byKey.get(k) || {}) };
    for (const [field, value] of Object.entries(r)) {
      if (value != null && String(value).trim() !== "") merged[field] = value;
    }
    byKey.set(k, merged);
  }
  return [...byKey.values()].sort((a, b) => (new Date(b.date).getTime() || 0) - (new Date(a.date).getTime() || 0));
}

const _cache = {};
/** Memoized per kind for the build: seed ∪ sheet, newest first. */
export function getReplays(kind) {
  const cfg = REPLAY_KINDS[kind];
  if (!cfg) return Promise.resolve([]);
  if (!_cache[kind]) {
    _cache[kind] = (async () => merge(SEED_BY_KIND[kind] || [], await fetchSheetReplays(cfg.tab)))();
  }
  return _cache[kind];
}
