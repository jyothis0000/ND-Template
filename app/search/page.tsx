import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductCard } from "@/components/Blocks";
import { PostCard, SearchBox } from "@/components/BlogIndex";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { posts } from "@/lib/blog";
import { allEquipment, allRentals, categories, categoryOf } from "@/lib/content";
import { servicePages } from "@/lib/pages";

export const metadata: Metadata = { title: "Search | National Dispatching" };

type Props = { searchParams: Promise<{ q?: string | string[] }> };

// ponytail: plain substring match on every word; swap for a search index if the catalog grows a lot.
const matches = (q: string[], ...fields: string[]) => {
  const hay = fields.join(" ").toLowerCase();
  return q.every((w) => hay.includes(w));
};

async function Results({ searchParams }: Props) {
  const raw = (await searchParams).q;
  const query = (Array.isArray(raw) ? raw[0] : raw ?? "").trim();
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const products = words.length ? allRentals.filter((r) => matches(words, r.label, r.overview, categoryOf(r).label)) : [];
  const pages = words.length
    ? [
        ...categories.filter((c) => matches(words, c.label, c.title, c.intro.join(" "))).map((c) => ({ label: c.title, href: c.href })),
        ...servicePages
          .filter((s) => matches(words, s.label, s.headline, s.sub, s.items.map((i) => `${i.title} ${i.body}`).join(" ")))
          .map((s) => ({ label: `${s.label} services`, href: `/services/${s.slug}` })),
      ]
    : [];
  const articles = words.length ? posts.filter((p) => matches(words, p.title, p.excerpt, p.category)).slice(0, 24) : [];
  const total = products.length + pages.length + articles.length;

  return (
    <>
      <section className="bg-chalk py-12 md:py-16">
        <div className="mx-auto max-w-[1280px] px-5 md:px-8">
          <p className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-brand-ink">Search</p>
          <h1 className="text-bedrock">{query ? `Results for “${query}”` : "Search National Dispatching"}</h1>
          {query && <p className="mt-4 text-lg text-shale">{total ? `${total} result${total === 1 ? "" : "s"}` : "No matches. Try another word, or browse all equipment."}</p>}
          <SearchBox placeholder="Search equipment, services and articles…" defaultValue={query} />
        </div>
      </section>
      {pages.length > 0 && (
        <section className="bg-white pt-12">
          <div className="mx-auto flex max-w-[1280px] flex-wrap gap-2 px-5 md:px-8">
            {pages.map((p) => (
              <a key={p.href} href={p.href} className="rounded-full border border-seam bg-white px-4 py-2 font-display text-sm font-semibold text-bedrock hover:border-bedrock">
                {p.label} →
              </a>
            ))}
          </div>
        </section>
      )}
      {products.length > 0 && (
        <section className="bg-white py-12">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <h2 className="mb-6 font-display text-2xl font-bold text-bedrock">Equipment</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((r) => (
                <ProductCard key={r.slug} r={r} />
              ))}
            </div>
          </div>
        </section>
      )}
      {articles.length > 0 && (
        <section className="bg-white py-12">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <h2 className="mb-6 font-display text-2xl font-bold text-bedrock">Articles</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((p) => (
                <PostCard key={p.slug} p={p} />
              ))}
            </div>
          </div>
        </section>
      )}
      {query && total === 0 && (
        <section className="bg-white py-12 text-center">
          <a href={allEquipment.href} className="inline-flex rounded-lg bg-brand px-7 py-3.5 font-display font-bold text-bedrock hover:bg-brand-hover">
            Browse all equipment
          </a>
        </section>
      )}
    </>
  );
}

export default function SearchPage(props: Props) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <Suspense fallback={<section className="bg-chalk py-12 md:py-16" aria-busy="true" />}>
          <Results {...props} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
