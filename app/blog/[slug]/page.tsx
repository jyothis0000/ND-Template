/* eslint-disable @next/next/no-img-element -- static assets, sizes are fixed by the design */
import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/Blocks";
import { PostCard } from "@/components/BlogIndex";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getPost, posts, related } from "@/lib/blog";
import { allEquipment, contact } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const instant = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPost((await params).slug);
  return p ? { title: `${p.title} | National Dispatching`, description: p.excerpt } : {};
}

const prose =
  "prose prose-lg mx-auto max-w-[800px] px-5 md:px-8 prose-headings:font-display prose-headings:text-bedrock prose-a:text-brand-ink prose-a:no-underline hover:prose-a:underline prose-strong:text-bedrock prose-blockquote:border-l-brand prose-blockquote:bg-chalk prose-blockquote:not-italic prose-blockquote:py-1 prose-blockquote:font-normal prose-img:rounded-xl prose-table:border-collapse prose-th:border prose-th:border-seam prose-th:bg-chalk prose-th:p-3 prose-td:border prose-td:border-seam prose-td:p-3";

// The reference guide article: chalk header, overlapping hero image, CTA panel, prose body.
export default async function PostPage({ params }: Props) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const more = related(p);

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <article className="bg-white">
          <div className="bg-chalk py-12 md:py-20">
            <div className="mx-auto max-w-[800px] px-5 md:px-8">
              <nav className="mb-6 text-sm text-shale" aria-label="Breadcrumb">
                <NextLink href="/blog" className="transition-colors hover:text-brand-ink">
                  Blog
                </NextLink>
                {p.category && (
                  <>
                    <span className="mx-2">/</span>
                    <a href={`/search?q=${encodeURIComponent(p.category)}`} className="transition-colors hover:text-brand-ink">
                      {p.category}
                    </a>
                  </>
                )}
                <span className="mx-2">/</span>
                <span className="text-bedrock font-medium">{p.title}</span>
              </nav>
              <div className="flex flex-wrap items-center gap-3 text-sm text-clay">
                <span>{p.date}</span>
                <span>&middot;</span>
                <span>{p.minutes} min read</span>
              </div>
              <h1 className="mt-4 text-bedrock">{p.title}</h1>
              <div className="mt-4 flex items-center gap-2 text-sm text-shale">
                <img src="/icon.png" alt="" aria-hidden="true" className="h-7 w-7 rounded-full border border-seam bg-white" />
                <span>
                  By <span className="font-medium text-bedrock">National Dispatching</span>
                </span>
              </div>
              {p.category && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="whitespace-nowrap rounded-full bg-brand/20 px-3 py-1 text-xs font-semibold text-brand-ink">{p.category}</span>
                </div>
              )}
            </div>
          </div>
          {p.image && (
            <div className="mx-auto max-w-[900px] px-5 md:px-8">
              <img
                src={p.image}
                width={900}
                height={506}
                alt={p.title}
                className="mt-[-2rem] aspect-[16/9] w-full rounded-xl object-cover shadow-[0_4px_16px_rgba(0,0,0,0.08)] md:mt-[-3rem]"
              />
            </div>
          )}
          <div className="mt-8 md:mt-10">
            <div className="mx-auto max-w-[800px] px-5 md:px-8">
              <div className="rounded-xl border border-seam bg-white p-5 shadow-[0_4px_16px_rgba(27,27,27,0.06)] md:p-6">
                <h2 className="font-display text-xl font-bold leading-tight text-bedrock md:text-2xl">Need equipment or materials for this job?</h2>
                <p className="mt-2 text-sm leading-5 text-shale">Browse rentals with published day, week and month rates, or tell dispatch what you need.</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <a
                    href={allEquipment.href}
                    className="inline-flex min-h-12 items-center justify-center rounded-lg bg-brand px-5 text-center font-display text-base font-bold leading-snug text-bedrock transition hover:bg-brand-hover"
                  >
                    Browse equipment
                  </a>
                  <a
                    href={contact.tel}
                    className="inline-flex min-h-12 items-center justify-center rounded-lg border border-seam px-5 text-center font-display text-base font-bold leading-snug text-bedrock transition hover:bg-chalk"
                  >
                    Call {contact.phone}
                  </a>
                </div>
              </div>
            </div>
            {/* scraped HTML; the browser re-normalizes it (e.g. adds <tbody>), so skip the hydration diff */}
            <div className={`${prose} py-10`} dangerouslySetInnerHTML={{ __html: p.html }} suppressHydrationWarning />
          </div>
        </article>
        {more.length > 0 && (
          <section className="bg-chalk py-12 md:py-20">
            <div className="mx-auto max-w-[1280px] px-5 md:px-8">
              <h2 className="mb-8 font-display text-2xl font-bold text-bedrock md:text-3xl">Keep reading</h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {more.map((m) => (
                  <PostCard key={m.slug} p={m} />
                ))}
              </div>
            </div>
          </section>
        )}
        <CtaBand
          title="Ready to start your project?"
          body="One call covers rentals, materials, trucking and site services."
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
