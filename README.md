# National Dispatching — Next.js site

Next.js 16 (App Router) + Tailwind v4 site whose layouts follow the hellogravel.com template, with copy, links and
images from nationaldispatching.com. Everything it needs (code, data, images) lives in this folder.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Pages

| Route | What it is |
|---|---|
| `/` | Homepage |
| `/equipment`, `/equipment/[category]` | All equipment and the 9 categories (reference "Our Materials" listing) |
| `/products/[slug]` | 89 product pages (reference product page) |
| `/services/[slug]` | Rentals, Materials, Trucking, Subcontracting, Procurement & Dispatching (reference "For Contractors" layout) |
| `/about-us`, `/locations`, `/contact-us` | Reference About, Locations and Contact layouts |
| `/blog`, `/blog/page/[n]`, `/blog/[slug]` | 134 articles (reference guides index and article) |
| `/search?q=` | Site search over equipment, categories, services and articles |
| `/cart`, `/checkout` | Full cart and checkout; the mini cart drawer opens from the header |

## Cart

The cart lives in the visitor's browser (`localStorage`, `lib/cart.ts`). Checkout opens the visitor's email app with the
order addressed to dispatch@nationaldispatching.com; there is no payment or order backend.

## Content

- `lib/data/catalog.json`, `blog.json`, `services.json` — scraped data (rates, overviews, articles, service cards).
- `lib/content.ts` — contact details, menus, reviews, FAQ, states; reads the catalog.
- `lib/products.ts` — product-page copy per lift type and per category, REP®, FAQ.
- `lib/pages.ts` — Procurement and About page copy.
- `public/images/` — images downloaded from nationaldispatching.com (`catalog/`, `blog/`, `services/`, `about/`).

Refresh scraped content (prices, new products, new posts):

```bash
python scripts/scrape_catalog.py . .cache/nd
python scripts/scrape_site.py . .cache/nd
```

Logins and the per-state location pages link out to the live site.
