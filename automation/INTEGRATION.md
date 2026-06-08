# VET Website ↔ Google Sheet Integration

The VET site reads selected **content** live from a Google Sheet via the public
gviz endpoint. Pages render build-time defaults from `app/lib/site-data.js`
(SEO + instant paint), then client components swap in fresh sheet rows on visit
— so edits show **without a rebuild**.

- **Sheet:** `VET — Website Data` `1xRjdnkT9pt82s1LAnxuZKvSgleWYSS-1YWBED-hNGX0`
- **One-time:** Sheet → Share → **Anyone with the link = Viewer** (gviz needs it).

## Dynamic surfaces (the ONLY tabs that are live)

| Tab | Page | Live component |
|-----|------|----------------|
| `podcasts` | /podcast | LivePodcastEpisodes → PodcastEpisodes |
| `event-panels` | /events | LiveEventPanels → EventReplayGate |
| `reviews` | /reviews | LiveGuestReviews |
| `experts` | /team | LiveTeamGrid |
| `case-studies` | /case-studies | LiveCaseStudies |
| `faqs` | /resources/faq | LiveFaqList |

Data layer: `app/lib/sheets-config.js` (SHEET_ID + tab map), `sheets-core.js`
(gviz parse + helpers), `sheets-normalize.js` (rows → component shapes),
`sheets-client.js` (browser fetchers), `use-live.js` (render-initial-then-refresh).

### `events` tab — NOT wired (intentional)
The events **registration** page (`registrationEvents`) carries nested speakers,
discussion points, and audience data that the flat `events` tab can't represent.
It stays code-driven in `site-data.js`. To make it dynamic, expand the tab schema
(or add child tabs) and add a normalizer + `LiveRegistrationEvents` wrapper.

## Blocked for now (add later)
Forms and lead magnets are **inert**: every form calls `app/lib/submit-lead.js`,
which only delivers when `NEXT_PUBLIC_LEAD_WEBHOOK` is set. Removed from dynamic:
`webinar-replays`, `tools`, `apps`, `free-downloads`, `blogs`.

When ready to switch forms on, either set `NEXT_PUBLIC_LEAD_WEBHOOK`, or deploy
`appscript.gs` (kept in repo) and point `submit-lead.js` at its `/exec`. The n8n
workflow (`automation/n8n-vet-event-registration.json`) and Drive folders
(see below) are ready for that phase.

## Drive image library
Root: https://drive.google.com/drive/folders/11BNmm5k96DshETM6G6PjuL8ie1PJcP6_
Subfolders: Hosts & Team `1osva10yqxBNOT6KTk0gqYlPpsMRMNaYz`, Podcast Episodes
`1lFEHPt3KOXjvfSoJTlbHMYeGB7DdgM3J`, Event Panels `12JgUD_G2uWoquc4Ls_Na4VirdpDY5bhk`,
Webinars `1ydWQz-5cM_T1c9HQeNUVxAI2x68m19AR`, Brand & General `1eNN3wrsgdJce0zBoVXxW84FXKRK9Zu7r`.
Paste any Drive share link into an image column — `driveImageUrl()` rewrites it to
an embeddable CDN URL. `automation/upload-images-to-drive.mjs` bulk-uploads
`public/assets` (optional; needs a Drive OAuth credentials.json).
