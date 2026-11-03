import type { Metadata } from "next";
import { Breadcrumb, CtaBand } from "@/components/Blocks";
import CoverageMap from "@/components/CoverageMap";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { contact, states } from "@/lib/content";

export const metadata: Metadata = {
  title: "Equipment Rental Service Areas in the United States | National Dispatching",
  description: "Service territory via our qualified partner network across all 50 states.",
};

const total = states.reduce((n, s) => n + s.count, 0);

// The reference "Looking for gravel in your state?" page, with ND's service areas per state.
export default function LocationsPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <div className="bg-chalk pt-6">
          <Breadcrumb className="mx-auto max-w-[1280px] px-5 md:px-8 text-sm text-shale" trail={[{ label: "Home", href: "/" }, { label: "Locations" }]} />
        </div>
        <section className="bg-chalk py-16 md:py-20">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <h1 className="text-center font-display text-3xl font-extrabold text-bedrock md:text-5xl">Equipment Rental Service Areas in the United States</h1>
            <p className="mt-5 max-w-3xl mx-auto text-center text-lg text-shale leading-relaxed">
              Service territory via our qualified partner network: {total.toLocaleString("en-US")} service areas across all 50 states. Our main office
              is in Fresno, California, and one call to dispatch covers rentals, materials and trucking wherever your job site is.
            </p>
            <div className="mt-10 rounded-2xl border border-seam bg-white p-5">
              <CoverageMap />
              <p className="mt-5 text-center text-sm text-shale">Click a state on the map above or select from the list below</p>
            </div>
          </div>
        </section>
        <section className="bg-white py-12 md:py-16">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <h2 className="mb-2 text-center text-2xl font-extrabold text-bedrock md:text-3xl">Browse Service Areas by State</h2>
            <div className="mx-auto mt-2 h-[3px] w-16 rounded-sm bg-brand" />
            <p className="mt-4 mb-10 max-w-3xl mx-auto text-center text-lg text-shale leading-relaxed">
              Pick a state to see the cities we serve and the equipment available in that region.
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {states.map((s) => (
                <a key={s.slug} href={s.href} className="group rounded-xl border border-seam bg-white p-4 text-center transition-colors hover:border-clay">
                  <span className="font-display font-bold text-bedrock transition-colors group-hover:text-brand-ink">{s.name}</span>
                  <span className="mt-1 block font-mono text-xs text-shale">{s.count} service areas</span>
                </a>
              ))}
            </div>
          </div>
        </section>
        <CtaBand
          title="Need help finding the right equipment?"
          body="We serve contractors both large and small. We can fulfill all your requirements with just one call."
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
