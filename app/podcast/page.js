import Link from "next/link";
import { episodes, listeningPlatforms } from "../lib/site-data";
import PlatformIcon from "../components/PlatformIcon";
import PodcastGuestForm from "../components/PodcastGuestForm";
import PodcastEpisodes from "../components/PodcastEpisodes";
import LivePodcastEpisodes from "../components/live/LivePodcastEpisodes";

export const metadata = {
  title: "The Veterinary Business Podcast | Veterinary Business Institute",
  description:
    "Real conversations with veterinarians, practice owners, and industry leaders on building a thriving veterinary practice. Listen free to every episode.",
  alternates: { canonical: "/podcast" },
  openGraph: {
    title: "The Veterinary Business Podcast",
    description:
      "Real conversations with veterinarians, practice owners, and industry leaders on building a thriving veterinary practice. Listen free.",
    type: "website",
    url: "/podcast",
    images: ["/assets/og-cover.jpg"],
  },
};

const marqueeItems = [
  "60+ Episodes",
  "Veterinary Interviews",
  "Empowering Veterinarians as Entrepreneurs",
  "100% Free",
  "The Veterinary Business Podcast",
];

const platformBlurb = {
  Spotify: "Stream every episode on Spotify",
  "Apple Podcasts": "Listen and subscribe on Apple",
  "YouTube Music": "Watch and listen on YouTube",
};

export default function PodcastPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="page-hero section-about-vbi community-hero blog-soon-hero">
        <div className="about-vbi-ghost-word" aria-hidden="true">PODCAST</div>
        <div className="container blog-soon-inner">
          <span className="community-hero-pill">Empowering Veterinarians as Entrepreneurs</span>
          <h1>
            The Veterinary Business{" "}
            <span className="outline-txt">Podcast Show.</span>
          </h1>
          <p className="hero-lead">
            Real conversations with veterinarians, practice owners, and industry leaders sharing
            their journeys, strategies, and hard-won lessons on building a thriving veterinary
            practice.
          </p>
          <div className="button-row blog-soon-cta">
            <a className="button button-primary" href="#episodes">
              Listen to Episodes &rarr;
            </a>
            <a className="button button-secondary" href="#subscribe">
              Subscribe Free &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ── Marquee strip ── */}
      <div className="reverse-marquee-band">
        <div className="reverse-marquee-track">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="reverse-marquee-item">
              {item}
              <span className="reverse-marquee-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* ── All Episodes ── */}
      <section className="section section-muted" id="episodes">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">All Episodes</span>
            <h2>The Veterinary Business Podcast Show.</h2>
            <p>
              Episodes featuring veterinarians, entrepreneurs, and industry leaders — sharing their
              stories, strategies, and insights on building a thriving veterinary practice.
            </p>
          </div>
          <LivePodcastEpisodes initial={episodes} />
        </div>
      </section>

      {/* ── Subscribe ── */}
      <section className="section" id="subscribe">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">Subscribe</span>
            <h2>Never miss an episode.</h2>
            <p>
              Subscribe on your favorite platform and get notified the moment a new episode drops.
            </p>
          </div>
          <div className="podcast-platforms">
            {listeningPlatforms.map((p) => (
              <a
                className="podcast-platform-card"
                href={p.href}
                target="_blank"
                rel="noreferrer"
                key={p.label}
              >
                <span className="podcast-platform-icon">
                  <PlatformIcon label={p.label} size={40} />
                </span>
                <span className="podcast-platform-text">
                  <strong>{p.label}</strong>
                  <span className="podcast-platform-blurb">{platformBlurb[p.label]}</span>
                </span>
                <span className="podcast-platform-link">Open &rarr;</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Be a guest ── */}
      <section className="section section-muted guest-apply">
        <div className="container guest-apply-inner">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">Be a Guest</span>
            <h2>Are you a veterinary industry expert?</h2>
            <p>
              We&rsquo;re always looking for veterinarians, practice owners, consultants, and
              marketing experts with valuable insights to share with our audience. Apply to be a
              guest below.
            </p>
          </div>
          <PodcastGuestForm />
        </div>
      </section>

      {/* ── Launch your own podcast CTA ── */}
      <section className="section res-next">
        <div className="container res-next-inner">
          <span className="eyebrow text-accent">For Practice Owners</span>
          <h2>Want expert help launching your own podcast?</h2>
          <p>
            Our team can help you plan, launch, and grow a veterinary podcast that positions you as
            the go-to expert in your market. Book a free consultation to learn how.
          </p>
          <Link className="button button-primary" href="/msm">
            Book Free Consultation &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
