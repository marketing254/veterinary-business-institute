import { blogPosts } from "./lib/blog-posts";
import { episodes } from "./lib/site-data";

export const dynamic = "force-static";

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://www.veterinarybusinessinstitute.com";
  const siteLastModified = "2026-05-31T00:00:00.000Z";

  const coreRoutes = [
    "",
    "/about",
    "/events",
    "/podcast",
    "/reviews",
    "/resources",
    "/blog",
    "/guest-speaker",
    "/community",
    "/marketing",
    "/contact",
    "/privacy-policy",
    "/terms-of-service",
    "/webinars",
    "/webinars/registration",
    "/consultation",
    "/thank-you",
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
    url: `${baseUrl}/podcast/episode-${e.number}`,
    lastModified: siteLastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...coreRoutes, ...blogRoutes, ...episodeRoutes];
}
