"use client";

import { useLive } from "../../lib/use-live";
import { fetchCaseStudies } from "../../lib/sheets-client";

/** Case studies — build-time initial rows, live-refreshed from the sheet. */
export default function LiveCaseStudies({ initial = [] }) {
  const caseStudies = useLive(initial, fetchCaseStudies);

  return (
    <>
      {caseStudies.map((cs, i) => (
        <article
          key={cs.clinic || i}
          className="card"
          style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "2rem", alignItems: "center" }}
        >
          <div>
            <h3>{cs.clinic}</h3>
            <div style={{ marginTop: "1.5rem" }}>
              <strong>The Challenge:</strong>
              <p className="muted-text" style={{ marginBottom: "1rem" }}>{cs.challenge}</p>
              <strong>The Strategy:</strong>
              <p className="muted-text" style={{ marginBottom: "1rem" }}>{cs.solution}</p>
              <strong>The Result:</strong>
              <p className="text-accent" style={{ fontWeight: "600" }}>{cs.result}</p>
            </div>
          </div>
          <div style={{ backgroundColor: "var(--background-muted)", padding: "2rem", borderRadius: "12px", textAlign: "center", minWidth: "200px" }}>
            <span style={{ display: "block", fontSize: "3rem", fontWeight: "700", color: "var(--ink-700)", lineHeight: "1" }}>{cs.metric}</span>
            <span className="eyebrow" style={{ marginTop: "0.5rem", display: "block" }}>{cs.metricLabel}</span>
          </div>
        </article>
      ))}
    </>
  );
}
