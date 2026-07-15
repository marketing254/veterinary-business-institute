# SEO Health Audit — Veterinary Business Institute
**Site:** https://www.veterinarybusinessinstitute.com
**Date:** 2026-07-09
**Business type:** Online education / media (podcast, webinars, speaker directory for veterinary practice owners)
**Method:** Live-site crawl + source-code review (Next.js static export), 7 specialist audits. PageSpeed Insights API was quota-blocked, so Core Web Vitals are estimates from payload analysis, not measured Lighthouse runs.

---

## 🎯 Overall SEO Health Score: **62 / 100**

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 64 | 14.1 |
| Content Quality | 23% | 58 | 13.3 |
| On-Page SEO | 20% | 78 | 15.6 |
| Schema / Structured Data | 10% | 60 | 6.0 |
| Performance (CWV, estimated) | 10% | 38 | 3.8 |
| AI Search Readiness (GEO) | 10% | 66 | 6.6 |
| Images | 5% | 48 | 2.4 |
| **Total** | | | **61.8 ≈ 62** |

Sub-score: Sitemap health 54/100 (folded into Technical).

---

## Executive Summary

The site has a solid foundation — clean static HTML, unique titles/descriptions/H1s sitewide, valid multi-type JSON-LD, open AI-crawler access, and a working llms.txt. The score is dragged down by five systemic problems:

1. **The site is not hosted where its config assumes.** Live responses come from GitHub Pages (`Server: GitHub.com`), so every rule in `netlify.toml` — all security headers (CSP, HSTS, X-Frame-Options…) and 1-year immutable caching for hashed assets — silently never applies. Live assets get `max-age=600` and zero security headers.
2. **Key trust stats render as "0" to crawlers.** `AnimatedCounter` is a client component starting at `useState(0)`, so podcast count, testimonials, and results stats appear as literal "0" in the HTML that Google and AI crawlers read — on `/`, `/about`, `/case-studies`, `/team`, `/webinars`, and more.
3. **Broken URLs in the sitemap and in schema.** 2 of 65 sitemap URLs 404 (podcast slug lists have drifted between `site-data.js` and `podcast-data.js`); 3 of 4 `WebSite.hasPart` schema URLs 404 sitewide; 4 "Open Replay" links on /webinars point to a dead `/webinar-archive/` path.
4. **A large share of content is invisible to crawlers.** /speakers pagination hides ~31 of 43 speaker bios behind JS-only buttons; /podcast links only 9 of 15 episodes; 10+ webinar pages are sitemap-only orphans; podcast transcripts load client-side ("Loading transcript…").
5. **Performance is poor.** A 1.8 MB hero PNG (the likely LCP element) plus an 823 KB second hero, 7 competing image preloads, and a 194 KB render-blocking CSS bundle put estimated mobile LCP well past the 2.5 s threshold.

### Top 5 Critical Issues
1. Hosting/config mismatch (GitHub Pages vs netlify.toml) → no security headers, broken caching sitewide
2. `AnimatedCounter` renders "0" for all trust stats to non-JS crawlers
3. 2 sitemap URLs 404 + broken internal link on /podcast (data-source desync)
4. Stale `Event` schema: 4 of 5 registration pages advertise past-dated events as `EventScheduled` with live countdowns
5. 1.8 MB hero PNG likely failing LCP on mobile

### Top 5 Quick Wins
1. Convert `hero-home.png` (1.8 MB) and `marketing-hero.png` (823 KB) to WebP at display size (~90% smaller) — biggest LCP lever, ~1 hr
2. Fix `AnimatedCounter` to server-render the real number (`useState(end)`), animation as enhancement — ~1 hr
3. Fix the 3 dead `WebSite.hasPart` URLs in `app/lib/site-data.js` and the 4 `/webinar-archive/` links on /webinars — ~30 min
4. Reconcile podcast slug sources so sitemap and built pages match; remove the 2 dead URLs — ~1 hr
5. Swap the 182 KB PNG logo for the existing 13 KB `logo.svg` and add `width`/`height` + `loading="lazy"` to below-fold images — ~1 hr

---

## 1. Technical SEO — 64/100

**Strengths:** clean server-rendered HTML (static export verified — content present without JS), correct self-referencing canonicals, correct meta robots, valid robots.txt referencing the sitemap, working IndexNow, HTTPS everywhere, no redirect chains.

**Critical**
- Live host is GitHub Pages, not Netlify: all security headers in `netlify.toml` (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, HSTS) absent on every live response.
- 2 sitemap URLs 404: `/podcast/stop-surviving-and-start-leading-with-practical-solutions-for` (also linked from /podcast) and `/podcast/smarter-systems-safer-practices-using-ai-and-technology-to-build`.
- 4 "Open Replay" links on /webinars → dead `/webinar-archive/...` paths (never migrated).

**High**
- No HTTP security headers sitewide (consequence of hosting mismatch).
- /speakers pagination (pages 2–4, ~31 of 43 bios) is JS `<button>`-only — no crawlable URLs; most speaker content invisible to search engines.
- 10+ of 21 `/webinars/*` sitemap URLs have zero internal links (sitemap-only orphans).
- /podcast index links only 9 of 15 episodes; JS pagination hides the rest.

**Medium**
- All `<img>` tags lack width/height (CLS risk).
- Podcast `<title>` tags run 130+ chars (SERP truncation).
- Generic og:title ("Veterinary Business Institute") on /about, /webinars, /team, /reviews, /case-studies, /contact, /resources.
- Trailing-slash URLs 404 with no redirect (`/about/`).
- Identical `lastmod` (2026-05-31) on all 65 sitemap URLs.

**Low:** `/index.html` resolves without redirect; case-sensitive URL 404s; short meta descriptions on /team and /case-studies; no explicit AI-crawler directives in robots.txt.

## 2. Content Quality — 58/100

**E-E-A-T:** Experience MODERATE · Expertise MODERATE · Authoritativeness MODERATE · Trustworthiness WEAK-to-MODERATE.

**Critical**
- Trust stats render as literal "0" in server HTML (client-side counters).
- Podcast episode count internally inconsistent sitewide (103+ vs 60+ vs Episode 113/114 vs 15 sitemap URLs).
- ~22 webinar replay pages are thin/doorway pages (50–90 unique words, identical template, no recap/takeaways/transcript).

**High**
- A blog statistic explicitly labeled "(illustrative)" — i.e. fabricated — sits undisclosed next to real-looking data.
- Podcast transcripts load client-side only ("Loading transcript…") — the richest citable content is invisible to crawlers.
- `/team` and `/about` show two different, non-overlapping staff rosters; `/team` personas ("Dr. Sarah Jenkins", "Marcus Thorne") are unverifiable.
- All blog content bylined generically "By Veterinary Business Institute" — no named, credentialed authors.

**Medium:** case-studies claims backed by only 2 generic unverifiable examples; "16,000+ testimonials" attributed to a different entity (Ekwa), unsourced; heavy undisclosed commercial framing; 8x-repeated marquee ticker duplicates ~250 words on every page.

**Thin pages:** 2 sampled webinar pages at 53/56 net words (pattern applies to ~22 URLs), /resources/faq at 195 words, policies ~164–204 words.

## 3. On-Page SEO — 78/100

Unique, well-formed titles, meta descriptions, H1s and heading hierarchy sitewide — the strongest category. Deductions for the internal-linking gaps to webinar/podcast detail pages, generic og:title on 7 pages, and overlong podcast titles.

## 4. Schema / Structured Data — 60/100

Solid multi-type implementation (Organization+EducationalOrganization, WebSite, ItemList with 43 complete Person entries, PodcastEpisode, VideoObject, Event, BreadcrumbList, FAQPage — all syntactically valid, zero deprecated types), undercut by:

- **Critical:** `WebSite.hasPart` contains 3 dead URLs on every page (stale constants in `app/lib/site-data.js:5-8`); past-dated `Event` schema still marked `EventScheduled` on 4 of 5 registration pages.
- **High:** `VideoObject.embedUrl` points to non-embeddable `vimeo.com/{id}` (should be `player.vimeo.com/video/{id}`); homepage featured-episode URL points to Apple Podcasts instead of the internal canonical; no page-specific schema on /podcast, /about, /events, /webinars hubs.
- **Medium:** non-www URLs in Event organizer/location; undecomposed PostalAddress; missing BreadcrumbList on several pages; missing VideoObject duration and Event image/endDate; Google-Drive-hosted episode images.
- **Missing opportunities (ranked):** fix hasPart links → PodcastSeries on /podcast → BreadcrumbList on hub pages → ItemList of Event/VideoObject on index pages → Person schema for founder.

Recommended JSON-LD snippets are in [schema-report.md](schema-report.md).

## 5. Performance — 38/100 (estimated; PSI API quota-blocked)

| Metric | Estimate | Threshold | Status |
|---|---|---|---|
| LCP | ~5–8 s mobile | ≤2.5 s | Likely FAIL |
| CLS | ~0.1–0.25 | ≤0.1 | Likely FAIL |
| INP | <200 ms desktop, at-risk low-end mobile | ≤200 ms | Uncertain |

**Bottlenecks:** 1.76 MB hero PNG (preloaded, likely LCP); 823 KB second hero (also preloaded); 178 KB PNG nav logo (13 KB SVG exists); 194 KB monolithic render-blocking CSS; 7 simultaneous image preloads; ~920 KB raw JS; hashed static assets cached only 10 min (hosting mismatch); gzip only, no Brotli; GA4 preloaded ahead of paint.

## 6. Images — 48/100

16/16 homepage images have alt text (excellent). But: 0/16 have width/height, 0/16 lazy-load, no WebP/AVIF/srcset anywhere (Next image optimization disabled by static export), 1.8 MB + 823 KB hero PNGs, 182 KB PNG logo loaded 3× despite an existing 13 KB SVG, and 9 podcast covers hotlinked from Apple's CDN (same artwork repeated 9×).

## 7. AI Search Readiness (GEO) — 66/100

See [GEO-OPTIMIZATION-REPORT.md](geo-report.md) for the full report including the drafted `llms-full.txt`.

**Dimension breakdown:** Citability 55 · Structural Readability 65 · Multi-Modal 60 · Authority & Brand 60 · Technical Accessibility 90.

**AI crawler access:** GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, Bingbot, CCBot, Applebot-Extended — **all allowed** in robots.txt and all confirmed 200 OK via live user-agent tests. No CDN-level blocking.

**llms.txt:** present and well-formed at `/llms.txt`. `/llms-full.txt` missing — draft provided in the GEO report.

**Key gaps:**
- Counters rendering "0" poison exactly the stats an AI engine would cite (Critical).
- Broken `WebSite.hasPart` URLs undermine entity grounding (Critical).
- No question-phrased headings outside the FAQ; FAQ answers too short (20–40 words vs 134–167 optimal).
- No Person schema or named authorship for founder Naren Arulrajah; blog authored by the Organization, not people.
- Uncited "(illustrative)" statistic; no Review/AggregateRating schema despite testimonial claims; thin off-site footprint (no Reddit/Wikipedia/X presence detected).

**Top GEO actions:** fix AnimatedCounter SSR → fix hasPart URLs → add founder Person schema + named BlogPosting authors → rewrite 6–8 key headings as direct questions with 134–167-word self-contained answers → publish llms-full.txt.

---

## Specialist reports in this folder
- [technical-report.md](technical-report.md)
- [content-report.md](content-report.md)
- [schema-report.md](schema-report.md)
- [sitemap-report.md](sitemap-report.md)
- [performance-report.md](performance-report.md)
- [geo-report.md](geo-report.md) ← full GEO optimization report + llms-full.txt draft
- [images-report.md](images-report.md)
- [ACTION-PLAN.md](ACTION-PLAN.md) ← prioritized fixes
