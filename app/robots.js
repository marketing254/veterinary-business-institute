export const dynamic = "force-static";

// Utility / internal pages with no search value + query-param variants (dupes).
const DISALLOW = ["/api/", "/thank-you", "/dashboard", "/resources/hub", "/*?*"];

// AI search crawlers explicitly welcomed (they drive AI Overview / ChatGPT /
// Perplexity / Copilot citations). Naming them makes the signal unambiguous.
const AI_SEARCH_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Bingbot",
  "Applebot-Extended",
];

export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://www.veterinarybusinessinstitute.com";

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: AI_SEARCH_BOTS, allow: "/", disallow: DISALLOW },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
