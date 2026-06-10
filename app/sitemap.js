import { blogPosts } from "./lib/blog-posts";
import { episodes, eventPanels } from "./lib/site-data";
import { podcastSlug } from "./lib/sheets-core";

export const dynamic = "force-static";

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://www.veterinarybusinessinstitute.com";
  const siteLastModified = "2026-05-31T00:00:00.000Z";

  // Note: /thank-you, /dashboard, /resources/hub are intentionally excluded
  // (noindex / internal app pages — see robots.js).
  const coreRoutes = [
    "",
    "/about",
    "/team",
    "/events",
    "/podcast",
    "/reviews",
    "/case-studies",
    "/resources",
    "/blog",
    "/guest-speaker",
    "/community",
    "/community/forum",
    "/msm",
    "/csm",
    "/newsletter",
    "/contact",
    "/privacy-policy",
    "/terms-of-service",
    "/webinars",
    "/webinars/registration",
    "/resources/tools",
    "/resources/apps",
    "/resources/faq",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: siteLastModified,
    changeFrequency: route === "" || route === "/podcast" || route === "/blog" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const blogRoutes = blogPosts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: siteLastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const episodeRoutes = episodes.map((e) => ({
    url: `${baseUrl}/podcast/${podcastSlug(e)}`,
    lastModified: siteLastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const webinarRoutes = eventPanels.map((p) => ({
    url: `${baseUrl}/webinars/${p.slug}`,
    lastModified: siteLastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...coreRoutes, ...blogRoutes, ...episodeRoutes, ...webinarRoutes];
}
