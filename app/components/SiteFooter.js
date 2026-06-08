import Link from "next/link";
import { withBasePath } from "../lib/base-path";
import {
  contactAddress,
  contactDetails,
  footerExploreLinks,
  footerResourceLinks,
  socialLinks,
  topBarItems,
} from "../lib/site-data";
import TrustBadges from "./TrustBadges";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-cta-band">
        <span className="footer-cta-eyebrow">Stay Connected</span>
        <h2 className="footer-cta-heading">
          Your next step starts here.
        </h2>
        <p className="footer-cta-sub">
          Explore the latest podcast, catch up on event panels, or book your
          free marketing strategy session.
        </p>
        <div className="footer-cta-buttons">
          <a className="footer-cta-btn footer-cta-btn-primary" href={topBarItems[0].href} target="_blank" rel="noreferrer">
            <span className="footer-cta-btn-icon">&#9654;</span>
            Latest Podcast
          </a>
          <a className="footer-cta-btn" href={topBarItems[1].href} target="_blank" rel="noreferrer">
            Latest Event Panel
          </a>
          <Link className="footer-cta-btn" href="/consultation">
            Free Strategy Call
          </Link>
        </div>
      </div>

      <div className="container footer-grid">
        <div className="footer-brand">
          <img src={withBasePath("/assets/logo-white.svg")} alt="Veterinary Business Institute" />
          <p>
            Veterinary Business Institute is a resource hub for veterinarians focused on business
            growth, leadership, operations, culture, client experience, and digital visibility.
          </p>
          <TrustBadges />
        </div>

        <div>
          <h3>Contact</h3>
          <ul className="footer-list">
            {contactDetails.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
            <li>{contactAddress}</li>
          </ul>
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
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>Copyright {year} Veterinary Business Institute. All rights reserved.</span>
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
