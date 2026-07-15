# GEO (Generative Engine Optimization) Audit
**Site:** https://www.veterinarybusinessinstitute.com
**Type:** Veterinary practice-owner education media brand (podcast, webinars, speaker panels, marketing guidance) - Next.js static export (output: "export"), hosted on GitHub Pages behind a Fastly/Netlify-style CDN.
**Audit date:** 2026-07-09

---

## 1. AI Search Readiness Score: 66 / 100

Technical crawlability is excellent (fully static HTML, open robots.txt, working llms.txt, clean sitemap). The score is held back by content-layer problems: dynamic stat counters that render as literally "0" to non-JS crawlers, broken/fabricated URLs inside the WebSite schema, an uncited "illustrative" statistic presented as fact, no question-phrased headings outside the FAQ page, and no named-person authorship for the founder or blog posts.

### Dimension breakdown

| Dimension | Weight | Score | Notes |
|---|---|---|---|
| Citability | 25% | 55/100 | Blog passages are well-formed (130-190 words, direct); most other pages lead with marketing copy, not direct answers; headings rarely phrased as questions |
| Structural Readability | 20% | 65/100 | Clean H1-H2-H3 hierarchy, lists/pillars used well; FAQPage schema present; question-phrasing largely absent outside FAQ |
| Multi-Modal Content | 15% | 60/100 | Podcast audio + transcripts, Vimeo webinar embeds, speaker photos; social footprint present but thin |
| Authority & Brand Signals | 20% | 60/100 | Strong Organization schema + 43 Person-schema speakers with sameAs; but founder has no Person schema, blog authorship is generic-org, broken schema URLs, no Review/AggregateRating despite a large testimonial claim |
| Technical Accessibility | 20% | 90/100 | Fully static/SSR HTML, robots.txt allows all AI bots, no CDN UA-blocking detected, llms.txt present and well-structured, comprehensive sitemap.xml |

Weighted score: 0.25(55) + 0.20(65) + 0.15(60) + 0.20(60) + 0.20(90) = 65.75, rounded to 66/100

---

## 2. AI Crawler Access

### robots.txt (live, app/robots.js)
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
Single wildcard rule, no bot-specific blocks. All named AI crawlers fall under User-Agent: * and are allowed.

### Bot-by-bot table (robots.txt rule + live UA test, HTTP status on /)

| Bot | robots.txt | UA test result | Verdict |
|---|---|---|---|
| GPTBot | Allowed (*) | 200 OK | Allowed |
| ChatGPT-User | Allowed (*) | 200 OK | Allowed |
| OAI-SearchBot | Allowed (*) | 200 OK | Allowed |
| ClaudeBot | Allowed (*) | 200 OK | Allowed |
| Claude-Web | Allowed (*) | 200 OK | Allowed |
| anthropic-ai | Allowed (*) | 200 OK | Allowed |
| PerplexityBot | Allowed (*) | 200 OK | Allowed |
| Google-Extended | Allowed (*) | 200 OK (no explicit rule; tested via generic UA) | Allowed |
| Bingbot | Allowed (*) | 200 OK | Allowed |
| CCBot | Allowed (*) | 200 OK | Allowed (optional-block candidate per GEO training-data policy) |
| Applebot-Extended | Allowed (*) | 200 OK | Allowed |
| Generic browser UA | Allowed (*) | 200 OK | Allowed |

No CDN/UA-level blocking detected. Every tested user agent returned an identical 200 response with the same ~155KB static HTML payload, confirming GitHub Pages/Fastly is not fingerprinting or serving degraded content to AI bots.

Note: current policy allows CCBot and anthropic-ai (training-only crawlers) alongside search bots. This is reasonable for a lead-gen media brand that wants maximum model/dataset presence, but if the site later wants to opt out of training-only use while keeping search-time retrieval, it would need bot-specific Disallow blocks for CCBot/anthropic-ai (not currently present).

---

## 3. llms.txt / llms-full.txt Status

| File | Status |
|---|---|
| /llms.txt | Present (HTTP 200, 3,229 bytes). Well-formed: H1 brand name, blockquote summary, categorized markdown link sections (Core Pages, Podcast & Webinars, Resources, Services, Contact) |
| /llms-full.txt | Missing (HTTP 404) |
| RSL 1.0 licensing | Not found - no RSL signal detected on site |

llms.txt content is genuinely good, the strongest asset in this audit. Minor gaps: no mention of the founder/host name, no key stats (episode count, speaker count), and the descriptions slightly undersell the "43 featured speakers" and "100+ episodes" scale that would help an LLM ground quantity claims.

A drafted llms-full.txt (more exhaustive, includes stats, FAQ excerpts, and host bio for grounding) is provided in Section 8.

## 4. Passage-Level Citability Audit (Score: 55/100)

Pages fetched raw (curl, no JS execution): /, /about, /podcast, /webinars, /speakers, /blog/veterinary-seo-guide-2026, /podcast/from-scribe-to-self-reading-practice-how-ai-helps-independent, /resources/faq, /reviews.

Positive findings:
- All content is present in raw server-rendered HTML, no JS-gating for body copy (confirmed via visible-text extraction after stripping script/style tags; word counts ranged 890-2,510 words per page).
- Blog post (/blog/veterinary-seo-guide-2026) has well-scoped, self-contained paragraphs in the 130-190 word range with specific, actionable claims (NAP consistency, GBP category selection), close to the 134-167 word optimal citation window.
- /resources/faq has genuine FAQPage JSON-LD with question-phrased H3s ("Do I need to be a practice owner to join the VBI Community?").
- Podcast episode pages include a full transcript section (multi-modal: audio + text), valuable for citation.

Weaknesses:
- No question-phrased H2/H3 headings anywhere outside the FAQ page. Headings are statement-style ("Google Business Profile: Your Single Highest-Leverage Asset" instead of "What is the single highest-leverage SEO asset for a veterinary practice?").
- Homepage and About hero sections lead with brand-voice marketing copy, not a direct, extractable definition of what VBI is, in the first 40-60 words.
- FAQ answers are too short (20-40 words), well below the 134-167-word optimal citable-passage length; they read as quick facts, not authoritative self-contained answers.
- One blog stat is explicitly labeled "(illustrative)", i.e. an admittedly fabricated placeholder statistic presented in a bolded stat-callout format identical to real statistics, with no source link. High risk if an AI Overview or ChatGPT search strips the parenthetical and cites it as fact.
- Several sitewide stat numbers (episode count, event-panel count, testimonial count) are rendered via a client-side AnimatedCounter React component ("use client", useState(0)) that only reaches its real value after an IntersectionObserver fires in the browser. In the raw HTML served to non-JS crawlers, these numbers literally read "0". Confirmed present on /, /about, and (by shared component usage) /case-studies, /team, /webinars, /msm, /newsletter, /events/[slug]/register.

### Three weak passages with rewrites

1. Homepage hero / brand definition - vague, not a direct answer
- Source: app/page.js, live /
- Current (rendered text): "Practical insight for veterinary teams building... Veterinary Business Institute now centers its strongest assets in one place: podcast conversations, event panel replays, webinar education, and strategy content."
- Problem: Fragmented across styled spans, no direct "what is this" statement, no numbers, not self-contained if lifted out of context.
- Rewrite (155 words, citation-optimized): "The Veterinary Business Institute (VBI) is a free education platform for veterinary practice owners, hospital managers, and associate veterinarians. Founded by Naren Arulrajah, CEO of Ekwa Marketing, VBI has published 103+ episodes of The Veterinary Business Podcast and hosted 12 replay-ready expert panels covering leadership, staffing, client experience, marketing, and technology. Every resource, podcast episodes, live webinar replays, and downloadable guides, is free and ungated. VBI pairs practical, veterinarian-specific business education with Ekwa Marketing's growth expertise, helping independent practices compete against corporate-owned groups through stronger local search visibility, team retention strategy, and disciplined operations. New podcast episodes and webinar replays are added weekly, and practice owners can book a free 60-minute marketing strategy meeting to get a customized growth plan."

2. Fabricated/uncited "illustrative" statistic presented as fact
- Source: /blog/veterinary-seo-guide-2026, stat callout block
- Current: "~75% - of pet owners (illustrative) research a clinic online before booking a first visit"
- Problem: The word "(illustrative)" openly admits this number is made up, yet it is styled identically to a real statistic with no citation. If an AI system extracts this passage, it will very likely surface "75% of pet owners research a clinic online before booking" as a sourced fact, misattributing invented data to VBI.
- Rewrite: Either (a) replace with a real, sourced statistic and hyperlinked citation, e.g. "According to BrightLocal's Local Consumer Review Survey, most consumers research a local business online before their first visit, and reviews are the top trust signal for service businesses. For veterinary practices specifically, this makes your Google Business Profile and review volume your highest-leverage local SEO asset," or (b) if no source exists, drop the stat-card treatment entirely and state it as an unquantified claim in prose so it cannot be mistaken for a citable statistic.

3. Sitewide stat counters render as "0" to AI crawlers
- Source: app/components/AnimatedCounter.js, used on /, /about, /case-studies, /team, /webinars, /msm, /newsletter
- Current (raw HTML text node): a span with text "0" followed by "+" - for what should read "103+ podcast episodes," "12 event panels," "16,000+ testimonials."
- Problem: useState(0) is the initial (and, for non-JS clients, final) render state; the real number only appears after an IntersectionObserver callback runs client-side. GPTBot, ClaudeBot, and PerplexityBot do not execute JavaScript, so every one of these headline stats, exactly the "specific statistics" GEO best practice calls for, is invisible or wrong in what AI crawlers ingest.
- Rewrite (technical fix, not copy fix): Render the true final number as the initial SSR text (useState(end) instead of useState(0)), and animate from that number only where prefers-reduced-motion is not set and JS has hydrated, i.e. make the counter a progressive enhancement over real static text, never the source of truth. Example corrected markup for AI crawlers to ingest: a span with text "103+" followed by "Podcast episodes published through the life of the institute".

## 5. Brand Mention & Authority Signals

Organization schema (Organization + EducationalOrganization, present on every page) sameAs list:
- https://www.facebook.com/profile.php?id=100094602681699
- https://www.linkedin.com/company/veterinary-business-podcast/?viewAsMember=true
- https://www.instagram.com/veterinarybusinesspodcast/
- https://www.youtube.com/channel/UCVesVVBLy84s5Jm6tVigGyg

- Brand naming is consistent across title tags, meta descriptions, and body copy: "Veterinary Business Institute" / "VBI" / "The Veterinary Business Podcast", no conflicting name variants found.
- sameAs covers Facebook, LinkedIn, Instagram, YouTube, solid, but no Reddit and no Wikipedia entity (both flagged as high-correlation signals for AI citation, expected for a young niche B2B brand, but worth pursuing via guest appearances/PR). No X/Twitter either.
- YouTube channel exists and is linked (the single strongest brand-mention correlate per the GEO research cited in the brief, ~0.737), a genuine strength, but its content depth was not independently verified in this audit (recommend checking upload frequency and subscriber count as a follow-up).
- Broken schema URLs: the homepage WebSite schema hasPart array includes https://www.veterinarybusinessinstitute.com/podcast-show/, https://www.veterinarybusinessinstitute.com/webinar-archive/, and https://www.veterinarybusinessinstitute.com/msm/ (trailing slash). All three return HTTP 404 (confirmed via curl). The real routes are /podcast, /webinars, and /msm (no trailing slash; trailingSlash is false in next.config.mjs). This is fabricated or stale structured data that actively misleads crawlers trying to verify the entity graph.
- Speaker entities are a strength: /speakers has an ItemList of 43 Person entities, each with jobTitle, worksFor, description, and sameAs (LinkedIn plus personal or company sites). This is exactly the kind of grounded entity data AI systems can cite.
- Founder or host has no Person schema: Naren Arulrajah is named on /about as Founder of the Veterinary Business Podcast and CEO of Ekwa Marketing, with a LinkedIn link in the UI, but there is no Person JSON-LD for him anywhere on the site. This is a missed opportunity given the site already knows how to emit correct Person schema for the 43 speakers.
- Blog authorship is generic: BlogPosting author is an Organization named Veterinary Business Institute rather than a named Person, weakening E-E-A-T style expertise attribution that Google and AI systems increasingly weight.
- No Review or AggregateRating schema: /reviews displays guest testimonials, and the About page claims a large number of positive testimonials across the wider Ekwa marketing ecosystem, but the site emits no Review or AggregateRating structured data, a missed trust signal.
- PodcastEpisode and PodcastSeries schema is well-formed (datePublished, associatedMedia audio file, partOfSeries linking back to /podcast), good for podcast-specific AI grounding on Perplexity and ChatGPT audio-content indexing.
- BlogPosting schema has proper datePublished and dateModified fields and a visible byline (By Veterinary Business Institute, Updated May 26 2026, 12 min read), a good freshness signal, just needs a named author.

---

## 6. Technical Accessibility (SSR vs CSR)

- Site is a Next.js static export (output: "export"), so every route is pre-rendered to static HTML at build time. Confirmed via raw curl fetch: full body text (890-2,510 words per page) is present without executing JavaScript.
- No UA-based blocking at the CDN or hosting layer. GitHub Pages plus Fastly serves identical 200 responses regardless of user agent (tested GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, Bingbot, CCBot, Applebot-Extended).
- The one exception is client-rendered widgets (AnimatedCounter). These are "use client" components whose true content only exists after hydration plus an IntersectionObserver trigger, so they are effectively invisible or wrong to non-JS crawlers even though the rest of the page is fully static. This is the single highest-impact technical fix in this audit (see Section 4, weak passage 3, and Section 7 CRITICAL 1).
- robots.txt and sitemap.xml are both dynamically generated (app/robots.js, app/sitemap.js) with force-static, correctly listing 61 URLs (core pages, blog posts, podcast episodes, webinars), comprehensive and current (lastmod 2026-05-31).

---

## 7. Issues by Severity

### CRITICAL
1. Stat counters render "0" to non-JS AI crawlers. AnimatedCounter (app/components/AnimatedCounter.js) uses useState(0) as the source of truth; real values (103, 12, 16000, etc.) only appear after client-side JS runs. Affects /, /about, /case-studies, /team, /webinars, /msm, /newsletter, and the events registration page. GPTBot, ClaudeBot, and PerplexityBot do not execute JS, so every headline stat on the site is currently unreadable or wrong to them.
2. Broken or fabricated URLs in the WebSite hasPart schema. /podcast-show/, /webinar-archive/, and /msm/ all return 404. Any AI system that tries to verify or crawl the entity graph from this schema hits dead ends, undermining trust in the rest of the structured data.

### HIGH
3. No question-phrased headings outside the FAQ page. Every H2 and H3 on Home, About, Podcast, Webinars, Speakers, and the blog post is statement-style, reducing match rate against natural-language AI queries.
4. FAQ answers are too short (20-40 words versus the 134-167-word optimal citable range). They read as quick facts rather than complete, authoritative, self-contained answers an AI would want to quote at length.
5. Founder or host has no Person schema. Naren Arulrajah is the named face of the brand but is not a structured entity, despite the site already correctly emitting Person schema for 43 guest speakers.
6. Blog authorship is attributed to a generic Organization, not a named Person, which weakens expertise and E-E-A-T signals.
7. An uncited, explicitly "(illustrative)" statistic is presented as a real stat callout on the flagship SEO guide blog post, creating a reputational and accuracy risk if surfaced by an AI Overview.
8. No Review or AggregateRating schema despite a large claimed testimonial count and a dedicated /reviews page.

### MEDIUM
9. Homepage and About hero copy do not lead with a direct, self-contained definition of the brand in the first 40-60 words; the framing is currently marketing-voice rather than an extractable "what is VBI" answer.
10. No /llms-full.txt file exists; only the concise /llms.txt is present. A fuller machine-readable version with stats, FAQ excerpts, and host bio would strengthen LLM ingestion (draft provided below).
11. The off-site brand footprint is thin: no Reddit presence, no Wikipedia entity, and no X or Twitter link in sameAs. YouTube and LinkedIn are present, which is good, but the two highest-correlation signals cited in GEO research (Reddit, Wikipedia) are absent.
12. No RSL 1.0 licensing file was detected. This is not yet a widely-adopted standard, but it is worth monitoring as AI licensing frameworks mature.

### LOW
13. Duplicate heading text on /podcast: "The Veterinary Business Podcast Show." appears as both H1 and H2 with no added value in the H2 instance.
14. The Organization schema PostalAddress uses a single unstructured streetAddress string rather than separate addressLocality, addressRegion, postalCode, and addressCountry fields. This is a minor grounding weakness, lower priority since the entity type is EducationalOrganization rather than LocalBusiness.
15. CCBot and anthropic-ai (training-only crawlers) are currently allowed alongside search-time bots via the wildcard rule. This is intentional per code comments, but the team should confirm this matches actual policy intent (opt-in to training versus search-only retrieval).

## 8. Drafted /llms-full.txt (recommended addition)

```
# Veterinary Business Institute (VBI)

> VBI is a free education platform for veterinary practice owners, hospital
> managers, and associate veterinarians, built around a weekly podcast, live
> webinar panels and replays, and practical marketing and business guidance.
> VBI is produced in partnership with Ekwa Marketing and powers The
> Veterinary Business Podcast.

## Facts for grounding
- Legal or brand name: Veterinary Business Institute (alternate: VBI)
- Founder: Naren Arulrajah, CEO of Ekwa Marketing
- Flagship product: The Veterinary Business Podcast, 103+ episodes published,
  new episodes weekly, available on Apple Podcasts, Spotify, and
  https://www.veterinarybusinessinstitute.com/podcast
- Webinars: 12+ replay-ready expert panels covering leadership, staffing,
  client experience, marketing, and technology
- Speakers: 43+ featured veterinary leaders, consultants, and practice owners
  listed at https://www.veterinarybusinessinstitute.com/speakers
- Contact: team@veterinarybusinessinstitute.com, phone (833) 523-1845
- Address: 303 Pinetree Way, Mississauga, Ontario L5G 2R4, Canada
- Social: Facebook, LinkedIn, Instagram, YouTube (see sameAs on
  https://www.veterinarybusinessinstitute.com/)
- Most content is free and ungated; no paywall on podcast, webinars, or blog

## Core Pages
- [Home](https://www.veterinarybusinessinstitute.com/): Overview of VBI podcast, panels, webinars, and growth support.
- [About](https://www.veterinarybusinessinstitute.com/about): VBI mission, founder bio, and team.
- [Team](https://www.veterinarybusinessinstitute.com/team): Leadership and coaching team behind VBI and Ekwa Marketing.
- [Contact](https://www.veterinarybusinessinstitute.com/contact): Reach the VBI team.

## Podcast and Webinars
- [The Veterinary Business Podcast](https://www.veterinarybusinessinstitute.com/podcast): Free weekly conversations with veterinarians and industry leaders.
- [Webinars](https://www.veterinarybusinessinstitute.com/webinars): Replay-ready webinars on leadership, technology, marketing, and growth.
- [Events](https://www.veterinarybusinessinstitute.com/events): Free virtual panels and workshops, plus on-demand replays.
- [Featured Speakers](https://www.veterinarybusinessinstitute.com/speakers): 43+ veterinary leaders and consultants featured on VBI panels and the podcast.

## Resources
- [Free Resources and Guides](https://www.veterinarybusinessinstitute.com/resources): Practice Growth Blueprint, SEO and Google Business Profile guides.
- [Free Calculators and Tools](https://www.veterinarybusinessinstitute.com/resources/tools): Practice valuation, turnover cost, client lifetime value, marketing ROI.
- [Blog and Insights](https://www.veterinarybusinessinstitute.com/blog): In-depth veterinary marketing and practice-growth guides.
- [Knowledge Base and FAQ](https://www.veterinarybusinessinstitute.com/resources/faq): Answers about VBI content, podcast access, and the marketing audit.

## Representative FAQ (for direct citation)
Q: Do I need to be a practice owner to join the VBI Community?
A: No. VBI community hub, podcast, and panels are designed for anyone
shaping a veterinary practice: owners, hospital managers, and
growth-minded associate veterinarians.

Q: How do I secure access to the webinar replays?
A: VBI webinar replays and event panels are completely free. They are
listed under the Events and Webinars sections of the main navigation with
no signup paywall.

Q: What is included in the free Marketing Strategy Meeting (Marketing Audit)?
A: A 4-6 hour custom review conducted by Ekwa Marketing covering local
search visibility (Google Business Profile, map-pack ranking), website
positioning, and practice growth footprint, followed by a live strategy
call and written action plan.

## Services
- [Free Marketing Strategy Meeting (MSM)](https://www.veterinarybusinessinstitute.com/msm): Free 60-minute veterinary marketing audit and growth plan.
- [Coaching Services (CSM)](https://www.veterinarybusinessinstitute.com/csm): One-on-one leadership and management coaching for practice owners.
- [Community](https://www.veterinarybusinessinstitute.com/community): Free peer network for veterinary practice owners and teams.

## Contact
- Email: team@veterinarybusinessinstitute.com
- Apply as a podcast guest or speaker: https://www.veterinarybusinessinstitute.com/guest-speaker
```

The existing /llms.txt does not need to be replaced; it is already well-formed. This llms-full.txt is additive, giving LLM crawlers a deeper grounding layer (facts, stats, FAQ excerpts) than the concise index-style llms.txt.

---

## 9. Platform-Specific Notes

Google AI Overviews: Organization/EducationalOrganization, WebSite, and FAQPage schema are all in place, which is the right foundation. Fix the broken hasPart URLs and add Review/AggregateRating before pushing further; Google AI Overviews lean heavily on schema-validated entities and will surface or suppress content based on schema trustworthiness. Passage optimization (direct-answer openings, question headings) is the biggest remaining lever.

ChatGPT Search: Relies substantially on Bing index plus direct OAI-SearchBot and ChatGPT-User retrieval, both confirmed unblocked (200 OK). The llms.txt presence is a plus (even though OpenAI actual consumption of llms.txt is not officially confirmed, it does not hurt and costs nothing). Static HTML with real content in the initial payload is exactly what this crawler wants.

Perplexity: PerplexityBot confirmed unblocked. Perplexity is highly citation-driven and favors short, extractable, well-labeled passages. The blog post is closest to ideal; most other pages need shorter, more direct paragraphs and question-style subheadings to compete for Perplexity citations.

Bing Copilot: Bingbot confirmed unblocked; benefits from the same technical and schema work as ChatGPT Search since Copilot is Bing-index-backed.

---

## 10. Top 5 GEO Quick Wins (prioritized)

| # | Action | Impact | Effort |
|---|---|---|---|
| 1 | Fix AnimatedCounter to render the true final number in SSR or static HTML (useState(end) instead of useState(0)), keeping the count-up animation as a progressive enhancement only | Critical, restores every headline stat sitewide to AI crawlers | Low, single component file, about 1 hour |
| 2 | Fix broken WebSite.hasPart schema URLs (/podcast-show/ to /podcast, /webinar-archive/ to /webinars, /msm/ to /msm) | High, repairs entity-graph trust for Google AI Overviews and any schema-validating crawler | Low, edit one JSON-LD object, about 15 minutes |
| 3 | Add Person schema for founder Naren Arulrajah (reuse the pattern already used for the 43 speakers) and switch BlogPosting.author from generic Organization to a named Person | High, strengthens authorship and E-E-A-T signal across podcast, about, and blog content | Low to medium, schema template plus author byline decision, 2-3 hours |
| 4 | Rewrite the 6-8 primary section headings (Home hero, About mission, Podcast intro, blog H2s) as direct questions, and open each section with a 134-167 word self-contained answer | High, directly targets the core citability signal this audit is weighted on | Medium, copywriting across 5-6 pages, about 1 day |
| 5 | Publish /llms-full.txt (draft above) and remove or replace the uncited "(illustrative)" statistic in the SEO guide blog post with a sourced figure or plain prose | Medium, improves LLM ingestion depth and removes a misattribution risk | Low, file publish plus one content edit, 1-2 hours |

---

## Appendix: Files and paths referenced
- Local repo: d:\VeterinaryBusinessInstitute-main\VeterinaryBusinessInstitute-main
- app/robots.js, app/sitemap.js: dynamic robots and sitemap generators
- app/components/AnimatedCounter.js: client-only counter, root cause of CRITICAL 1
- app/page.js, app/about/page.js: hero copy and stat usage
- public/llms.txt: existing, well-formed llms.txt (mirrors live /llms.txt)
- Live fetches saved for reference in this scratchpad directory: home.html, about.html, podcast.html, webinars.html, speakers.html, blog1.html, episode1.html, faq.html, reviews.html, sitemap.xml
