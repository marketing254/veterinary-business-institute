"use client";

import { useMemo, useState } from "react";
import { useLive } from "../../lib/use-live";
import { fetchSpeakers } from "../../lib/sheets-client";

const PAGE_SIZE = 12;

function initials(name) {
  return String(name || "")
    .replace(/,.*$/, "")
    .replace(/^(Dr|Mr|Ms|Mrs)\.\s*/i, "")
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34V9.99H5.67v8.35h2.67zM7 8.84A1.55 1.55 0 1 0 7 5.74a1.55 1.55 0 0 0 0 3.1zm11.34 9.5v-4.58c0-2.45-1.31-3.59-3.06-3.59-1.41 0-2.04.78-2.39 1.33v-1.14h-2.65c.04.75 0 8.35 0 8.35h2.65v-4.66c0-.24.02-.48.09-.65.19-.48.62-.97 1.35-.97.96 0 1.34.73 1.34 1.79v4.49h2.66z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
    </svg>
  );
}

/**
 * Featured-speakers directory — live from the "featured_speakers" sheet (seeded
 * for SSR/SEO), with a name/company search and numbered pagination.
 */
export default function LiveSpeakers({ initial = [] }) {
  const speakers = useLive(initial, fetchSpeakers);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return speakers;
    return speakers.filter((s) =>
      [s.name, s.company, s.title, s.panel].some((v) => String(v || "").toLowerCase().includes(q))
    );
  }, [speakers, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const cur = Math.min(page, totalPages - 1);
  const slice = filtered.slice(cur * PAGE_SIZE, cur * PAGE_SIZE + PAGE_SIZE);

  return (
    <section className="section">
      <div className="container">
        <div className="spk-toolbar">
          <span className="spk-count">{filtered.length} experts</span>
          <div className="spk-search">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(0);
              }}
              placeholder="Search by name, company, or panel…"
              aria-label="Search speakers"
            />
          </div>
        </div>

        {slice.length === 0 ? (
          <p className="muted-text" style={{ textAlign: "center", padding: "2rem 0" }}>
            No speakers match &ldquo;{query}&rdquo;.
          </p>
        ) : (
          <div className="spk-grid">
            {slice.map((s, i) => (
              <article className="spk-card" key={`${s.name}-${i}`}>
                <div className="spk-head">
                  <span className="spk-avatar">
                    {s.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.image} alt={s.name} loading="lazy" />
                    ) : (
                      initials(s.name)
                    )}
                  </span>
                  <div className="spk-id">
                    <h3 className="spk-name">{s.name}</h3>
                    {s.title ? <p className="spk-title">{s.title}</p> : null}
                    {s.company ? <p className="spk-company">{s.company}</p> : null}
                  </div>
                </div>
                {s.bio ? <p className="spk-bio">{s.bio}</p> : null}
                <div className="spk-foot">
                  {s.panel ? <span className="spk-panel">{s.panel}</span> : <span />}
                  <div className="spk-links">
                    {s.linkedin ? (
                      <a href={s.linkedin} target="_blank" rel="noreferrer" aria-label={`${s.name} on LinkedIn`}>
                        <LinkedInIcon />
                      </a>
                    ) : null}
                    {s.website ? (
                      <a href={s.website} target="_blank" rel="noreferrer" aria-label={`${s.name} website`}>
                        <GlobeIcon />
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="spk-pagination" role="navigation" aria-label="Speakers pages">
            <button type="button" disabled={cur === 0} onClick={() => setPage(cur - 1)} aria-label="Previous page">
              &larr;
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                type="button"
                key={i}
                className={i === cur ? "is-active" : ""}
                aria-current={i === cur ? "page" : undefined}
                onClick={() => setPage(i)}
              >
                {i + 1}
              </button>
            ))}
            <button type="button" disabled={cur >= totalPages - 1} onClick={() => setPage(cur + 1)} aria-label="Next page">
              &rarr;
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
