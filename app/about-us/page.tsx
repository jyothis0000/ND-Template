/* eslint-disable @next/next/no-img-element -- static assets, sizes are fixed by the design */
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Blocks";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Stars } from "@/components/icons";
import { allEquipment, contact, faqs, services } from "@/lib/content";
import { about } from "@/lib/pages";

export const metadata: Metadata = {
  title: "About National Dispatching | National Dispatching",
  description: about.lead,
};

const serviceBlurbs: Record<string, string> = {
  rentals: "We provide heavy rental equipment for construction, earthmoving, power services, pipeline and industrial services.",
  materials: "We provide a wide range of construction materials including wood, concrete, steel, cement, aggregates, bricks, clay, metal, and so much more.",
  trucking: "We have the most trusted material transport for your construction needs including cargo, heavy haul and specialty haul services.",
  subcontracting: "We offer pre-qualified and professionally certified workforce for all of your construction project needs, including security, maintenance, and operations.",
  "procurement-dispatching": "We centralize equipment sourcing and material procurement, with integrated logistics coordination across every project site.",
};

const facts = [
  ["Company name", "National Dispatching"],
  ["Established", "2010"],
  ["Headquarters", contact.address],
  ["President/CFO", about.president.name],
  ["Service territory", "All 50 states via our qualified partner network"],
  ["Central dispatch", contact.phone],
  ["Email", contact.email],
  ["Corporate hours", `${contact.hours} · Sat – Sun: Closed`],
  ["Certification", "Women’s Business Enterprise (WBE)"],
];

const link = "font-semibold text-bedrock underline decoration-seam underline-offset-4 hover:text-brand-ink";

// The reference About page layout, filled from nationaldispatching.com/about-us.
export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <section className="bg-chalk">
          <div className="mx-auto max-w-[1280px] px-5 pb-12 pt-6 md:px-8 md:py-16">
            <Breadcrumb className="mb-6 text-sm text-shale" trail={[{ label: "Home", href: "/" }, { label: "About" }]} />
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-20">
              <div className="order-2 max-w-xl md:order-1">
                <h1 className="text-balance text-bedrock">National Dispatching</h1>
                <p className="mt-4 text-balance font-display text-xl font-bold leading-snug text-bedrock md:text-2xl">
                  We are more than procurement service providers. We are the one-call solution for any project need.
                </p>
                <p className="mt-8 text-pretty text-lg leading-relaxed text-shale">{about.lead}</p>
                <p className="mt-4 text-pretty text-lg leading-relaxed text-shale">{about.story[1]}</p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a
                    href={allEquipment.href}
                    className="inline-flex select-none items-center justify-center whitespace-nowrap rounded-lg bg-brand px-8 py-4 font-display text-lg font-bold text-bedrock transition-colors hover:bg-brand-hover"
                  >
                    Browse equipment
                  </a>
                  <a
                    href={contact.tel}
                    className="inline-flex select-none items-center justify-center whitespace-nowrap rounded-lg border-2 border-bedrock/20 bg-white px-8 py-4 font-display text-lg font-bold text-bedrock transition-colors hover:border-brand-ink hover:text-brand-ink"
                  >
                    Call {contact.phone}
                  </a>
                </div>
                <p className="mt-4 text-sm text-shale">
                  Prefer email?
                  <a href="/contact-us" className={`mt-1 block ${link}`}>
                    Contact the team
                  </a>
                </p>
              </div>
              <div className="relative order-1 mx-auto w-full max-w-2xl md:order-2 lg:mx-0 lg:max-w-none">
                <figure className="relative mx-auto aspect-[4/3] w-[min(100%,32rem)] sm:w-[min(100%,40rem)] lg:ml-auto lg:w-full lg:max-w-[44rem]">
                  <div className="mx-auto aspect-[4/3] w-[88%] overflow-hidden rounded-3xl bg-bedrock/5 shadow-[0_20px_44px_rgb(27_27_27_/_0.16)] ring-4 ring-white">
                    <img src="/images/about-national.jpg" alt="National Dispatching team members in safety vests on a job site" className="h-full w-full object-cover object-left" />
                  </div>
                </figure>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20" aria-label="Customer review">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <figure className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center gap-1" role="img" aria-label="Rated 5 out of 5 stars">
                <Stars className="h-6 w-6 text-brand-ink" />
              </div>
              <blockquote className="mt-6 text-balance font-display text-2xl font-bold leading-snug text-bedrock md:text-4xl">
                &ldquo;National Dispatch does it all! Whether it&rsquo;s backfill material or concrete or what have you, National Dispatch has you
                covered!&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm text-shale">Wylie Shupe, Google review</figcaption>
            </figure>
          </div>
        </section>

        <section className="bg-chalk py-16 md:py-24">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="max-w-2xl">
              <h2 className="text-balance text-bedrock">What we do</h2>
              <p className="mt-4 text-lg leading-relaxed text-shale">
                We offer a wide range of solutions for your job site, all coordinated by one dispatch team.
              </p>
            </div>
            <div className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <div key={s.slug} className="border-t border-seam pt-6">
                  <h3 className="text-xl text-bedrock">
                    <a href={s.href} className="hover:text-brand-ink">
                      {s.label}
                    </a>
                  </h3>
                  <p className="mt-2 text-shale">{serviceBlurbs[s.slug]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="max-w-2xl">
              <h2 className="text-balance text-bedrock">What’s different about working with us</h2>
            </div>
            <div className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {about.different.map((d) => (
                <div key={d.title} className="border-t border-seam pt-6">
                  <h3 className="text-xl text-bedrock">{d.title}</h3>
                  <p className="mt-2 text-shale">{d.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="vision-mission" className="scroll-mt-24 bg-white pb-12 md:pb-16" aria-label="Vision and mission">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="mx-auto grid max-w-6xl items-stretch gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-8">
              <div className="rounded-2xl border border-seam bg-chalk px-7 py-7 md:px-8 md:py-9">
                <p className="font-display text-sm font-bold uppercase tracking-widest text-shale">Vision</p>
                <p className="mt-3 font-display text-xl font-bold leading-snug text-bedrock md:text-2xl">The most trusted source for procurement in the United States</p>
                <p className="mt-3 text-base leading-relaxed text-shale">{about.vision}</p>
              </div>
              <div className="hidden items-center md:flex" aria-hidden="true">
                <span className="h-full w-px bg-seam" />
              </div>
              <div className="rounded-2xl border border-bedrock bg-bedrock px-7 py-7 md:px-8 md:py-9">
                <p className="font-display text-sm font-bold uppercase tracking-widest text-brand">Mission</p>
                <p className="mt-3 font-display text-xl font-bold leading-snug text-white md:text-2xl">Simple, accessible solutions for a productive job site</p>
                <p className="mt-3 text-base leading-relaxed text-seam">{about.mission}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="our-values" className="scroll-mt-24 bg-chalk py-16 md:py-24">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="max-w-2xl">
              <h2 className="text-balance text-bedrock">Our values</h2>
            </div>
            <ol className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-3">
              {about.values.map((v, i) => (
                <li key={v.title} className="border-t border-seam pt-6">
                  <span className="font-mono text-sm font-semibold text-shale">0{i + 1}</span>
                  <h3 className="mt-2 text-xl text-bedrock">{v.title}</h3>
                  <p className="mt-2 text-shale">{v.body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-12 max-w-3xl border-l-2 border-brand pl-5">
              <p className="font-display text-sm font-bold uppercase tracking-widest text-shale">Purpose statement</p>
              <p className="mt-2 text-lg leading-relaxed text-bedrock">{about.purpose}</p>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 md:grid-cols-[1fr_auto] md:px-8">
            <div className="max-w-2xl">
              <h2 className="text-balance text-bedrock">Who we are</h2>
              <p className="mt-6 text-lg leading-relaxed text-shale">{about.story[0]}</p>
              <p className="mt-4 text-lg leading-relaxed text-shale">
                We act as an extension of your team, taking care of all administrative tasks related to equipment rental, material procurement, and
                dispatching. We deliver the solutions our clients need to get the job done.
              </p>
            </div>
            <figure className="text-center">
              <img src={about.president.image} alt={about.president.name} width={280} height={280} className="mx-auto h-56 w-56 rounded-full bg-chalk object-cover ring-4 ring-chalk" />
              <figcaption className="mt-4">
                <span className="block font-display text-lg font-bold text-bedrock">{about.president.name}</span>
                <span className="text-sm text-shale">{about.president.title}</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="performance" className="scroll-mt-24 bg-chalk py-16 md:py-24">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="max-w-2xl">
              <h2 className="text-balance text-bedrock">Past performance</h2>
              <p className="mt-4 text-lg leading-relaxed text-shale">
                We serve contractors both large and small in a broad range of marketplaces, including the fast-paced utility and communication
                construction sector.
              </p>
            </div>
            <div className="mt-10 overflow-hidden rounded-2xl border border-seam bg-white p-4">
              <img src="/images/about/past-performance-1.webp" alt="Utility, energy and telecom clients served by National Dispatching" loading="lazy" className="w-full" />
              <img src="/images/about/past-performance-2.webp" alt="" loading="lazy" className="w-full" />
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-balance text-bedrock">Key facts</h2>
              <div className="mt-8 overflow-hidden rounded-2xl border border-seam bg-white">
                <table className="w-full text-left text-base">
                  <caption className="sr-only">National Dispatching company information</caption>
                  <tbody>
                    {facts.map(([k, v]) => (
                      <tr key={k} className="border-b border-seam align-top last:border-0">
                        <th scope="row" className="w-2/5 px-5 py-4 font-display font-bold text-bedrock md:px-6">
                          {k}
                        </th>
                        <td className="px-5 py-4 text-shale md:px-6">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-chalk py-16 md:py-24">
          <div className="mx-auto max-w-[900px] px-5 md:px-8">
            <h2 className="text-balance text-bedrock">Common questions</h2>
            <div className="mt-8 space-y-3">
              {faqs.slice(0, 6).map((f) => (
                <details key={f.q} className="group rounded-xl border border-seam bg-white">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-display font-bold text-bedrock [&::-webkit-details-marker]:hidden">
                    <h3 className="font-display text-base font-bold text-bedrock">{f.q}</h3>
                    <svg className="h-5 w-5 shrink-0 text-clay transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="px-5 pb-5 leading-relaxed text-shale">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-bedrock py-20 md:py-28">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-balance text-3xl text-white md:text-5xl">
                Ready when you are. <span className="text-brand">One call covers it.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-white/70">
                Rentals, materials, trucking and subcontracting, sourced from our partner network and delivered to your project site.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a
                  href={allEquipment.href}
                  className="inline-flex select-none items-center justify-center whitespace-nowrap rounded-lg bg-brand px-8 py-4 font-display text-lg font-bold text-bedrock transition-colors hover:bg-brand-hover"
                >
                  Browse equipment
                </a>
                <a
                  href="/contact-us"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-shale px-8 py-4 font-display text-lg font-bold text-white transition-colors hover:border-brand hover:text-brand"
                >
                  Request a quote
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
