import Link from "next/link";
import { blogPosts } from "../lib/blog-posts";
import BlogIndexClient from "../components/BlogIndexClient";

export const metadata = {
  title: "Blog & Insights | Veterinary Business Institute",
  description:
    "In-depth veterinary marketing and practice-growth guides: SEO, Google Business Profile, social media, email, AI tools, and client experience.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog & Insights | Veterinary Business Institute",
    description:
      "In-depth veterinary marketing and practice-growth guides: SEO, Google Business Profile, social media, email, AI tools, and client experience.",
    type: "website",
    url: "/blog",
    images: ["/assets/og-cover.jpg"],
  },
};

// Feature a marketing article in the hero card; the grid below lists ALL
// posts (featured included), so nothing is missed by readers who skip the hero.
const MARKETING_CATEGORIES = new Set([
  "SEO & Visibility",
  "Local Search",
  "Social Media",
  "Email Marketing",
]);
const featured = blogPosts.find((p) => MARKETING_CATEGORIES.has(p.category)) || blogPosts[0];

export default function BlogPage() {
  return (
    <>
      <section className="page-hero section-about-vbi community-hero blog-soon-hero">
        <div className="about-vbi-ghost-word" aria-hidden="true">BLOG</div>
        <div className="container blog-soon-inner">
          <span className="community-hero-pill">Blog &amp; Insights by VBI</span>
          <h1>
            Practical Guides to <span className="outline-txt">Grow Your Practice.</span>
          </h1>
          <p className="hero-lead">
            In-depth, data-backed playbooks written for veterinary practice owners and hospital
            directors — covering marketing, local search, client experience, technology, and the
            business of running a thriving practice.
          </p>
        </div>
      </section>

      {/* ── Featured post ── */}
      {featured && (
        <section className="section">
          <div className="container">
            <Link href={`/blog/${featured.slug}`} className="blog-feature-card">
              <div className="blog-feature-body">
                <span className="blog-card-cat">{featured.category}</span>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <span className="blog-card-meta">
                  {featured.date} · {featured.readMinutes} min read
                </span>
                <span className="blog-card-link">Read the Guide &rarr;</span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ── Article grid (all posts, category filters) ── */}
      <BlogIndexClient />

      {/* ── CTA ── */}
      <section className="section res-next">
        <div className="container res-next-inner">
          <span className="eyebrow text-accent">Put It Into Practice</span>
          <h2>Want help applying this to your practice?</h2>
          <p>
            Book a free strategy consultation and we&rsquo;ll map the highest-impact moves for your
            specific market, team, and goals.
          </p>
          <Link className="button button-primary" href="/msm">
            Book a Free Consultation &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
