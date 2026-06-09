// Shared lead-submission helper used by every form on the site.
//
// By default every form POSTs to the VET Apps Script /exec (APPS_SCRIPT_URL),
// which writes the lead to the matching tab on the Google Sheet. You can override
// with NEXT_PUBLIC_LEAD_WEBHOOK (or NEXT_PUBLIC_REGISTRATION_WEBHOOK) to send
// leads to a Zapier/Make hook or your own endpoint instead.
//
// Apps Script web apps don't send CORS headers for POST, so we use mode:"no-cors"
// + text/plain (a "simple" request, no preflight). The row is still written; we
// just can't read the response, so a resolved fetch is treated as delivered.

import { APPS_SCRIPT_URL } from "./sheets-config";

function target() {
  if (process.env.NEXT_PUBLIC_LEAD_WEBHOOK) return process.env.NEXT_PUBLIC_LEAD_WEBHOOK;
  if (process.env.NEXT_PUBLIC_REGISTRATION_WEBHOOK) return process.env.NEXT_PUBLIC_REGISTRATION_WEBHOOK;
  if (APPS_SCRIPT_URL && !/PASTE_VET_EXEC_ID/.test(APPS_SCRIPT_URL)) return APPS_SCRIPT_URL;
  return "";
}

export async function submitLead(formName, payload) {
  const body = {
    form: formName,
    submittedAt: new Date().toISOString(),
    pageUrl: typeof window !== "undefined" ? window.location.href : "",
    ...payload,
  };

  const url = target();
  if (!url) {
    if (typeof console !== "undefined") {
      console.info(`[lead:${formName}] captured (no endpoint configured)`, body);
    }
    await new Promise((r) => setTimeout(r, 400));
    return { ok: true, delivered: false };
  }

  try {
    await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(body),
    });
    return { ok: true, delivered: true };
  } catch (error) {
    return { ok: false, delivered: false, error: String(error) };
  }
}
