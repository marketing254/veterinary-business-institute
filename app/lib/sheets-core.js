/**
 * Isomorphic helpers for parsing the Google Sheets gviz response and for
 * normalizing values. Safe to import from both server and client code.
 */

function cellValue(cell) {
  if (!cell) return "";
  // Prefer the formatted value (cell.f) for dates and numbers — gviz returns
  // dates as `Date(YYYY,M,D)` in `v` and the human-readable form in `f`.
  if (cell.f !== undefined && cell.f !== null && cell.f !== "") {
    return String(cell.f).trim();
  }
  if (cell.v === null || cell.v === undefined) return "";
  return String(cell.v).trim();
}

/** Parse a raw gviz response body into an array of header-keyed row objects. */
export function parseGviz(text) {
  if (!text) return [];
  const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\)/);
  if (!match) return [];

  let json;
  try {
    json = JSON.parse(match[1]);
  } catch (_) {
    return [];
  }
  if (!json.table || !json.table.cols) return [];

  const cols = json.table.cols.map((c) => (c.label || "").trim());

  return (json.table.rows || [])
    .filter(
      (row) =>
        row.c &&
        row.c.some(
          (cell) =>
            cell && (cell.v !== null || (cell.f !== undefined && cell.f !== ""))
        )
    )
    .map((row) => {
      const obj = {};
      row.c.forEach((cell, i) => {
        if (cols[i]) obj[cols[i]] = cellValue(cell);
      });
      return obj;
    });
}

/** Tolerant column getter — matches header names case/space/punctuation-insensitively. */
export function pick(row, names) {
  if (!row) return "";
  const keys = Object.keys(row);
  const norm = (v) => String(v || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  for (const name of names) {
    const direct = row[name];
    if (direct !== undefined && direct !== null && String(direct).trim() !== "")
      return String(direct).trim();
    const wanted = norm(name);
    const key = keys.find((k) => norm(k) === wanted);
    if (key && row[key] !== undefined && String(row[key]).trim() !== "")
      return String(row[key]).trim();
  }
  return "";
}

/** Parse a gviz `Date(YYYY,M,D)` token OR a plain ISO/text date into a Date. */
export function parseSheetDate(str) {
  if (!str) return null;
  const m = String(str).match(/^Date\((\d+),(\d+),(\d+)/);
  if (m) return new Date(parseInt(m[1]), parseInt(m[2]), parseInt(m[3]));
  const d = new Date(str);
  return isNaN(d.getTime()) ? null : d;
}

/** "April 21, 2026" — empty string if unparseable. Passes through nice text dates. */
export function formatSheetDate(str) {
  const d = parseSheetDate(str);
  if (!d) return String(str || "").trim();
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** kebab-case slug, capped, safe for URLs. */
export function slugify(value) {
  return (
    String(value || "item")
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 72) || "item"
  );
}

/**
 * Convert any Google Drive share URL into a directly-embeddable image URL.
 * Non-Drive URLs (including local /assets paths) pass through unchanged.
 */
export function driveImageUrl(url, sizePx = 1200) {
  if (!url) return "";
  const trimmed = String(url).trim();
  if (!trimmed) return "";
  if (trimmed.includes("googleusercontent.com")) return trimmed;
  if (!trimmed.includes("drive.google.com")) return trimmed;

  const patterns = [/\/file\/d\/([\w-]{20,})/, /[?&]id=([\w-]{20,})/, /\/d\/([\w-]{20,})/];
  let id = "";
  for (const p of patterns) {
    const m = trimmed.match(p);
    if (m) {
      id = m[1];
      break;
    }
  }
  if (!id) return trimmed;
  return `https://lh3.googleusercontent.com/d/${id}=w${sizePx}`;
}

/**
 * Turn a Google Drive file link into a direct-streamable URL (for <audio>/<video>).
 * Non-Drive URLs (e.g. a libsyn .mp3) pass through unchanged.
 */
export function driveFileUrl(url) {
  if (!url) return "";
  const trimmed = String(url).trim();
  if (!trimmed || !trimmed.includes("drive.google.com")) return trimmed;
  const m =
    trimmed.match(/\/file\/d\/([\w-]{20,})/) ||
    trimmed.match(/[?&]id=([\w-]{20,})/) ||
    trimmed.match(/\/d\/([\w-]{20,})/);
  return m ? `https://drive.google.com/uc?export=download&id=${m[1]}` : trimmed;
}

/** Turn a Vimeo share/review URL into a player embed URL. */
export function vimeoEmbed(url) {
  if (!url) return "";
  const raw = String(url).trim();
  const idMatch =
    raw.match(/player\.vimeo\.com\/video\/(\d+)/i) ||
    raw.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (!idMatch) return raw;
  const id = idMatch[1];
  const hParam = raw.match(/[?&]h=([^&]+)/i);
  const pathHash = raw.match(/vimeo\.com\/\d+\/([A-Za-z0-9]+)/i);
  const hash = hParam ? hParam[1] : pathHash ? pathHash[1] : "";
  return `https://player.vimeo.com/video/${id}${hash ? `?h=${encodeURIComponent(hash)}` : ""}`;
}
