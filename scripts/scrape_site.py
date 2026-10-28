"""Scrape nationaldispatching.com blog + service pages -> lib/data/{blog,services}.json + public/images/{blog,services}/*."""
import hashlib
import html as H
import json
import os
import re
import sys
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor

sys.stdout.reconfigure(encoding="utf-8")
ROOT, CACHE = sys.argv[1], sys.argv[2]
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130.0 Safari/537.36"}
BASE = "https://nationaldispatching.com"
catalog = json.load(open(os.path.join(ROOT, "lib", "data", "catalog.json"), encoding="utf-8"))
product_slugs = {p["ndSlug"]: p["slug"] for p in catalog["products"]}
category_slugs = {c["slug"] for c in catalog["categories"]}
SERVICES = {
    "equipment-rental-fresno-ca": "rentals",
    "building-material-supplier-fresno-ca": "materials",
    "trucking-service-fresno-ca": "trucking",
    "subcontractors-fresno-ca": "subcontracting",
    "construction-procurement-dispatching-services": "procurement-dispatching",
}
PAGES = {"contact-us": "/contact-us", "about-us": "/about-us", "locations": "/locations", "blog": "/blog", "equipment-rentals": "/equipment", "cart": "/cart"}


def get(url, name):
    path = os.path.join(CACHE, name)
    if os.path.exists(path):
        return open(path, encoding="utf-8").read()
    with urllib.request.urlopen(urllib.request.Request(urllib.parse.quote(url, safe=":/?=&%"), headers=UA), timeout=60) as r:
        s = r.read().decode("utf-8", "replace")
    open(path, "w", encoding="utf-8").write(s)
    return s


def download(url, rel):
    dest = os.path.join(ROOT, "public", rel.lstrip("/"))
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    if not os.path.exists(dest):
        with urllib.request.urlopen(urllib.request.Request(urllib.parse.quote(url, safe=":/?=&%"), headers=UA), timeout=60) as r:
            open(dest, "wb").write(r.read())
    return rel


def text(fragment):
    return re.sub(r"\s+", " ", H.unescape(re.sub(r"<[^>]+>", " ", fragment))).strip()


def local_href(href, post_slugs):
    m = re.match(r"https?://(?:www\.)?nationaldispatching\.com(/[^?#]*)?([?#].*)?$", href)
    if not m:
        return href
    path = (m.group(1) or "/").strip("/")
    parts = path.split("/")
    if parts[0] == "product" and len(parts) > 1 and parts[1] in product_slugs:
        return f"/products/{product_slugs[parts[1]]}"
    if parts[0] == "equipment" and len(parts) > 1 and parts[1] in category_slugs:
        return f"/equipment/{parts[1]}"
    if parts[0] in SERVICES:
        return f"/services/{SERVICES[parts[0]]}"
    if parts[0] in PAGES:
        return PAGES[parts[0]]
    if len(parts) == 1 and parts[0] in post_slugs:
        return f"/blog/{parts[0]}"
    if path == "":
        return "/"
    return href


ALLOWED = {"p", "h2", "h3", "h4", "ul", "ol", "li", "strong", "em", "b", "i", "a", "table", "thead", "tbody", "tr", "th", "td", "blockquote", "br", "img", "figure", "figcaption"}


def sanitize(fragment, post_slugs, img_dir):
    fragment = re.sub(r"<script.*?</script>|<style.*?</style>|<noscript.*?</noscript>|<!--.*?-->", "", fragment, flags=re.S)
    # callout boxes -> blockquote, h1 inside body -> h2
    fragment = re.sub(r'<div[^>]*class="[^"]*nd-callout[^"]*"[^>]*>(.*?)</div>', r"<blockquote>\1</blockquote>", fragment, flags=re.S)
    fragment = re.sub(r"<(/?)h1\b", r"<\1h2", fragment)

    def tag(m):
        closing, name, attrs = m.group(1), m.group(2).lower(), m.group(3) or ""
        if name not in ALLOWED:
            return ""
        if closing:
            return f"</{name}>"
        if name == "a":
            href = re.search(r'href="([^"]+)"', attrs)
            if not href:
                return "<a>"
            h = local_href(H.unescape(href.group(1)), post_slugs)
            ext = ' target="_blank" rel="noopener noreferrer"' if h.startswith("http") else ""
            return f'<a href="{H.escape(h)}"{ext}>'
        if name == "img":
            src = re.search(r'(?:data-src|src)="(https?://[^"]+)"', attrs)
            if not src or "base64" in src.group(1):
                return ""
            url = src.group(1)
            alt = re.search(r'alt="([^"]*)"', attrs)
            ext = os.path.splitext(urllib.parse.urlparse(url).path)[1] or ".jpg"
            rel = download(url, f"/images/blog/i/{hashlib.md5(url.encode()).hexdigest()[:12]}{ext}") if "nationaldispatching.com" in url else url
            return f'<img src="{H.escape(rel)}" alt="{alt.group(1) if alt else ""}" loading="lazy">'
        if name in ("th", "td"):
            span = re.search(r'colspan="(\d+)"', attrs)
            return f'<{name}{f" colspan=\"{span.group(1)}\"" if span else ""}>'
        return f"<{name}>"

    out = re.sub(r"<(/?)([a-zA-Z0-9]+)([^>]*)>", tag, fragment)
    out = re.sub(r"<(p|li|h2|h3|h4|strong|em|a)>\s*</\1>", "", out)
    out = re.sub(r"\s+", " ", out)
    return out.strip()


# ---------------- blog
blog_html = get(f"{BASE}/blog/", "blog.html")
cards = re.split(r'<article id="post-\d+"', blog_html)[1:]
posts = []
for c in cards:
    link = re.search(r'c-post-grid__title"><a href="https://nationaldispatching\.com/([^/"]+)/">(.*?)</a>', c, flags=re.S)
    if not link:
        continue
    img = re.search(r'data-src="([^"]+)"', c)
    date = re.search(r"meta-item--date\">\s*([^<]+?)\s*</li>", c)
    exc = re.search(r'c-post-grid__excerpt">(.*?)</div>', c, flags=re.S)
    cats = re.findall(r"category-([a-z0-9-]+)", re.search(r'class="([^"]*)"', c).group(1))
    posts.append({
        "slug": link.group(1),
        "title": text(link.group(2)),
        "date": date.group(1).strip() if date else "",
        "excerpt": text(exc.group(1)).replace("…", "").rstrip(" .,") + "…" if exc else "",
        "thumb": img.group(1) if img else "",
        "categories": cats,
    })
post_slugs = {p["slug"] for p in posts}
print("posts", len(posts))


def fetch_post(p):
    s = get(f"{BASE}/{p['slug']}/", f"post_{p['slug']}.html")
    start = s.find('c-post__content entry-content')
    start = s.find(">", start) + 1
    ends = [i for i in (s.find(k, start) for k in ('class="c-post__tags', 'class="c-post__share', 'class="c-post__footer', 'class="c-post__nav', "</article>")) if i > 0]
    body = s[start:min(ends)] if ends else s[start:]
    section = re.search(r'<meta property="article:section" content="([^"]+)"', s)
    p["category"] = H.unescape(section.group(1)) if section else ""
    p["html"] = sanitize(body, post_slugs, p["slug"])
    if p["thumb"]:
        p["image"] = download(p["thumb"], f"/images/blog/{p['slug']}{os.path.splitext(urllib.parse.urlparse(p['thumb']).path)[1]}")
    else:
        p["image"] = ""
    words = len(text(p["html"]).split())
    p["minutes"] = max(1, round(words / 220))
    return p["slug"]


with ThreadPoolExecutor(8) as ex:
    list(ex.map(fetch_post, posts))
for p in posts:
    p.pop("thumb", None)
json.dump(posts, open(os.path.join(ROOT, "lib", "data", "blog.json"), "w", encoding="utf-8"), ensure_ascii=False)
print("blog empty bodies", [p["slug"] for p in posts if len(p["html"]) < 200])

# ---------------- card-style service pages
services = []
for nd, slug in SERVICES.items():
    s = get(f"{BASE}/{nd}/", f"svc_{slug}.html")
    s = re.sub(r"<script.*?</script>|<style.*?</style>|<svg.*?</svg>", "", s, flags=re.S)
    brochure = re.search(r'href="([^"]+\.pdf)"', s)
    seq = []
    for m in re.finditer(r"<(h[1-4]|p|img)\b([^>]*)>(.*?)(?=</\1>|<(?:h[1-4]|p|img)\b)", s, flags=re.S):
        if m.group(1) == "img":
            src = re.search(r'(?:data-src|src)="(https://nationaldispatching\.com/wp-content/uploads/[^"]+)"', m.group(2))
            if src and not re.search(r"logo|certificate|call\.png|icons8", src.group(1)):
                seq.append(("img", src.group(1)))
        else:
            t = text(m.group(3))
            if t:
                seq.append((m.group(1), t))
    try:
        i = next(k for k, (_, t) in enumerate(seq) if t == "+ Download PDF") + 1
    except StopIteration:
        i = 0
    end = next((k for k, (_, t) in enumerate(seq) if "Service territory" in t or "Equipment successfully" in t), len(seq))
    body = seq[i:end]
    entry = {"slug": slug, "ndHref": f"{BASE}/{nd}/", "brochure": brochure.group(1) if brochure else "", "raw": body}
    if slug != "procurement-dispatching":
        entry["headline"] = body[0][1] if body else ""
        entry["sub"] = body[1][1] if len(body) > 1 else ""
        items, k = [], 2
        while k < len(body):
            if body[k][0] == "img" and k + 2 < len(body) + 1:
                img = body[k][1]
                title = body[k + 1][1] if k + 1 < len(body) else ""
                desc = body[k + 2][1] if k + 2 < len(body) and body[k + 2][0] != "img" else ""
                fname = os.path.basename(urllib.parse.urlparse(img).path)
                items.append({"title": title, "body": desc, "image": download(img, f"/images/services/{fname}")})
                k += 3 if desc else 2
            else:
                k += 1
        seen, uniq = set(), []
        for it in items:
            if it["title"] not in seen:
                seen.add(it["title"])
                uniq.append(it)
        entry["items"] = uniq
        del entry["raw"]
    services.append(entry)
    print(slug, len(entry.get("items", [])), entry.get("headline", "")[:60])
json.dump(services, open(os.path.join(ROOT, "lib", "data", "services.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
