/**
 * Build-time Vimeo thumbnail resolver.
 *
 * Google needs a crawlable image in the VideoObject `thumbnailUrl` to serve a
 * page as a video result. Google-Drive thumbnail URLs redirect and are often
 * not accepted, so we fetch Vimeo's own oEmbed thumbnail (an i.vimeocdn.com
 * image that Google crawls reliably). Hard-guarded so the build can never hang
 * or throw: aborts after `timeoutMs`, returns "" on any failure → caller falls
 * back to whatever image it already had.
 */
function vimeoId(url) {
  const m = String(url || "").match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  return m ? m[1] : "";
}

export async function fetchVimeoThumbnail(url, timeoutMs = 10000) {
  const id = vimeoId(url);
  if (!id) return "";
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const oembed = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(
      `https://vimeo.com/${id}`
    )}&width=1280`;
    const res = await fetch(oembed, { signal: controller.signal });
    if (!res.ok) return "";
    const data = await res.json();
    const thumb = data && typeof data.thumbnail_url === "string" ? data.thumbnail_url : "";
    // Only accept a real absolute image URL.
    return /^https?:\/\//.test(thumb) ? thumb : "";
  } catch (_) {
    return "";
  } finally {
    clearTimeout(timer);
  }
}
