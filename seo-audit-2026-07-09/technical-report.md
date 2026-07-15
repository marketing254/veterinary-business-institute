# Technical SEO Audit — veterinarybusinessinstitute.com
Audit date: 2026-07-09 (live site, fetched via curl)
Source repo: d:\VeterinaryBusinessInstitute-main\VeterinaryBusinessInstitute-main (Next.js `output: export`, static export)

## Scores
- **Technical SEO score: 64/100** — solid fundamentals (clean SSR HTML, correct canonicals/meta robots, working IndexNow, no query-param bloat) undercut by a critical hosting/security-header mismatch, two 404s inside the sitemap itself, and orphaned/JS-only-paginated content sections.
- **On-Page SEO score: 78/100** — titles, meta descriptions, H1s and heading hierarchy are unique and well-written page-to-page; deducted mainly for internal-linking gaps (orphaned webinar/podcast pages), generic og:title on several pages, and a few overlong podcast-episode titles.

---

## 0. IMPORTANT DISCOVERY: Site is live on GitHub Pages, not Netlify

The repo contains `netlify.toml` with a full security-header block (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, HSTS) and Netlify build settings. However, the **live production site is served from GitHub Pages** (custom domain via `public/CNAME`, deployed by `.github/workflows/deploy.yml`), confirmed by response header `Server: GitHub.com` / `X-GitHub-Request-Id` / Fastly CDN on every request tested (homepage, /about, /podcast/*, 404 page, etc.).

**Consequence: none of the headers defined in `netlify.toml` are actually applied on the live site.** GitHub Pages does not support custom response headers, so `netlify.toml` is dead configuration. This was confirmed by inspecting live response headers for `/` and `/about` — no `Strict-Transport-Security`, `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, or `Referrer-Policy` present in either.

```
curl -sD- https://www.veterinarybusinessinstitute.com/
HTTP/1.1 200 OK
Server: GitHub.com
Content-Type: text/html; charset=utf-8
...
Via: 1.1 varnish  (Fastly CDN in front of GitHub Pages)
```
No security headers of any kind in the response.

---

## 1. Crawlability

**robots.txt** (https://www.veterinarybusinessinstitute.com/robots.txt) — PASS, well-formed:
```
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /thank-you
Disallow: /dashboard
Disallow: /resources/hub
Disallow: /*?*
Sitemap: https://www.veterinarybusinessinstitute.com/sitemap.xml
```
- No AI-crawler-specific directives (GPTBot, Google-Extended, PerplexityBot, ClaudeBot, etc.) are configured — neutral, not blocking, but worth an explicit decision given this is a content/media brand that likely wants AI-answer-engine visibility.
- `Disallow: /*?*` blocks all query-string URLs. No query-based navigation currently observed in crawlable HTML, so no active harm, but it would silently block any future `?page=`-style pagination.

**sitemap.xml** — present, 65 URLs, valid XML, `lastmod`/`changefreq`/`priority` populated (all dated 2026-05-31, i.e., not per-URL accurate — same stale lastmod on every URL including recently-published podcast episodes/blog posts).

**Sitemap URLs that 404 (CRITICAL):**
- `https://www.veterinarybusinessinstitute.com/podcast/stop-surviving-and-start-leading-with-practical-solutions-for` → 404 (also internally linked from `/podcast` index page — real broken link users/crawlers will hit)
- `https://www.veterinarybusinessinstitute.com/podcast/smarter-systems-safer-practices-using-ai-and-technology-to-build` → 404

**Redirect chains:**
- `http://` → `https://www.` : 1 hop, clean.
- `https://veterinarybusinessinstitute.com` (non-www) → `https://www.` : 1 hop, clean.
- No multi-hop chains found on any tested URL.

**404 handling:** Custom Next.js 404 page returns proper `HTTP 404` status (not a soft-404 / 200), good.

**Trailing-slash 404s:** `/about/` → 404 while `/about` → 200 (site uses `trailingSlash: false`; GitHub Pages does not normalize). Not currently an issue for internal links (all internal links omit the trailing slash) but any external backlink/typed URL using a trailing slash will hit a hard 404 with no redirect.

**Case sensitivity:** `/About` → 404 (static host is case-sensitive, no normalization). Low risk since internal links are consistently lowercase.

**`/index.html` duplicate:** resolves 200 (no redirect to `/`), but correctly self-canonicalizes to `https://www.veterinarybusinessinstitute.com` — duplicate-content risk is mitigated by canonical tag, not a redirect.

---

## 2. Indexability

- Canonical tags: present and self-referencing/correct on every page checked (home, about, speakers, podcast, webinars, events, blog, resources, team, reviews, case-studies, contact, plus sampled detail pages) — PASS.
- Meta robots: `index, follow` on every page checked, no stray `noindex` found on any public page — PASS.
- No www/non-www or http/https duplicate indexing risk (redirects consolidate to canonical host).
- `/index.html` duplicate URL exists but is neutralized by canonical (see above) — minor.

---

## 3. Security

- HTTPS: enforced, HTTP and non-www both 301/redirect to the canonical `https://www.` origin — PASS.
- HSTS: **missing** (not sent by GitHub Pages for this custom domain).
- CSP: **missing**.
- X-Content-Type-Options: **missing**.
- X-Frame-Options: **missing**.
- Referrer-Policy: **missing**.
- All five headers are defined correctly in the repo's `netlify.toml` but never reach the browser because the site isn't actually served by Netlify (see Section 0).

---

## 4. URL Structure & Internal Linking

- URL patterns are clean, descriptive, kebab-case, no query params/session IDs — PASS.
- **Orphaned pages / internal-linking gap (HIGH):** Of the 21 `/webinars/*` detail URLs in the sitemap, only ~9 unique slugs are linked from anywhere in the crawlable site nav (10 from `/events`, 1 from homepage/`/webinars` index overlapping). At least these 10 sitemap URLs have **zero internal links** from homepage, `/events`, or `/webinars`: `boundaries-that-stick`, `bridging-the-knowledge-gap`, `cybersecurity-in-veterinary-practices`, `exit-strategy-essentials`, `future-proofing-the-practice`, `future-veterinary-workforce`, `handling-difficult-conversations`, `leading-through-change`, `mindset-matters`, `the-growth-map`. They are only discoverable via `sitemap.xml`.
- Similarly, `/podcast` index only links 9 of the 15 podcast-episode URLs in its crawlable HTML (button-based pagination hides the rest — see Section 7).
- **Broken outbound "Open Replay" links (CRITICAL):** the `/webinars` index page's "Archive" module links 4 items to `https://www.veterinarybusinessinstitute.com/webinar-archive/...` — a URL path that does not exist on this Next.js site (confirmed 404 for all tested). This looks like leftover content from a prior CMS/WordPress site structure (`/webinar-archive/`) that was never migrated to the current `/webinars/` route.

---

## 5. Mobile

- `<meta name="viewport" content="width=device-width, initial-scale=1">` present and identical on every page checked — PASS.
- No fixed-width layout artifacts detected in the fetched HTML/inline styles.

---

## 6. On-Page (title / description / H1 / headings)

| Page | Title (len) | Meta description (len) | H1 | Canonical |
|---|---|---|---|---|
| `/` | Veterinary Business Institute \| Podcast, Panels, and Practice Growth (68) | 102 chars | "Practical insight for veterinary teams building" | ok |
| `/about` | About \| Veterinary Business Institute (37) | 137 chars | "The Team Behind the Veterinary Business Institute." | ok |
| `/speakers` | Featured Speakers \| Veterinary Business Institute (49) | 166 chars | "Learn From the Experts Behind Our Panels." | ok |
| `/podcast` | The Veterinary Business Podcast \| Veterinary Business Institute (63) | 150 chars | "The Veterinary Business Podcast Show." | ok |
| `/webinars` | Webinars \| Veterinary Business Institute (40) | 118 chars | "Webinar replays for practices building a more resilient future." | ok |
| `/events` | Webinars & Events \| Veterinary Business Institute (53) | 161 chars | "Live Events That Position You as the Trusted Expert in Your Market." | ok |
| `/blog` | Blog & Insights \| Veterinary Business Institute (51) | 141 chars | "Practical Guides to Grow Your Practice." | ok |
| `/resources` | Free Veterinary Marketing Resources & Guides \| Veterinary Business Institute (80) | 162 chars | "Everything you need to grow your practice — 100% free." | ok |
| `/team` | Our Team \| Veterinary Business Institute (40) | 98 chars (short) | "Meet the Team." | ok |
| `/reviews` | Guest Reviews \| Veterinary Business Institute (45) | 113 chars | "What our guests say about the Veterinary Business Podcast." | ok |
| `/case-studies` | Case Studies \| Veterinary Business Institute (44) | 94 chars (short) | "Case Studies." | ok |
| `/contact` | Contact \| Veterinary Business Institute (39) | 137 chars | "We'd Love to Hear From You." | ok |

- All titles and meta descriptions are **unique per page** — no duplication found across the 12 top-level pages checked, or in 3 sampled detail pages (blog post, podcast episode, webinar replay).
- H1: exactly one per page, unique wording, no missing/multiple-H1 issues found.
- Heading hierarchy sampled on homepage: 1×H1 → 7×H2 → 42×H3, logical order, no skipped levels.
- **Overlong detail-page title (MEDIUM):** podcast episode title tags run very long, e.g. `/podcast/from-scribe-to-self-reading-practice-how-ai-helps-independent` → "Ep 114: From Scribe to Self-Reading Practice: How AI Helps Independent Veterinary Practices Move Faster | Veterinary Business Podcast" (~136 characters) — will truncate heavily in Google SERPs (practical limit ~55-65 chars before truncation risk).
- **Generic og:title on several pages (LOW/MEDIUM):** `/about`, `/webinars`, `/team`, `/reviews`, `/case-studies`, `/contact`, `/resources` all emit `og:title = "Veterinary Business Institute"` instead of their page-specific `<title>`, while `/speakers`, `/podcast`, `/events`, `/blog` correctly emit page-specific `og:title`. Weakens link-preview quality on social shares for the affected pages.
- Structured data: `application/ld+json` blocks present on every page checked (4-8 blocks per page) — good baseline coverage (not deeply schema-validated in this pass).

---

## 7. JavaScript Rendering (SSR verification)

**PASS — confirmed genuine server-rendered content**, not a client-side shell:
- `/speakers`: full text of 12 speaker bios (names, titles, companies, full paragraph bios, associated session titles) present in the raw HTML body with JS/scripts stripped out — verified via direct text extraction from the curl'd HTML.
- Homepage, about, podcast, webinars, events, blog, team, reviews, case-studies, contact all return full visible text content in the initial HTML response (no reliance on client hydration for primary content).

**However — JS-only pagination hides the majority of two content types from crawlers (HIGH):**
- `/speakers`: only **12 of 43** speaker profiles are present in the initial/crawlable HTML (page 1 of 4). Pages 2-4 are reached via `<button aria-label="Next page">` elements with `disabled`/`aria-current` state — **not `<a href>` links**, no unique per-page URL exists (no `?page=2` etc.), so the remaining ~31 speaker bios have no crawlable path and are not in the sitemap either. This is real unique content (bios, credentials) invisible to search engines.
- `/podcast`: only 9 of 15 episodes are linked via crawlable `<a href="/podcast/...">` on the index page; pagination again uses `aria-label="Next page"` buttons. The other 6 episodes are only reachable via `sitemap.xml`, not via on-site navigation/pagination links.

---

## 8. Core Web Vitals (source-inspection proxies — no live CrUX/PSI field data available; PSI API quota was exhausted during this session, see `psi_home_*.json`)

- Homepage initial HTML payload: 155 KB (reasonably light for a static export).
- 3 stylesheet `<link>` tags in `<head>`, 1 non-async/defer script in `<head>`, 4 font preloads — render-blocking surface is small, LCP risk from head resources looks low.
- **Missing explicit width/height on all `<img>` tags (MEDIUM, CLS risk):** homepage has 16 `<img>` elements, none declare both `width` and `height` attributes (one hero image only has an inline `style="width:160px"`). Without intrinsic size hints in the HTML, the browser cannot reserve layout space before the image or its CSS loads, which is a classic CLS contributor — most impactful for the hero image (`hero-home.png`) and webinar-archive thumbnail cards.
- No lazy-loading (`loading="lazy"`), `<picture>`, or responsive `srcset` usage detected on the pages sampled — images are likely served at a single fixed resolution regardless of viewport, a potential LCP/byte-weight concern on mobile (not independently verified with real image dimensions in this pass).
- No inline layout-shift-prone ad slots, embeds, or web-font FOIT/FOUT patterns beyond standard `font-display` (not verified) were found in source.

---

## 9. IndexNow Protocol

- **PASS — correctly implemented.** `scripts/indexnow-submit.mjs` runs as a post-build step in `.github/workflows/deploy.yml`, reads `sitemap.xml`, and POSTs the full URL list to the IndexNow API (targets Bing/Yandex/Naver/Seznam; correctly notes Google does not use IndexNow and should be handled via Search Console sitemap submission instead).
- IndexNow key file is live and reachable: `https://www.veterinarybusinessinstitute.com/d8de72be4f2b574a88983c4c9d57ed6d.txt` → HTTP 200.

---

## Issue list

### CRITICAL
1. Live site is served by GitHub Pages (`Server: GitHub.com`), not Netlify — every security header defined in `netlify.toml` (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, HSTS) is absent from live responses on all URLs tested (`/`, `/about`, etc.).
2. 2 sitemap.xml URLs 404 live: `/podcast/stop-surviving-and-start-leading-with-practical-solutions-for` (also a broken internal link from `/podcast`) and `/podcast/smarter-systems-safer-practices-using-ai-and-technology-to-build`.
3. 4 "Open Replay" links on `/webinars` point to non-existent `/webinar-archive/...` paths — all confirmed 404 (e.g. `https://www.veterinarybusinessinstitute.com/webinar-archive/six-forces-shaping-the-next-decade-of-veterinary-business-law-marketing-leadership-culture-finance-and-ai/`).

### HIGH
4. No HTTP security headers on any live response (HSTS/CSP/X-Frame-Options/X-Content-Type-Options/Referrer-Policy all missing) — direct consequence of issue #1; affects every URL on the site.
5. `/speakers` pagination (pages 2-4, ~31 of 43 expert bios) uses non-crawlable JS `<button>` elements with no indexable per-page URL — majority of speaker-directory content is invisible to search engines.
6. 10+ of 21 `/webinars/*` sitemap URLs have zero internal links from homepage, `/events`, or `/webinars` (orphaned, sitemap-only discovery) — e.g. `/webinars/mindset-matters`, `/webinars/exit-strategy-essentials`, `/webinars/the-growth-map`, `/webinars/cybersecurity-in-veterinary-practices`.
7. `/podcast` index links only 9 of 15 episode URLs (JS-button pagination hides the rest from crawlable nav) — e.g. `/podcast/why-burnout-keeps-returning-in-veterinary-medicine-and-how-we-can-break` reachable only via sitemap.

### MEDIUM
8. All `<img>` tags on homepage (16) and other pages lack explicit `width`/`height` attributes — CLS risk, most relevant to hero image at `/`.
9. Podcast episode `<title>` tags run ~130+ characters (e.g. `/podcast/from-scribe-to-self-reading-practice-how-ai-helps-independent`) — will truncate in SERPs.
10. `og:title` is a generic "Veterinary Business Institute" (not page-specific) on `/about`, `/webinars`, `/team`, `/reviews`, `/case-studies`, `/contact`, `/resources` — weaker social-share previews on 7 of 12 key pages.
11. Trailing-slash URLs 404 with no redirect (e.g. `/about/`) — safe today (no internal links use trailing slash) but breaks on any external link/typo using one.
12. `sitemap.xml` `lastmod` is identical (2026-05-31) across all 65 URLs regardless of actual publish/update date — reduces crawl-prioritization signal value.

### LOW
13. `/index.html` resolves 200 without redirecting to `/` (mitigated by correct self-referencing canonical, so low practical impact).
14. Case-sensitive URLs return 404 with no normalization (`/About` → 404) — low risk given consistent lowercase internal linking.
15. Two meta descriptions are shorter than ideal: `/team` (98 chars), `/case-studies` (94 chars) — under-using available SERP snippet space (~150-160 char target).
16. `robots.txt` has no explicit AI-crawler directives (GPTBot, Google-Extended, PerplexityBot, ClaudeBot, etc.) — not blocking anything today, but worth a deliberate policy given the content/media business model.

---

## Top 3 quick wins
1. Fix/replace the 4 broken `/webinar-archive/...` "Open Replay" links on `/webinars` and remove or fix the 2 dead podcast URLs from `sitemap.xml` + the `/podcast` index link — all are simple URL corrections with outsized crawl/UX impact (Critical #2 and #3).
2. Since GitHub Pages can't serve custom headers, add security headers via a `<meta http-equiv>` CSP fallback where possible and/or move HSTS/CSP/X-Frame-Options enforcement to Cloudflare (as a proxy in front of GitHub Pages) or migrate hosting to Netlify/Vercel as `netlify.toml` already assumes — closes Critical #1 / High #4 in one change.
3. Convert `/speakers` and `/podcast` pagination from JS-only buttons to real crawlable `<a href="/speakers?page=2">`-style links (or better, static paginated routes like `/speakers/2`) so all 43 speaker bios and all 15 podcast episodes are indexable — recovers a large amount of unique, expert-authored content currently invisible to search engines (High #5 and #7).
