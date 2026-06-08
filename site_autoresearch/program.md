# site_autoresearch

This adapts the `karpathy/autoresearch` pattern to the VBI website.

## Protected Files

Do not modify these during routine iteration:

- `site_autoresearch/evaluate.mjs`
- `site_autoresearch/benchmark.json`
- `site_autoresearch/research.md`

These are the fixed evaluator, benchmark, and research notes. If the evaluator changes, the score loses meaning.

## Editable Scope

The site can evolve through:

- `app/page.js`
- `app/about/page.js`
- `app/podcast/page.js`
- `app/events/page.js`
- `app/webinars/page.js`
- `app/marketing/page.js`
- `app/contact/page.js`
- `app/components/*.js`
- `app/globals.css`
- `app/lib/site-data.js`

## Goal

Raise the site quality score while keeping the copy aligned to real VBI source material and the structure aligned to the strongest patterns from the Dominatelaw reference.

## Baseline Loop

1. Build the app:
   `npm run build`
2. Run the fixed evaluator:
   `npm run research:evaluate -- "describe the experiment"`
3. Review `site_autoresearch/latest-report.json`
4. Keep improvements that raise the score or materially improve clarity without harming the score.
5. Discard cosmetic churn that does not improve navigation, hierarchy, proof, or CTA clarity.

## What To Optimize

- Stronger hero promise on every page
- More explicit CTA pathways
- Better use of real VBI podcast and webinar content
- Better use of the Vimeo-backed event panel archive
- Better page-specific proof and summaries
- Better internal linking across the VBI ecosystem
- Cleaner marketing conversion architecture

## What Not To Do

- Do not add public-facing AI tutorial content to the website
- Do not change the benchmark to make weak pages score better
- Do not replace real VBI subject matter with generic filler
- Do not revive outdated "next event" messaging when the safer framing is replay/archive
