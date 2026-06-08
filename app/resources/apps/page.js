import Link from "next/link";

export const metadata = {
  title: "Recommended Apps | Veterinary Business Institute",
  description: "A curated list of integrations, PMS platforms, and applications for modern veterinary practices.",
};

const appsList = [
  {
    title: "Practice Management Systems (PMS)",
    body: "Curated reviews and integrations focusing on efficiency, minimal friction for your clinical team, and strong client communication support.",
  },
  {
    title: "Client Experience & Telehealth",
    body: "Applications designed to reduce front-desk pressure by incorporating asynchronous chat, automated renewals, and secure video consultations.",
  },
  {
    title: "Financial & Analytics Dashboards",
    body: "Solutions that visualize practice KPIs, pulling data out of your PMS and turning it into clear, readable dashboards for practice owners."
  }
];

export default function AppsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow text-accent">Resources</span>
            <h1>
              Recommended <em>Apps.</em>
            </h1>
            <p className="hero-lead">
              The modern veterinary practice requires software that reduces drag,
              not software that creates more administrative work. Explore our 
              recommendations for connected, efficient clinic systems.
            </p>
            <div className="button-row">
              <Link className="button button-secondary" href="/resources">
                Back to Resources
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-three">
          {appsList.map((app) => (
            <article className="card route-card" key={app.title}>
              <h3>{app.title}</h3>
              <p>{app.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
