// Central SEO helpers — canonical URLs, per-page metadata, and JSON-LD builders.
//
// IMPORTANT: the canonical/public host is the custom domain ROOT
// (https://www.veterinarybusinessinstitute.com). It is intentionally decoupled
// from `basePath` (which only prefixes in-page asset src on a github.io subpath
// staging deploy). Canonical, Open Graph, and schema URLs must always point at
// the public domain root so search engines and AI crawlers index the real site.

export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://www.veterinarybusinessinstitute.com";

export const SITE_NAME = "Veterinary Business Institute";

// Default social-share image (replace /public/assets/og-cover.jpg with a branded
// 1200x630 graphic anytime — the path stays the same). Root-relative so it
// resolves against SITE_ORIGIN, not the subpath staging host.
export const OG_IMAGE = "/assets/og-cover.jpg";

// Absolute URL for a root-relative path on the canonical host.
export function absoluteUrl(path = "/") {
  if (!path) return SITE_ORIGIN;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Build a complete, SEO-correct metadata object for a page.
 * Pass a root-relative `path` (e.g. "/about") — canonical + OG url are derived.
 */
export function pageMeta({
  title,
  description,
  path = "/",
  image = OG_IMAGE,
  type = "website",
  noIndex = false,
}) {
  const canonical = path === "/" ? "/" : path.replace(/\/+$/, "");
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type,
      url: canonical,
      siteName: SITE_NAME,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    ...(noIndex
      ? { robots: { index: false, follow: true } }
      : {}),
  };
}

// ── JSON-LD builders ───────────────────────────────────────────────

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleSchema({ title, description, path, image, datePublished, author }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(path) },
    url: absoluteUrl(path),
    image: image ? [absoluteUrl(image)] : undefined,
    datePublished: datePublished || undefined,
    dateModified: datePublished || undefined,
    author: {
      "@type": "Organization",
      name: author || SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: absoluteUrl("/assets/logo-vbi.png") },
    },
  };
}

export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function podcastEpisodeSchema({ title, description, path, image, datePublished, audioUrl, duration }) {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: title,
    description,
    url: absoluteUrl(path),
    image: image ? absoluteUrl(image) : undefined,
    datePublished: datePublished || undefined,
    duration: duration || undefined,
    associatedMedia: audioUrl
      ? { "@type": "MediaObject", contentUrl: audioUrl }
      : undefined,
    partOfSeries: {
      "@type": "PodcastSeries",
      name: "The Veterinary Business Podcast",
      url: absoluteUrl("/podcast"),
    },
  };
}

// Render-ready <script type="application/ld+json"> innerHTML.
export function jsonLd(schema) {
  return { __html: JSON.stringify(schema) };
}
