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
| `/`, `/home1` | Homepage (`/home1` is the same page, canonical to `/`) |
| `/home2`, `/home2/privacy` | Second homepage design (merged from the `national-dispatching-2` app) and its privacy page |
| `/equipment`, `/equipment/[category]` | All equipment and the 9 categories (reference "Our Materials" listing) |
| `/products/[slug]` | 89 product pages (reference product page) |
| `/services/[slug]` | Rentals, Materials, Trucking, Subcontracting, Procurement & Dispatching (reference "For Contractors" layout) |
| `/about-us`, `/locations`, `/contact-us` | Reference About, Locations and Contact layouts |
| `/blog`, `/blog/page/[n]`, `/blog/[slug]` | 134 articles (reference guides index and article) |
| `/search?q=` | Site search over equipment, categories, services and articles |
| `/cart`, `/checkout` | Full cart and checkout; the mini cart drawer opens from the header |

## Two homepage designs

`app/` holds two route groups, each with its own root layout, so their global styles never load together:

- `app/(site)/` — the original site: `/`, `/home1` and every inner page (Tailwind, `globals.css`, fonts in `fonts.ts`).
- `app/(home2)/` — `/home2` and `/home2/privacy` with their own stylesheet (`home2.css`), Poppins, header and footer.
  Code in `components/home2/` and `lib/home2/site.ts`, images in `public/images/home2/`.

Links between the two groups do a full page load. Unknown URLs render `app/global-not-found.tsx`.

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
