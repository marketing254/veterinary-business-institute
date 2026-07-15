# Sitemap Audit — veterinarybusinessinstitute.com
Date: 2026-07-09
Source: https://www.veterinarybusinessinstitute.com/sitemap.xml
Generator: `app/sitemap.js` (Next.js, `force-static`), hosted on GitHub Pages (static export) behind Fastly/Varnish.

## 1. XML Validation

| Check | Result |
|---|---|
| Well-formed XML | PASS — parses cleanly (`xml.dom.minidom`), valid `urlset` namespace `http://www.sitemaps.org/schemas/sitemap/0.9` |
| `<loc>` present on every entry | PASS — 65/65 |
| `<lastmod>` present on every entry | PASS — 65/65, ISO8601 format |
| URL count vs 50,000 limit | PASS — 65 URLs (0.13% of limit), no index-of-sitemaps needed |
| `<priority>` / `<changefreq>` present | INFO — present on every URL. Both are ignored by Google; safe to remove to shrink file / avoid maintenance overhead. |
| `lastmod` accuracy | **LOW/MEDIUM FAIL** — every one of the 65 URLs shares the exact same `lastmod` value: `2026-05-31T00:00:00.000Z` (hardcoded `siteLastModified` constant in `sitemap.js`). Individual blog posts have their own real publish dates in `app/lib/blog-posts.js` (e.g. `"date": "May 26, 2026"`, `"April 14, 2026"`, etc.) that are never used. This makes `lastmod` meaningless as a freshness/recrawl signal. |

**Sitemap XML source:** confirmed valid, single-file (no sitemap index needed at current scale).

## 2. Sample URL Status Check

Method: `curl -I` against a manual 17-URL cross-section first, then a full sweep of **all 65** sitemap URLs (not just a sample) since the file is small enough to check exhaustively.

- Manual 17-URL spot sample: **17/17 = 100% returned 200**, no redirects, canonical URL == requested URL in every case.
- Full 65-URL sweep: **63/65 = 96.9% returned 200**; **2/65 (3.1%) returned HTTP 404**.

### Broken sitemap URLs (HTTP 404)
| URL | Status |
|---|---|
| `https://www.veterinarybusinessinstitute.com/podcast/stop-surviving-and-start-leading-with-practical-solutions-for` | 404 (confirmed on 2 retries) |
| `https://www.veterinarybusinessinstitute.com/podcast/smarter-systems-safer-practices-using-ai-and-technology-to-build` | 404 (confirmed on 2 retries) |

**Root cause identified:** `app/sitemap.js` builds podcast URLs from the static `episodes` array in `app/lib/site-data.js` via `podcastSlug()`. But the actual page route `app/podcast/[slug]/page.js` calls `generateStaticParams()` using a **different, live-merged data source**: `getMergedEpisodes()` in `app/lib/podcast-data.js`, which does `mergeEpisodes(seedEpisodes, await fetchSheetEpisodes())` — i.e. seed data merged with a live Google Sheets fetch **at build time**. These two episode lists have drifted out of sync: 2 episode slugs exist in the hardcoded `site-data.js` list (and therefore in the sitemap) that were not present/matching in whatever `getMergedEpisodes()` returned during the last actual build, so those 2 static pages were never generated and now 404 on the GitHub Pages host.

This is a systemic risk, not a one-off typo: any future edit to an episode title in the Google Sheet (which shifts the slug via `podcastSlug()`) without a matching update to the hardcoded `episodes` array in `site-data.js` will silently break sitemap coverage the same way. `app/podcast/page.js`'s statically rendered listing also links to one of these two dead slugs (`stop-surviving-and-start-leading-with-practical-solutions-for`), confirming the drift is between the site-data snapshot and the live-merged build data, not just the sitemap.

No redirect chains were found anywhere in the sweep (`url_effective` matched the requested URL for every 200 response).

## 3. Sitemap Coverage vs. Actual App Routes

Compared `app/sitemap.js` output against every `page.js` under `app/` (31 route files).

### Routes correctly covered
All static routes (`/about`, `/team`, `/events`, `/podcast`, `/speakers`, `/reviews`, `/case-studies`, `/resources` + its 3 subpages, `/blog`, `/guest-speaker`, `/community` + `/community/forum`, `/msm`, `/csm`, `/newsletter`, `/contact`, `/privacy-policy`, `/terms-of-service`, `/webinars` + `/webinars/registration`, homepage) and all three dynamic collections (`/blog/[slug]` × 6, `/podcast/[slug]` × 16, `/webinars/[slug]` × 19) are present — 24 core + 6 blog + 16 podcast + 19 webinar = 65 total, matching the live count.

### Intentionally excluded (per code comment in `sitemap.js` / mirrored in `robots.js`)
- `/thank-you` — has `noindex` meta tag AND is disallowed in `robots.txt` (redundant, see §5).
- `/dashboard` — 200 OK, but **no `noindex` meta tag found**; relies solely on `robots.txt` disallow.
- `/resources/hub` — 200 OK, but **no `noindex` meta tag found**; relies solely on `robots.txt` disallow.

Note: `robots.txt` disallow prevents crawling, which means Googlebot cannot even see a `noindex` tag on `/dashboard` or `/resources/hub` if it wanted to (it never fetches the page). If either URL ever gets an external inbound link, Google can still list the bare URL in search results with a "no information available" snippet, because disallow ≠ noindex. Recommended fix: either add `noindex` meta and **allow** crawling (remove from `disallow`), or accept current risk since these are low-value internal pages unlikely to attract backlinks.

### Missing from sitemap (real, indexable routes not intentionally excluded)
`app/events/[slug]/register/page.js` generates **5 static pages** via `generateStaticParams()` off `registrationEvents` in `site-data.js`, none of which appear in `sitemap.js` and none of which are mentioned in its exclusion comment:

| URL | HTTP | Canonical | Robots meta |
|---|---|---|---|
| `/events/scaling-selling-independent-vet-practices-growing/register` | 200 | self-referencing ✓ | `index, follow` |
| `/events/best-people-leave-top-veterinary-practices/register` | 200 | self-referencing ✓ | `index, follow` |
| `/events/cost-based-anger-veterinary-clients/register` | 200 | self-referencing ✓ | `index, follow` |
| `/events/veterinary-end-life-playbook-supporting-pet/register` | 200 | self-referencing ✓ | `index, follow` |
| `/events/4-year-visit-decline-reversing-pet/register` | 200 | self-referencing ✓ | `index, follow` |

These pages are explicitly marked `index, follow` (i.e., the developer intends them to be indexed) yet are absent from the sitemap **and** have zero internal links pointing to them anywhere on the site (see §5) — the `/events` page's "Reserve My Free Spot" CTA points to an external Zoom registration URL instead. These are true orphan pages, likely intended as email/ad campaign landing pages, but as built they are invisible to both crawlers and the sitemap. Also note 4 of the 5 events have dates that have already passed (June 10, 17, 24 and July 8, 2026, vs. today's date of July 9, 2026) yet remain live and indexable — worth a content-freshness decision (redirect past events to a replay/thank-you state, or explicitly keep them as evergreen replay-request pages).

### Sitemap URLs that don't exist
Covered in §2 — the 2 dead podcast URLs. No other sitemap entries were found to reference non-existent routes.

## 4. robots.txt

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

- Returns HTTP 200. PASS.
- Correctly references the sitemap with an absolute URL. PASS.
- Disallow list matches the exclusion set documented in `sitemap.js`'s comment (minus the noindex-tag gap noted above).
- Query-string catch-all (`/*?*`) is a sound way to prevent duplicate-content crawling of parameterized URLs; none of the sitemap's 65 URLs carry query strings, so no conflict.

## 5. Orphan Page Spot Check

Checked raw (non-JS-rendered) HTML of homepage, `/blog`, `/podcast`, `/webinars`, and `/events` for internal `<a href>` links into each dynamic collection.

| Collection | Total in sitemap | Statically linked (no-JS) | Notes |
|---|---|---|---|
| Blog posts | 6 | 6/6 | Fully linked from `/blog` listing. No orphans. |
| Podcast episodes | 16 | 9/16 visible in raw HTML of `/podcast` (rest presumably behind client-side "load more"/pagination) | One of the 9 statically linked slugs is one of the two 404s in §2 — the listing itself links to a dead page. |
| Webinars | 19 | 2/19 on `/webinars` listing directly; +9 more surfaced via `/events` "Watch Past Replays" section (gated) → 9–11/19 discoverable without JS execution | Remaining ~8–10 webinar detail pages depend on client-side rendering/pagination for discovery in a no-JS crawl; likely fine for Googlebot (which renders JS) but not guaranteed for all crawlers. |
| Event registration pages | 5 | **0/5** — zero internal links found anywhere (home, `/events`, `/webinars`) | True orphans; only reachable by typing/pasting the exact URL. Also absent from the sitemap (§3), so they have no discovery path at all through the site or the sitemap. |

## Issues Summary

### CRITICAL
- None. XML is valid, well-formed, and far under the 50,000-URL cap.

### HIGH
1. **2 sitemap URLs return HTTP 404** (`/podcast/stop-surviving-and-start-leading-with-practical-solutions-for`, `/podcast/smarter-systems-safer-practices-using-ai-and-technology-to-build`) — caused by a data-source desync between the static `episodes` array in `site-data.js` (used by `sitemap.js` and the podcast listing page) and the live-merged `getMergedEpisodes()` source used by `generateStaticParams()` for the actual page build. This is a systemic bug, not a one-off, and will recur as episode titles change.
2. **5 indexable, `index,follow` pages (`/events/[slug]/register`) are completely missing from the sitemap and have zero internal links** — real content with proper canonicals that is invisible to both the sitemap and normal site navigation.

### MEDIUM
3. Podcast and webinar detail pages rely partly on client-side rendering (load-more/pagination/gating) for internal discovery in a no-JS crawl — 7/16 podcast episodes and up to ~10/19 webinars aren't linked in raw HTML from their listing pages. Likely fine for Googlebot but worth confirming with rendered-HTML testing (URL Inspection tool) since it's the only discovery path other than the sitemap for these pages.
4. 4 of the 5 orphaned event-registration pages (§3) point to events with dates already in the past as of the audit date — stale, still-indexable landing pages.

### LOW
5. All 65 sitemap URLs share one identical, hardcoded `lastmod` (`2026-05-31T00:00:00.000Z`) that doesn't reflect real content dates (blog posts have individual dates that are ignored).
6. `/dashboard` and `/resources/hub` are excluded from the sitemap and blocked via `robots.txt` `disallow`, but carry no `noindex` meta tag — if either ever earns an external backlink, Google can still index the bare URL. `/thank-you` has both `noindex` and `disallow`, which is redundant (the disallow prevents Google from ever seeing the noindex tag).

### INFO
7. `<priority>` and `<changefreq>` are populated on every URL; both are ignored by Google's current algorithm and can be removed to simplify the generator.

## Sitemap Health Sub-Score: **54 / 100**

Deductions: -15 (broken sitemap URLs, High) · -10 (missing/orphaned indexable route class, High) · -8 (partial JS-dependent internal linking, Medium) · -8 (uniform/inaccurate lastmod, Low-Medium) · -3 (deprecated priority/changefreq, Info) · -2 (noindex/robots.txt overlap gaps, Low).

Core mechanics (XML validity, URL-count headroom, robots.txt wiring) are solid — the score is pulled down by a real, currently-live broken-link pair in the sitemap and a whole route class (event registration landing pages) that exists in production but is invisible to both the sitemap and site navigation.
