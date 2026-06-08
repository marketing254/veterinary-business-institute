export const dynamic = "force-static";

export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://www.veterinarybusinessinstitute.com";
  
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/thank-you", "/*?*"], 
      // Prevent indexing of confirmation pages or query param variations to avoid duplicate content
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
