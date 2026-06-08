import Link from "next/link";
import { blogPosts } from "../lib/blog-posts";

export const metadata = {
  title: "Blog & Insights | Veterinary Business Institute",
  description:
    "In-depth veterinary marketing and practice-growth guides: SEO, Google Business Profile, social media, email, AI tools, and client experience for veterinary practice owners.",
};

const featured = blogPosts[0];
const rest = blogPosts.slice(1);

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

      {/* ── Article grid ── */}
      <section className="section section-muted">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">All Articles</span>
            <h2>Veterinary practice-growth guides.</h2>
          </div>
          <div className="blog-index-grid">
            {rest.map((p) => (
              <Link href={`/blog/${p.slug}`} className="blog-card" key={p.slug}>
                <span className="blog-card-cat">{p.category}</span>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <span className="blog-card-meta">
                  {p.date} · {p.readMinutes} min read
                </span>
                <span className="blog-card-link">Read Guide &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section res-next">
        <div className="container res-next-inner">
          <span className="eyebrow text-accent">Put It Into Practice</span>
          <h2>Want help applying this to your practice?</h2>
          <p>
            Book a free strategy consultation and we&rsquo;ll map the highest-impact moves for your
            specific market, team, and goals.
          </p>
          <Link className="button button-primary" href="/consultation">
            Book a Free Consultation &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
