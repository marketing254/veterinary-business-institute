export const dynamic = "force-static";

export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://www.veterinarybusinessinstitute.com";
  
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Confirmation/utility and internal app pages have no search value; query-param
      // variants are blocked to avoid duplicate-content crawling. AI crawlers (GPTBot,
      // PerplexityBot, ClaudeBot, Google-Extended) are intentionally allowed via "*".
      disallow: ["/api/", "/thank-you", "/dashboard", "/resources/hub", "/*?*"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
