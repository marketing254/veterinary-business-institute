// IndexNow submitter — notifies Bing, Yandex, Naver, Seznam (NOT Google) about
// your pages so they re-crawl fast. Run after a deploy:
//
//   node scripts/indexnow-submit.mjs
//
// It reads the live sitemap.xml, extracts every URL, and POSTs the list to the
// IndexNow API. Requires Node 18+ (global fetch). Google does not use IndexNow —
// for Google, submit the sitemap in Search Console (see the setup guide).

const HOST = process.env.INDEXNOW_HOST || "www.veterinarybusinessinstitute.com";
const KEY = process.env.INDEXNOW_KEY || "d8de72be4f2b574a88983c4c9d57ed6d";
const ORIGIN = `https://${HOST}`;
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;

async function getSitemapUrls() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) throw new Error(`Could not fetch sitemap.xml (HTTP ${res.status})`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function main() {
  const urlList = await getSitemapUrls();
  if (urlList.length === 0) throw new Error("No URLs found in sitemap.xml");
  console.log(`Submitting ${urlList.length} URLs to IndexNow for ${HOST}…`);

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });

  // IndexNow returns 200 (accepted) or 202 (accepted, pending validation).
  console.log(`IndexNow responded: HTTP ${res.status} ${res.statusText}`);
  if (res.status !== 200 && res.status !== 202) {
    console.error(await res.text());
    process.exit(1);
  }
  console.log("Done. Bing/Yandex will recrawl the submitted URLs.");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
