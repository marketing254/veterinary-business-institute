import Link from "next/link";
import LiveGuestReviews from "../components/live/LiveGuestReviews";

export const metadata = {
  title: "Guest Reviews | Veterinary Business Institute",
  description:
    "Hear from the veterinary professionals who have appeared on the Veterinary Business Podcast — in their own words.",
};

const heroStats = [
  { value: "5★", label: "Average guest rating" },
  { value: "60+", label: "Episodes published" },
  { value: "12+", label: "Guest reviews" },
  { value: "100%", label: "Free to listen & subscribe" },
];

const guestReviews = [
  {
    source: "Email",
    quote:
      "It was great to be on the podcast. I'd love the opportunity to come back for another episode — this conversation gave me a fresh way to talk about growing a practice while protecting your team's time.",
    name: "Dr. Garry Mitchel",
    title: "Practice Owner & Veterinary Business Coach",
  },
  {
    source: "Email",
    quote:
      "Thanks so much. I had a lot of fun and think the conversation was really well received. We'd be happy to consider participating in future episodes. Best wishes, David.",
    name: "Dr. David Skinner",
    title: "Veterinarian, Author & Practice Consultant",
  },
  {
    source: "LinkedIn",
    quote:
      "This was one of the more improvised conversations I've done — almost entirely extemporaneous. Watching it back, it holds up remarkably well. A genuinely good listen for any practice owner.",
    name: "Dr. Joseph Tiano",
    title: "Founder & Veterinary Tech Advisor",
  },
  {
    source: "Veterinary Business Podcast",
    quote:
      "Fantastic, unique and different! I had the pleasure of being a guest on this podcast and enjoyed every minute. I've also been listening to earlier episodes on my runs — this approach to practice, business and life is a breath of fresh air. Well done!",
    name: "Dr. Mitch Jackson",
    title: "Founder — Streamline Veterinary Group",
  },
  {
    source: "Veterinary Business Podcast",
    quote:
      "The Veterinary Business Podcast is an exceptional tool to help veterinarians grow their practice in a meaningful, ethical and incremental way — resulting in a better-served client and patient base. It's just great.",
    name: "Dr. Dan Minutillo",
    title: "Founder — Minutillo Animal Hospital",
  },
  {
    source: "Veterinary Business Podcast",
    quote:
      "It was a breath of fresh air and genuinely therapeutic! I had an amazing time on the air. I didn't realize how valuable it was to just talk about my practice and share my experiences. A valuable service for many veterinarians.",
    name: "Dr. Kelly Chang Rickert",
    title: "Founder — Chang Veterinary & Wellness",
  },
  {
    source: "Veterinary Business Podcast",
    quote:
      "A unique platform! The Veterinary Business Institute gives vets a place to share key philosophies and techniques while offering insight into what makes them good clinicians and good business owners. I thoroughly enjoyed it.",
    name: "Dr. James DeSimone",
    title: "Founder — DeSimone Veterinary Care",
  },
  {
    source: "Veterinary Business Podcast",
    quote:
      "Naren is an excellent interviewer! I had a great conversation and I highly encourage you to join the podcast and get your story out there for all the listeners — you'll be as excited about it as I am.",
    name: "Dr. Mary Ann Escalante",
    title: "Lead Veterinarian — County Animal Services",
  },
  {
    source: "Veterinary Business Podcast",
    quote:
      "A powerful tool! It allows veterinarians to share wisdom and creativity in an honest and sincere manner. I've had great success working with the Ekwa team for years. I strongly encourage vets to subscribe and listen.",
    name: "Dr. Gary Bennett",
    title: "Founder — Bennett Veterinary Clinic",
  },
  {
    source: "Veterinary Business Podcast",
    quote:
      "A great experience! Thank you to Naren for the podcast. He was a terrific interviewer and I felt like I really had a chance to connect with the audience and share what's working in our practice.",
    name: "Dr. Ilya Lerma",
    title: "Owner — Lerma Family Veterinary",
  },
  {
    source: "Veterinary Business Podcast",
    quote:
      "A wonderful surprise! Interesting interviews with veterinarians I can relate to and whose goals I understand. Newer vets, those changing focus, or doctors starting out on their own can learn a lot here.",
    name: "Dr. Marilynn Spencer",
    title: "Founder — Spencer Companion Care",
  },
  {
    source: "Veterinary Business Podcast",
    quote:
      "Really refreshing! Naren made me think about my practice and the purpose of my business in ways I hadn't before. He drew out ideas through his knowledge of psychology and people. A genuinely intelligent interviewer.",
    name: "Dr. Larry Organ",
    title: "Founder — Organ Veterinary Group",
  },
  {
    source: "LinkedIn",
    quote:
      "I came on to talk about team culture and left with a clearer plan for my own hospital. The conversation was thoughtful and genuinely useful — not the usual surface-level interview.",
    name: "Dr. Joy Bertrand",
    title: "Medical Director — Bertrand Animal Hospital",
  },
  {
    source: "Email",
    quote:
      "VBI gets that veterinary medicine is also a business. The questions were sharp, the audience is exactly the people I want to reach, and the team made the whole process effortless.",
    name: "Dina Eisenberg",
    title: "Practice Consultant — Resolve Veterinary Advisors",
  },
  {
    source: "Veterinary Business Podcast",
    quote:
      "One of the best guest experiences I've had. Naren and the team prepared well, kept it conversational, and helped me share practical lessons other owners can actually apply.",
    name: "Dr. Daniel Forouzan",
    title: "Owner — Westside Pet Wellness",
  },
];

function initials(name) {
  return name
    .replace(/^Dr\.?\s+/i, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ReviewsPage() {
  return (
    <>
      {/* ── Hero + stats ── */}
      <section className="page-hero section-about-vbi community-hero blog-soon-hero">
        <div className="about-vbi-ghost-word" aria-hidden="true">REVIEWS</div>
        <div className="container blog-soon-inner">
          <span className="community-hero-pill">Guest Reviews</span>
          <h1>
            What our guests say about the{" "}
            <span className="outline-txt">Veterinary Business Podcast.</span>
          </h1>
          <p className="hero-lead">
            Hear from the veterinarians and veterinary professionals who have appeared on the
            Veterinary Business Podcast — in their own words.
          </p>
          <div className="community-hero-stats reviews-hero-stats">
            {heroStats.map((s) => (
              <div className="community-stat" key={s.label}>
                <span className="community-stat-value">{s.value}</span>
                <span className="community-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guest reviews grid ── */}
      <section className="section section-muted">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">Guest Reviews</span>
            <h2>What our guests say about us.</h2>
            <p>
              Hear directly from the veterinarians and veterinary professionals who have been
              guests on the Veterinary Business Podcast.
            </p>
          </div>
          <LiveGuestReviews initial={guestReviews} />
        </div>
      </section>

      {/* ── Be a guest CTA ── */}
      <section className="section res-next">
        <div className="container res-next-inner">
          <span className="eyebrow text-accent">Share Your Story</span>
          <h2>Want to be a guest on the Veterinary Business Podcast?</h2>
          <p>
            Join veterinary leaders like Dr. Mitch Jackson, Dr. Gary Bennett, and Dr. Kelly Chang
            Rickert who have shared their stories and insights on the show. Apply to be a guest today.
          </p>
          <div className="button-row" style={{ justifyContent: "center" }}>
            <Link className="button button-primary" href="/guest-speaker">
              Apply to Be a Guest &rarr;
            </Link>
            <Link className="button button-secondary" href="/podcast">
              Listen to Episodes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
