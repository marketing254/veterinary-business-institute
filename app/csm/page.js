import Link from "next/link";
import { contactDetails } from "../lib/site-data";

export const metadata = {
  title: "Coaching Services (CSM) | Veterinary Business Institute",
  description: "One-on-one leadership and management coaching for veterinary practice owners and high-level associates.",
};

const csmPillars = [
  {
    title: "1-on-1 Executive Clarity",
    body: "Monthly strategy calls focusing purely on ownership bottlenecks: time management, associate compensation models, and long-term exit planning."
  },
  {
    title: "Operational Playbooks",
    body: "Custom standard operating procedures (SOPs) designed to reduce front-desk friction and clinical overlap."
  },
  {
    title: "Leadership & Culture Integration",
    body: "Actionable frameworks for retaining top DVM talent by shifting practice culture from reactive to structured."
  }
];

export default function CSMPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow text-accent">Coaching Services (CSM)</span>
            <h1>
              Leadership that drives <em>profitability.</em>
            </h1>
            <p className="hero-lead">
              While marketing drives visibility, coaching fixes operations. 
              Our CSM model partners you directly with industry veterans to map 
              out the structural changes your veterinary practice needs to handle 
              growth without burning out your clinical team.
            </p>
            <div className="button-row">
              <Link className="button button-primary" href="/consultation">
                Book an Intro Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="section-heading">
             <span className="eyebrow text-accent">The Framework</span>
             <h2>Coaching isn't just motivation. It's applied math.</h2>
          </div>
          <div className="grid-three">
             {csmPillars.map((pillar) => (
               <article className="card" key={pillar.title}>
                 <h3>{pillar.title}</h3>
                 <p>{pillar.body}</p>
               </article>
             ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container detail-grid">
          <article className="card">
            <span className="eyebrow text-accent">Partnership</span>
            <h2>Who this is for.</h2>
            <p>
              The CSM program is specifically built for DVM owners who are preparing 
              to scale from a single-doctor practice into a multi-doctor hospital, 
              or those restructuring for an eventual exit.
            </p>
            <p>
              We focus heavily on the data points inside your PMS to measure the 
              tangible ROI of training your management team. If you are ready to 
              stop acting as the primary bottleneck, let's talk.
            </p>
            <div className="button-row mt-6">
               <a className="button button-secondary" href={`mailto:${contactDetails[2].label}?subject=CSM%20Coaching%20Inquiry`}>
                 Email the Coaching Team
               </a>
            </div>
          </article>

          <div className="card card-visual" style={{ background: "var(--ink-700)", color: "white", padding: "3rem 2rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>"Our coaching completely restructured how we approach associate compensation."</h3>
            <p className="muted-text" style={{ color: "var(--ink-300)" }}>— Dr. Sarah Jenkins, Mid-Atlantic Vet Group</p>
            <Link className="button button-primary" href="/reviews" style={{ marginTop: "2rem", alignSelf: "flex-start" }}>
              Read More Success Stories
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
