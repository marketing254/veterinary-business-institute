import Link from "next/link";
import { withBasePath } from "../lib/base-path";
import {
  contactAddress,
  contactDetails,
  footerExploreLinks,
  footerResourceLinks,
  socialLinks,
} from "../lib/site-data";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Slim CTA strip */}
      <div className="container footer-cta-strip">
        <div>
          <span className="footer-cta-eyebrow">Stay Connected</span>
          <h2 className="footer-cta-heading">Your next step starts here.</h2>
        </div>
        <Link className="button button-primary" href="/msm">
          Book a Free Strategy Call &rarr;
        </Link>
      </div>

      {/* Link columns */}
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src={withBasePath("/assets/logo-vbi.png")} alt="Veterinary Business Institute" />
          <p>
            A resource hub for veterinarians focused on practice growth, leadership,
            operations, and digital visibility.
          </p>
        </div>

        <div>
          <h3>Explore</h3>
          <ul className="footer-list">
            {footerExploreLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Resources</h3>
          <ul className="footer-list">
            {footerResourceLinks.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <ul className="footer-list">
            {contactDetails.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
            <li className="footer-address">{contactAddress}</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container footer-bottom">
        <span>&copy; {year} Veterinary Business Institute. All rights reserved.</span>
        <div className="footer-bottom-links">
          {socialLinks.map((item) => (
            <a href={item.href} key={item.label} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          ))}
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-service">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
