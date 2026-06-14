// Generates featured_speakers.csv from the seed so the sheet stays in sync.
// Run: node scripts/gen-speakers-csv.mjs
import { featuredSpeakers } from "../app/lib/featured-speakers.js";
import { writeFileSync } from "node:fs";

const cols = ["name", "title", "company", "bio", "panel", "image_url", "linkedin", "website"];
const esc = (v) => {
  const s = String(v ?? "");
  return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
};
const rows = featuredSpeakers.map((s) =>
  [s.name, s.title, s.company, s.bio, s.panel, s.image || "", s.linkedin, s.website].map(esc).join(",")
);
const csv = [cols.join(","), ...rows].join("\r\n") + "\r\n";
writeFileSync("featured_speakers.csv", csv);
console.log(`Wrote featured_speakers.csv — ${featuredSpeakers.length} speakers, ${cols.length} columns`);
