"use client";

import { useState } from "react";
import Link from "next/link";
import { blogPosts } from "../lib/blog-posts";

const categories = ["All", ...new Set(blogPosts.map((p) => p.category))];

/**
 * Filterable "All Articles" grid. Shows EVERY post — including the one
 * promoted into the featured hero card above — so nothing is missed by
 * readers who skip past the hero.
 */
export default function BlogIndexClient() {
  const [active, setActive] = useState("All");
  const shown =
    active === "All" ? blogPosts : blogPosts.filter((p) => p.category === active);

  return (
    <section className="section section-muted">
      <div className="container">
        <div className="section-heading section-heading-centered">
          <span className="eyebrow text-accent">All Articles</span>
          <h2>Veterinary practice-growth guides.</h2>
        </div>

        <div className="blog-filter-row" aria-label="Filter articles by category">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={`blog-filter-pill${active === c ? " is-active" : ""}`}
              aria-pressed={active === c}
              onClick={() => setActive(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="blog-index-grid">
          {shown.map((p) => (
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
  );
}
