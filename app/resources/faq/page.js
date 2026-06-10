import Link from "next/link";
import { contactDetails } from "../../lib/site-data";
import LiveFaqList from "../../components/live/LiveFaqList";
import { faqSchema, breadcrumbSchema, jsonLd } from "../../lib/seo";

export const metadata = {
  title: "Knowledge Base & FAQ | Veterinary Business Institute",
  description: "Frequently asked questions regarding VBI educational content, podcast access, and the marketing audit.",
  alternates: { canonical: "/resources/faq" },
};

const faqs = [
  {
    question: "Do I need to be a practice owner to join the VBI Community?",
    answer: "No. Our community hub, podcast, and panels are designed for anyone shaping a veterinary practice: owners, hospital managers, and growth-minded associate veterinarians."
  },
  {
    question: "How do I secure access to the webinar replays?",
    answer: "Our webinar replays and event panels are completely free to explore. You can find them in the Events and Webinars sections linked from the main navigation."
  },
  {
    question: "What is included in the Marketing Audit?",
    answer: "The marketing audit involves 4 to 6 hours of custom review focusing on your local search visibility, website positioning, and practice growth footprint, managed by Ekwa Marketing."
  },
  {
    question: "Can I request a speaker for a local veterinary association?",
    answer: "Absolutely. Contact our team through the Guest/Speaker page with the event details, intended audience size, and the topics you find most relevant."
  }
];

export default function FAQPage() {
  const faqLd = faqSchema(faqs);
  const breadcrumbLd = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: "FAQ", path: "/resources/faq" },
  ]);
  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={jsonLd(faqLd)} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={jsonLd(breadcrumbLd)} />
      <section className="page-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow text-accent">Support</span>
            <h1>
              Knowledge Base & <em>FAQ.</em>
            </h1>
            <p className="hero-lead">
              Clear answers on how to use the Veterinary Business Institute 
              platform, access our free resources, and take the next step 
              in your practice growth.
            </p>
            <div className="button-row">
              <Link className="button button-primary" href="/contact">
                Contact the Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split-grid">
          <div className="section-copy">
            <span className="eyebrow text-accent">Answers</span>
            <h2>Common questions from the veterinary community.</h2>
            <p>
              If your question isn't answered here, please email the team at {contactDetails[2].label}
              for further assistance regarding our content or audits.
            </p>
          </div>

          <LiveFaqList initial={faqs} />
        </div>
      </section>
    </>
  );
}
