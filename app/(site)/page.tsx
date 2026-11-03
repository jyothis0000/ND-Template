/* eslint-disable @next/next/no-img-element -- static assets, sizes are fixed by the design */
import type { CSSProperties } from "react";
import CoverageMap from "@/components/CoverageMap";
import Footer from "@/components/Footer";
import { QuoteCard, ZipCard } from "@/components/Forms";
import Header from "@/components/Header";
import HeroGallery from "@/components/HeroGallery";
import HowItWorks from "@/components/HowItWorks";
import { Outline, Stars, hero } from "@/components/icons";
import {
  allEquipment,
  contact,
  faqs,
  featuredReview,
  industries,
  rentals,
  reviews,
  states,
} from "@/lib/content";

const delay = (ms: number) => ({ "--hg-hero-delay": `${ms}ms` }) as CSSProperties;
const eyebrow = "font-display text-sm font-bold uppercase tracking-widest text-brand-ink";
const iconTile = "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand text-bedrock shadow-sm";

const why = [
  {
    icon: hero.truck,
    title: "One-Call Solution",
    body: "We are more than procurement service providers. One call covers rentals, materials, trucking and site services for any project need.",
  },
  {
    icon: hero.scale,
    title: "5,000+ Local Partners",
    body: "Our nationwide partner network means easy procurement at competitive prices, without the hassle of juggling multiple vendors.",
  },
  {
    icon: hero.clipboard,
    title: "Centralized Procurement",
    body: "We centralize equipment sourcing and material procurement, with integrated logistics coordination across every project site.",
  },
];

const trust = [
  { icon: hero.clock, title: "Customized project support", body: `Central dispatch ${contact.phone}` },
  { icon: hero.checkCircle, title: "Competitive pricing", body: "Backed by our vendor network" },
  { icon: hero.calendar, title: "Mon – Fri, 7am – 5pm PST", body: "Corporate hours, weekends closed" },
];

const stats = [
  { value: "5,072+", label: "Projects served" },
  { value: "12+", label: "Years in business", accent: true },
  { value: "5,340+", label: "Service locations" },
];

// Rotating phrasing for the state links, same pattern as the reference metro list.
const stateLabel = (name: string, i: number) =>
  [`${name} equipment rental`, `equipment rental in ${name}`, `heavy equipment in ${name}`][i % 3];

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        {/* 1. Hero */}
        <section aria-label="Hero" className="relative overflow-hidden bg-chalk">
          <div
            className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,rgba(254,225,0,0.1),transparent_55%)]"
            aria-hidden="true"
          />
          <div className="pointer-events-none relative z-20 mx-auto max-w-[1280px] px-5 pt-6 pb-10 md:px-8 md:pt-8 lg:min-h-[680px] lg:pt-6 lg:pb-14">
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
              <p
                className="hg-hero-in inline-flex items-center gap-1.5 rounded-full border border-seam/80 bg-chalk/95 px-3 py-2 text-xs text-bedrock shadow-sm backdrop-blur-sm sm:text-sm justify-center lg:justify-start"
                role="img"
                aria-label="Rated 5 stars on Google, 5,072+ projects served"
              >
                <span className="tracking-tight text-brand-ink" aria-hidden="true">
                  ★★★★★
                </span>
                <span className="font-display font-bold text-bedrock" aria-hidden="true">
                  5,072+
                </span>
                <span className="whitespace-nowrap" aria-hidden="true">
                  · projects served
                </span>
              </p>
              <div className="lg:pl-[34px]">
                <h1 className="mt-5 font-display text-[2.25rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-bedrock md:text-[3.5rem] lg:text-[4rem]">
                  One-Stop Equipment <span className="nd-mark">Rentals</span>
                </h1>
                <p className="hg-hero-in mt-5 text-base font-semibold leading-relaxed text-bedrock md:text-lg mx-auto max-w-md lg:mx-0" style={delay(90)}>
                  One call for equipment rentals, construction materials and trucking. Book online in minutes and we&apos;ll deliver to
                  your project site on time, ready to work.
                </p>
                <p className="hg-hero-in mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-bedrock" style={delay(120)}>
                  <Outline d={hero.check} width={3} className="h-4 w-4 shrink-0 text-signal-green" />
                  <span>Delivered to job sites nationwide</span>
                </p>
                <div className="hg-hero-in pointer-events-auto mt-6 w-full max-w-md md:mt-8 mx-auto lg:mx-0" style={delay(150)}>
                  <QuoteCard />
                </div>
              </div>
            </div>
          </div>
          <div
            className="pointer-events-none absolute inset-0 z-10 hidden bg-[radial-gradient(ellipse_68%_97%_at_18%_50%,#F6F6F6_0%,rgba(246,246,246,0.6)_46%,transparent_84%)] lg:block"
            aria-hidden="true"
          />
          <div className="relative pb-10 lg:absolute lg:left-0 lg:right-0 lg:top-[-7px] lg:bottom-[7px] lg:flex lg:items-center lg:pb-0">
            <div className="w-full">
              <p className="mb-4 px-5 text-center font-display text-sm font-bold uppercase tracking-widest text-brand-ink md:px-8 lg:hidden">
                5,072+ projects served. Real equipment, real reviews
              </p>
              <HeroGallery />
            </div>
          </div>
        </section>

        {/* 2. Why */}
        <section aria-label="Why contractors choose National Dispatching" className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="max-w-3xl" data-reveal>
              <p className={eyebrow}>Why National Dispatching</p>
              <h2 className="mt-3 text-bedrock">Why Contractors Choose National Dispatching</h2>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3" data-reveal-stagger>
              {why.map((w) => (
                <div key={w.title} className="flex flex-col items-start gap-4 rounded-2xl border border-seam bg-chalk/60 p-6">
                  <div className={iconTile}>
                    <Outline d={w.icon} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-bedrock">{w.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-shale">{w.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Trust signals */}
        <section aria-label="Trust signals" className="border-t-2 border-brand/20 bg-chalk py-10 md:py-14">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3" data-reveal-stagger>
              {trust.map((t, i) => (
                <div key={t.title} className={`flex items-center gap-4 ${i ? "sm:border-l sm:border-seam sm:pl-6" : ""}`}>
                  <div className={iconTile}>
                    <Outline d={t.icon} />
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold text-bedrock">{t.title}</p>
                    <p className="text-sm text-shale">{t.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Popular rentals */}
        <section aria-label="Most-rented equipment" className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end" data-reveal>
              <div>
                <p className={eyebrow}>Popular rentals</p>
                <h2 className="mt-3 text-bedrock">Most-rented equipment</h2>
              </div>
              <a
                href={allEquipment.href}
                className="inline-flex items-center gap-2 font-display text-sm font-bold text-brand-ink transition-colors hover:text-bedrock"
              >
                View all equipment
                <Outline d={hero.arrowRight} width={2.5} className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5" data-reveal-stagger>
              {rentals.slice(0, 6).map((r) => (
                <div key={r.href} className="contents">
                  <div className="pcard group relative flex flex-col rounded-2xl bg-white border border-seam overflow-hidden hover:shadow-md transition">
                    <div
                      className="pcard-gallery aspect-[4/3] bg-ite overflow-x-auto overflow-y-hidden flex snap-x snap-mandatory"
                      role="region"
                      aria-label={`${r.label} photo`}
                    >
                      <a href={r.href} className="h-full w-full flex-shrink-0 snap-start" tabIndex={-1} aria-hidden="true" draggable={false}>
                        <img src={r.image} alt={r.label} className="pcard-gallery-img h-full w-full object-cover" loading="lazy" width={750} height={475} draggable={false} />
                      </a>
                    </div>
                    <a href={r.href} className="block flex-1">
                      <div className="p-4">
                        <h2 className="font-display font-bold text-base text-bedrock leading-snug group-hover:text-brand-ink transition-colors">{r.label}</h2>
                        <p className="font-display text-sm text-shale leading-snug mb-2">
                          Day {r.day} · Week {r.week} · Month {r.month}
                        </p>
                        <div>
                          <div className="inline-flex items-center gap-1.5 font-display text-sm font-bold text-brand-ink underline decoration-2 underline-offset-4 group-hover:text-bedrock">
                            View Details
                            <Outline d={hero.arrowRight} width={2.5} className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="mx-auto mt-10 max-w-xl">
              <ZipCard />
            </div>
          </div>
        </section>

        {/* 5. Coverage map */}
        <section className="dmap-section" aria-label="Where we deliver">
          <div className="dmap-inner">
            <div className="dmap">
              <p className="dmap-kicker">Service territory via our qualified partner network</p>
              <h2 className="dmap-head">Serving job sites across America</h2>
              <p className="dmap-sub">
                From our Fresno, California headquarters we coordinate rentals, materials and trucking in all 50 states. Tap a state to see its
                service areas.
              </p>
              <CoverageMap />
            </div>
          </div>
        </section>

        {/* 6. States */}
        <section className="bg-chalk py-16 md:py-20">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="mb-8">
              <div className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-shale">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                By state
              </div>
              <h2 className="font-display text-2xl font-bold text-bedrock md:text-3xl" style={{ letterSpacing: "-0.028em" }}>
                Equipment rental near you.
              </h2>
              <p className="mt-2 max-w-xl text-sm text-shale">
                Local partners, coordinated delivery, and one call to dispatch. Browse a state below, or{" "}
                <a href={contact.locationsHref} className="font-semibold text-brand-ink underline-offset-2 hover:underline">
                  see every location we serve
                </a>
                .
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {states.map((s, i) => (
                <li key={s.slug}>
                  <a
                    href={s.href}
                    className="block truncate py-1.5 text-sm text-shale transition-colors hover:text-brand-ink"
                    title={`${s.name} (${s.count} service areas)`}
                  >
                    {stateLabel(s.name, i)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 7. Stats */}
        <section aria-label="Company statistics" className="relative overflow-hidden bg-bedrock py-16 md:py-24">
          <img src="/images/banner.webp" alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.04]" loading="lazy" width={1136} height={337} />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand to-transparent" />
          <div className="relative mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3" data-reveal-stagger>
              {stats.map((s) => (
                <div key={s.label}>
                  <p
                    className={`font-display text-4xl font-extrabold md:text-5xl ${
                      s.accent ? "text-brand drop-shadow-[0_0_12px_rgba(254,225,0,0.3)]" : "text-white"
                    }`}
                  >
                    {s.value}
                  </p>
                  <p className="mt-1 text-sm text-seam">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Reviews */}
        <section aria-label="Customer reviews" className="bg-bedrock py-20 md:py-28">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="mb-12 text-center md:mb-16" data-reveal>
              <p className="font-display text-sm font-bold uppercase tracking-widest text-brand">Testimonials</p>
              <h2 className="mt-3 text-white">Trusted by contractors everywhere</h2>
            </div>
            <div className="mx-auto max-w-4xl text-center">
              <blockquote className="relative px-4 md:px-8">
                <span className="absolute -top-2 left-0 font-display text-6xl leading-none text-brand md:-top-6 md:text-8xl" aria-hidden="true">
                  “
                </span>
                <p className="relative font-display text-2xl font-bold leading-snug text-white md:text-4xl lg:text-5xl">{featuredReview.quote}</p>
                <span className="absolute -bottom-6 right-0 font-display text-6xl leading-none text-brand md:-bottom-10 md:text-8xl" aria-hidden="true">
                  ”
                </span>
              </blockquote>
              <p className="mt-10 font-display font-bold text-brand md:mt-12">· {featuredReview.name}, Google review</p>
            </div>
            <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
              <div className="flex gap-0.5">
                <Stars className="h-7 w-7 text-brand" />
              </div>
              <span className="font-mono text-2xl font-bold text-white">
                5.0<span className="text-clay">/5</span>
              </span>
              <span className="hidden h-6 w-px bg-white/20 sm:block" aria-hidden="true" />
              <span className="text-sm text-white/70">★ 5-star reviews from contractors on Google</span>
            </div>
            <div className="hg-marquee-root mt-10 overflow-hidden -mx-5 md:-mx-8" role="region" aria-label="Recent customer reviews">
              <div className="hg-marquee-track flex gap-4" style={{ width: "max-content" }}>
                {[...reviews, ...reviews].map((r, i) => (
                  <a
                    key={i}
                    href={contact.reviewsHref}
                    aria-hidden={i >= reviews.length || undefined}
                    tabIndex={i >= reviews.length ? -1 : undefined}
                    className="flex w-[280px] shrink-0 flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bedrock"
                  >
                    <div className="flex gap-0.5">
                      <Stars className="h-4 w-4 text-brand" />
                    </div>
                    <p className="line-clamp-4 text-sm leading-relaxed text-white/80">{r.quote}</p>
                    <div className="mt-auto flex items-center justify-between gap-2">
                      <p className="truncate font-display text-sm font-bold text-white">{r.name}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-10 flex justify-center">
              <a
                href={contact.reviewsHref}
                className="whitespace-nowrap inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-display font-bold text-bedrock transition-all hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-lg"
              >
                Read all Google reviews<span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* 9. How it works */}
        <div data-reveal>
          <HowItWorks />
        </div>

        {/* 10. Procurement CTA */}
        <section aria-label="Procurement and dispatching" className="bg-ite py-16 md:py-20">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left" data-reveal-stagger>
              <div>
                <p className={eyebrow}>Procurement &amp; dispatching</p>
                <h2 className="mt-2 text-bedrock">Not sure what you need?</h2>
                <p className="mt-3 max-w-lg text-shale">
                  Tell us about your project. Our product specialists identify the right equipment and materials, then handle sourcing, delivery
                  and logistics.
                </p>
              </div>
              <a
                href={contact.tel}
                className="whitespace-nowrap shrink-0 rounded-lg bg-brand px-8 py-4 font-display text-base font-bold text-bedrock transition-colors hover:bg-brand-hover"
              >
                Talk to central dispatch
              </a>
            </div>
          </div>
        </section>

        {/* 11. FAQ */}
        <section aria-label="Frequently asked questions" className="bg-chalk py-16 md:py-24">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="text-center" data-reveal>
              <p className={eyebrow}>Common questions</p>
              <h2 className="mt-3 text-bedrock">Frequently asked questions</h2>
            </div>
            <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:gap-12">
              <div className="lg:w-2/3" data-reveal>
                {faqs.map((f) => (
                  <details key={f.q} className="group border-b border-seam">
                    <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 font-display text-lg font-bold text-bedrock transition-colors hover:text-brand-ink [&::-webkit-details-marker]:hidden">
                      <h3 className="font-display text-lg font-bold text-bedrock">{f.q}</h3>
                      <Outline
                        d={hero.chevronDown}
                        width={2}
                        className="h-5 w-5 shrink-0 text-clay transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                      />
                    </summary>
                    <div className="pb-5">
                      <p className="font-body text-base leading-relaxed text-shale">{f.a}</p>
                    </div>
                  </details>
                ))}
              </div>
              <div className="lg:w-1/3" data-reveal>
                <div className="rounded-2xl bg-ite p-8 lg:sticky lg:top-28">
                  <h3 className="font-display text-xl font-bold text-bedrock">Still have questions?</h3>
                  <p className="mt-3 text-shale">Our team is here to help you find the right equipment and materials for your project.</p>
                  <div className="mt-6 space-y-4">
                    <a
                      href={contact.tel}
                      className="flex items-center gap-3 font-display text-sm font-bold text-brand-ink transition-colors hover:text-bedrock"
                    >
                      <Outline d={hero.phone} className="h-5 w-5" />
                      Call {contact.phone}
                    </a>
                    <a
                      href={contact.quoteHref}
                      className="flex items-center gap-3 font-display text-sm font-bold text-brand-ink transition-colors hover:text-bedrock"
                    >
                      <Outline d={hero.mail} className="h-5 w-5" />
                      Send us a message
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 12. Bottom CTA */}
        <section aria-label="Get started" className="relative overflow-hidden py-16 md:py-24">
          <img src="/images/banner.webp" alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" width={1136} height={337} />
          <div className="absolute inset-0 bg-bedrock/80" />
          <div className="relative mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="mx-auto max-w-3xl text-center" data-reveal-stagger>
              <h2 className="text-white text-3xl md:text-5xl">
                Ready to <span className="text-brand">get started?</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-seam">Browse the industries we serve or request a free quote in minutes.</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
                {industries.map((name) => (
                  <a
                    key={name}
                    href={allEquipment.href}
                    className="rounded-full border border-shale px-5 py-2.5 text-seam transition-all duration-200 hover:border-brand hover:text-brand"
                  >
                    {name}
                  </a>
                ))}
              </div>
              <div className="mt-10">
                <a
                  href={contact.quoteHref}
                  className="whitespace-nowrap inline-flex items-center justify-center rounded-lg bg-brand px-12 py-5 font-display text-xl font-bold text-bedrock shadow-lg shadow-brand/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-xl"
                >
                  Request a Free Quote
                </a>
                <p className="mt-4 text-sm text-seam">A team member will respond to you shortly. Central dispatch: {contact.phone}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
