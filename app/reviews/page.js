import Link from "next/link";
import VideoReviews from "../components/VideoReviews";

export const metadata = {
  title: "Reviews | What Our Guests & Panelists Say | Veterinary Business Institute",
  description:
    "Veterinarians and practice leaders who joined our VET Expert Panels and the Veterinary Business Podcast share what it was like, in their own words.",
  alternates: { canonical: "/reviews" },
};

/**
 * Video testimonials ("Site Cut" versions hosted on the VBI Vimeo).
 * type: "panel" = VET Expert Panel speaker, "podcast" = Veterinary Business Podcast guest.
 */
const videoReviews = [
  {
    type: "panel",
    vimeoId: "1242661444",
    name: "Emily Hoppmann, DVM",
    title: "VET Expert Panel speaker",
    quote:
      "You made things go seamlessly, make me feel very comfortable… a great opportunity for people to give back.",
  },
  {
    type: "panel",
    vimeoId: "1242661456",
    name: "Paul Camilo, CVPM",
    title: "VET Expert Panel speaker",
    quote:
      "It was moderated wonderfully… organized and well produced. I would absolutely recommend another professional to participate.",
  },
  {
    type: "podcast",
    vimeoId: "1243114182",
    name: "Dr. Sam Bowden",
    title: "Founder, Accelerate Practice Academy",
    quote:
      "Veterinary science is one skill set, business science is a completely different skill set… it's incredibly valuable, so please don't stop.",
  },
  {
    type: "podcast",
    vimeoId: "1243114343",
    name: "Tanika Hall",
    title: "Founder & CEO, Fyndaria",
    quote: "I love the format and the platform… I think it's so valuable as a community.",
  },
  {
    type: "podcast",
    vimeoId: "1243114495",
    name: "Heath McNutt, DVM, MBA",
    title: "Owner, Village Veterinary Clinic",
    quote:
      "There's people out there doing what I'm trying to accomplish… it's encouraging to think, I can find my own way.",
  },
  {
    type: "podcast",
    vimeoId: "1243114623",
    name: "Ryan Salvino",
    title: "Co-Founder & Co-CEO, VetTalk",
    quote:
      "Love the questions that were asked… I was excited to share my perspective as a pet owner and a business owner.",
  },
  {
    type: "podcast",
    vimeoId: "1243114028",
    name: "Jordan Morelli",
    title: "Partner & Head of Veterinary Law, Linmac LLP",
    quote:
      "Thinking about buying a practice? Consider the Veterinary Business Institute for all your needs with respect to education and resources.",
  },
];

export default function ReviewsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="page-hero section-about-vbi community-hero blog-soon-hero">
        <div className="about-vbi-ghost-word" aria-hidden="true">REVIEWS</div>
        <div className="container blog-soon-inner">
          <span className="community-hero-pill">Reviews &middot; VET Panels &amp; Podcast</span>
          <h1>
            What our guests and <span className="outline-txt">panelists say.</span>
          </h1>
          <p className="hero-lead">
            Veterinarians and practice leaders who joined our VET Expert Panels and the Veterinary
            Business Podcast share what it was like, in their own words.
          </p>
        </div>
      </section>

      {/* ── Video testimonials ── */}
      <section className="section section-muted" id="video-reviews">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">Video Reviews</span>
            <h2>Hear it from our guests</h2>
            <p>
              Short clips from the experts who have appeared on a live VET Expert Panel or an
              episode of the Veterinary Business Podcast.
            </p>
          </div>

          <VideoReviews reviews={videoReviews} />

          {/* ── CTA band ── */}
          <div className="panelist-cta">
            <div className="panelist-cta-text">
              <span className="eyebrow">Join us next</span>
              <h2>Share your expertise on a VET Panel or the podcast</h2>
              <p>
                Join practice owners and managers on our next live panel or podcast episode, or
                book a free strategy call to see how your practice shows up online.
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
