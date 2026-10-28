"""Scrape nationaldispatching.com equipment catalog -> lib/data/catalog.json + public/images/catalog/*."""
import html as H
import json
import os
import re
import sys
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor

sys.stdout.reconfigure(encoding="utf-8")
ROOT = sys.argv[1]  # project dir
CACHE = sys.argv[2]  # cache dir for raw html
IMG_DIR = os.path.join(ROOT, "public", "images", "catalog")
os.makedirs(IMG_DIR, exist_ok=True)
os.makedirs(CACHE, exist_ok=True)
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130.0 Safari/537.36"}
BASE = "https://nationaldispatching.com"


def get(url, name=None):
    path = os.path.join(CACHE, name) if name else None
    if path and os.path.exists(path):
        return open(path, encoding="utf-8").read()
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
        s = r.read().decode("utf-8", "replace")
    if path:
        open(path, "w", encoding="utf-8").write(s)
    return s


def download(url, dest):
    if os.path.exists(dest):
        return
    url = urllib.parse.quote(url, safe=":/?=&%")
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
        open(dest, "wb").write(r.read())


def text(fragment):
    return re.sub(r"\s+", " ", H.unescape(re.sub(r"<[^>]+>", " ", fragment))).strip()


strip = lambda s: re.sub(r"<script.*?</script>|<style.*?</style>", "", s, flags=re.S)

# --- categories from the sidebar filter on any category page
seed = strip(get(f"{BASE}/equipment/compaction/", "cat_compaction.html"))
cats = []
for slug, label in re.findall(r'href="https://nationaldispatching\.com/equipment/([a-z0-9-]+)/"[^>]*>\s*([^<(]+?)\s*(?:<|\()', seed):
    if slug not in [c["slug"] for c in cats] and label.strip() and not label.strip().startswith("—"):
        cats.append({"slug": slug, "label": H.unescape(label.strip())})
# sidebar lists children too; keep only top-level categories (they have >0 products and appear in nav order)
print("candidate categories", [c["slug"] for c in cats])

products, order = {}, []
for c in cats:
    s = strip(get(f"{BASE}/equipment/{c['slug']}/", f"cat_{c['slug']}.html"))
    t = re.sub(r"\n\s*\n+", "\n", re.sub(r"[ \t]+", " ", H.unescape(re.sub(r"<[^>]+>", "\n", s))))
    m = re.search(r"Apply Filters\n(.*?)\n(.*?)(?:\nSort by|\nShowing|\n\d+ ft|\n[A-Z0-9][^\n]{0,60}\nDay\n)", t, flags=re.S)
    c["title"] = m.group(1).strip() if m else f"{c['label']} Rentals"
    intro = re.search(r"Apply Filters\n[^\n]*\n(.*?)(?=\n[^\n]{0,80}\n(?:Day|View Details))", t, flags=re.S)
    c["intro"] = [p.strip() for p in (intro.group(1).split("\n") if intro else []) if len(p.strip()) > 60][:3]
    c["products"] = []
    for card in re.split(r'<div class="c-vehicle__thumb-wrap">', s)[1:]:
        link = re.search(r'/product/([^/"?]+)/', card)
        name = re.search(r'c-vehicle__title-inner">\s*(.*?)\s*</span>', card, flags=re.S)
        if not link or not name:
            continue
        nd_slug = link.group(1)
        prices = dict(re.findall(r'cu_price_time">\s*(Day|Week|Month)\s*<span.*?</span>([\d,.]+)</bdi>', card, flags=re.S))
        thumb = re.search(r'data-src="([^"]+)"', card)
        c["products"].append(nd_slug)
        if nd_slug not in products:
            products[nd_slug] = {
                "ndSlug": nd_slug,
                "label": text(name.group(1)),
                "category": c["slug"],
                "day": f"${prices['Day']}" if "Day" in prices else "",
                "week": f"${prices['Week']}" if "Week" in prices else "",
                "month": f"${prices['Month']}" if "Month" in prices else "",
                "thumb": thumb.group(1) if thumb else "",
            }
            order.append(nd_slug)
    c["count"] = len(c["products"])
    print(c["slug"], c["count"], c["title"])

cats = [c for c in cats if c["count"]]


def product_page(nd_slug):
    p = products[nd_slug]
    s = get(f"{BASE}/product/{nd_slug}/", f"prod_{nd_slug}.html")
    og = re.search(r'<meta property="og:image" content="([^"]+)"', s)
    t = re.sub(r"\n\s*\n+", "\n", re.sub(r"[ \t]+", " ", H.unescape(re.sub(r"<[^>]+>", "\n", strip(s)))))
    ov = re.search(r"Overview\n(.*?)\nNeed help getting", t, flags=re.S)
    p["overview"] = re.sub(r"\s+", " ", ov.group(1)).strip() if ov else ""
    src = og.group(1) if og else p["thumb"]
    ext = os.path.splitext(src.split("?")[0])[1] or ".webp"
    slug = nd_slug.replace("articulationg", "articulating")
    p["slug"] = slug
    p["image"] = f"/images/catalog/{slug}{ext}"
    download(src, os.path.join(IMG_DIR, f"{slug}{ext}"))
    return nd_slug


with ThreadPoolExecutor(8) as ex:
    list(ex.map(product_page, order))

out = {
    "categories": [{k: c[k] for k in ("slug", "label", "title", "intro", "count")} for c in cats],
    "products": [{k: products[s][k] for k in ("slug", "ndSlug", "label", "category", "overview", "day", "week", "month", "image")} for s in order],
}
os.makedirs(os.path.join(ROOT, "lib", "data"), exist_ok=True)
json.dump(out, open(os.path.join(ROOT, "lib", "data", "catalog.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("categories", len(out["categories"]), "products", len(out["products"]))
print("missing overview", [p["slug"] for p in out["products"] if not p["overview"]])
print("missing rates", [p["slug"] for p in out["products"] if not p["day"]])
