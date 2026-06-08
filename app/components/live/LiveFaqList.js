"use client";

import { useLive } from "../../lib/use-live";
import { fetchFaqs } from "../../lib/sheets-client";

/** FAQ list — build-time initial Q&A, live-refreshed from the sheet. */
export default function LiveFaqList({ initial = [] }) {
  const faqs = useLive(initial, fetchFaqs);

  return (
    <div className="faq-list" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {faqs.map((faq, i) => (
        <div key={`${faq.question}-${i}`} className="faq-item">
          <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>{faq.question}</h3>
          <p className="muted-text">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}
