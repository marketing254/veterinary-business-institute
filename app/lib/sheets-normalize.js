/**
 * Normalizers — map raw sheet rows into the exact shapes the (updated) VET
 * components expect, matching the hardcoded arrays in site-data.js / page files.
 * Only the 7 dynamic surfaces are represented.
 */
import { pick, driveImageUrl, formatSheetDate, slugify } from "./sheets-core";

const splitTags = (s) =>
  String(s || "")
    .split(/[,|]/)
    .map((x) => x.trim())
    .filter(Boolean);

// podcasts → episodes shape {number,date,title,image,href,appleId,audioUrl,duration,summary}
export function normalizePodcast(row) {
  const number = pick(row, ["episode", "number", "ep"]);
  return {
    number,
    date: formatSheetDate(pick(row, ["date_published", "date", "date_iso"])),
    title: pick(row, ["title"]),
    image: driveImageUrl(pick(row, ["poster_image", "image", "guest_photo_url"]), 600),
    href: pick(row, ["episode_url", "url", "link"]),
    appleId: pick(row, ["appleId", "apple_id"]),
    audioUrl: pick(row, ["audio_source", "audioUrl", "audio_url"]),
    duration: pick(row, ["duration"]),
    category: pick(row, ["category"]),
    transcriptUrl: pick(row, ["transcript_url", "transcript"]),
    summary: pick(row, ["description", "summary"]),
  };
}

// event-panels → {slug,date,duration,category,title,subtitle,image,href,summary,description,transcript}
export function normalizeEventPanel(row) {
  const title = pick(row, ["title"]);
  const summary = pick(row, ["summary"]);
  const description = pick(row, ["description", "long_description", "body"]);
  return {
    slug: pick(row, ["slug"]) || slugify(title),
    date: formatSheetDate(pick(row, ["date", "date_iso"])),
    duration: pick(row, ["duration"]),
    category: pick(row, ["category"]),
    title,
    subtitle: pick(row, ["subtitle"]),
    image: driveImageUrl(pick(row, ["image_url", "image", "thumbnail_url"]), 1200),
    href: pick(row, ["vimeo_url", "href", "url", "link"]),
    summary,
    // Full write-up for the detail page; falls back to the short summary.
    description: description || summary,
    // Transcript is added later — empty for now so the page shows a placeholder.
    transcript: pick(row, ["transcript", "transcript_text"]),
  };
}

// reviews → guestReviews shape {source,quote,name,title}
export function normalizeReview(row) {
  return {
    source: pick(row, ["platform", "source"]) || "Veterinary Business Podcast",
    quote: pick(row, ["review_text", "quote", "review"]),
    name: pick(row, ["reviewer_name", "name"]),
    title: pick(row, ["firm_name", "title", "role"]),
  };
}

// experts → teamMembers shape {name,title,bio,tags[],image}
export function normalizeTeamMember(row) {
  return {
    name: pick(row, ["name"]),
    title: pick(row, ["role", "title"]),
    bio: pick(row, ["bio", "body"]),
    tags: splitTags(pick(row, ["tags"])),
    image: driveImageUrl(pick(row, ["photo_url", "image"]), 600),
  };
}

// case-studies → {clinic,challenge,solution,result,metric,metricLabel}
export function normalizeCaseStudy(row) {
  return {
    clinic: pick(row, ["clinic"]),
    challenge: pick(row, ["challenge"]),
    solution: pick(row, ["solution"]),
    result: pick(row, ["result"]),
    metric: pick(row, ["metric"]),
    metricLabel: pick(row, ["metric_label", "metricLabel"]),
  };
}

// faqs → {question,answer}
export function normalizeFaq(row) {
  return {
    question: pick(row, ["question"]),
    answer: pick(row, ["answer"]),
  };
}
