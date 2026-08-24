import { faqSchema, jsonLd } from "../lib/seo";

/**
 * Server-rendered FAQ block with FAQPage schema. Questions render as visible
 * H3 headings with short, self-contained answers directly below — the exact
 * passage structure AI engines (AI Overviews, ChatGPT, Perplexity) extract and
 * cite. `items` is [{ question, answer }].
 */
export default function FaqSection({ items, heading = "Frequently Asked Questions", eyebrow = "FAQ" }) {
  if (!items || !items.length) return null;
  return (
    <section className="section section-muted">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={jsonLd(faqSchema(items))} />
      <div className="container faq-hub">
        <div className="section-heading section-heading-centered">
          <span className="eyebrow text-accent">{eyebrow}</span>
          <h2>{heading}</h2>
        </div>
        <div className="faq-hub-list">
          {items.map((f, i) => (
            <div className="faq-hub-item" key={i}>
              <h3 className="faq-hub-q">{f.question}</h3>
              <p className="faq-hub-a">{f.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
