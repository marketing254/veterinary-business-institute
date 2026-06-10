import Link from "next/link";

export default function NotFound() {
  const quickLinks = [
    { href: "/podcast", label: "The Podcast" },
    { href: "/webinars", label: "Webinar Replays" },
    { href: "/events", label: "Live Events" },
    { href: "/blog", label: "Blog & Insights" },
    { href: "/resources", label: "Free Resources" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <section className="page-hero">
      <div className="container" style={{ textAlign: "center", paddingBlock: "3.5rem" }}>
        <span className="eyebrow text-accent">Error 404</span>
        <h1>We couldn&rsquo;t find that page.</h1>
        <p className="hero-lead" style={{ margin: "1rem auto 2rem", maxWidth: "52ch" }}>
          The page you&rsquo;re looking for may have moved or no longer exists. Here are some
          helpful places to pick up where you left off.
        </p>

        <div className="button-row" style={{ justifyContent: "center" }}>
          <Link className="button button-primary" href="/">Back to Home</Link>
          <Link className="button button-secondary" href="/podcast">Browse the Podcast</Link>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.6rem",
            marginTop: "2.5rem",
          }}
        >
          {quickLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="button button-secondary button-compact"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
