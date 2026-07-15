# Content Quality / E-E-A-T Audit — Veterinary Business Institute (veterinarybusinessinstitute.com)
Audit date: 2026-07-09 | Method: live curl fetch of server-rendered HTML (Next.js SSR) + sitemap.xml discovery + repo source review (D:\VeterinaryBusinessInstitute-main\VeterinaryBusinessInstitute-main)

## Methodology notes
- Pages are server-rendered (Next.js/RSC), so `curl` captures the same text content a non-JS-executing crawler (e.g. many AI bots) would see.
- A ~388-word sitewide boilerplate block (skip-link, an 8x-repeated marquee/ticker announcement, full nav, footer nav/contact/social) is present verbatim on every page. Word counts below are reported as **total** (raw visible text) and **net** (total minus the 388-word boilerplate) to isolate actual unique page content.
- Site is the media/education arm of **Ekwa Marketing** (an SEO agency for veterinary practices); nearly every page funnels to a "Free Strategy Call" / marketing-audit CTA. This commercial framing is relevant to Trustworthiness scoring for business-advice (YMYL-adjacent) content.

## Word counts (net = unique content, boilerplate removed)

| Page | Total words | Net words | Notes |
|---|---|---|---|
| Homepage `/` | 1898 | 1510 | Exceeds 500-word floor |
| `/about` | 1161 | 773 | |
| `/team` | 1181 | 793 | |
| `/speakers` | 1519 | 1131 | 43 experts listed (paginated) |
| `/podcast` (hub) | 1220 | 832 | |
| `/podcast/from-scribe-to-self-reading-practice...` | 872 | 484 | Good show notes; transcript is client-side ("Loading transcript…" in raw HTML — not crawlable) |
| `/podcast/selling-your-veterinary-practice...` | 1049 | 661 | |
| `/webinars` (hub) | 1684 | 1296 | |
| `/webinars/cybersecurity-in-veterinary-practices` | 441 | **53** | **Thin/doorway** — title, panel name, date, runtime only |
| `/webinars/data-driven-growth-ai-search-client-education` | 444 | **56** | **Thin/doorway** — same template, no recap/takeaways/transcript |
| `/resources` | 1096 | 708 | |
| `/resources/faq` | 583 | 195 | 4 short Q&As only |
| `/contact` | 537 | 149 | Acceptable for a contact page |
| `/reviews` | 1253 | 865 | 13 named testimonials with attribution |
| `/case-studies` | 1479 | 1091 | Only 2 named case studies backing the claims |
| `/privacy-policy` | 592 | ~204 | |
| `/terms-of-service` | 552 | ~164 | |
| `/blog/veterinary-seo-guide-2026` | 2500 | 2112 | Exceeds 1500-word blog floor |
| `/blog/google-business-profile-for-veterinary-practices` | 2412 | 2024 | |
| `/blog/veterinary-social-media-strategy` | 2490 | 2102 | |
| `/blog/ai-for-veterinary-practices-2026` | 2463 | 2075 | |

**Thin/doorway pages identified:** the ~22 webinar replay detail pages (2 sampled directly, template confirmed identical structure via markup) each carry only ~50-90 words of unique content (title, one-line panel description, date, runtime, "Keep Learning" CTA) — no recap, no key takeaways, no transcript, no speaker quote. This is a repeating template applied at scale across ~22 URLs, which is a classic doorway-page pattern under the Sept 2025 QRG even though the pages are not spammy in intent.

## E-E-A-T breakdown

### Experience — MODERATE (weak in places)
- Positive: 43 named guest speakers with specific bios, employers, and topics (`/speakers`); 13 attributed guest testimonials naming real practices (`/reviews`); podcast episode pages include detailed guest-specific show notes and "Key Takeaways."
- Negative: The two "Case Studies" (Riverside Small Animal Hospital; Paws & Care Veterinary Clinic) that are meant to be VBI's own proof-of-results have no verifiable identifying detail — no location, no link, no logo, no named contact, no date — and read as generic/composite examples rather than documented first-hand case work.
- Negative: Webinar replay pages show zero first-hand recap content (no "what we covered," no host commentary) despite being framed as flagship "event panel" content.

### Expertise — MODERATE
- Positive: Guest experts carry verifiable-style credentials (RVT, CVPM, DVM, MS CVA, PhD, named employers/consultancies).
- Negative: All four sampled blog guides carry the byline **"By Veterinary Business Institute"** with no named author and no credential — despite the SEO guide itself telling readers that "a licensed DVM reviewing or authoring your articles is a real differentiator" and recommending articles be "ideally reviewed by a DVM." VBI does not apply that standard to its own content.
- Negative: `/team` and `/about` present **two different rosters** for the same organization: `/about`'s "Our Team" lists Ashen Anushka, Chaluka Abeysinghe, Lester De Alwis, Adeesha Pemananda (real-looking marketing-ops staff), while `/team` separately profiles "Naren Arulrajah," "Dr. Sarah Jenkins" ("15 years in multi-doctor practice ownership," no practice named, no state/license, no photo credibility markers) and "Marcus Thorne" — generic, unverifiable, stock-bio-style personas not referenced anywhere else on the site (not co-hosts, not in speakers list, not credited on any article). This inconsistency undermines confidence that the credentialed personas are real.

### Authoritativeness — MODERATE
- Positive: Real, recognizable third-party guests (practice brokers, RVTs, consultants, a past OVMA president) lend borrowed authority; podcast/webinar programming shows an active content operation.
- Negative: Core trust statistics are self-referential and largely unverifiable — "16,000+ positive testimonials across the wider Ekwa marketing ecosystem" (no link/source), "20+ Years / 2,200+ Practices Coached / 188 Countries Reached" (host bio, no source).
- Negative (concrete inconsistency): Podcast-episode-count claims **conflict across pages**: `/about`, `/team`, and homepage all cite "103+ Podcast episodes published"; `/reviews` states "60+ Episodes published"; the sitewide ticker/podcast detail pages reference "Episode 113"/"Episode #114"; yet **only 15 podcast episode URLs are actually discoverable in sitemap.xml**. No single number is internally consistent, and the vast majority of claimed episodes are not crawlable/indexed pages.

### Trustworthiness — WEAK-to-MODERATE
- Positive: HTTPS, physical address, two phone numbers, dedicated support email, "we respond within 1 business day," privacy policy + terms of service present, JSON-LD structured data on every sampled page, contact form has a privacy disclaimer.
- **Critical technical trust issue:** Key trust/credibility statistics (podcast episode count, event-panel count, testimonial count, DVM-turnover %, booking-increase %) are rendered via a React "animated counter" that starts at literal `0` in the server-rendered HTML, with the real value only present inside an embedded RSC JSON payload (e.g. `{"end":16000,...}`), not as visible static text. Any crawler or AI system that does not execute client-side JS (many don't) will read **"0+ Podcast episodes," "0% DVM turnover," "0+ Positive testimonials"** — literally false/nonsensical numbers — on `/about`, `/team`, `/case-studies`, and the homepage.
- Content transparency issue: the SEO guide blog post presents a statistic labeled inline as **"(illustrative)"** — "~75% of pet owners (illustrative) research a clinic online before booking a first visit" — i.e., a made-up placeholder number left in published copy, sitting next to other stats that look sourced. This is a genuine accuracy/trust defect if consumed at face value by a reader or an AI answer engine (which would have no way to know it's illustrative).
- Heavy, undisclosed commercial affiliation: nearly every "educational" page (podcast, webinars, blog, FAQ, case studies) funnels to Ekwa Marketing's paid audit/strategy-call offer; the content is authored/hosted by Ekwa's own CEO. This isn't disallowed, but for business-advice content it should be more clearly disclosed as agency-authored/sponsored rather than framed as neutral independent "Institute" research.

## Readability & scannability
- Blog posts (sampled: SEO guide, GBP guide, social strategy, AI guide) are well structured: H2/H3 hierarchy, bolded lead-ins, bulleted action checklists, a "90-day action plan" broken into day ranges, byline + "Updated [date]" + reading time. Sentence length is moderate-to-long (business/consultative tone) but broken up well by lists — good scannability.
- Webinar/podcast detail pages and FAQ are appropriately short/scannable, but webinar pages are so short they read as index stubs rather than content pages.
- Sitewide: the 8x-repeated marquee ticker text ("Latest Podcast Episode 113... Latest Event Panel...") appears literally 8 times in a row in the raw HTML of **every single page** on the site (likely a CSS-marquee animation duplicating its child for seamless looping). This adds ~250+ words of pure repetition to every page's source and is a duplicate-content/readability concern for any text-based crawler that doesn't understand the animation is decorative.

## AI citation readiness
- Positive: Blog guides lead with clear direct-answer framing, define terms plainly (e.g., "NAP," "map pack"), use FAQ-style headers, and explicitly discuss AI Overviews/answer engines as an audience — good candidate content for LLM citation.
- Positive: JSON-LD structured data present on all sampled page types (4-8 blocks per page).
- Negative: Podcast episode transcripts are **not present in server-rendered HTML** — the transcript section literally renders as "Episode Transcript Loading transcript…" and is fetched client-side. This is the single richest, most quotable asset on each podcast page (verbatim guest quotes) and it is currently invisible to non-JS crawlers/AI ingestion.
- Negative: Webinar detail pages have no citable substance at all (title + date + runtime).
- Negative: The animated-counter "0" issue (above) means the most AI-citable trust stats on the site currently resolve to false values in static HTML.

## Duplicate / boilerplate content
- ~388-word nav+ticker+footer block repeated verbatim on every page (expected for a site template, but inflates raw word counts and should be excluded from any word-count QA).
- The "Eight pillars of veterinary business education" block (Leadership & Culture / Operations & Staffing / Marketing & Visibility / Technology & Systems / Financial Health / Client Experience / Risk & Compliance / Growth Strategy) is duplicated verbatim across `/about`, `/team`, and `/case-studies`.
- The 22 webinar detail pages share an identical near-empty template (see thin-page finding above) — a repetitive-structure pattern the Sept 2025 QRG flags as a low-quality AI/templated-content marker.

## Freshness signals
- Sitemap `<lastmod>` for nearly all top-level URLs is a single blanket date (2026-05-31) rather than true per-page modification dates — suggests a scripted/batch sitemap generator rather than genuine content-change tracking.
- Blog posts do carry real, distinct "Updated [date]" bylines (Apr 14, Apr 28, May 12, May 26 2026) — genuinely fresh and differentiated, a positive signal.
- Podcast/webinar detail pages carry real publish dates tied to the specific episode/event — good.

## Issues (prioritized)

**CRITICAL**
1. Trust/authority statistics (podcast episode count, testimonial count, DVM turnover %, booking lift %) render as literal "0" in server-rendered HTML because they depend on client-side JS animated counters — misleading to non-JS crawlers and AI ingestion.
2. Podcast/webinar episode counts are internally inconsistent site-wide: "103+ episodes" (about/team/home) vs "60+ episodes" (reviews) vs "Episode 113/114" (ticker/detail pages) vs only 15 episode URLs actually indexed in sitemap.xml.
3. Webinar replay detail pages (~22 URLs) are thin/doorway pages with only ~50-90 words of unique content each, no recap/takeaways/transcript — a templated low-value pattern at scale.

**HIGH**
4. A statistic is explicitly labeled "(illustrative)" — i.e., fabricated/placeholder — inside published blog copy, sitting next to unlabeled stats, with no disclosure this is a hypothetical figure.
5. Podcast episode transcripts are not present in server-rendered HTML (client-side "Loading transcript…"), hiding the richest quotable/citable content from crawlers.
6. `/team` and `/about` present two different, non-overlapping staff rosters for the same organization, with `/team`'s "Dr. Sarah Jenkins" and "Marcus Thorne" reading as generic, unverifiable personas (no practice name, no license/state, not referenced elsewhere on the site).
7. All owned blog content is bylined only "By Veterinary Business Institute" with no named/credentialed author, despite the content itself asserting that DVM-authored/reviewed articles are a real ranking/trust differentiator.

**MEDIUM**
8. "Case Studies" page backs quantitative claims (+145% bookings, 0% DVM turnover) with only two generically-named, unverifiable client examples (no links, locations, dates, or named contacts).
9. Core trust stats ("16,000+ positive testimonials across the wider Ekwa marketing ecosystem") are unsourced and attributed to a different, related entity (Ekwa) rather than VBI itself, without a link to verify.
10. Heavy, largely undisclosed commercial framing — nearly every page funnels to Ekwa Marketing's paid audit — appropriate for a marketing entity, but risks appearing as agency self-promotion dressed as neutral "Institute" education/research for YMYL-adjacent business advice.
11. Sitewide 8x-repeated marquee/ticker text adds ~250 words of literal duplication to the source of every page.

**LOW**
12. `resources/faq` is very thin (4 Q&As, ~195 net words) relative to its "Knowledge Base & FAQ" framing.
13. Sitemap uses one blanket `<lastmod>` date for nearly all URLs rather than genuine per-page freshness tracking.
14. Two unlabeled phone numbers with different area codes shown together in the footer/contact page with no indication of which to use for what.

## Top quick wins
1. Server-render the real numeric values for the animated counters (or provide a `<noscript>`/static fallback) so trust stats never show "0" to crawlers or AI systems, and reconcile the conflicting episode-count figures (103+ vs 60+ vs Episode 113/114 vs 15 indexed) into one accurate, consistent number sitewide.
2. Build out the ~22 webinar replay pages with real unique content per page (200-400+ words: recap, 3-5 key takeaways, a pull quote, speaker credential blurb) matching the quality bar already set by the podcast episode template, and server-render podcast transcripts instead of client-side loading them.
3. Add named, credentialed bylines (with a linked author bio) to blog articles and resolve the `/about` vs `/team` roster mismatch; remove or clearly re-label the "(illustrative)" statistic and replace unverifiable case-study/testimonial figures with sourced or clearly-attributed real examples.
