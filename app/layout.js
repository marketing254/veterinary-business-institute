import { Cormorant_Garamond, IBM_Plex_Mono, Manrope } from "next/font/google";
import { basePath } from "./lib/base-path";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import CookieBanner from "./components/CookieBanner";
import Analytics from "./components/Analytics";
import ExitIntentPopup from "./components/ExitIntentPopup";
import ChatWidget from "./components/ChatWidget";
import WhatsNewBanner from "./components/WhatsNewBanner";
import BackToTop from "./components/BackToTop";
import {
  contactAddress,
  contactDetails,
  marketingPageLink,
  panelFolderLink,
  podcastHubLink,
  socialLinks,
  webinarArchiveLink,
} from "./lib/site-data";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["500", "600"],
});

const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://www.veterinarybusinessinstitute.com";
const siteUrl = `${siteOrigin}${basePath}`;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Veterinary Business Institute",
  url: siteUrl,
  logo: `${siteUrl}/assets/logo.svg`,
  email: "team@veterinarybusinessinstitute.com",
  telephone: contactDetails[0]?.label,
  address: {
    "@type": "PostalAddress",
    streetAddress: contactAddress,
  },
  sameAs: socialLinks.map((item) => item.href),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Veterinary Business Institute",
  url: siteUrl,
  description:
    "Veterinary leadership education, podcast episodes, event panel replays, webinar archives, and growth strategy support.",
  hasPart: [podcastHubLink, panelFolderLink, webinarArchiveLink, marketingPageLink],
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Veterinary Business Institute | Practice Growth, Leadership, and Education",
  description:
    "Veterinary Business Institute helps veterinary leaders grow through podcasts, webinar replays, marketing guidance, and practical business education.",
  openGraph: {
    title: "Veterinary Business Institute",
    description:
      "Veterinary leadership education, podcast episodes, event panel replays, webinar archives, and growth strategy support.",
    type: "website",
    url: siteUrl,
    siteName: "Veterinary Business Institute",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veterinary Business Institute",
    description:
      "Veterinary leadership education, podcast episodes, event panel replays, webinar archives, and growth strategy support.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Apply saved theme before first paint to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('vbi-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
        {/* Analytics (GA4 / GTM / Hotjar) load via <Analytics />, gated on cookie consent. */}
      </head>
      <body className={`${manrope.variable} ${cormorant.variable} ${plexMono.variable}`}>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <div className="site-shell">
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          />
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          />
          <SiteHeader />
          <main id="main-content" className="site-main">{children}</main>
          <SiteFooter />
          <CookieBanner />
          <Analytics />
          <ExitIntentPopup />
          <ChatWidget />
          <WhatsNewBanner />
          <BackToTop />
        </div>
      </body>
    </html>
  );
}
