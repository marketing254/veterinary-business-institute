import Link from "next/link";
import ResourceUnlockModal from "../../components/ResourceUnlockModal";
import VetCalculators from "../../components/VetCalculators";

export const metadata = {
  title: "Free Veterinary Calculators & Tools | Veterinary Business Institute",
  description:
    "8 free, instant veterinary practice calculators — practice valuation, turnover cost, client lifetime value, marketing ROI, wellness pricing, no-show loss, and new-hire payback. No spreadsheets required.",
};

const heroStats = [
  { value: "8", label: "Free Calculators" },
  { value: "Instant", label: "Results, No Spreadsheets" },
  { value: "100%", label: "Free to Use" },
];

export default function ToolsPage() {
  return (
    <>
      <ResourceUnlockModal />

      <section className="page-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow text-accent">Resources</span>
            <h1>
              Veterinary Practice <em>Calculators.</em>
            </h1>
            <p className="hero-lead">
              Move from theory to math. Eight instant calculators to gain clarity on your
              practice&rsquo;s valuation, staffing economics, marketing ROI, and the numbers
              that drive sustainable growth — right here in your browser.
            </p>
            <div className="tools-hero-stats">
              {heroStats.map((s) => (
                <div className="tools-hero-stat" key={s.label}>
                  <span className="tools-hero-stat-value">{s.value}</span>
                  <span className="tools-hero-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="button-row">
              <Link className="button button-secondary" href="/resources">
                Back to Resources
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <VetCalculators />
        </div>
      </section>

      <section className="section section-muted">
        <div className="container page-cta">
          <div>
            <span className="eyebrow text-accent">Next Step</span>
            <h2>Want help turning these numbers into a plan?</h2>
            <p>
              Our VBI marketing and strategy team can audit your current performance and build a
              tailored growth plan around the metrics that matter most to your practice.
            </p>
          </div>
          <div className="cta-actions">
            <Link href="/consultation" className="button button-primary">
              Book a Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
