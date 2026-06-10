import Link from "next/link";
import { blogPosts } from "../../lib/blog-posts";
import { articleSchema, jsonLd, breadcrumbSchema, OG_IMAGE } from "../../lib/seo";

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

// Normalize a human date string ("May 28, 2026") to ISO YYYY-MM-DD for schema.
function isoDate(value) {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Article | Veterinary Business Institute" };
  const canonical = `/blog/${post.slug}`;
  return {
    title: `${post.title} | VBI Blog`,
    description: post.metaDescription || post.excerpt,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.metaDescription || post.excerpt,
      type: "article",
      url: canonical,
      images: [post.image || OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription || post.excerpt,
      images: [post.image || OG_IMAGE],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const idx = blogPosts.findIndex((p) => p.slug === slug);
  const post = idx >= 0 ? blogPosts[idx] : blogPosts[0];
  const prev = idx > 0 ? blogPosts[idx - 1] : null;
  const next = idx >= 0 && idx < blogPosts.length - 1 ? blogPosts[idx + 1] : null;

  const articleLd = articleSchema({
    title: post.title,
    description: post.metaDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    datePublished: isoDate(post.date),
    author: "Veterinary Business Institute",
  });
  const breadcrumbLd = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={jsonLd(articleLd)} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={jsonLd(breadcrumbLd)} />
      <section className="page-hero blogpost-hero">
        <div className="container blogpost-head">
          <Link href="/blog" className="blogpost-back">
            &larr; Back to all articles
          </Link>
          <span className="eyebrow text-accent">{post.category}</span>
          <h1>{post.title}</h1>
          <p className="blogpost-meta">
            By <strong>Veterinary Business Institute</strong> · Updated {post.date} · {post.readMinutes} min read
          </p>
        </div>
      </section>

      <article className="section blogpost-body">
        <div className="container blogpost-inner">
          {post.excerpt && <p className="blogpost-lead">{post.excerpt}</p>}

          {Array.isArray(post.heroStats) && post.heroStats.length > 0 && (
            <div className="blogpost-stats">
              {post.heroStats.map((s) => (
                <div className="blogpost-stat" key={s.label}>
                  <span className="blogpost-stat-value">{s.value}</span>
                  <span className="blogpost-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          )}

          {post.sections.map((sec, i) => (
            <section className="blogpost-section" key={i}>
              <h2>{sec.heading}</h2>
              {sec.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
              {Array.isArray(sec.bullets) && sec.bullets.length > 0 && (
                <ul className="blogpost-bullets">
                  {sec.bullets.map((b, k) => (
                    <li key={k}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {post.actionPlan && (
            <section className="blogpost-actionplan">
              <h2>{post.actionPlan.title}</h2>
              <div className="blogpost-plan-grid">
                {post.actionPlan.phases.map((ph, i) => (
                  <div className="blogpost-plan-phase" key={i}>
                    <span className="blogpost-plan-when">{ph.when}</span>
                    <ul>
                      {ph.items.map((it, j) => (
                        <li key={j}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div
            className="blogpost-author"
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              marginTop: "2.5rem",
              padding: "1.25rem 1.5rem",
              borderRadius: "16px",
              border: "1px solid var(--card-border, rgba(0,0,0,0.08))",
              background: "var(--card)",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                flex: "0 0 auto",
                width: 52,
                height: 52,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                fontWeight: 700,
                letterSpacing: "0.02em",
                color: "#fff",
                background: "var(--teal-500, #1FB6A0)",
              }}
            >
              VBI
            </div>
            <div>
              <p style={{ fontWeight: 700, margin: 0 }}>Written by the Veterinary Business Institute team</p>
              <p style={{ margin: "0.35rem 0 0", fontSize: "0.92rem", color: "var(--ink-500)" }}>
                Practical veterinary practice-growth education from the team behind the
                Veterinary Business Podcast and Ekwa Marketing — covering marketing, leadership,
                operations, and client experience.
              </p>
            </div>
          </div>

          {post.cta && (
            <div className="blogpost-cta">
              <h3>{post.cta.heading}</h3>
              <p>{post.cta.body}</p>
              <Link className="button button-primary" href="/consultation">
                Book a Free Strategy Consultation &rarr;
              </Link>
            </div>
          )}
        </div>
      </article>

      {(prev || next) && (
        <section className="section">
          <div className="container blogpost-nav">
            {prev ? (
              <Link className="blogpost-nav-card" href={`/blog/${prev.slug}`}>
                <span className="blogpost-nav-dir">&larr; Previous</span>
                <span className="blogpost-nav-title">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link className="blogpost-nav-card blogpost-nav-next" href={`/blog/${next.slug}`}>
                <span className="blogpost-nav-dir">Next &rarr;</span>
                <span className="blogpost-nav-title">{next.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </section>
      )}
    </>
  );
}
