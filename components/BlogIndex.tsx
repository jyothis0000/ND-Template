/* eslint-disable @next/next/no-img-element -- static assets, sizes are fixed by the design */
import NextLink from "next/link";
import { pageCount, pageOf, postCategories, type Post } from "@/lib/blog";
import { contact } from "@/lib/content";
import { CtaBand } from "./Blocks";
import Footer from "./Footer";
import Header from "./Header";
import { Ph, ph } from "./icons";

// Reference guide card.
export function PostCard({ p }: { p: Post }) {
  return (
    <article className="hgc">
      <a href={`/blog/${p.slug}`} className="hgc__link" aria-label={p.title}>
        {p.title}
      </a>
      <div className="hgc__media">
        {p.image && <img src={p.image} width={400} height={250} alt={p.title} loading="lazy" className="hgc__img" />}
        <span className="hgc__edge" aria-hidden="true" />
      </div>
      <div className="hgc__body">
        <div className="hgc__meta">
          <span className="hgc__date">{p.date}</span>
          <span className="hgc__rule" aria-hidden="true" />
          <span>{p.minutes} min</span>
        </div>
        {p.category && <span className="hgc__category">{p.category}</span>}
        <h3 className="hgc__title">{p.title}</h3>
        <p className="hgc__excerpt">{p.excerpt}</p>
        <div className="hgc__foot">
          <span className="hgc__author">
            <img src="/icon.png" alt="" aria-hidden="true" className="h-6 w-6 shrink-0 rounded-full border border-seam bg-white" />
            <span>National Dispatching</span>
          </span>
          <span className="hgc__cta" aria-hidden="true">
            <span className="hgc__cta-text">Read</span>
            <Ph d={ph.caret} size={12} />
          </span>
        </div>
      </div>
    </article>
  );
}

export const searchInput =
  "w-full rounded-lg border border-seam bg-white py-3 pl-10 pr-4 text-bedrock placeholder:text-clay focus:border-brand-ink focus:outline-none focus:ring-2 focus:ring-brand/30";

export function SearchBox({ placeholder, defaultValue }: { placeholder: string; defaultValue?: string }) {
  return (
    <form action="/search" method="get" role="search" className="relative mt-6 max-w-xl">
      <Ph d={ph.search} className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-clay" />
      <input type="search" name="q" defaultValue={defaultValue} placeholder={placeholder} aria-label={placeholder} className={searchInput} />
    </form>
  );
}

// The reference "Project Guides" index, paginated 12 per page.
export default function BlogIndex({ page }: { page: number }) {
  const items = pageOf(page);
  const pageHref = (n: number) => (n === 1 ? "/blog" : `/blog/page/${n}`);
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <section className="bg-chalk py-12 md:py-20">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <p className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-brand-ink">Blog</p>
            <h1 className="text-bedrock">Construction Insights</h1>
            <p className="mt-4 max-w-2xl text-lg text-shale">
              Equipment guides, material ordering tips and procurement know-how from the National Dispatching team.
            </p>
            <SearchBox placeholder="Search articles and equipment…" />
            <div className="mt-6 flex flex-wrap gap-2">
              {postCategories.map(([c, n]) => (
                <a
                  key={c}
                  href={`/search?q=${encodeURIComponent(c)}`}
                  className="rounded-full border border-seam bg-white px-3 py-1.5 text-xs font-semibold text-bedrock transition-colors hover:border-brand-ink hover:text-brand-ink"
                >
                  {c} <span className="font-normal text-clay">({n})</span>
                </a>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-white py-12 md:py-20">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <PostCard key={p.slug} p={p} />
              ))}
            </div>
            <nav className="mt-12 flex items-center justify-center gap-4" aria-label="Blog pagination">
              {page > 1 ? (
                <NextLink href={pageHref(page - 1)} className="rounded-lg border border-seam bg-white px-4 py-2 font-display font-bold text-bedrock transition-colors hover:border-brand-ink hover:text-brand-ink">
                  &larr; Previous
                </NextLink>
              ) : (
                <span className="rounded-lg border border-seam bg-chalk px-4 py-2 font-display font-bold text-clay">&larr; Previous</span>
              )}
              <span className="font-mono text-sm text-shale">
                Page {page} of {pageCount}
              </span>
              {page < pageCount ? (
                <NextLink href={pageHref(page + 1)} className="rounded-lg border border-seam bg-white px-4 py-2 font-display font-bold text-bedrock transition-colors hover:border-brand-ink hover:text-brand-ink">
                  Next &rarr;
                </NextLink>
              ) : (
                <span className="rounded-lg border border-seam bg-chalk px-4 py-2 font-display font-bold text-clay">Next &rarr;</span>
              )}
            </nav>
          </div>
        </section>
        <CtaBand
          title="Ready to start your project?"
          body="Browse our rental equipment, or tell us what the job needs and we'll source it."
          cta={[
            { label: "Browse Equipment", href: "/equipment" },
            { label: "Request a Quote", href: contact.quoteHref },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
