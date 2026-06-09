"use client";

import { useEffect, useState } from "react";
import { fetchEventPanels } from "../../lib/sheets-client";
import { vimeoEmbed } from "../../lib/sheets-core";
import WebinarTabs from "./WebinarTabs";

/**
 * Single webinar-replay detail: Vimeo embed + a tabbed Description / Transcript
 * panel (both pulled from their Google Docs via the Apps Script proxy).
 * Seeded with the build-time panel, then live-refreshed from the sheet by slug.
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

  return (
    <>
      {/* ── Video ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container rep-detail-wrap">
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

          {/* meta chips */}
          <div className="rep-meta-row">
            {panel.date ? <span className="rep-chip">{panel.date}</span> : null}
            {panel.category ? <span className="rep-chip">{panel.category}</span> : null}
            {panel.duration ? <span className="rep-chip">{panel.duration}</span> : null}
            <span className="rep-chip rep-chip-free">Free Replay</span>
          </div>
        </div>
      </section>

      {/* ── Description / Transcript tabs ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container rep-detail-wrap">
          <WebinarTabs descriptionSrc={panel.description} transcriptSrc={panel.transcript} />
        </div>
      </section>
    </>
  );
}
