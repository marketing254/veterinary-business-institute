import Link from "next/link";
import { contactDetails } from "../lib/site-data";

export const metadata = {
  title: "Privacy Policy | Veterinary Business Institute",
  description: "Privacy Policy and data protection guidelines for the Veterinary Business Institute platform.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow text-accent">Legal & Trust</span>
            <h1>
              Privacy <em>Policy.</em>
            </h1>
            <p className="hero-lead">
              At Veterinary Business Institute (VBI), we prioritize your privacy and data security. 
              This policy outlines how your data is collected, used, and protected while you browse 
              our conversations, educational materials, and hubs.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split-grid">
          <article className="card">
            <span className="eyebrow text-accent">1. Data Collection</span>
            <h2>Information We Collect</h2>
            <p>
              We collect information you provide directly to us (such as when you sign up for the community, 
              request an audit, or email us). This includes your name, email address, role, and practice details.
              We also automatically collect analytical data like cookies, log data, and browser types to 
              improve our website performance and marketing pathways.
            </p>
          </article>
          
          <article className="card">
            <span className="eyebrow text-accent">2. Data Usage</span>
            <h2>How We Use Your Data</h2>
            <p>
              Your data allows us to manage your community membership (including emails summarizing podcast 
              episodes or panels), provide you with Ekwa marketing audit insights when requested, and 
              improve the technical functioning of this site. We do not sell your data to third parties.
            </p>
          </article>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow text-accent">Data Protection</span>
            <h2>Keeping Your Information Secure (GDPR & CCPA Compliant)</h2>
            <p>
              We employ encryption in transit (via SSL/HTTPS protocols), automated backups, 
              and server hardening to ensure unauthorized access to your information is prevented. 
              If you wish to access, modify, or delete your tracking data or community profile, 
              please contact the team.
            </p>
          </div>
          <div className="button-row" style={{ marginTop: "2rem" }}>
            <a className="button button-primary" href={`mailto:${contactDetails[2].label}`}>
              Contact Data Officer
            </a>
            <Link className="button button-secondary" href="/terms-of-service">
              View Terms of Service
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
