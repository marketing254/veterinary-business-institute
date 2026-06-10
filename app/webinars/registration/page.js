import { webinarsSeed } from "../../lib/site-data";
import LiveWebinarList from "../../components/live/LiveWebinarList";

export const metadata = {
  title: "Webinar Registration | Veterinary Business Institute",
  description:
    "Register for upcoming live veterinary business webinars and panel sessions with industry experts on growth, retention, and leadership.",
  alternates: { canonical: "/webinars/registration" },
  openGraph: {
    title: "Webinar Registration | Veterinary Business Institute",
    description: "Register for upcoming live veterinary business webinars and panel sessions.",
    type: "website",
    url: "/webinars/registration",
    images: ["/assets/og-cover.jpg"],
  },
};

export default function WebinarRegistrationPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container" style={{ textAlign: "center" }}>
          <div className="hero-copy" style={{ maxWidth: "720px", margin: "0 auto" }}>
            <span className="eyebrow text-accent">Live Webinar Registration</span>
            <h1>
              Reserve your <em>seat.</em>
            </h1>
            <p className="hero-lead">
              Sign up for our upcoming live webinars and panel sessions to learn from
              industry experts about operations, growth, team retention, and smarter
              veterinary leadership. Can&rsquo;t make it live? Every registrant gets the replay.
            </p>
          </div>
        </div>
      </section>

      <LiveWebinarList initial={webinarsSeed} />
    </>
  );
}
