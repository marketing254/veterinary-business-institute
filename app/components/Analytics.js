"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_KEY, CONSENT_EVENT } from "../lib/analytics";

// GA4 Measurement ID — env override, else the hardcoded site ID (it's public,
// it ships in the page JS anyway). This makes GA work regardless of build vars.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-LX4WGYS9SS";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";
const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID || "";
const isReal = (id) => Boolean(id) && !id.includes("XXX");

/**
 * GA4 via Google Consent Mode v2: the tag loads on every page (so Google/Tag
 * Assistant detect it and the wizard verifies), but analytics + ad storage
 * default to "denied" until the visitor accepts the cookie banner — at which
 * point we send a consent "update". GTM/Hotjar stay fully gated behind consent.
 */
export default function Analytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const read = () => {
      let granted = false;
      try {
        const v = localStorage.getItem(CONSENT_KEY);
        granted = v === "accepted" || v === "true";
      } catch {
        granted = false;
      }
      setConsented(granted);
      // Reflect the choice in Google Consent Mode (gtag is always loaded below).
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("consent", "update", {
          analytics_storage: granted ? "granted" : "denied",
          ad_storage: granted ? "granted" : "denied",
          ad_user_data: granted ? "granted" : "denied",
          ad_personalization: granted ? "granted" : "denied",
        });
      }
    };
    read();
    window.addEventListener(CONSENT_EVENT, read);
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener(CONSENT_EVENT, read);
      window.removeEventListener("storage", read);
    };
  }, []);

  return (
    <>
      {/* GA4 — loaded for everyone (detectable), gated by Consent Mode */}
      {isReal(GA_ID) && (
        <>
          <Script id="ga-consent-default" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
gtag('js',new Date());`}
          </Script>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`gtag('config','${GA_ID}',{page_path:window.location.pathname});`}
          </Script>
        </>
      )}

      {/* GTM — only after the visitor accepts */}
      {consented && isReal(GTM_ID) && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      )}

      {/* Hotjar — only after the visitor accepts */}
      {consented && isReal(HOTJAR_ID) && (
        <Script id="hotjar-init" strategy="afterInteractive">
          {`(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:${HOTJAR_ID},hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
        </Script>
      )}
    </>
  );
}
