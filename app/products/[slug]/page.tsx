/* eslint-disable @next/next/no-img-element -- static assets, sizes are fixed by the design */
import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HowItWorks from "@/components/HowItWorks";
import ProductGallery from "@/components/ProductGallery";
import RentalEstimator from "@/components/RentalEstimator";
import { Outline, Ph, Stars, hero, ph } from "@/components/icons";
import AddToCart from "@/components/AddToCart";
import { allEquipment, allRentals, categoryOf, contact, featuredReview, getRental, guides, reviews, services } from "@/lib/content";
import { compareRows, delivered, faqsFor, infoFor, priced, process, productPhone, rep, similarTo, specs } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

// Every slug is prerendered below; only unknown slugs (which 404) would block, so skip instant validation.
export const instant = false;

export function generateStaticParams() {
  return allRentals.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = getRental((await params).slug);
  if (!r) return {};
  return { title: `${r.label} Rental | National Dispatching`, description: r.overview };
}

const allReviews = [featuredReview, ...reviews];
const pullQuote = reviews.find((v) => v.name === "James J.")!;
const specIcon = { diamond: ph.diamond, height: ph.arrowsV, power: ph.lightning, surface: ph.mapPin, truck: ph.truckFill, shield: ph.shieldCheck };
const whyIcons = [ph.arrowsV, ph.checkCircle, ph.diamond, ph.truckFill];
const sectionH2 = "font-display text-2xl md:text-3xl font-bold text-bedrock";
const inlineLink = "font-semibold text-bedrock underline decoration-brand decoration-2 underline-offset-4 hover:text-brand-ink";

function BestFor({ items, small }: { items: string[]; small?: boolean }) {
  return (
    <div className={`flex flex-wrap ${small ? "gap-1.5" : "gap-2"}`}>
      {items.map((b) => (
        <span
          key={b}
          className={
            small
              ? "inline-flex items-center gap-1 rounded-full bg-bedrock text-chalk px-2.5 py-1 text-xs font-medium"
              : "inline-flex items-center gap-1.5 rounded-full bg-bedrock px-3 py-1.5 font-display text-xs font-medium text-chalk"
          }
        >
          <Ph d={ph.checkCircle} className="h-3.5 w-3.5 shrink-0 text-brand" />
          {b}
        </span>
      ))}
    </div>
  );
}

export default async function ProductPage({ params }: Props) {
  const r = getRental((await params).slug);
  if (!r) notFound();
  const k = infoFor(r);
  const category = categoryOf(r);
  const similar = similarTo(r);
  const compared = [r, ...similar.slice(0, 3)];
  const rows = compareRows(r).map(([label]) => label);
  const why = [...k.why, delivered];

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        {/* Hero: gallery + product info + rates */}
        <section className="bg-chalk pb-12 md:pt-8 md:pb-20 pt-6">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="flex items-center justify-between gap-3 mb-6">
              <nav className="min-w-0 truncate text-sm text-shale" aria-label="Breadcrumb">
                <NextLink href="/" className="hover:text-brand-ink transition-colors">
                  Home
                </NextLink>
                <span className="mx-2">/</span>
                <NextLink href={category.href} className="hover:text-brand-ink transition-colors">
                  {category.label}
                </NextLink>
                <span className="mx-2">/</span>
                <span className="text-bedrock font-medium">{r.label}</span>
              </nav>
            </div>
            <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 lg:items-start gap-8">
              <div className="min-w-0 lg:sticky" style={{ top: "6rem" }}>
                <ProductGallery images={[r.photo]} alt={r.label} />
              </div>

              <div className="flex min-w-0 flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="mb-2 text-clay font-display text-xs font-semibold uppercase tracking-wider">Rent by the day, week or month</p>
                    <div className="flex items-start justify-between gap-4">
                      <h1 className="text-bedrock text-3xl md:text-4xl">{r.label}</h1>
                    </div>
                    <p className="mt-1 text-base leading-snug text-shale">{k.tagline}</p>
                    <a
                      href="#reviews"
                      className="mt-2 inline-flex items-center gap-1.5 text-sm text-shale hover:text-bedrock"
                      aria-label={`Rated 5.0 out of 5 from ${allReviews.length} Google reviews. Jump to reviews`}
                    >
                      <span aria-hidden="true" className="tracking-tight text-brand-ink">
                        ★★★★★
                      </span>
                      <span className="font-semibold text-bedrock">5.0</span>
                      <span aria-hidden="true">·</span>
                      <span className="underline decoration-shale/40 underline-offset-2">{allReviews.length} Google reviews</span>
                    </a>
                    <p className="mt-2 font-display text-lg text-shale leading-snug">{k.subtitle}</p>
                    <p className="product-description mt-3 max-w-prose text-shale leading-relaxed">{r.overview}</p>
                  </div>
                  <p className="border-l-2 border-brand pl-3.5 text-[15.5px] leading-relaxed text-bedrock">{k.callout}</p>
                  {k.alsoCalled.length > 0 && (
                    <p className="text-sm leading-relaxed text-clay">
                      <span className="font-display font-semibold text-shale">Also called:</span>{" "}
                      {k.alsoCalled.map((a, i) => (
                        <span key={a}>
                          <span className="text-shale">{a}</span>
                          {i < k.alsoCalled.length - 1 ? ", " : "."}
                        </span>
                      ))}
                    </p>
                  )}
                </div>

                <div id="buybox" className="scroll-mt-24">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-xs text-shale">
                      <a href="#reviews" className="flex items-center gap-1 hover:text-bedrock">
                        <span className="text-brand-ink" aria-hidden="true">
                          ★
                        </span>
                        <span className="font-semibold text-bedrock">5.0</span>
                        <span>· Google reviews</span>
                      </a>
                      <span aria-hidden="true">·</span>
                      <span>5,072+ projects · 5,340+ service locations</span>
                    </div>
                    <section className="rounded-2xl border border-seam bg-white p-6 shadow-sm" aria-label="Rental rates">
                      <header className="mb-4">
                        <h2 className="font-display text-xl font-bold text-bedrock">Rental rates</h2>
                        <p className="mt-1 text-sm text-shale">
                          Book online in minutes or by phone. Your {r.label.toLowerCase()} is delivered right to your project site.
                        </p>
                      </header>
                      <div className="space-y-3">
                        {priced(r) ? (
                          <AddToCart r={r} />
                        ) : (
                          <p className="rounded-lg border border-seam bg-chalk px-3 py-3 text-center font-display font-semibold text-bedrock">
                            Call for pricing on this item
                          </p>
                        )}
                        <a
                          href={productPhone.tel}
                          className="block w-full rounded-lg border border-seam px-4 py-3 text-center font-display font-bold text-bedrock transition hover:bg-chalk"
                        >
                          Book by phone {productPhone.label}
                        </a>
                        <p className="text-xs leading-4 text-shale">* {rep[0]} REP® amounts can be refunded with a valid Certificate of Insurance (COI) provided before delivery.</p>
                      </div>
                    </section>
                    <div className="flex items-start gap-2.5 rounded-lg border border-core-blue/20 bg-core-blue-light px-3 py-3">
                      <Outline d={hero.mail} className="mt-0.5 h-5 w-5 shrink-0 text-core-blue" />
                      <div>
                        <p className="font-display text-sm font-bold text-core-blue">Need help procuring equipment?</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-shale">
                          Email us at{" "}
                          <a href={`mailto:${contact.email}`} className="font-semibold text-core-blue underline underline-offset-2">
                            {contact.email}
                          </a>{" "}
                          for your construction projects.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex min-w-0 flex-col gap-2.5">
                  <div className="flex min-w-0 flex-col gap-2">
                    <h2 id="similar-label" className="font-display text-xs font-semibold uppercase tracking-wider text-shale">
                      Similar equipment
                    </h2>
                    <ul
                      className="-mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-pl-5 scroll-pr-5 px-5 pb-1 md:-mx-0 md:scroll-pl-0 md:scroll-pr-0 md:px-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0"
                      role="list"
                      aria-labelledby="similar-label"
                    >
                      {similar.slice(0, 5).map((s) => (
                        <li key={s.slug} className="w-[8.25rem] shrink-0 snap-start list-none lg:w-auto">
                          <a
                            href={s.href}
                            className="group flex h-full flex-col overflow-hidden rounded-xl border border-seam bg-white transition hover:border-brand hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                          >
                            <div className="aspect-[4/3] overflow-hidden bg-ite">
                              <img src={s.image} width={750} height={475} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                            </div>
                            <div className="flex flex-1 flex-col gap-0.5 p-2">
                              <span className="line-clamp-2 font-display text-xs font-bold leading-snug text-bedrock group-hover:text-brand-ink">{s.label}</span>
                              <span className="line-clamp-2 hyphens-none text-[11px] leading-snug text-shale">
                                {s.day ? `From ${s.day} / day` : "Call for pricing"}
                              </span>
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5">
                  <details className="group relative">
                    <summary className="flex cursor-pointer list-none items-center gap-3 rounded-xl border border-seam bg-white px-4 py-3 [&::-webkit-details-marker]:hidden">
                      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brand">
                        <Ph d={ph.shieldCheck} className="h-5 w-5 text-bedrock" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-sm font-bold tracking-tight text-bedrock">Rental Equipment Protection Plan (REP®)</span>
                        <span className="block text-xs leading-snug text-shale">Covers specified damage or loss. Refundable with a valid COI.</span>
                      </span>
                      <span
                        aria-label="REP® details"
                        className="flex h-[18px] w-[18px] flex-none items-center justify-center rounded-full border-[1.5px] border-shale font-display text-[11px] font-bold italic leading-none text-shale transition-colors group-open:border-brand-ink group-open:text-brand-ink"
                      >
                        i
                      </span>
                    </summary>
                    <div className="absolute inset-x-0 top-full z-10 mt-2 rounded-xl border border-seam bg-white p-4 text-[13px] leading-relaxed text-shale shadow-[0_8px_24px_rgba(27,27,27,0.12)]">
                      <p className="mb-1.5 font-display text-[13.5px] font-bold text-bedrock">How it works</p>
                      <ul className="flex list-disc flex-col gap-1 pl-4.5">
                        {rep.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  </details>
                </div>

                <div className="mt-5">
                  <div>
                    <p className="mb-2 font-display text-xs font-semibold uppercase tracking-wider text-clay">Equipment Specifications</p>
                    <dl className="divide-y divide-seam overflow-hidden rounded-xl border border-seam bg-white">
                      {specs(r).map((s) => (
                        <div key={s.label} className="grid grid-cols-[minmax(0,10rem)_minmax(0,1fr)] gap-3 px-4 py-2.5">
                          <dt className="flex items-center gap-2 text-xs font-medium text-shale">
                            <Ph d={specIcon[s.icon]} className="h-4 w-4 shrink-0 text-brand-ink" />
                            <span>{s.label}</span>
                          </dt>
                          <dd className="font-display text-sm font-semibold text-bedrock">{s.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className="mt-4">
                    <p className="mb-2 font-display text-xs font-semibold uppercase tracking-wider text-clay">Best For</p>
                    <BestFor items={k.bestFor} />
                  </div>
                </div>

                <figure className="rounded-lg border border-seam bg-white px-3.5 py-2.5">
                  <span className="text-sm leading-none tracking-tight text-brand-ink" aria-hidden="true">
                    ★★★★★
                  </span>
                  <blockquote className="mt-1 font-display text-[13px] italic leading-snug text-bedrock line-clamp-2" style={{ fontFamily: 'var(--font-serif, "Instrument Serif", Georgia, serif)' }}>
                    “{pullQuote.quote}”
                  </blockquote>
                  <figcaption className="mt-1.5 text-[11px] font-display font-semibold uppercase tracking-wide text-shale">
                    {pullQuote.name} · 5★ · ✓ Google review · Mentions on-time delivery
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* Why choose */}
        <section className="bg-white py-12 md:py-20">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <h2 className={`${sectionH2} mb-8`}>Why Choose This Equipment</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {why.map((w, i) => (
                <div key={w.title} className="rounded-xl border border-seam bg-chalk p-6">
                  <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center mb-4">
                    <Ph d={whyIcons[i]} className="h-6 w-6 text-bedrock" />
                  </div>
                  <h3 className="font-display font-bold text-bedrock text-lg">{w.title}</h3>
                  <p className="text-shale text-sm mt-1 leading-relaxed">{w.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <HowItWorks />

        {/* Rental calculator */}
        <section id="pdp-calculator" className="scroll-mt-24 border-t border-seam bg-chalk py-14 md:py-20">
          <div className="mx-auto max-w-[1100px] px-5 md:px-8">
            <div className="mb-8 max-w-[660px]">
              <p className="mb-2.5 font-display text-sm font-bold uppercase tracking-widest text-brand-ink">Rental calculator</p>
              <h2 className="mt-2.5 font-display text-3xl font-extrabold tracking-tight text-bedrock md:text-4xl">Estimate your {r.label.toLowerCase()} rental</h2>
              <p className="mt-2.5 text-[15.5px] leading-relaxed text-shale">
                Pick a rental period and how long you need it, and we&apos;ll work out the cost from our published rates.
              </p>
            </div>
            <RentalEstimator slug={r.slug} />
          </div>
        </section>

        {/* Comparison */}
        <section className="bg-chalk py-12 md:py-20">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <h2 className={`${sectionH2} mb-8`}>{r.label} vs similar lifts</h2>
            <div className="overflow-x-auto -mx-5 px-5">
              <div
                className="grid rounded-xl border border-seam overflow-hidden"
                style={{ gridTemplateColumns: "repeat(4, minmax(160px, 1fr))", gridTemplateRows: `repeat(${rows.length + 2}, auto)`, minWidth: 640 }}
              >
                {compared.map((c, ci) => {
                  const current = ci === 0;
                  const Col = current ? "div" : "a";
                  return (
                    <Col
                      key={c.slug}
                      {...(current ? {} : { href: c.href })}
                      className={`grid group ${current ? "bg-brand/10 border-t-2 border-brand" : "bg-white border-t-2 border-transparent transition-colors hover:bg-chalk/60"}`}
                      style={{ gridRow: "1 / -1", gridTemplateRows: "subgrid" }}
                    >
                      <div className="flex flex-col items-start px-4 pt-5 pb-4">
                        <img src={c.image} alt={c.label} width={160} height={101} loading="lazy" className="aspect-[4/3] rounded-lg object-cover w-[120px] mb-3 bg-white" />
                        <span
                          className={`mb-2 inline-flex items-center rounded-full px-2.5 py-0.5 font-display text-xs font-semibold ${current ? "bg-brand text-bedrock" : "invisible"}`}
                          aria-hidden={!current}
                        >
                          Current selection
                        </span>
                        <h3 className={`font-display font-bold text-base ${current ? "text-bedrock" : "text-brand-ink group-hover:underline"}`}>{c.label}</h3>
                      </div>
                      {compareRows(c).map(([label, value]) => (
                        <div key={label} className="px-4 py-2.5 border-t border-seam">
                          <span className="block text-xs text-shale mb-0.5">{label}</span>
                          <span className="block text-sm text-bedrock font-medium">{value}</span>
                        </div>
                      ))}
                      <div className="px-4 pt-3 pb-5 border-t border-seam">
                        <span className="block text-xs text-shale mb-1.5">Best For</span>
                        <BestFor items={infoFor(c).bestFor} small />
                      </div>
                    </Col>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* What is */}
        <section className="border-t border-seam bg-chalk py-12 md:py-20">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="max-w-3xl space-y-14">
              <div id="what-is" className="scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-bedrock md:text-3xl">What is the {r.label}?</h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-shale">
                  <p>{r.overview}</p>
                  <p>
                    It is one of our{" "}
                    <NextLink href={category.href} className={inlineLink}>
                      {category.label.toLowerCase()}
                    </NextLink>
                    , alongside the rest of our{" "}
                    <a href={allEquipment.href} className={inlineLink}>
                      rental equipment
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Used for */}
        <section id="used-for" className="scroll-mt-24 bg-white py-12 md:py-20">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <h2 className={`${sectionH2} mb-4`}>What is the {r.label.toLowerCase()} used for?</h2>
            <p className="mb-8 max-w-3xl text-base leading-relaxed text-shale">
              The {r.label.toLowerCase()} has {k.uses.length} main uses, including {k.uses.slice(0, -1).map((u) => u.title.toLowerCase()).join(", ")} and{" "}
              {k.uses.at(-1)!.title.toLowerCase()}:
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {k.uses.map((u) => (
                <div key={u.title} className="group rounded-xl border border-seam overflow-hidden bg-white">
                  <div className="p-5">
                    <h3 className="font-display font-bold text-bedrock text-lg group-hover:text-brand-ink transition-colors">{u.title}</h3>
                    <p className="text-shale text-sm mt-2 leading-relaxed">{u.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="scroll-mt-24 bg-white py-12 md:py-20">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <section className="space-y-8">
              <div className="flex flex-col gap-3">
                <h2 className="font-display text-2xl font-bold text-bedrock md:text-3xl">National Dispatching reviews</h2>
                <p className="font-mono text-lg text-bedrock">★ 5.0 · {allReviews.length} reviews</p>
              </div>
              <div className="space-y-1.5">
                {[5, 4, 3, 2].map((star) => {
                  const count = star === 5 ? allReviews.length : 0; // every review shown on the live site is 5★
                  return (
                    <div key={star} className="flex items-center gap-2 text-sm">
                      <span className="w-8 font-mono text-shale">{star}★</span>
                      <div className="flex-1 h-2.5 rounded-full bg-ite overflow-hidden">
                        <div className="h-full rounded-full bg-brand" style={{ width: `${(count / allReviews.length) * 100}%` }} />
                      </div>
                      <span className="w-8 text-right font-mono text-xs text-shale">{count}</span>
                    </div>
                  );
                })}
              </div>
              <div role="tablist" aria-label="Review groups" className="flex gap-6 border-b border-seam">
                <button role="tab" aria-selected="true" className="py-3 font-display border-b-2 border-brand font-bold text-bedrock">
                  Google reviews ({allReviews.length})
                </button>
              </div>
              <div role="tabpanel" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {allReviews.map((v) => (
                  <article key={v.name + v.quote.slice(0, 12)} className="rounded-xl border border-seam bg-white p-6 transition-shadow hover:shadow-md flex min-h-[280px] flex-col">
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-3">
                      <div className="min-w-0">
                        <p className="font-display font-bold text-bedrock">{v.name}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <div className="flex gap-0.5">
                            <Stars className="h-4 w-4 text-brand" />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 md:max-w-[16rem] md:shrink-0 md:justify-end">
                        <span className="text-xs font-semibold text-shale md:text-right">✓ Google review</span>
                      </div>
                    </div>
                    <p className="mt-4 text-shale leading-relaxed">{v.quote}</p>
                    <p className="mt-auto pt-4 text-xs text-shale">National Dispatching customer</p>
                  </article>
                ))}
              </div>
              <div className="text-center">
                <a href={contact.reviewsHref} className="inline-flex items-center gap-1 font-display font-bold text-brand-ink hover:text-bedrock">
                  Read all reviews &rarr;
                </a>
              </div>
            </section>
          </div>
        </section>

        {/* Editorial */}
        <section className="border-t border-seam bg-chalk py-12 md:py-20">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="max-w-3xl space-y-14">
              <div id="rep" className="scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-bedrock md:text-3xl">Rental Equipment Protection Plan (REP®)</h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-shale">
                  {rep.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
              <div id="process" className="scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-bedrock md:text-3xl">How we handle your rental, start to finish</h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-shale">
                  <p>
                    Think of us as an extension of your team. Our{" "}
                    <a href={services[4].href} className={inlineLink}>
                      procurement &amp; dispatching
                    </a>{" "}
                    team takes care of the administrative tasks, so you can concentrate on completing the project.
                  </p>
                  <ol className="list-decimal space-y-3 pl-5">
                    {process.map(([title, body]) => (
                      <li key={title}>
                        <span className="font-semibold text-bedrock">{title}.</span> {body}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <div id="territory" className="scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-bedrock md:text-3xl">Where we deliver</h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-shale">
                  <p>
                    National Dispatching is headquartered in Fresno, California, and serves contractors nationwide. Service territory covers all 50
                    states via our qualified partner network of more than 5,000 local partners. See every{" "}
                    <a href={contact.locationsHref} className={inlineLink}>
                      service location
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-chalk py-12 md:py-20">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <section aria-label={`Frequently asked questions about the ${r.label}`}>
              <h2 className={`${sectionH2} mb-8`}>Frequently Asked Questions</h2>
              <div>
                {faqsFor(r).map((f) => (
                  <details key={f.q} className="group border-b border-seam">
                    <summary className="w-full flex cursor-pointer list-none justify-between items-center py-5 text-left [&::-webkit-details-marker]:hidden">
                      <h3 className="font-display font-semibold text-bedrock text-lg pr-4">{f.q}</h3>
                      <svg className="h-5 w-5 text-clay shrink-0 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="pb-5 text-shale leading-relaxed">{f.a}</div>
                  </details>
                ))}
              </div>
            </section>
          </div>
        </section>

        {/* Plan */}
        <section className="bg-chalk py-12 md:py-16">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <p className="font-mono text-sm font-medium text-shale">Guides &amp; services</p>
            <h2 className="mt-1 font-display text-2xl font-bold text-bedrock md:text-3xl">Plan your equipment rental</h2>
            <ul className="mt-6 flex flex-wrap gap-2.5 p-0" role="list">
              {[allEquipment, { label: "Service locations", href: contact.locationsHref }, services[4], guides[0]].map((l) => (
                <li key={l.href} className="list-none">
                  <a
                    href={l.href}
                    className="inline-flex items-center gap-2 rounded-full border border-seam bg-white px-4 py-2 text-sm font-medium text-bedrock transition-colors hover:border-clay hover:text-brand-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink"
                  >
                    {l.label}
                    <Ph d={ph.caret} size={12} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="bg-bedrock py-16 md:py-24">
          <div className="mx-auto max-w-[1280px] px-5 text-center md:px-8">
            <h2 className="text-white">Ready to rent the {r.label}?</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-seam">
              Book online in minutes, or call {productPhone.label} and a team member will get you set up.
            </p>
            <a
              href="#buybox"
              className="whitespace-nowrap mt-8 inline-flex items-center gap-2 rounded-lg bg-brand px-7 py-3.5 font-display font-bold text-bedrock transition-colors hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bedrock"
            >
              See rental rates
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
              </svg>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
