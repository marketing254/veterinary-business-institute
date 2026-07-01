// Browser-side Kit (ConvertKit) submission — additive to the primary Sheet write.
//
// IMPORTANT: this MUST run in the user's browser. Browser fetch() sends Origin +
// Referer, which Kit's anti-spam requires; a server-to-server POST returns
// 200/"success" but the subscriber is silently suppressed. It's fire-and-forget
// so a Kit outage never blocks the primary form flow.
//
// Numeric form IDs + exact field keys were extracted from each form's published
// JS bundle at businessofaesthetics.kit.com/<slug>/index.js (the dashboard slug
// is NOT the submission ID). Account: BOA (businessofaesthetics).

// Map each site formName → its Kit numeric id + { kitFieldKey: sitePayloadKey }.
// `email` is sent top-level as email_address; `timestamp` is added automatically.
const KIT_FORMS = {
  contact: {
    id: 9594110,
    fields: {
      first_name: "firstName",
      last_name: "lastName",
      phone: "phone",
      subject: "subject",
      message: "message",
      page_url: "pageUrl",
    },
  },
  community_join: {
    id: 9594094,
    fields: {
      first_name: "firstName",
      last_name: "lastName",
      role: "role",
      interest: "interest",
      page_url: "pageUrl",
    },
  },
  speaker_application: {
    id: 9594104,
    fields: {
      first_name: "firstName",
      last_name: "lastName",
      title: "title",
      organization: "organization",
      phone: "phone",
      applying_as: "applyingAs",
      topic: "topic",
      bio: "bio",
      website: "website",
      page_url: "pageUrl",
    },
  },
  resource_unlock: {
    id: 9594108,
    fields: {
      first_name: "firstName",
      last_name: "lastName",
      practice_name: "practice",
      role: "role",
      page_url: "pageUrl",
    },
  },
  resource_download: {
    id: 9594099,
    fields: {
      full_name: "name",
      practice_name: "practice",
      resource: "resource",
      page_url: "pageUrl",
    },
  },
  // Kit form exists ("Book a Marketing Meeting") but the site books via the YCBM
  // calendar embed, so nothing calls submitLead("marketing_meeting") yet. Kept
  // here so it's ready if a native booking form is added later.
  marketing_meeting: {
    id: 9594115,
    fields: {
      first_name: "firstName",
      last_name: "lastName",
      phone: "phone",
      website: "website",
      address: "address",
      booking_date: "bookingDate",
      booking_time: "bookingTime",
      timezone: "timezone",
      owner_or_partner: "ownerOrPartner",
      practice_stage: "practiceStage",
      how_did_you_hear_about_us: "howHeard",
      consent: "consent",
      page_url: "pageUrl",
    },
  },
};

/**
 * Fire the matching Kit subscription for a submitted form. No-op if the form has
 * no Kit mapping, if called outside the browser, or if the email is missing.
 */
export function postToKit(formName, params) {
  const form = KIT_FORMS[formName];
  if (!form || typeof window === "undefined" || !params) return;

  const email = String(params.email || "").trim();
  if (!email || !email.includes("@")) return;

  const body = new URLSearchParams();
  body.set("email_address", email);
  body.set("fields[timestamp]", new Date().toISOString());

  Object.entries(form.fields).forEach(([kitKey, paramKey]) => {
    const value = String(params[paramKey] ?? "").trim();
    if (value) body.set(`fields[${kitKey}]`, value);
  });

  try {
    // fire-and-forget: never await, never block the primary submission
    fetch(`https://app.kit.com/forms/${form.id}/subscriptions`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    }).catch(() => {});
  } catch (_) {
    /* ignore */
  }
}
