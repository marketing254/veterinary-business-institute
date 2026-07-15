# Schema.org Audit — Veterinary Business Institute
Live site: https://www.veterinarybusinessinstitute.com
Source: d:\VeterinaryBusinessInstitute-main\VeterinaryBusinessInstitute-main (Next.js app dir)
Audit date: 2026-07-09

Method: fetched live HTML with curl for home, /speakers, /podcast, /about, one webinar
detail page (/webinars/data-driven-growth-ai-search-client-education), one event register
page (/events/scaling-selling-independent-vet-practices-growing/register), plus supporting
spot-checks (/resources/faq, one /podcast/[slug], one /blog/[slug]) to cross-validate against
source. All JSON-LD extracted with a script-tag regex + `json.loads` per block (syntax
validation), then checked against Google's structured-data guidelines and the source
implementation in app/layout.js, app/page.js, app/speakers/page.js,
app/webinars/[slug]/page.js, app/events/[slug]/register/page.js, app/lib/seo.js,
app/components/EpisodeArticle.js.

---

## 1. Schema Score: 60 / 100

**One-line justification:** A genuinely solid multi-type JSON-LD implementation (Organization,
WebSite, ItemList/Person, PodcastEpisode, VideoObject, Event, BreadcrumbList — all valid JSON,
no deprecated types) is dragged down by a **sitewide broken-link bug** in `WebSite.hasPart`
(3 of 4 URLs 404 on every single page) and **stale/past-dated `Event` schema presented as a
live upcoming webinar** on 4 of 5 registration pages — both are the kind of accuracy problems
Google's structured-data guidelines explicitly warn against.

---

## 2. Page → Schema Types Found → Valid/Invalid

| Page | Schema types present | JSON syntax | Valid (required props)? |
|---|---|---|---|
| `/` (home) | Organization+EducationalOrganization, WebSite, CollectionPage | ✅ valid JSON ×3 | ⚠️ Organization/WebSite valid but WebSite.hasPart has 3/4 dead links + 1 relative string; CollectionPage's nested PodcastEpisode.url points to wrong (external, generic) URL |
| `/speakers` | Organization+EducationalOrganization, WebSite, ItemList (43× Person), BreadcrumbList | ✅ valid JSON ×4 | ✅ Pass — every Person entry has name, jobTitle, worksFor, description, sameAs |
| `/podcast` | Organization+EducationalOrganization, WebSite | ✅ valid JSON ×2 | ⚠️ Technically valid but page has **no page-specific schema** (no PodcastSeries, no ItemList, no BreadcrumbList) despite being the podcast hub |
| `/about` | Organization+EducationalOrganization, WebSite | ✅ valid JSON ×2 | ⚠️ Same as above — no AboutPage/BreadcrumbList/Person(team) markup at all |
| `/webinars/data-driven-growth-ai-search-client-education` | Organization+EducationalOrganization, WebSite, VideoObject, BreadcrumbList | ✅ valid JSON ×4 | ⚠️ Required VideoObject props present, but `embedUrl`/`contentUrl` point to a non-embeddable `vimeo.com/{id}` watch page rather than `player.vimeo.com/video/{id}`; `duration` missing |
| `/events/scaling-selling-independent-vet-practices-growing/register` | Organization+EducationalOrganization, WebSite, Event | ✅ valid JSON ×3 | ❌ Fail — `startDate` (2026-06-10) is ~1 month in the past relative to today, yet `eventStatus` is still `EventScheduled` and the page markets it as a live countdown webinar. `organizer.url`/`location.url` use non-www host. No `image`/`endDate`. No BreadcrumbList on this page level. |
| (bonus) `/podcast/from-scribe-to-self-reading-practice-...` | Organization+EducationalOrganization, WebSite, PodcastEpisode, BreadcrumbList | ✅ valid JSON ×4 | ✅ Pass — well-formed, includes `partOfSeries`; minor: `image` is a Google Drive thumbnail link (fetch-reliability risk), episode number "114" vs audio filename "EP_116" mismatch |
| (bonus) `/resources/faq` | Organization+EducationalOrganization, WebSite, FAQPage, BreadcrumbList | ✅ valid JSON ×4 | ✅ Structurally valid. Per policy: FAQPage rich results are Google-restricted to gov/healthcare sites (Aug 2023) — this is a commercial site, so flag as **Info**, not Critical; still useful for AI/LLM citation (GEO). |

---

## 3. Validation Errors (detail)

1. **`WebSite.hasPart` — 3 of 4 links are dead (404).** Rendered on *every page* via
   `app/layout.js`. Live values pulled from `app/lib/site-data.js`:
   - `https://www.veterinarybusinessinstitute.com/podcast-show/` → **404** (real route is `/podcast`)
   - `https://www.veterinarybusinessinstitute.com/webinar-archive/` → **404** (real route is `/webinars`)
   - `https://www.veterinarybusinessinstitute.com/msm/` → **404** (real route is `/msm`, no trailing slash)
   - `/events` → 200, but is a bare relative string, inconsistent with the other three absolute-URL entries, and `hasPart` expects `CreativeWork` entities (or at minimum consistent absolute URLs), not a mixed array of strings.
   This is a data-source bug (`podcastHubLink`, `webinarArchiveLink`, `marketingPageLink`,
   `panelFolderLink` in `app/lib/site-data.js` lines 5–8) — legacy WordPress-style paths that
   were never updated for the Next.js route structure.

2. **`Event.startDate` in the past while `eventStatus` = `EventScheduled`.** Checked
   `registrationEvents` in `app/lib/site-data.js`: of 5 registration/event pages, **4 have
   dates already past** relative to today (2026-07-09): 2026-06-10, 2026-06-17, 2026-06-24,
   2026-07-08. Only the 2026-07-15 event is genuinely upcoming. Each of these pages still
   renders a live countdown timer, "Live Webinar" badge, and registration form, and the JSON-LD
   still asserts `eventStatus: EventScheduled` with a stale `startDate`. This is a structured
   data ↔ visible content mismatch that risks a Google spam/misleading-markup flag, independent
   of the UX problem of a countdown timer counting to a date that already happened.

3. **Domain inconsistency in `Event.organizer.url` / `Event.location.url`.** Hard-coded in
   `app/events/[slug]/register/page.js` as `https://veterinarybusinessinstitute.com` (no
   `www`), while every other schema block on the site (Organization, WebSite, breadcrumbs,
   VideoObject) consistently uses `https://www.veterinarybusinessinstitute.com`. The bare
   domain does 301-redirect to `www`, so it's not broken, but it's an unnecessary inconsistency
   in an otherwise well-centralized `SITE_ORIGIN` constant (`app/lib/seo.js`) — this file simply
   doesn't use that helper.

4. **`VideoObject.embedUrl` / `contentUrl` not embeddable.** Both fields on the webinar detail
   page resolve to `https://vimeo.com/1196507090` (the public watch page), not
   `https://player.vimeo.com/video/1196507090` (the iframe-embeddable player URL). Google's
   crawler validates `embedUrl` by attempting to embed it; a bare `vimeo.com/{id}` URL is not
   guaranteed embeddable and commonly fails this check, reducing eligibility for the Video
   rich result / video indexing.

5. **Homepage `CollectionPage.hasPart[0]` (PodcastEpisode) URL mismatch.** The homepage teaser
   points the featured episode's `url` at
   `https://podcasts.apple.com/us/podcast/veterinary-business-podcast/id1712053291` — the
   generic Apple Podcasts *show* page, not a specific-episode link, and not the canonical
   internal page (`/podcast/from-scribe-to-self-reading-practice-how-ai-helps-independent`)
   that the same episode's own `PodcastEpisode` schema correctly uses. Root cause:
   `episodes[0].href` in `app/lib/site-data.js` is set to the Apple Podcasts URL rather than
   the internal slug.

6. **`Organization.address` not decomposed.** `PostalAddress.streetAddress` is one run-on
   string (`"303, Pinetree Way Mississauga, Ontario L5G 2R4 Canada"`) with no
   `addressLocality`, `addressRegion`, `postalCode`, or `addressCountry`. Schema.org accepts
   this, but Google's guidance for complete address markup recommends splitting these fields.

7. **`Organization.telephone` not in international format.** `"(833) 523-1845"` — schema.org
   permits free text, but Google's Local Business documentation recommends E.164 / fully
   qualified international format (e.g., `+1-833-523-1845`) for reliable parsing.

8. **Episode image hosted on Google Drive.** `PodcastEpisode.image` on episode detail pages
   resolves to `https://drive.google.com/thumbnail?...` — Drive-hosted thumbnails are subject
   to rate limiting/permission changes and are not a reliable long-term image host for Google
   Images or rich-result thumbnails.

9. **Missing `duration` on the dedicated webinar `VideoObject`.** The *homepage's* nested
   summary VideoObject includes `duration: "PT1H0M0S"`, but the actual `/webinars/{slug}` page
   for the same panel omits `duration` entirely — an avoidable inconsistency since the source
   data (`panel.duration`) is available (`toIsoDuration()` helper already exists in
   `app/page.js` but isn't reused in `app/webinars/[slug]/page.js`).

---

## 4. Missing Schema Opportunities (ranked)

1. **Fix `WebSite.hasPart` (data fix, not new schema)** — highest priority; a single edit to
   4 constants in `app/lib/site-data.js` removes a 404 bug that currently ships on every page
   of the site.
2. **PodcastSeries on `/podcast` hub page** — the hub page currently carries zero page-specific
   schema. A `PodcastSeries` block (with `webFeed`, cross-links to `listeningPlatforms`, and
   `hasPart`/episode count) would properly represent the show at its index URL and reinforce
   the existing per-episode `PodcastSeries` reference used in `EpisodeArticle.js`.
3. **BreadcrumbList on the pages that currently lack it** — `/about`, `/podcast` (index),
   `/events` (index), `/webinars` (index), and every `/events/[slug]/register` page. The
   `breadcrumbSchema()` helper already exists in `app/lib/seo.js` and is proven in 4 other page
   types — this is a low-effort, high-consistency win.
4. **ItemList of `Event` on `/events` and ItemList of `VideoObject` on `/webinars`** — both
   index pages render rich card grids from `eventsSeed`/`eventPanels` but expose none of it as
   structured data today.
5. **Fix the Event date/status problem** — either regenerate `registrationEvents` with genuinely
   future dates on a rolling basis, or, for concluded panels, stop rendering them as "Live
   Webinar" registration pages and switch the schema to `eventStatus: EventPostponed` /
   redirect the page to the corresponding `/webinars/{slug}` replay (which already exists with
   correct `VideoObject` schema).
6. **BroadcastEvent / Clip / SeekToAction for webinar replays** — since replays already live on
   Vimeo, see `~/.claude/skills/seo/schema/templates.json` for ready-made JSON-LD templates if
   the team wants to expose in-video chapter markers for the panel discussions.

**Not recommended:** `HowTo` (deprecated), `SpecialAnnouncement` (deprecated), new `FAQPage`
additions on commercial pages beyond the existing `/resources/faq` (Google rich results are gov/
healthcare-only since Aug 2023 — the existing FAQPage there is fine to keep for AI/LLM citation
value, just don't expect a Google SERP FAQ rich result from it).

---

## 5. Recommended JSON-LD — Top 3 Missing Schemas

### 5.1 PodcastSeries — add to `app/podcast/page.js`

```json
{
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  "name": "The Veterinary Business Podcast",
  "url": "https://www.veterinarybusinessinstitute.com/podcast",
  "description": "Real conversations with veterinarians, practice owners, and industry leaders on building a thriving veterinary practice.",
  "image": "https://www.veterinarybusinessinstitute.com/assets/og-cover.jpg",
  "publisher": {
    "@type": "Organization",
    "name": "Veterinary Business Institute",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.veterinarybusinessinstitute.com/assets/logo-vbi.png"
    }
  },
  "webFeed": "https://podcasts.apple.com/us/podcast/veterinary-business-podcast/id1712053291"
}
```
Implementation note: build this with the existing `absoluteUrl()`/`SITE_NAME` helpers in
`app/lib/seo.js` rather than hard-coded strings, and inject via
`dangerouslySetInnerHTML={jsonLd(podcastSeriesSchema)}` exactly as done in `app/speakers/page.js`.

### 5.2 BreadcrumbList — add to `app/events/[slug]/register/page.js`

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.veterinarybusinessinstitute.com/" },
    { "@type": "ListItem", "position": 2, "name": "Events", "item": "https://www.veterinarybusinessinstitute.com/events" },
    { "@type": "ListItem", "position": 3, "name": "Scaling Without Selling: How Independent VET Practices Are Growing in a Post-Consolidation Market", "item": "https://www.veterinarybusinessinstitute.com/events/scaling-selling-independent-vet-practices-growing/register" }
  ]
}
```
Implementation note: this page already imports nothing from `app/lib/seo.js` — add
`import { breadcrumbSchema, jsonLd } from "../../../lib/seo";` and reuse the existing helper
(same pattern already used in `app/webinars/[slug]/page.js`) rather than hand-rolling a new
object.

### 5.3 ItemList of Event — add to `app/events/page.js`

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Upcoming Veterinary Business Institute Panels",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Event",
        "name": "Scaling Without Selling: How Independent VET Practices Are Growing in a Post-Consolidation Market",
        "url": "https://www.veterinarybusinessinstitute.com/events/scaling-selling-independent-vet-practices-growing/register",
        "startDate": "2026-06-10T20:00:00-04:00",
        "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
        "eventStatus": "https://schema.org/EventScheduled",
        "location": {
          "@type": "VirtualLocation",
          "url": "https://www.veterinarybusinessinstitute.com/events/scaling-selling-independent-vet-practices-growing/register"
        },
        "organizer": { "@type": "Organization", "name": "Veterinary Business Institute", "url": "https://www.veterinarybusinessinstitute.com" }
      }
    }
  ]
}
```
Important: do **not** ship this ItemList (or the underlying per-event `Event` blocks) until
Finding #2 above (past-dated `startDate`s marked `EventScheduled`) is resolved — publishing an
`ItemList` that amplifies four already-stale `Event` entries would compound the accuracy
problem across a second page.

---

## 6. Issues by Severity

**CRITICAL**
- `WebSite.hasPart` contains 3 of 4 dead (404) links, shipped sitewide via `app/layout.js` (every page of the site).
- 4 of 5 `Event` registration pages carry `startDate` values already in the past while `eventStatus` remains `EventScheduled` and the page UI still markets them as live/upcoming (countdown timer, "Live Webinar" badge).

**HIGH**
- `VideoObject.embedUrl`/`contentUrl` on webinar pages use non-embeddable `vimeo.com/{id}` watch URLs instead of `player.vimeo.com/video/{id}`, jeopardizing Video rich-result eligibility.
- Homepage `CollectionPage` featured-episode URL points to a generic external Apple Podcasts show page instead of the correct internal canonical episode URL (mismatch vs. the episode's own `PodcastEpisode` schema).
- `/podcast`, `/about`, `/events`, `/webinars` index pages carry zero page-specific structured data (only the sitewide Organization/WebSite blocks) despite being primary content hubs.

**MEDIUM**
- `Event.organizer.url` / `Event.location.url` use the non-www host, inconsistent with the rest of the site's schema (redirects, but avoidable).
- `Organization.address` is an undecomposed single string (no `addressLocality`/`addressRegion`/`postalCode`/`addressCountry`).
- Missing `BreadcrumbList` on `/about`, `/podcast`, `/events`, `/webinars` index pages and on `/events/[slug]/register` pages.
- Missing `duration` on the dedicated `/webinars/[slug]` `VideoObject` (present in the homepage's duplicate summary version, so the data exists but isn't reused).
- No `image`/`endDate` on `Event` schema despite `event.image` existing in the source data.
- Episode images sourced from Google Drive thumbnail links (fetch-reliability risk for crawlers/rich results).

**LOW**
- `Organization.telephone` not in E.164/international format.
- Podcast episode numbering inconsistency (page says "Ep 114", audio filename says "EP_116") — data-quality issue, not a schema syntax issue.
- No `SearchAction`/`potentialAction` on `WebSite` — not recommended to add unless/until the site actually ships an on-site search feature (would otherwise be a fabricated capability).
- Existing `FAQPage` on `/resources/faq` — correctly scoped to a single real FAQ page (not spammed elsewhere), but per current Google policy (Aug 2023) FAQ rich results are restricted to government/healthcare sites, so treat this as an **Info**-level item: keep it for AI/LLM (GEO) citation value, don't expect a Google SERP FAQ rich result, and don't expand it to other commercial pages.

---

Full report file: `C:\Users\FATHIM~1\AppData\Local\Temp\claude\d--VeterinaryBusinessInstitute-main-VeterinaryBusinessInstitute-main\0c67d486-08dc-4fff-9f86-9afd144d3743\scratchpad\schema-report.md`
