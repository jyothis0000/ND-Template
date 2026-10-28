import NextLink from "next/link";
import { allRentals, categories, contact, inCategory, rentals, type Category } from "@/lib/content";
import { CtaBand, ProductCard } from "./Blocks";
import Footer from "./Footer";
import Header from "./Header";

const chip =
  "font-display text-sm font-semibold px-4 py-2 rounded-full border-2 border-seam bg-white text-bedrock data-[active=true]:bg-bedrock data-[active=true]:text-chalk data-[active=true]:border-bedrock hover:border-bedrock transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink shrink-0 whitespace-nowrap";

// The reference "Our Materials" listing: category chips + product grid + dark CTA.
// Chips are links to real category pages instead of client-side filters.
export default function EquipmentListing({ category }: { category?: Category }) {
  const items = category ? inCategory(category.slug) : allRentals;
  const popular = new Set(rentals.slice(0, 6).map((r) => r.slug));
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <section className="bg-white pt-5 pb-12 md:pt-8 md:pb-16">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
              <h1 className="font-display text-2xl font-extrabold tracking-tight text-bedrock md:text-3xl">{category ? category.title : "Rental Equipment"}</h1>
            </div>
            {category?.intro[0] && <p className="mb-5 max-w-3xl text-base leading-relaxed text-shale">{category.intro[0]}</p>}
            <nav
              className="-mx-5 mb-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:mb-6 md:flex-wrap md:overflow-visible md:px-0 md:pb-0"
              aria-label="Filter equipment by category"
            >
              <NextLink href="/equipment" data-active={!category} aria-current={!category ? "page" : undefined} className={chip}>
                All<span className="font-mono text-xs opacity-70 ml-1.5">{allRentals.length}</span>
              </NextLink>
              {categories.map((c) => (
                <NextLink
                  key={c.slug}
                  href={c.href}
                  data-active={category?.slug === c.slug}
                  aria-current={category?.slug === c.slug ? "page" : undefined}
                  className={chip}
                >
                  {c.label}
                  <span className="font-mono text-xs opacity-70 ml-1.5">{c.count}</span>
                </NextLink>
              ))}
            </nav>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((r) => (
                <ProductCard key={r.slug} r={r} badge={popular.has(r.slug) ? "Most Popular" : undefined} />
              ))}
            </div>
          </div>
        </section>
        <CtaBand
          title="Not sure what you need?"
          body="Tell us about your project and our product specialists will match the right equipment, materials and trucking. One call."
          cta={[
            { label: "Get Your Free Quote", href: contact.quoteHref },
            { label: `Call ${contact.phone}`, href: contact.tel },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
