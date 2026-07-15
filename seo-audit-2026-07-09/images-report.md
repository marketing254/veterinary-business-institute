# Images Audit (inline) — veterinarybusinessinstitute.com homepage

Score: 48/100

## Findings
- 16 <img> tags on homepage; 0 missing alt text (excellent)
- 16/16 missing width/height attributes → CLS risk
- 0/16 use loading="lazy" (below-fold podcast covers + speaker images all eager-load)
- No next-gen formats: 5 PNG, 10 JPG, 1 SVG; no WebP/AVIF, no <picture>/srcset (Next.js image optimization disabled by static export — using plain <img>)
- File sizes:
  - /assets/hero-home.png: **1,803,135 bytes (1.8 MB)** — likely LCP element, CRITICAL
  - /assets/marketing-hero.png: 823,389 bytes (823 KB) — HIGH
  - /assets/logo-vbi.png: 182,123 bytes (182 KB, loaded 3x on page) — should be <20 KB or use logo.svg (13 KB) everywhere
- 9 podcast episode covers hotlinked from Apple mzstatic CDN (same identical artwork repeated 9x — could be one cached asset; also third-party dependency)

## Issues
- CRITICAL: hero-home.png 1.8 MB PNG (LCP killer) — convert to WebP/AVIF ~100-150 KB, add fetchpriority="high"
- HIGH: marketing-hero.png 823 KB → WebP
- HIGH: no width/height on any image → layout shift (CLS)
- MEDIUM: no lazy loading on below-fold images
- MEDIUM: logo-vbi.png 182 KB used instead of existing 13 KB logo.svg
- LOW: no srcset/responsive sizes

## Quick wins
1. Convert both hero PNGs to WebP (est. 90% size reduction)
2. Add width/height + loading="lazy" to below-fold imgs
3. Swap PNG logo for existing SVG
