"use client";

import { useEffect, useState } from "react";
import { fetchEventPanels } from "../../lib/sheets-client";
import { vimeoEmbed } from "../../lib/sheets-core";

/**
 * Single webinar-replay detail: Vimeo embed + description + transcript, in the
 * site's standard section/split-grid/card layout. Seeded with the build-time
 * panel, then live-refreshed from the event-panels tab by slug.
 */
export default function WebinarReplayDetail({ initial, slug }) {
  const [panel, setPanel] = useState(initial || null);

  useEffect(() => {
    let alive = true;
    fetchEventPanels()
      .then((rows) => {
        const match = rows.find((p) => p.slug === slug);
        if (alive && match) setPanel(match);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [slug]);

  if (!panel) return null;

  const embed = vimeoEmbed(panel.href);
  const paras = (txt) =>
    String(txt || "")
      .split(/\n{2,}|\r\n\r\n/)
      .map((p) => p.trim())
      .filter(Boolean);

  return (
    <>
      {/* ── Video ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          {embed ? (
            <div className="wrd-video-frame">
              <iframe
                src={`${embed}${embed.includes("?") ? "&" : "?"}title=0&byline=0&portrait=0`}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={panel.title}
              />
            </div>
          ) : (
            <div className="wrd-video-frame wrd-video-soon">
              <span>Replay video coming soon.</span>
            </div>
          )}
        </div>
      </section>

      {/* ── Show notes + sidebar ── */}
      <article className="section section-muted">
        <div className="container split-grid">
          <div>
            <span className="eyebrow text-accent">Session Notes</span>
            <h2>About This Session</h2>
            {paras(panel.description).length ? (
              paras(panel.description).map((p, i) => <p key={i}>{p}</p>)
            ) : (
              <p className="muted-text">A full description of this session will be added soon.</p>
            )}

            <h2 style={{ marginTop: "2.5rem" }}>Transcript</h2>
            {paras(panel.transcript).length ? (
              paras(panel.transcript).map((p, i) => <p key={i}>{p}</p>)
            ) : (
              <div className="wrd-transcript-placeholder">
                <span className="wrd-placeholder-badge">Coming soon</span>
                <p>
                  A full, searchable transcript of this webinar will be published here shortly.
                  Watch the replay above in the meantime.
                </p>
              </div>
            )}
          </div>

          <div className="card">
            <span className="eyebrow text-accent">Session Details</span>
            <ul className="wrd-meta-list" style={{ marginTop: "1rem" }}>
              {panel.date ? <li><strong>Date</strong><span>{panel.date}</span></li> : null}
              {panel.category ? <li><strong>Category</strong><span>{panel.category}</span></li> : null}
              {panel.duration ? <li><strong>Duration</strong><span>{panel.duration}</span></li> : null}
              <li><strong>Access</strong><span>Free</span></li>
            </ul>
            {panel.href ? (
              <a
                className="button button-secondary"
                href={panel.href}
                target="_blank"
                rel="noreferrer"
                style={{ marginTop: "1.25rem", display: "inline-block" }}
              >
                Open on Vimeo &rarr;
              </a>
            ) : null}
          </div>
        </div>
      </article>
    </>
  );
}
