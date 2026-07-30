#!/usr/bin/env python3
"""
Submit URLs to Bing (and every other IndexNow engine, e.g. Yandex) from the
terminal via the IndexNow protocol. Uses the key file already hosted on the site
(public/d8de72be4f2b574a88983c4c9d57ed6d.txt), so no Bing API signup is needed.

Requires only the Python standard library — run it with plain `python`.

Usage:
  python index.py                     # submit the built-in replay + hub URLs
  python index.py URL [URL ...]       # submit one or more specific URLs
  python index.py --sitemap           # submit EVERY URL in the live sitemap.xml
  python index.py --file urls.txt     # submit URLs from a file (one per line)

Notes:
  • Every URL must be on HOST below, or IndexNow rejects the batch (422).
  • The key file must be live at KEY_LOCATION before you run this.
  • 200/202 = accepted. 403 = key not found. 422 = host/key mismatch. 429 = slow down.
"""

import json
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET

HOST = "www.veterinarybusinessinstitute.com"
KEY = "d8de72be4f2b574a88983c4c9d57ed6d"
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"
ENDPOINT = "https://www.bing.com/indexnow"  # Bing; api.indexnow.org fans out to all engines
SITEMAP = f"https://{HOST}/sitemap.xml"

# `python index.py` with no args submits these (the new replay hubs + detail pages).
DEFAULT_URLS = [
    f"https://{HOST}/webinar-replays",
    f"https://{HOST}/webinar-replays/the-resurgence-of-independent-veterinary-practice-balancing-autonomy",
    f"https://{HOST}/webinar-replays/the-culture-multiplier-how-people-and-profits-together-define-true",
    f"https://{HOST}/webinar-replays/strengthening-modern-veterinary-clinics-through-culture-communication",
    f"https://{HOST}/webinar-replays/elevating-veterinary-practice-performance-through-marketing-technology",
    f"https://{HOST}/webinar-replays/driving-veterinary-practice-profitability-and-client-loyalty-through",
    f"https://{HOST}/webinar-replays/driving-veterinary-practice-growth-leveraging-technology-marketing",
    f"https://{HOST}/webinar-replays/profitability-gets-tight-fast-when-veterinary-pricing-outruns-pet-owner",
    f"https://{HOST}/summit-replays",
    f"https://{HOST}/summit-replays/vet-evolution-shaping-the-future-with-innovation-empathy-and-growth",
    f"https://{HOST}/summit-replays/uniting-technology-talent-and-compassion-to-shape-the-next-generation",
    f"https://{HOST}/summit-replays/what-the-future-demands-of-veterinary-practices-across-compliance",
    f"https://{HOST}/summit-replays/six-forces-shaping-the-next-decade-of-veterinary-business-law-marketing",
    f"https://{HOST}/summit-replays/the-biggest-challenges-facing-veterinary-practice-owners-today-are-you",
    f"https://{HOST}/summit-replays/shaping-future-ready-veterinary-practices-through-strategic-planning",
    f"https://{HOST}/summit-replays/why-hard-working-veterinary-practices-still-struggle-fixing-finances",
]


def from_sitemap(url=SITEMAP):
    """Pull every <loc> URL out of the live sitemap.xml."""
    req = urllib.request.Request(url, headers={"User-Agent": "indexnow-submitter"})
    with urllib.request.urlopen(req, timeout=30) as r:
        xml = r.read()
    root = ET.fromstring(xml)
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    locs = [el.text.strip() for el in root.findall(".//sm:loc", ns) if el.text]
    if not locs:  # fall back to namespace-agnostic parse
        locs = [el.text.strip() for el in root.iter() if el.tag.endswith("loc") and el.text]
    return locs


def from_file(path):
    with open(path, encoding="utf-8") as f:
        return [ln.strip() for ln in f if ln.strip() and not ln.lstrip().startswith("#")]


def explain(code):
    return {
        400: "Bad request — invalid JSON or format.",
        403: "Forbidden — key not found/invalid. Confirm the key file is live at KEY_LOCATION.",
        422: "Unprocessable — a URL doesn't match HOST, or the key doesn't match.",
        429: "Too many requests — wait and retry.",
    }.get(code, "")


def submit(urls):
    urls = [u for u in dict.fromkeys(urls) if u.startswith(f"https://{HOST}")]  # dedupe + host filter
    if not urls:
        print(f"No valid URLs for host {HOST}. Nothing to submit.")
        return 1

    payload = {"host": HOST, "key": KEY, "keyLocation": KEY_LOCATION, "urlList": urls}
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        ENDPOINT, data=data, method="POST",
        headers={"Content-Type": "application/json; charset=utf-8"},
    )

    print(f"Submitting {len(urls)} URL(s) to {ENDPOINT}\n")
    for u in urls:
        print("  -", u)

    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            body = resp.read().decode("utf-8", "replace").strip()
            print(f"\nHTTP {resp.status} {resp.reason}")
            if body:
                print(body)
            print("\n✓ Accepted by IndexNow." if resp.status in (200, 202)
                  else "\nUnexpected status — review above.")
            return 0
    except urllib.error.HTTPError as e:
        print(f"\nHTTP {e.code} {e.reason}")
        detail = e.read().decode("utf-8", "replace").strip()
        if detail:
            print(detail)
        hint = explain(e.code)
        if hint:
            print("→", hint)
        return 1
    except Exception as e:  # network / DNS / timeout
        print("\nRequest failed:", e)
        return 1


def main():
    args = sys.argv[1:]
    if not args:
        urls = DEFAULT_URLS
    elif args[0] == "--sitemap":
        urls = from_sitemap()
    elif args[0] == "--file":
        if len(args) < 2:
            print("Usage: python index.py --file urls.txt")
            return 1
        urls = from_file(args[1])
    else:
        urls = args
    return submit(urls)


if __name__ == "__main__":
    raise SystemExit(main())
