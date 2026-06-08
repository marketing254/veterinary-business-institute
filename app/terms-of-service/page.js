import Link from "next/link";
import { contactDetails } from "../lib/site-data";

export const metadata = {
  title: "Terms of Service | Veterinary Business Institute",
  description: "Terms and conditions for accessing the Veterinary Business Institute and its resources.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <section className="page-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow text-accent">Legal & Trust</span>
            <h1>
              Terms of <em>Service.</em>
            </h1>
            <p className="hero-lead">
              Please read these Terms of Service carefully before accessing our podcasts, 
              webinar replays, event panels, and strategy services provided by 
              Veterinary Business Institute (VBI).
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split-grid">
          <article className="card">
            <span className="eyebrow text-accent">Educational Purpose</span>
            <h2>General Disclaimer</h2>
            <p>
              All content provided by VBI, including podcast episodes, panel replays, and articles, 
              is built for educational and leadership purposes. Practical strategies should be adapted 
              to fit your specific veterinary practice, local laws, and operational capacity. 
              VBI is not liable for business losses incurred from applying suggestions directly.
            </p>
          </article>
          
          <article className="card">
            <span className="eyebrow text-accent">User Conduct</span>
            <h2>Community Interaction</h2>
            <p>
              By joining our Community Hub or communicating with the team, you agree to 
              engage respectfully. We reserve the right to remove members or restrict 
              access to educational materials if communications are found to be 
              abusive or harmful to the professional atmosphere.
            </p>
          </article>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container page-cta">
          <div>
            <span className="eyebrow text-accent">Questions</span>
            <h2>Have questions regarding your rights?</h2>
            <p>
              Reach out to our team if you need clarification on any of our terms or 
              how they impact your interaction with the VBI platform and marketing audits.
            </p>
          </div>
          <div className="cta-actions">
            <Link className="button button-primary" href="/contact">
              Contact Support
            </Link>
            <Link className="button button-secondary" href="/privacy-policy">
              View Privacy Policy
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
