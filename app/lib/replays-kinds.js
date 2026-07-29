// Lightweight metadata for the two replay content types. No seed/normalizer
// imports, so it's cheap to pull into both server pages and the client rescue.
export const REPLAY_KINDS = {
  webinar: {
    key: "webinar",
    tab: "webinar-replays",
    basePath: "/webinar-replays",
    single: "Webinar Replay",
    plural: "Webinar Replays",
    eyebrow: "On-Demand Webinars",
    heroLead:
      "Full replays of our monthly veterinary business webinars — practical sessions on growth, culture, finance, marketing, and leadership. Free to watch, anytime.",
    backLabel: "Back to all webinar replays",
  },
  summit: {
    key: "summit",
    tab: "summit-replays",
    basePath: "/summit-replays",
    single: "Summit Replay",
    plural: "Summit Replays",
    eyebrow: "On-Demand Summits",
    heroLead:
      "Full replays of our monthly veterinary summits — multi-speaker deep dives on the forces shaping the future of veterinary practice. Free to watch, anytime.",
    backLabel: "Back to all summit replays",
  },
};

// Map a /webinar-replays or /summit-replays pathname to its kind key.
export function replayKindFromPath(path) {
  if (/\/summit-replays(\/|$)/.test(path)) return "summit";
  if (/\/webinar-replays(\/|$)/.test(path)) return "webinar";
  return "";
}
