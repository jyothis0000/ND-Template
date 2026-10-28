import { allEquipment, contact } from "@/lib/content";
import { Ph, ph } from "./icons";

const steps = [
  { icon: ph.magnifier, title: "Search Equipment", body: "Browse our wide selection of high-quality rental equipment.", href: allEquipment.href },
  { icon: ph.calculator, title: "Get Your Quote", body: "Tell us what you need and we price it across our vendor network.", href: contact.quoteHref },
  { icon: ph.calendarCheck, title: "Book in Minutes", body: "Reserve your rental online in minutes. Hassle-free and secure." },
  { icon: ph.truckFill, title: "Delivered to Your Site", body: "On time and in perfect condition, so work starts without delay.", final: true },
];

function Step({ s, i, mobile }: { s: (typeof steps)[number]; i: number; mobile?: boolean }) {
  const linked = Boolean(s.href);
  const inner = (
    <>
      <div
        className={`relative w-14 h-14 rounded-full border-2 border-brand flex items-center justify-center transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md ${
          s.final ? "bg-brand text-bedrock" : "bg-white text-bedrock"
        }`}
      >
        <Ph d={s.icon} className="w-6 h-6" />
        <span
          className={`absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full font-display text-[11px] font-bold ${
            s.final ? "bg-bedrock text-white" : "bg-brand text-bedrock"
          }`}
        >
          {i + 1}
        </span>
      </div>
      <h3 className={`font-display font-bold text-bedrock mt-4 ${linked ? "group-hover:underline" : ""}`}>{s.title}</h3>
      <p className={`text-shale text-sm mt-1 max-w-[180px] ${mobile ? "" : "mx-auto"}`}>{s.body}</p>
    </>
  );
  return linked ? (
    <a
      href={s.href}
      className="group flex flex-col items-center p-2 -m-2 rounded-xl transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-chalk text-center"
    >
      {inner}
    </a>
  ) : (
    <div className="group flex flex-col items-center p-2 -m-2 text-center">{inner}</div>
  );
}

// "How Renting Works" band, shared by the homepage and product pages (as in the reference).
export default function HowItWorks() {
  return (
    <section className="bg-chalk py-12 md:py-20">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-bedrock mb-10 text-center">How Renting Works</h2>
        <div className="relative hidden md:block">
          <div className="absolute top-9 left-[12.5%] right-[12.5%] h-0.5 bg-seam" aria-hidden="true" />
          <div className="relative grid grid-cols-4 gap-4">
            {steps.map((s, i) => (
              <Step key={s.title} s={s} i={i} />
            ))}
          </div>
        </div>
        <div className="md:hidden">
          <div className="flex flex-col items-center">
            {steps.map((s, i) => (
              <div key={s.title} className="contents">
                {i > 0 && <div className="w-0.5 h-8 bg-seam mx-auto my-1" />}
                <Step s={s} i={i} mobile />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
