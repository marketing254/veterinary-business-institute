/**
 * Transcript parsing — shared by the podcast and replay transcript components.
 * Isomorphic (no browser APIs) so it can also run at build time.
 *
 * Accepts these formats:
 *   • range:        "[00:00:00.080 --> 00:01:55.080] Speaker: text…"
 *   • single:       "[00:00:00] Speaker: text…"  (also [MM:SS])
 *   • inline label: no timestamps, "Speaker: text…" one turn per line
 *   • stacked:      a speaker name on its own line, then its paragraph(s) below
 * Returns an array of { time, speaker, text } segments.
 */

// "Speaker Name:" at the start of a line → {speaker, text}. Speaker must be a
// short label (≤ 4 words), not a whole sentence that happens to contain a colon.
export function speakerColon(line) {
  const m = String(line).match(/^([A-Za-z][\w .'&-]{0,40}?):\s+(.+)$/);
  if (!m || m[1].trim().split(/\s+/).length > 4) return null;
  return { speaker: m[1].trim(), text: m[2].trim() };
}

// A line that looks like a bare speaker label: short, title-cased, no trailing
// sentence punctuation (so a real sentence is never mistaken for a name).
export function looksLikeNameLine(t) {
  if (!t || t.length > 45) return false;
  if (/[.!?,;:"”'’]$/.test(t)) return false;
  const words = t.split(/\s+/);
  if (words.length > 5) return false;
  const caps = words.filter((w) => /^[A-Z0-9]/.test(w)).length;
  return caps >= words.length - 1; // allow one lowercase particle (de, van, …)
}

// Transcript with NO timestamps but speaker labels (inline or stacked).
function parseSpeakerOnly(clean) {
  const nonEmpty = clean.split(/\n/).map((l) => l.trim()).filter(Boolean);

  // 1) Inline "Name: text" format.
  const colonHits = nonEmpty.filter((l) => speakerColon(l)).length;
  if (colonHits >= 2 && colonHits >= nonEmpty.length * 0.3) {
    const segs = [];
    for (const line of nonEmpty) {
      const sc = speakerColon(line);
      if (sc) segs.push({ time: "", speaker: sc.speaker, text: sc.text });
      else if (segs.length) segs[segs.length - 1].text += " " + line;
      else segs.push({ time: "", speaker: "", text: line });
    }
    return segs;
  }

  // 2) Stacked format: speaker labels are the short, punctuation-free lines that
  //    RECUR through the transcript. Split a turn at each; one segment per
  //    paragraph so multi-paragraph turns stay readable (name on the first only).
  const freq = new Map();
  for (const l of nonEmpty) {
    if (looksLikeNameLine(l)) freq.set(l, (freq.get(l) || 0) + 1);
  }
  const names = new Set([...freq.entries()].filter(([, n]) => n >= 2).map(([k]) => k));

  if (names.size) {
    const segs = [];
    let pending = "";
    for (const line of nonEmpty) {
      if (names.has(line)) {
        pending = line.replace(/:$/, "").trim();
        continue;
      }
      segs.push({ time: "", speaker: pending, text: line });
      pending = "";
    }
    if (segs.length) return segs.filter((s) => s.text);
  }

  // 3) Fallback: plain paragraphs (blank-line separated, else line-by-line).
  const blocks = clean
    .split(/\n{2,}/)
    .map((b) => b.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);
  return (blocks.length > 1 ? blocks : nonEmpty).map((t) => ({ time: "", speaker: "", text: t }));
}

export function parseTranscript(text) {
  const clean = String(text || "").replace(/\r/g, "");
  const re = /\[(\d{1,2}:\d{2}(?::\d{2})?)(?:\.\d+)?(?:\s*-->\s*[\d:.]+)?\]/g;
  const matches = [...clean.matchAll(re)];
  if (!matches.length) {
    return parseSpeakerOnly(clean.trim());
  }
  const segs = [];
  for (let i = 0; i < matches.length; i++) {
    const cur = matches[i];
    const start = cur.index + cur[0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index : clean.length;
    let chunk = clean.slice(start, end).trim();
    let speaker = "";
    const sp = chunk.match(/^([A-Za-z][\w .'&-]{0,40}):\s*/);
    if (sp) {
      speaker = sp[1].trim();
      chunk = chunk.slice(sp[0].length);
    }
    chunk = chunk.replace(/\s*\n\s*/g, " ").trim();
    if (chunk) segs.push({ time: cur[1], speaker, text: chunk });
  }
  return segs;
}
