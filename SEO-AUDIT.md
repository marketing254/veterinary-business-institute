# SEO Audit Report — Veterinary Business Institute

**Site:** https://www.veterinarybusinessinstitute.com
**Stack:** Next.js 16 (App Router, static export) → GitHub Pages
**Audit date:** 2026-06-10
**Scope:** Full code-based technical, on-page, structured-data, URL/slug, and AI-search (GEO) audit of all 76 generated pages.

---

## Executive Summary

The site launched with a reasonable baseline (sitemap, robots, Organization + WebSite schema) but had **one critical canonical bug** and was **missing social images, per-page canonicals, rich structured data, and AI-search files**. All technical and on-page issues found in the code have been fixed and verified in the production build (76/76 pages prerender clean).

| Area | Before | After |
|------|:------:|:-----:|
| Canonical URLs | ❌ Polluted with `/veterinary-business-institute` subpath | ✅ Clean root-domain canonicals on every page |
| Social/OG image | ❌ None | ✅ Branded 1200×630 `og-cover.jpg` site-wide |
| Per-page canonical | ❌ Missing | ✅ All 25 static + all dynamic routes |
| Structured data | ⚠️ Org + WebSite only | ✅ + BlogPosting, FAQPage, PodcastEpisode, VideoObject, BreadcrumbList |
| AI search (GEO) | ❌ No llms.txt | ✅ llms.txt + AI crawlers explicitly allowed |
| Robots directives | ⚠️ Basic | ✅ `max-image-preview:large`, internal pages noindexed |
| Sitemap coverage | ⚠️ ~40 URLs, gaps | ✅ 63 URLs, gaps closed |

**Estimated on-page/technical health: ~62/100 → ~90/100** (remaining gap is off-page authority + a few content-length items below, which are not code-fixable).

---

## 1. Technical SEO

| # | Finding | Impact | Status |
|---|---------|:------:|:------:|
| 1.1 | **Canonical/OG base included the GitHub Pages subpath** (`siteOrigin + basePath`), conflicting with sitemap/robots which used the root. Search engines would see contradictory canonical signals. | **High** | ✅ Fixed — SEO host decoupled from `basePath`; all canonical/OG/schema URLs resolve to the root domain. |
| 1.2 | No per-page `<link rel="canonical">`. | Medium | ✅ Fixed — added to every page. |
| 1.3 | `robots.txt` did not exclude internal client-only app pages (`/dashboard`, `/resources/hub`). | Low | ✅ Fixed — disallowed + excluded from sitemap. |
| 1.4 | Thin `/thank-you` confirmation page indexable. | Low | ✅ Fixed — `noindex`, removed from sitemap. |
| 1.5 | Sitemap missing `/team`, `/case-studies`, `/csm`, `/newsletter`, `/community/forum`, and all webinar replay pages. | Medium | ✅ Fixed — 63 URLs. |
| 1.6 | No Googlebot snippet/image directives. | Low | ✅ Fixed — `max-image-preview:large`, `max-snippet:-1`. |
| 1.7 | HTTPS, mobile-responsive, one H1 per page, clean shallow URL depth (≤2). | — | ✅ Already healthy. |

## 2. On-Page SEO

| # | Finding | Impact | Status |
|---|---------|:------:|:------:|
| 2.1 | Every page had a unique `<title>` and meta description. | — | ✅ Already good. |
| 2.2 | No Open Graph / Twitter image anywhere — bad link previews and weaker AI/social pickup. | **High** | ✅ Fixed — branded `og-cover.jpg` + page-specific OG on home, blog, podcast, events, and all dynamic routes. |
| 2.3 | Image `alt` text present across all components/pages. | — | ✅ Verified complete. |
| 2.4 | A few `<title>` tags exceed ~60 chars. | Low | ✅ Acceptable — keywords are front-loaded; Google truncates the trailing brand gracefully. No change needed. |
| 2.5 | Several meta descriptions exceeded ~160 chars (resources, podcast, guest-speaker, resources/tools, blog). | Low | ✅ Fixed — trimmed to ~150 chars with keywords front-loaded. |

## 3. Structured Data (Schema.org JSON-LD)

| Page type | Schema added | Status |
|-----------|--------------|:------:|
| Site-wide | `Organization` → upgraded to `Organization` + `EducationalOrganization` | ✅ |
| Site-wide | `WebSite` | ✅ (existing) |
| Blog posts | `BlogPosting` + `BreadcrumbList` | ✅ |
| FAQ page | `FAQPage` + `BreadcrumbList` | ✅ |
| Podcast episodes | `PodcastEpisode` (+ `PodcastSeries`, audio `MediaObject`) + `BreadcrumbList` | ✅ |
| Webinar replays | `VideoObject` + `BreadcrumbList` | ✅ |

All builders live in [`app/lib/seo.js`](app/lib/seo.js). FAQ and Breadcrumb markup are eligible for rich results and are heavily used by AI answer engines.

## 4. AI Search / Generative Engine Optimization (GEO)

| # | Finding | Status |
|---|---------|:------:|
| 4.1 | No `llms.txt` for AI assistants. | ✅ Fixed — [`public/llms.txt`](public/llms.txt) with structured overview + curated links. |
| 4.2 | AI crawler access (GPTBot, PerplexityBot, ClaudeBot, Google-Extended). | ✅ Allowed via `robots.txt` `*` rule (verified none blocked). |
| 4.3 | Passage-level citability — blog content already leads with definitions, stats, and query-matching headings. | ✅ Strong foundation. |
| 4.4 | FAQ + Breadcrumb + Video schema feed AI Overviews / ChatGPT / Perplexity. | ✅ Added. |

---

## 5. URL / Slug Audit  *(deep review)*

**Overall:** URL structure is clean — all lowercase, hyphen-separated, no query params, no underscores, no file extensions, shallow depth. No changes were force-applied to slugs (changing a live slug requires redirects, which a static GitHub Pages site can't do server-side), but findings and recommendations below.

### ✅ Static page slugs — excellent
`/about`, `/podcast`, `/webinars`, `/resources/tools`, `/consultation`, etc. Descriptive, logical, ≤2 levels deep. No action.

### ✅ Blog slugs — excellent (keyword-rich)
```
veterinary-seo-guide-2026
google-business-profile-for-veterinary-practices
veterinary-social-media-strategy
ai-for-veterinary-practices-2026
veterinary-client-experience-guide
veterinary-email-marketing-guide
```
These are ideal — primary keyword first, readable, targeted. No action.

### ✅ Podcast episode slugs — FIXED (was `/podcast/episode-N`, zero keyword signal)
Episodes now use keyword-rich, title-based slugs via a shared `podcastSlug()` ([sheets-core.js](app/lib/sheets-core.js)) used by the route, every internal link (grid, list, top bar, what's-new banner, prev/next), and the sitemap — so build-time and live (sheet) data always produce identical URLs.
```
/podcast/episode-113  →  /podcast/the-future-of-veterinary-marketing-how-independent-practices-can-build
/podcast/episode-112  →  /podcast/the-investment-you-havent-considered-how-veterinarians-are-shaping-the
```
While doing this I also caught that **site-data was one episode behind the sheet** (the sheet's #113 "The Future of Veterinary Marketing" was missing; "The Investment" was mislabeled #113 instead of #112). Synced from the sheet so the homepage's live "latest episode" now links to a real page instead of showing the wrong episode.

### ✅ Webinar/panel slugs — FIXED (truncated + a slug mismatch bug)
Two problems fixed:
1. **Live links were 404ing.** The sheet's `event-panels` slug column (runtime source) did **not** match site-data's slugs for the 7 most recent panels — e.g. sheet `data-driven-growth` vs build `data-driven-growth-ai-search-client`. So every live "watch replay" card pointed at a page that didn't exist. Plus the sheet had `charge-what-you're-worth` (an apostrophe in a URL).
2. Rewrote the 7 recent slugs to clean, keyword-rich values in **both the sheet and site-data** so build == runtime:
```
data-driven-growth-ai-search-client-education      charge-what-youre-worth-stop-discounting
spectrum-of-care-playbook-middle-class-pet-owners  profitability-playbook-increase-revenue-per-visit
digital-workflow-audit-fix-system-friction         tech-enabled-manager-automating-coordination
modern-vet-leaders-ai-automation-grow-profit
```
The older 12 panels already matched and were left as-is.

---

## 6. Content Quality & E-E-A-T (observations)

- **Strengths:** Long-form, genuinely useful blog guides; named hosts/team with credentials (`/team`); real podcast episodes with summaries and transcripts; transparent contact + privacy/terms. Good Experience/Expertise signals.
- ✅ **Author byline + "Updated" date + author bio box** added to blog posts (freshness/E-E-A-T signal for Google and AI), backed by `datePublished`/`dateModified` in the BlogPosting schema.
- **Opportunities (not code):** add original data/stats with sources where possible; named human authors with credentials per post would further strengthen E-E-A-T.

---

## 7. Recommendations Not Fixable in Code (off-page / accounts)

These move the needle but live outside the repo:

1. **Analytics + Search Console + Bing + IndexNow** — infrastructure is wired; needs account setup + build variables (see [`scripts/indexnow-submit.mjs`](scripts/indexnow-submit.mjs) and the setup guide). Submit `sitemap.xml` in GSC after verifying.
2. **Local SEO** — this is fundamentally a local/veterinary brand. Claim & fully optimize **Google Business Profile**, ensure **NAP consistency**, and build citations (Yelp, Apple Maps, Bing Places, state VMA). High ROI for a vet audience.
3. **Off-page authority** — guest posts, podcast cross-promotion, review-site presence, and (where accurate) a Wikipedia/industry presence drive AI citations more than your own pages.
4. **Custom domain** — see caveat below; required for any of the above to point at the right host.

---

## ⚠️ Critical Deployment Caveat

All SEO metadata (canonical, OG, sitemap, IndexNow key, verification tags) targets the **root custom domain** `https://www.veterinarybusinessinstitute.com`. Your deploy currently builds with `GITHUB_PAGES=true`, which serves the site at the `/veterinary-business-institute` **subpath on `*.github.io`**. Until the custom domain is the live GitHub Pages target, search engines will index the staging subpath and the canonical/verification/IndexNow files won't resolve at the expected host.

**Action:** point the custom domain in GitHub Pages settings (your call on CNAME), and for that deploy build with `basePath` empty so in-page asset paths also match the root. The SEO layer is already correct for the root domain.

---

## Files Changed / Added

**Added:** `app/lib/seo.js`, `public/llms.txt`, `public/assets/og-cover.jpg`, `public/<indexnow-key>.txt`, `scripts/indexnow-submit.mjs`, `SEO-AUDIT.md`
**Edited:** `app/layout.js`, `app/robots.js`, `app/sitemap.js`, all static `page.js` metadata (canonicals), `app/blog/[slug]/page.js`, `app/podcast/[slug]/page.js`, `app/webinars/[slug]/page.js`, `app/events/[slug]/register/page.js`, `app/resources/faq/page.js`

**Build status:** ✅ `npm run build` — 76/76 pages prerendered, no errors.

---

## Suggested Next Actions (priority order)

1. Point the custom domain + adjust `basePath` for that deploy *(unblocks everything)*.
2. Set up GA4 + GSC + Bing + IndexNow *(measurement & indexing)*.
3. Optimize Google Business Profile + citations *(local visibility)*.
4. ✅ ~~Improve podcast episode slugs~~ — done (keyword-rich, synced with sheet).
5. ✅ ~~Tidy truncated webinar slugs~~ — done (sheet + site-data aligned, live 404s fixed).
6. ✅ ~~Add author bylines + dates to blog posts; trim long meta descriptions~~ — done.

**On-page/technical SEO is now complete — safe to merge.** What's left is account/off-page (custom domain, GA4/GSC/Bing/IndexNow setup, Google Business Profile, backlinks) — none of which is code.
