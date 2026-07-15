# Performance / Core Web Vitals Report — veterinarybusinessinstitute.com
Date: 2026-07-09

## Method note / limitation
PageSpeed Insights API returned HTTP 429 on all attempts (including a retry after a 20s wait):
`"Quota exceeded ... quota_limit_value: 0"` — the project's PSI daily quota is configured
at 0, i.e. **not a transient rate limit but a persistent quota-misconfiguration**. No
Lighthouse/CrUX field data could be obtained for home, /speakers, or /about.
**All figures below are derived from curl timing + static HTML/asset analysis, not a real
browser or Lighthouse run.** LCP/CLS/INP figures are estimates with reasoning shown, not
measurements. Treat the performance score as a rough estimate only.

## Infrastructure discovery (important)
Response headers show `Server: GitHub.com`, `X-GitHub-Request-Id`, fronted by Fastly
(`Via: 1.1 varnish`, `X-Served-By: cache-sin-...`). **This site is being served by GitHub
Pages + Fastly, not Netlify**, despite the repo containing `netlify.toml`. This matters
because the caching rules defined in `netlify.toml` (long-lived immutable cache for
`/_next/static/*` and `/assets/*`) are **not being applied in production** — every
resource, including hashed/immutable JS/CSS/font/image files, is served with
`Cache-Control: max-age=600` (10 minutes) instead of `public, max-age=31536000, immutable`.
This is a config-drift bug, not a code bug: the intended headers exist in the repo but the
live host ignores them.

## Timing measurements (curl, single-region, likely not representative of end-user geo — see caveat)
| Page | HTTP | TTFB | Total time | HTML size (raw/gzip) |
|---|---|---|---|---|
| / (home) | 200 | ~0.30–0.39s (3-sample avg ~0.37s) | ~0.54–0.93s | 155,371 / 27,547 bytes |
| /speakers | 200 | 0.288s | 0.538s | 157,918 bytes (raw, gzip not sampled) |
| /about | 200 | 0.322s | 0.472s | 105,516 bytes (raw, gzip not sampled) |

Caveat: request was served from a Fastly Singapore PoP (`X-Served-By: cache-sin-...`). The
business address is Mississauga, Ontario, Canada — real North American visitors will likely
hit a closer PoP and may see different (probably better, but unverified) TTFB. TTFB itself
(~300–390ms even on a cache HIT) is on the high side for an edge-cached static asset; ideal
is <100–200ms.

## Compression / protocol
- gzip compression is active and working correctly (`Content-Encoding: gzip` when
  `Accept-Encoding` sent) — home HTML compresses 155,371 → 27,547 bytes (~82% reduction). Good.
- No Brotli observed (only gzip offered/served) — Brotli would shave another ~15-20% off
  text assets at negligible cost.
- HTTP version could not be confirmed: the available curl build (Schannel, no nghttp2) only
  offers ALPN `http/1.1` and cannot negotiate h2, so we cannot confirm from this client
  whether the origin/CDN supports HTTP/2 or HTTP/3. GitHub Pages + Fastly generally support
  HTTP/2 by default, but this is **unverified**, not confirmed, from this environment.

## Homepage HTML/resource analysis
- **44** `<script>` tags, 12 marked `async`; **13 distinct** top-level JS chunks referenced
  directly off the homepage.
  - Raw combined size of those 13 chunks: **~920 KB**; gzip: **~283 KB** (measured
    individually via curl). This does not include further code-split chunks these may
    dynamically import.
  - Largest single JS chunk: `0v.a34_pb75ld.js` — 226 KB raw / 71 KB gzip.
- **3** render-blocking `<link rel="stylesheet">` tags (no `media`/async pattern):
  - `1768-m9.k674m.css` — **194,093 bytes raw / 34,765 bytes gzip** (a large, apparently
    monolithic/un-code-split CSS bundle blocking first paint).
  - `04ndqh5j-68-_.css` — 9,874 bytes; `0yznb0lo.ebt5.css` — 10,890 bytes.
  - Combined render-blocking CSS: ~214.9 KB raw before paint can start.
- **12** `<link rel="preload">` tags in `<head>`, including **4 font preloads** and **7 image
  preloads** fired simultaneously: `logo-vbi.png`, `logo.svg`, `hero-home.png`,
  `marketing-hero.png`, an external Apple Podcasts artwork (mzstatic.com), and
  `host-naren.jpg`. Preloading 7 images at once creates bandwidth contention with the fonts
  and CSS that are also needed for first paint — this works against, not for, LCP.
- **16** `<img>` tags on the homepage; **0** have `width`/`height` attributes and **0** use
  `loading="lazy"` (including 8 repeated below-the-fold podcast-episode thumbnails that all
  point to the same external URL and are not deferred).
- Third-party origins referenced on the homepage: `googletagmanager.com` (GA4, preloaded as
  high-priority script), `is1-ssl.mzstatic.com` (Apple Podcasts artwork, preloaded), plus
  `vimeo.com`, `podcasts.apple.com`, `music.youtube.com`, `traffic.libsyn.com`,
  `drive.google.com`, social profile links. GA4 script is preloaded and given elevated
  priority ahead of render, adding to render-blocking contention.
- Rough DOM element count (open-tag proxy): **~903** on the homepage — under the 1,500
  "excessive DOM" threshold, so not currently a major INP risk on this page.
- Continuous-motion elements present: an animated particle/star canvas background
  (`star-cloud-canvas`), a CSS `conic-gradient` spin animation on the primary CTA button, a
  typewriter text effect, and an auto-scrolling marquee ticker in the topbar — these run
  continuously post-load and are compositor/main-thread work that can compete with user
  input handling (INP risk), though severity can't be confirmed without a real trace.
- The initial server-rendered HTML includes a loading-skeleton (`loading-skeleton-container`,
  shimmer placeholders) that gets replaced by client-fetched content after hydration — a
  classic CLS-risk pattern if the skeleton's dimensions don't exactly match the final content.

## Image assets (this is the dominant issue)
| File | Format | Raw dimensions | File size | Used as |
|---|---|---|---|---|
| `/assets/hero-home.png` | PNG | 1254×1254 | **1,803,135 bytes (1.76 MB)** | Hero visual, preloaded, likely LCP element |
| `/assets/marketing-hero.png` | PNG | 1162×775 | **823,389 bytes (804 KB)** | "Marketing & SEO" section image, preloaded |
| `/assets/logo-vbi.png` | PNG | 2874×973 | **182,123 bytes (178 KB)** | Nav + footer logo, rendered at a fraction of native size, preloaded, referenced 3× on the page (browser-cached after first fetch, but still 178 KB for a logo) |
| `/assets/logo.svg` | SVG | vector | 12,984 bytes | Mobile menu logo, preloaded |
| `/assets/host-naren.jpg` | JPEG | 200×200 | 11,103 bytes | Podcast host avatar — fine |
| `/assets/og-cover.jpg` | JPEG | 1200×630 | 56,728 bytes | OG/social meta image only (not rendered) — fine |

None of the large images are WebP/AVIF; all are unconverted PNGs, none are responsive
(`srcset`)/size-negotiated, and the hero and marketing images are not compressed for web
delivery. **~2.6 MB of the homepage's image weight comes from 2 files** (hero + marketing
PNGs) that could each realistically be reduced by 90%+ by converting to WebP/AVIF at
appropriate display dimensions.

## Estimated total homepage payload (approx, not a full waterfall)
HTML gzip (~27.5 KB) + render-blocking CSS gzip (~35–45 KB est.) + top-level JS gzip
(~283 KB) + fonts (~150 KB, 4× ~37KB woff2) + images (~2.6 MB PNGs + 178 KB logo + misc) ≈
**~3.2 MB total**, of which **roughly 85–90% is unoptimized PNG image weight**. This is the
single biggest lever on this page.

## Core Web Vitals — status (ESTIMATED, not measured; PSI/Lighthouse unavailable)
| Metric | Estimate | Threshold | Status |
|---|---|---|---|
| LCP | **~5–8s+ on throttled/real-world mobile** (reasoning: LCP element is very likely the 1.76 MB hero PNG or the 194 KB render-blocking CSS gates it; it competes for bandwidth against 6 other preloaded images + 4 fonts + GA4 fired simultaneously) | ≤2.5s good | **Likely FAIL (Poor)** — estimate |
| CLS | **~0.1–0.25 range plausible** (reasoning: 0/16 images have explicit width/height; server-rendered loading-skeleton swapped for client-fetched content post-hydration; webfonts + dynamic content patterns present) | ≤0.1 good | **Likely FAIL (Needs Improvement)** — estimate |
| INP | **Likely <200ms on mid/high-end devices, uncertain on low-end** (reasoning: DOM size is moderate ~900 elements, not excessive; but continuous canvas/animation work + ~920KB raw JS + third-party GA4 add main-thread load) | ≤200ms good | **Uncertain / plausible PASS on desktop, at-risk on low-end mobile** — estimate |

Given no field/lab tool access, an overall Lighthouse-style **mobile performance score is
estimated at roughly 30–45/100 (Poor)**, driven primarily by the ~2.6 MB of unoptimized hero
images plus a 194 KB monolithic render-blocking CSS bundle. This is a heuristic estimate,
explicitly not a measured Lighthouse score — re-run PSI/Lighthouse once API quota is fixed
or a browser is available to confirm.

## Issues by priority

**CRITICAL**
1. Hero image `/assets/hero-home.png` is a 1.76 MB unoptimized PNG, preloaded and almost
   certainly the LCP element — single biggest performance blocker on the site.
2. `/assets/marketing-hero.png` is an 823 KB unoptimized PNG loaded on the homepage.
3. Static, content-hashed assets (`/_next/static/*`, `/assets/*`) are served with
   `Cache-Control: max-age=600` in production even though `netlify.toml` specifies
   `public, max-age=31536000, immutable` — confirms the site is **not actually being served
   by Netlify** (headers show GitHub Pages/Fastly), so the intended caching config never
   takes effect. Every repeat visitor re-downloads ~3 MB of hashed assets that should be
   served from local cache.

**HIGH**
4. 7 `<link rel="preload" as="image">` tags fire simultaneously in `<head>`, competing with
   fonts and CSS for bandwidth on the critical rendering path — this actively delays LCP
   rather than helping it. Only the true LCP candidate should be preloaded.
5. Render-blocking CSS bundle `1768-m9.k674m.css` is 194 KB raw (34.8 KB gzip) and appears
   monolithic (not split into critical/above-the-fold vs. deferred CSS).
6. `logo-vbi.png` is a 178 KB PNG at 2874×973 native resolution rendered at a small nav/footer
   size — no responsive sizing or SVG use despite an SVG version (`logo.svg`, 13 KB) already
   existing in the same folder.
7. GA4 (`googletagmanager.com/gtag/js`) is preloaded with elevated priority, adding
   third-party script weight to the critical path ahead of first paint.

**MEDIUM**
8. All 16 `<img>` tags lack explicit `width`/`height` (0/16), and none use
   `loading="lazy"`, including 8 offscreen/repeated podcast-thumbnail images — CLS risk and
   unnecessary early network contention for below-the-fold images.
9. Server-rendered loading-skeleton content is swapped for client-fetched content after
   hydration on the homepage — CLS risk if skeleton and final content dimensions don't
   match exactly.
10. Continuous animations (particle canvas background, spinning conic-gradient CTA border,
    typewriter effect, auto-scrolling marquee) run post-load and add ongoing
    main-thread/compositor work that could affect INP on lower-end devices.
11. No Brotli compression observed (gzip only) — leaving some extra compression on the table
    for text assets.

**LOW**
12. TTFB of ~300–390ms even on a Fastly cache HIT is a bit higher than ideal for a fully
    static, edge-cached page (ideal <100–200ms), though this may be an artifact of the
    test's routing to a distant (Singapore) PoP rather than a real issue for the target
    (North American) audience — needs verification from a US/Canada vantage point.
13. HTTP/2+ support could not be verified from this environment (client tooling limitation),
    should be confirmed independently.

## Top 3 quick wins (highest impact : effort ratio)
1. **Compress and convert the hero and marketing images to WebP/AVIF at their actual
   display size** (`hero-home.png` 1.76MB→ likely <150KB, `marketing-hero.png` 823KB→
   likely <80KB). This alone should cut total page weight by ~85% and is the single
   biggest lever on LCP.
2. **Fix the caching layer**: confirm actual hosting (GitHub Pages+Fastly vs. intended
   Netlify) and make sure hashed `/_next/static/*` and `/assets/*` assets are served with
   `Cache-Control: public, max-age=31536000, immutable` in production — the config already
   exists in `netlify.toml`, it just isn't being applied on the live host. Fixes repeat-visit
   performance for every returning visitor.
3. **Trim preloads to only the true LCP image** (drop preload on the 6 other images; let the
   browser/CDN prioritize fonts + critical CSS + the actual hero image), and add
   `width`/`height` (or `aspect-ratio`) plus `loading="lazy"` to all below-the-fold `<img>`
   tags (especially the 8 podcast-thumbnail images) to reduce CLS risk and bandwidth
   contention on load.
