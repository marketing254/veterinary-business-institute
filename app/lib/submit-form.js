"use client";

import { APPS_SCRIPT_URL } from "./sheets-config";

/**
 * POST a form payload to the VET Apps Script web-app.
 *
 * Uses mode:"no-cors" + text/plain to avoid a CORS preflight (Apps Script
 * doesn't send CORS headers) — the request still reaches the script and the row
 * is written; we just can't read the response body, so we treat a resolved
 * fetch as success. Mirrors the DL/RIDA gate-form submit pattern.
 */
export async function submitForm(payload) {
  const body = JSON.stringify({ ...payload, submittedAt: new Date().toISOString() });
  await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body,
  });
  return true;
}
