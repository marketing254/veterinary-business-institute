import Link from "next/link";
import ContactForm from "../components/ContactForm";
import SolarIcon from "../components/SolarIcon";
import { contactDetails, socialLinks } from "../lib/site-data";

export const metadata = {
  title: "Contact | Veterinary Business Institute",
  description:
    "Contact Veterinary Business Institute for podcast opportunities, webinar questions, partnerships, and veterinary marketing conversations.",
};

const email = contactDetails[2];

export default function ContactPage() {
  return (
    <>
      <section className="page-hero section-about-vbi contact-hero">
        <div className="about-vbi-ghost-word" aria-hidden="true">CONTACT</div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow text-accent">Get in Touch</span>
            <h1>
              We&apos;d Love to <br />
              <em>Hear</em> From <span className="outline-txt">You.</span>
            </h1>
            <p className="hero-lead">
              Whether you have a question, want to partner with us, or are ready to grow
              your veterinary practice — our team is here and happy to help.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact info + form ── */}
      <section className="section contact-main">
        <div className="container contact-main-grid">
          <div className="contact-info-col">
            <div className="contact-info-item">
              <span className="contact-info-icon" aria-hidden="true">
                <SolarIcon name="mail" size={20} />
              </span>
              <div className="contact-info-text">
                <span className="contact-info-eyebrow">Email</span>
                <a href={email.href} className="contact-info-main">{email.label}</a>
                <span className="contact-info-desc">We respond within 1 business day.</span>
              </div>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-icon" aria-hidden="true">
                <SolarIcon name="calendar" size={20} />
              </span>
              <div className="contact-info-text">
                <span className="contact-info-eyebrow">Free Strategy Meeting</span>
                <Link href="/consultation" className="contact-info-main contact-info-link">
                  Book a 30-min session &rarr;
                </Link>
                <span className="contact-info-desc">
                  A personalized growth audit for your veterinary practice, at no cost.
                </span>
              </div>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-icon" aria-hidden="true">
                <SolarIcon name="globe" size={20} />
              </span>
              <div className="contact-info-text">
                <span className="contact-info-eyebrow">Powered By</span>
                <span className="contact-info-main">Ekwa Marketing</span>
                <span className="contact-info-desc">
                  16+ years helping veterinary practices across North America grow online.
                </span>
              </div>
            </div>

            <div className="contact-info-item">
              <span className="contact-info-icon" aria-hidden="true">
                <SolarIcon name="users" size={20} />
              </span>
              <div className="contact-info-text">
                <span className="contact-info-eyebrow">Follow Us</span>
                <div className="contact-info-socials">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="contact-social-btn"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-wrap">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
