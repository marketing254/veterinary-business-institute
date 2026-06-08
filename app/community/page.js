import Link from "next/link";
import CommunityJoinForm from "./CommunityJoinForm";
import SolarIcon from "../components/SolarIcon";
import { withBasePath } from "../lib/base-path";
import { contactDetails, socialLinks } from "../lib/site-data";

export const metadata = {
  title: "Veterinary Community & Peer Network | Veterinary Business Institute",
  description:
    "Join a free community of veterinary practice owners and teams sharing real growth strategies, exclusive resources, and peer support to build stronger practices.",
};

const heroStats = [
  { value: "Growing", label: "Veterinary Network" },
  { value: "60+", label: "Podcast Episodes" },
  { value: "Free", label: "Always Free to Join" },
  { value: "40+", label: "Topics Covered" },
];

const benefits = [
  {
    icon: "users",
    title: "Private Discussion Forums",
    body: "Ask questions, share wins, and get advice from fellow practice owners across every type of clinic. Real answers from people who've been in your shoes.",
  },
  {
    icon: "video",
    title: "Exclusive Webinars & Events",
    body: "Members-first access to live webinars, Q&A sessions with the VBI team, and virtual workshops on marketing, operations, and growth.",
  },
  {
    icon: "bookOpen",
    title: "Free Resources & Templates",
    body: "Downloadable marketing templates, checklists, SOPs, and guides created by the Ekwa Marketing team — available exclusively to community members.",
  },
  {
    icon: "microphone",
    title: "Early Podcast Access",
    body: "Members get early access to new Veterinary Business Podcast episodes, transcripts, and bonus content not available to the general public.",
  },
  {
    icon: "checkCircle",
    title: "Ekwa Expert Office Hours",
    body: "Monthly live sessions where Ekwa Marketing specialists answer your marketing questions in real time. Get expert advice without the agency retainer.",
  },
];

const audience = [
  {
    title: "Solo & Small Practices",
    body: "Veterinarians building from the ground up who need proven strategies, not guesswork.",
  },
  {
    title: "Practice Owners & Hospital Directors",
    body: "Leaders who want to delegate, systematize, and scale without sacrificing patient care.",
  },
  {
    title: "Growth-Minded Associates",
    body: "Ambitious vets building their reputation and preparing to lead or own a practice.",
  },
  {
    title: "Veterinary Entrepreneurs",
    body: "Innovators branching into multi-site groups, tech, consulting, or new service models.",
  },
];

const membershipPerks = [
  {
    title: "Community Forum Access",
    body: "Post questions, share strategies, and connect with veterinary teams across every type of practice.",
  },
  {
    title: "Free Resources & Downloads",
    body: "All templates, guides, and checklists — free for community members forever.",
  },
  {
    title: "Event & Webinar Invites",
    body: "Priority invitations to all VBI events, webinars, and live sessions.",
  },
  {
    title: "Weekly Digest",
    body: "Curated veterinary marketing and growth insights delivered to your inbox every week.",
  },
];

export default function CommunityPage() {
  const contactEmail = contactDetails[2].label;

  return (
    <>
      {/* ── Hero + join form ── */}
      <section className="page-hero section-about-vbi community-hero">
        <div className="about-vbi-ghost-word" aria-hidden="true">COMMUNITY</div>
        <div className="container community-hero-grid">
          <div className="hero-copy community-hero-copy">
            <span className="community-hero-pill">Now Open — Free to Join</span>
            <h1>
              The private network for veterinary teams who want to{" "}
              <span className="outline-txt">thrive.</span>
            </h1>
            <p className="hero-lead">
              Join a community of ambitious practice owners and veterinary teams sharing real
              strategies, exclusive resources, and peer support to grow their practices and
              care for more patients.
            </p>
            <div className="button-row">
              <a className="button button-primary" href="#join">
                Join the Community — Free &rarr;
              </a>
              <Link className="button button-secondary" href="/podcast">
                Listen to the Podcast
              </Link>
            </div>
            <div className="community-hero-stats">
              {heroStats.map((s) => (
                <div className="community-stat" key={s.label}>
                  <span className="community-stat-value">{s.value}</span>
                  <span className="community-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="community-hero-form" id="join">
            <CommunityJoinForm
              email={contactEmail}
              title="Join the Community"
              description="Instant access. No credit card. No spam."
              buttonLabel="Join Free →"
              note="🔒 No spam. No selling your data. Just great content for veterinary teams."
            />
          </div>
        </div>
      </section>

      {/* ── What You Get ── */}
      <section className="section community-benefits">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow text-accent">What You Get</span>
            <h2>Everything you need to grow your practice.</h2>
            <p>
              The VBI Community is your unfair advantage — exclusive access to resources,
              experts, and peers that most veterinary teams never have.
            </p>
          </div>
          <div className="community-benefits-grid">
            {benefits.map((b) => (
              <article className="community-benefit-card" key={b.title}>
                <span className="community-benefit-icon" aria-hidden="true">
                  <SolarIcon name={b.icon} size={22} />
                </span>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </article>
            ))}
            <article className="community-benefit-card community-benefit-image">
              <img
                src={withBasePath("/assets/about-team.jpg")}
                alt="Veterinary professionals connecting"
              />
            </article>
          </div>
        </div>
      </section>

      {/* ── Who's in the Community ── */}
      <section className="section section-muted community-audience">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow text-accent">Who&rsquo;s in the Community</span>
            <h2>Veterinary teams who are building, not just practicing.</h2>
            <p>
              Our community isn&rsquo;t for everyone. It&rsquo;s for veterinary professionals who see
              their practice as a business and want to build something that lasts.
            </p>
          </div>
          <div className="community-audience-grid">
            {audience.map((a) => (
              <div className="community-audience-card" key={a.title}>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Message from Naren ── */}
      <section className="section community-founder">
        <div className="container community-founder-grid">
          <div className="community-founder-media">
            <div className="community-founder-image">
              <img
                src={withBasePath("/assets/naren-arulrajah.jpg")}
                alt="Naren Arulrajah, CEO of Ekwa Marketing"
              />
            </div>
            <div className="community-founder-card">
              <strong>Naren Arulrajah</strong>
              <span>CEO, Ekwa Marketing</span>
              <div className="community-founder-socials">
                {socialLinks.slice(0, 3).map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="community-founder-copy">
            <span className="eyebrow text-accent">A Message from Naren</span>
            <h2>
              The practices that win the next decade aren&rsquo;t just the best clinicians — they&rsquo;re
              the best business owners.
            </h2>
            <p>
              I see too many brilliant veterinarians struggling not because of their clinical
              skills, but because no one taught them how to run and grow a practice as a business.
              Through Ekwa Marketing, we&rsquo;ve helped practices transform their marketing.
            </p>
            <p>
              The VBI Community is where we share those insights directly — for free — with
              veterinary teams who are serious about growth.
            </p>
            <a className="button button-primary" href="#join">
              Join the Community &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ── Stay Connected ── */}
      <section className="section section-muted community-connect">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow text-accent">Stay Connected</span>
            <h2>Follow Veterinary Business Institute everywhere.</h2>
          </div>
          <div className="community-connect-row">
            {socialLinks.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="community-connect-btn">
                <SolarIcon name="globe" size={18} />
                {s.label}
              </a>
            ))}
            <a href={`mailto:${contactEmail}`} className="community-connect-btn">
              <SolarIcon name="mail" size={18} />
              {contactEmail}
            </a>
          </div>
        </div>
      </section>

      {/* ── Final membership join ── */}
      <section className="section community-final">
        <div className="container community-final-grid">
          <div className="community-final-copy">
            <span className="eyebrow text-accent">Free Membership</span>
            <h2>Join veterinary teams growing their practices.</h2>
            <p>
              Membership is completely free. Get instant access to the community forums,
              resources, and upcoming events.
            </p>
            <ul className="community-final-list">
              {membershipPerks.map((p) => (
                <li key={p.title}>
                  <span className="community-final-check" aria-hidden="true">
                    <SolarIcon name="checkCircle" size={18} />
                  </span>
                  <div>
                    <strong>{p.title}</strong>
                    <span>{p.body}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="community-final-form">
            <CommunityJoinForm
              email={contactEmail}
              title="Create your free account"
              description="Instant access. No credit card required. Cancel anytime — though you won't want to."
              buttonLabel="Join the Community Free →"
              note="🔒 No spam. No selling your data. Just great content for veterinary teams."
            />
          </div>
        </div>
      </section>
    </>
  );
}
