/* eslint-disable @next/next/no-img-element -- static assets, sizes are fixed by the design */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/Blocks";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Ph, ph } from "@/components/icons";
import { contact, services } from "@/lib/content";
import { servicePages, type ServiceItem } from "@/lib/pages";
import { process } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export const instant = false;

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = servicePages.find((x) => x.slug === slug);
  return s ? { title: `${s.label} | National Dispatching`, description: s.sub } : {};
}

const eyebrow = "font-display text-sm font-bold uppercase tracking-widest text-brand-ink";

function ItemGrid({ items }: { items: ServiceItem[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {items.map((it) => (
        <div key={it.title} className="group overflow-hidden rounded-xl border border-seam bg-white">
          {it.image && <img src={it.image} alt={it.title} loading="lazy" className="aspect-[16/10] w-full object-cover" />}
          <div className="p-5">
            <h3 className="font-display text-lg font-bold text-bedrock transition-colors group-hover:text-brand-ink">{it.title}</h3>
            {it.body && <p className="mt-2 text-sm leading-relaxed text-shale">{it.body}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

// Service pages use the reference "For Contractors" layout: dark hero with a card,
// a stats strip, then content with a sticky sidebar.
export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = servicePages.find((x) => x.slug === slug);
  if (!s) notFound();
  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <section className="bg-bedrock">
          <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 py-16 md:grid-cols-[1.25fr_0.75fr] md:px-8 md:py-24">
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-widest text-brand">Our Services · {s.label}</p>
              <h1 className="mt-4 text-white">{s.headline}</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-seam">{s.sub}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={contact.quoteHref}
                  className="whitespace-nowrap inline-flex items-center justify-center rounded-lg bg-brand px-7 py-3.5 font-display text-base font-bold text-bedrock transition-colors hover:bg-brand-hover"
                >
                  Request a quote
                </a>
                {s.brochure && (
                  <a
                    href={s.brochure}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap inline-flex items-center justify-center rounded-lg border-2 border-seam px-7 py-3.5 font-display text-base font-bold text-seam transition-colors hover:border-brand hover:text-brand"
                  >
                    Download our brochure
                  </a>
                )}
              </div>
            </div>
            <div className="rounded-2xl border border-seam bg-white p-7 shadow-lg">
              {s.image && <img src={s.image} alt="" className="mb-5 aspect-[4/3] w-full rounded-xl object-cover" />}
              <p className="font-display text-xs font-bold uppercase tracking-widest text-brand-ink">One call</p>
              <p className="mt-3 font-display text-3xl leading-tight font-bold text-bedrock">One source for every project need</p>
              <p className="mt-2 text-sm leading-relaxed text-shale">
                Rentals, materials, trucking and subcontracting, coordinated by one dispatch team.
              </p>
              <div className="my-5 h-px bg-seam" />
              <ul className="space-y-3 text-sm font-semibold text-bedrock">
                {["5,000+ local partners nationwide", "Service territory in all 50 states", "Customized project support"].map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <Ph d={ph.checkCircle} className="mt-0.5 h-4 w-4 shrink-0 text-brand-ink" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-b border-seam bg-chalk">
          <div className="mx-auto max-w-[1280px] px-5 py-8 md:px-8">
            <ul className="grid gap-4 text-sm font-semibold text-bedrock sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["5,072+", "projects served"],
                ["5,340+", "service locations"],
                ["12+", "years in business"],
              ].map(([n, t]) => (
                <li key={t} className="flex items-center gap-3 rounded-xl border border-seam bg-white px-4 py-3">
                  <span className="font-mono text-lg text-brand-ink">{n}</span>
                  {t}
                </li>
              ))}
              <li className="flex items-center gap-3 rounded-xl border border-seam bg-white px-4 py-3">
                <a href={contact.tel} className="font-mono text-lg text-bedrock transition-colors hover:text-brand-ink">
                  {contact.phone}
                </a>
                central dispatch
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-chalk py-16 md:py-24">
          <div className="mx-auto grid max-w-[1280px] items-start gap-10 px-5 md:grid-cols-[1fr_340px] md:gap-12 md:px-8">
            <div className="space-y-16">
              <div>
                <div className="mb-8">
                  <p className={eyebrow}>What we offer</p>
                  <h2 className="mt-3 text-bedrock">{s.label}</h2>
                </div>
                <ItemGrid items={s.items} />
              </div>
              {s.sections?.map((sec) => (
                <div key={sec.title}>
                  <div className="mb-8">
                    <p className={eyebrow}>{sec.eyebrow}</p>
                    <h2 className="mt-3 text-bedrock">{sec.title}</h2>
                  </div>
                  {sec.image && <img src={sec.image} alt="" loading="lazy" className="mb-6 w-full rounded-2xl border border-seam bg-white object-contain" />}
                  <ItemGrid items={sec.items} />
                </div>
              ))}
            </div>
            <aside className="flex flex-col gap-4 md:sticky md:top-24">
              <div className="rounded-2xl border border-seam bg-white p-6">
                <p className="font-display text-xs font-bold uppercase tracking-widest text-brand-ink">How we work</p>
                <dl className="mt-3 divide-y divide-seam text-sm">
                  {process.map(([title, body]) => (
                    <div key={title} className="py-2.5">
                      <dt className="font-display font-semibold text-bedrock">{title}</dt>
                      <dd className="mt-0.5 text-shale">{body}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="rounded-2xl bg-brand/15 p-5">
                <p className="font-display text-xs font-bold uppercase tracking-widest text-brand-ink">Need it sooner?</p>
                <p className="mt-1 text-sm leading-relaxed text-shale">
                  Call{" "}
                  <a href={contact.tel} className="font-mono font-semibold text-bedrock hover:text-brand-ink">
                    {contact.phone}
                  </a>{" "}
                  or email{" "}
                  <a href={`mailto:${contact.email}`} className="font-semibold text-brand-ink hover:text-bedrock">
                    {contact.email}
                  </a>
                  .
                </p>
              </div>
              <div className="rounded-2xl border border-seam bg-white p-6">
                <p className="font-display text-xs font-bold uppercase tracking-widest text-brand-ink">Other services</p>
                <ul className="mt-3 space-y-2">
                  {others.map((o) => (
                    <li key={o.slug}>
                      <a href={o.href} className="font-display text-sm font-semibold text-bedrock hover:text-brand-ink">
                        {o.label} →
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <CtaBand
          title="Not sure what you need? Give us a call to find out"
          body="A team member will respond to you shortly with the equipment, materials and logistics your project needs."
          cta={[
            { label: "Request a Quote", href: contact.quoteHref },
            { label: "Browse Equipment", href: "/equipment" },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
