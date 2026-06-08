// Shared lead-submission helper used by every form on the site.
//
// Set NEXT_PUBLIC_LEAD_WEBHOOK (or the existing NEXT_PUBLIC_REGISTRATION_WEBHOOK)
// to a URL that accepts a JSON POST — e.g. a Zapier/Make catch hook, a HubSpot
// forms endpoint, or your own API route. Every form then delivers its lead there.
//
// With no webhook configured it resolves successfully but does NOT deliver
// (delivered:false), so the UI success state still works in development.

export async function submitLead(formName, payload) {
  const webhook =
    process.env.NEXT_PUBLIC_LEAD_WEBHOOK ||
    process.env.NEXT_PUBLIC_REGISTRATION_WEBHOOK ||
    "";

  const body = {
    form: formName,
    submittedAt: new Date().toISOString(),
    pageUrl: typeof window !== "undefined" ? window.location.href : "",
    ...payload,
  };

  if (!webhook) {
    if (typeof console !== "undefined") {
      console.info(`[lead:${formName}] captured (no webhook configured yet)`, body);
    }
    await new Promise((r) => setTimeout(r, 500));
    return { ok: true, delivered: false };
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return { ok: true, delivered: true };
  } catch (error) {
    return { ok: false, delivered: false, error: String(error) };
  }
}
