/**
 * Bulk-upload public/assets images into the VET Drive image library.
 *
 * The site serves images from /public/assets directly, so this is OPTIONAL — it
 * exists so the content team has the same images available in Drive to reference
 * from the Google Sheet (the site's driveImageUrl() helper rewrites any Drive
 * share link into an embeddable CDN URL automatically).
 *
 * ─── Drive folder map (already created) ───────────────────────────────────
 *   Root:            11BNmm5k96DshETM6G6PjuL8ie1PJcP6_
 *   Hosts & Team:    1osva10yqxBNOT6KTk0gqYlPpsMRMNaYz
 *   Podcast Episodes:1lFEHPt3KOXjvfSoJTlbHMYeGB7DdgM3J
 *   Event Panels:    12JgUD_G2uWoquc4Ls_Na4VirdpDY5bhk
 *   Webinars:        1ydWQz-5cM_T1c9HQeNUVxAI2x68m19AR
 *   Brand & General: 1eNN3wrsgdJce0zBoVXxW84FXKRK9Zu7r
 *
 * ─── Run ──────────────────────────────────────────────────────────────────
 *   npm i googleapis @google-cloud/local-auth
 *   Place an OAuth client credentials.json next to this file, then:
 *   node automation/upload-images-to-drive.mjs
 * The first run opens a browser to authorize Drive (drive.file scope).
 */
import { google } from "googleapis";
import { authenticate } from "@google-cloud/local-auth";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.resolve(__dirname, "..", "public", "assets");

const FOLDERS = {
  hosts: "1osva10yqxBNOT6KTk0gqYlPpsMRMNaYz",
  episodes: "1lFEHPt3KOXjvfSoJTlbHMYeGB7DdgM3J",
  panels: "12JgUD_G2uWoquc4Ls_Na4VirdpDY5bhk",
  webinars: "1ydWQz-5cM_T1c9HQeNUVxAI2x68m19AR",
  brand: "1eNN3wrsgdJce0zBoVXxW84FXKRK9Zu7r",
};

// Route each asset (or sub-path) to a folder by filename prefix.
function folderFor(rel) {
  const f = rel.toLowerCase();
  if (f.startsWith("host-") || f.includes("naren") || f.includes("about-speaker")) return FOLDERS.hosts;
  if (f.startsWith("episode-") || f.startsWith("vbp")) return FOLDERS.episodes;
  if (f.startsWith("panels/") || f.startsWith("panel-")) return FOLDERS.panels;
  if (f.startsWith("webinar-")) return FOLDERS.webinars;
  return FOLDERS.brand;
}

const MIME = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".webp": "image/webp" };

function walk(dir, base = "") {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const rel = path.join(base, e.name);
    const abs = path.join(dir, e.name);
    return e.isDirectory() ? walk(abs, rel) : [rel.split(path.sep).join("/")];
  });
}

const main = async () => {
  const auth = await authenticate({
    scopes: ["https://www.googleapis.com/auth/drive.file"],
    keyfilePath: path.join(__dirname, "credentials.json"),
  });
  const drive = google.drive({ version: "v3", auth });

  for (const rel of walk(ASSETS)) {
    const ext = path.extname(rel).toLowerCase();
    if (!MIME[ext]) continue;
    const res = await drive.files.create({
      requestBody: { name: path.basename(rel), parents: [folderFor(rel)] },
      media: { mimeType: MIME[ext], body: fs.createReadStream(path.join(ASSETS, rel)) },
      fields: "id, name",
    });
    // make it link-viewable so the sheet can reference it
    await drive.permissions.create({
      fileId: res.data.id,
      requestBody: { role: "reader", type: "anyone" },
    });
    console.log(`uploaded ${rel} -> ${res.data.id}`);
  }
  console.log("Done.");
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
