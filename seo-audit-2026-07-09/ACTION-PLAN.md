# SEO Action Plan — Veterinary Business Institute
Prioritized fixes from the 2026-07-09 audit (Health Score: 62/100). Effort estimates assume one developer familiar with the codebase.

## 🔴 CRITICAL — fix immediately

| # | Action | Where | Effort |
|---|---|---|---|
| 1 | Resolve hosting mismatch: the live site is served by GitHub Pages, so `netlify.toml` headers/caching never apply. Either deploy to Netlify as configured, or put Cloudflare in front of GitHub Pages to add security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy) and long-cache hashed assets | Infra / DNS | 0.5–1 day |
| 2 | Fix `AnimatedCounter` to render the real value server-side (`useState(end)`, animate as enhancement) — stats currently read "0" to Google/AI crawlers on /, /about, /case-studies, /team, /webinars, /msm, /newsletter | `app/components/AnimatedCounter.js` | 1 hr |
| 3 | Convert hero images to WebP/AVIF at display size: `hero-home.png` 1.8 MB → ~150 KB, `marketing-hero.png` 823 KB → ~80 KB; keep preload only on the true LCP image with `fetchpriority="high"` | `public/assets/`, `app/page.js` | 1–2 hrs |
| 4 | Fix sitemap↔build desync: sitemap.js reads podcast slugs from `site-data.js` while pages build from `getMergedEpisodes()` (`podcast-data.js`) — 2 sitemap URLs 404. Use one source of truth; remove/redirect dead slugs; also fix the dead episode link on /podcast | `app/sitemap.js`, `app/lib/site-data.js`, `app/lib/podcast-data.js` | 1–2 hrs |
| 5 | Fix sitewide `WebSite.hasPart` schema: 3 of 4 URLs 404 (`/podcast-show/`, `/webinar-archive/`, `/msm/`) | `app/lib/site-data.js:5-8` (via `app/layout.js`) | 15 min |
| 6 | Fix stale Event schema: 4 of 5 registration pages show past `startDate` with `eventStatus: EventScheduled` and live countdowns — update dates, mark completed, or unpublish | `registrationEvents` in `app/lib/site-data.js` | 1 hr |
| 7 | Fix 4 dead "Open Replay" links on /webinars pointing to `/webinar-archive/...` | `/webinars` page data | 30 min |

## 🟠 HIGH — within 1 week

| # | Action | Where | Effort |
|---|---|---|---|
| 8 | Make /speakers pagination crawlable (real URLs, e.g. `/speakers/page/2`, or render all 43 bios in HTML) — ~31 of 43 expert bios currently invisible to search engines | `app/speakers/` | 0.5 day |
| 9 | Same for /podcast pagination (only 9 of 15 episodes linked) | `app/podcast/` | 2–3 hrs |
| 10 | Server-render podcast transcripts (currently "Loading transcript…" client-side) — richest citable content invisible to crawlers | podcast episode pages | 0.5 day |
| 11 | Add internal links to the 10+ orphaned /webinars/* pages and add the 5 missing /events/*/register URLs to the sitemap (or noindex the 4 past ones) | `/webinars`, `/events`, `app/sitemap.js` | 2–3 hrs |
| 12 | Build real content into ~22 thin webinar replay pages (recap, 3–5 takeaways, speaker quote — 300+ unique words each) | webinar detail template + data | 2–3 days (content) |
| 13 | Add named, credentialed bylines to blog posts (Person schema, not just Organization) and add Person schema for founder Naren Arulrajah | blog pages, `app/layout.js` | 2–3 hrs |
| 14 | Remove or properly source the "(illustrative)" statistic presented as fact in blog copy | blog content | 30 min |
| 15 | Reconcile conflicting episode counts sitewide (103+ vs 60+ vs 113/114 vs 15 URLs) and the /about vs /team roster mismatch; remove unverifiable personas | content/data | 2 hrs |
| 16 | Fix `VideoObject.embedUrl` → `player.vimeo.com/video/{id}` and add `duration`; fix homepage featured-episode URL to internal canonical | `app/webinars/[slug]/page.js`, `app/page.js` | 1 hr |
| 17 | Add width/height + `loading="lazy"` to below-fold images; swap 182 KB PNG logo for the existing 13 KB `logo.svg` | components sitewide | 2–3 hrs |

## 🟡 MEDIUM — within 1 month

| # | Action | Effort |
|---|---|---|
| 18 | Rewrite 6–8 key headings as direct questions with 134–167-word self-contained answers (GEO citability); expand FAQ answers from 20–40 words to ~150 | 1 day |
| 19 | Publish `/llms-full.txt` (draft in geo-report.md) | 30 min |
| 20 | Add PodcastSeries schema on /podcast, BreadcrumbList on /about, /podcast, /events, /webinars and register pages, ItemList on index pages (snippets in schema-report.md) | 0.5 day |
| 21 | Page-specific og:title on /about, /webinars, /team, /reviews, /case-studies, /contact, /resources | 1 hr |
| 22 | Shorten podcast `<title>` tags to ≤60 chars | 1 hr |
| 23 | Real per-URL `lastmod` in sitemap instead of one hardcoded date | 1–2 hrs |
| 24 | Split/reduce the 194 KB render-blocking CSS bundle; deprioritize GA4 preload | 0.5 day |
| 25 | Decompose PostalAddress; use www URLs in Event schema; self-host episode images (not Google Drive); expand /resources/faq beyond 4 Q&As | 2–3 hrs |
| 26 | Strengthen case-studies with verifiable details (names/dates/links); source or remove the "16,000+ testimonials" claim; add Review/AggregateRating schema if legitimate reviews exist | content |

## 🟢 LOW — backlog
- Redirect trailing-slash and `/index.html` variants; normalize case-sensitive URLs
- Lengthen short meta descriptions on /team and /case-studies
- Add explicit AI-crawler directives to robots.txt (policy statement) and consider RSL
- Add `noindex` meta to /dashboard and /resources/hub (currently robots.txt-only)
- Remove ignored `priority`/`changefreq` from sitemap; fix episode 114 vs "EP_116" filename mismatch
- E.164 telephone format in Organization schema; reduce 8x-repeated marquee ticker duplication
- Build off-site footprint for AI visibility (podcast directories, Reddit/community presence, speaker cross-links)

## Expected impact
Completing the Critical + High items should lift the health score from **62 → ~80**: Performance 38→~70, Technical 64→~85, GEO 66→~80, Content 58→~70, Schema 60→~75, Images 48→~80.
