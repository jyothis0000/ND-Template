import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Blocks";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outline, hero } from "@/components/icons";
import { allEquipment, contact, services } from "@/lib/content";
import { productPhone } from "@/lib/products";

export const metadata: Metadata = {
  title: "Contact Us | National Dispatching",
  description: "Call central dispatch at 888.705.5616 or email dispatch@nationaldispatching.com. Corporate office in Fresno, CA.",
};

const link = "mt-1 block font-semibold text-bedrock underline decoration-seam underline-offset-4 hover:text-brand-ink";
const tile = "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand text-bedrock";

// The reference Contact page ("Ways to reach us") with ND's details and its message form.
export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <section className="bg-chalk py-8 md:py-12">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <Breadcrumb className="mb-4 text-sm text-shale" trail={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-display text-sm font-bold uppercase tracking-widest text-shale">Get in touch</p>
              <h1 className="mt-2 text-bedrock">Contact us</h1>
              <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-shale md:text-lg">
                We offer a wide range of rental solutions for your job site. Call central dispatch, email us, or send a message and a team member will
                respond to you shortly.
              </p>
            </div>
          </div>
        </section>
        <section className="bg-white pt-8 pb-16 md:py-16">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
              <div className="rounded-2xl border border-seam bg-chalk p-8 md:p-10">
                <h2 className="text-2xl text-bedrock">Ways to reach us</h2>
                <div className="mt-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className={tile}>
                      <Outline d={hero.phone} className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-display text-sm font-bold text-bedrock">Phone</p>
                      <p className="mt-2 text-base text-shale">
                        Central dispatch
                        <a href={contact.tel} className={link}>
                          {contact.phone}
                        </a>
                      </p>
                      <p className="mt-3 text-base text-shale">
                        Book equipment by phone
                        <a href={productPhone.tel} className={link}>
                          {productPhone.label}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className={tile}>
                      <Outline d={hero.mail} className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-display text-sm font-bold text-bedrock">Email</p>
                      <a href={`mailto:${contact.email}`} className={link}>
                        {contact.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className={tile}>
                      <Outline d={hero.pin} className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-display text-sm font-bold text-bedrock">Corporate office</p>
                      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`} className={link} target="_blank" rel="noopener noreferrer">
                        {contact.address}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className={tile}>
                      <Outline d={hero.clock} className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-display text-sm font-bold text-bedrock">Hours</p>
                      <dl className="mt-1 space-y-0.5 text-base text-shale">
                        <div className="flex flex-wrap gap-x-2">
                          <dt>Dispatch:</dt>
                          <dd>Customized project support</dd>
                        </div>
                        <div className="flex flex-wrap gap-x-2">
                          <dt>Monday to Friday:</dt>
                          <dd>7:00 AM to 5:00 PM PST</dd>
                        </div>
                        <div className="flex flex-wrap gap-x-2">
                          <dt>Saturday – Sunday:</dt>
                          <dd>Closed</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="mt-8 border-t border-seam pt-6">
                  <p className="font-display text-sm font-bold text-bedrock">Helpful links</p>
                  <ul className="mt-3 space-y-3">
                    <li>
                      <a href={allEquipment.href} className="block font-semibold text-bedrock underline decoration-seam underline-offset-4 hover:text-brand-ink">
                        Browse rental equipment
                      </a>
                    </li>
                    {services.slice(1, 3).map((s) => (
                      <li key={s.slug}>
                        <a href={s.href} className="block font-semibold text-bedrock underline decoration-seam underline-offset-4 hover:text-brand-ink">
                          See our {s.label.toLowerCase()} services
                        </a>
                      </li>
                    ))}
                    <li>
                      <a href="/locations" className="block font-semibold text-bedrock underline decoration-seam underline-offset-4 hover:text-brand-ink">
                        Check our service territory
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="rounded-2xl border border-seam bg-white p-8 md:p-10">
                <h2 className="text-2xl text-bedrock">Send us a message</h2>
                <p className="mt-2 mb-6 text-shale">A team member will respond to you shortly.</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
        <section className="bg-chalk py-12 md:py-16">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-base leading-relaxed text-shale">
                National Dispatching provides professional procurement and dispatching solutions for the construction industry, enabling contractors
                and project teams to streamline operations through centralized control. We centralize equipment sourcing and material procurement, with
                integrated logistics coordination to ensure efficient and reliable execution across project sites.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
