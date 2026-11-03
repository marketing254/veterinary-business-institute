import Link from "next/link";

export const metadata = {
  title: "Reviews | What Our Panelists Say | Veterinary Business Institute",
  description:
    "Veterinarians and practice leaders who joined our VET Expert Panels share what it was like, in their own words.",
  alternates: { canonical: "/reviews" },
};

/**
 * VET Expert Panel panelist testimonials ("Site Cut" versions hosted on the VBI Vimeo).
 * Embeds use title=0&byline=0&portrait=0 for a clean player and dnt=1 for privacy.
 * No autoplay — the visitor presses play.
 */
const panelistReviews = [
  {
    vimeoId: "1242661444",
    name: "Emily Hoppmann, DVM",
    title: "VET Expert Panel speaker",
    quote:
      "You made things go seamlessly, make me feel very comfortable… a great opportunity for people to give back.",
  },
  {
    vimeoId: "1242661456",
    name: "Paul Camilo, CVPM",
    title: "VET Expert Panel speaker",
    quote:
      "It was moderated wonderfully… organized and well produced. I would absolutely recommend another professional to participate.",
  },
];

function initials(name) {
  return name
    .replace(/,.*$/, "")
    .replace(/^Dr\.?\s+/i, "")
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ReviewsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="page-hero section-about-vbi community-hero blog-soon-hero">
        <div className="about-vbi-ghost-word" aria-hidden="true">REVIEWS</div>
        <div className="container blog-soon-inner">
          <span className="community-hero-pill">Reviews &middot; VET Panels</span>
          <h1>
            What our <span className="outline-txt">panelists say.</span>
          </h1>
          <p className="hero-lead">
            Veterinarians and practice leaders who joined our VET Expert Panels share what it was
            like, in their own words.
          </p>
        </div>
      </section>

      {/* ── Panelist video testimonials ── */}
      <section className="section section-muted" id="panelists">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">Panelist Reviews</span>
            <h2>Panelist video reviews</h2>
            <p>
              Hear directly from the experts who have appeared on a live VET Expert Panel with the
              Veterinary Business Institute.
            </p>
          </div>

          <div className="panelist-grid">
            {panelistReviews.map((r) => (
              <article className="panelist-card" key={r.vimeoId}>
                <div className="panelist-video">
                  <iframe
                    src={`https://player.vimeo.com/video/${r.vimeoId}?title=0&byline=0&portrait=0&dnt=1`}
                    title={`${r.name} – VET Panel testimonial`}
                    allow="fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
                <div className="panelist-body">
                  <span className="guest-review-source">VET Panel guest</span>
                  <div className="guest-review-stars" aria-label="5 out of 5 stars">
                    &#9733;&#9733;&#9733;&#9733;&#9733;
                  </div>
                  <blockquote className="panelist-quote">&ldquo;{r.quote}&rdquo;</blockquote>
                  <div className="guest-review-author">
                    <span className="guest-review-avatar" aria-hidden="true">
                      {initials(r.name)}
                    </span>
                    <div className="guest-review-meta">
                      <strong>{r.name}</strong>
                      <span>{r.title}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* ── CTA band ── */}
          <div className="panelist-cta">
            <div className="panelist-cta-text">
              <span className="eyebrow">Join the next panel</span>
              <h2>Share your expertise on a VET Panel</h2>
              <p>
                Join practice owners and managers on our next live panel, or book a free strategy
                call to see how your practice shows up online.
              </p>
            </div>
            <div className="button-row panelist-cta-buttons">
              <Link className="button button-primary" href="/guest-speaker">
                Apply to be a panelist &rarr;
              </Link>
              <Link className="button button-dark" href="/msm">
                Book a free strategy call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
