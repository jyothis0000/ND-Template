/* eslint-disable @next/next/no-img-element */
import NextLink from "next/link";
import { categories, contact, footer, type Link } from "@/lib/content";

const social = [
  {
    label: "Facebook",
    href: footer.social.facebook,
    d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "LinkedIn",
    href: footer.social.linkedin,
    d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "YouTube",
    href: footer.social.youtube,
    d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    label: "Instagram",
    href: footer.social.instagram,
    d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
];

const heading = "font-display text-sm font-bold uppercase tracking-wider text-white";
const link = "text-sm text-seam transition-colors hover:text-brand";

function Column({ title, links }: { title: string; links: Link[] }) {
  return (
    <div>
      <h4 className={heading}>{title}</h4>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className={link}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto bg-bedrock text-seam">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[repeat(6,1fr)]">
          <div className="lg:col-span-2">
            <NextLink href="/" className="inline-block">
              <img src="/images/logo-white.svg" alt="National Dispatching" className="h-10 w-auto" width="444" height="131" loading="lazy" />
            </NextLink>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-seam">{footer.about}</p>
            <div className="mt-6 flex gap-4">
              {social.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="text-seam transition-colors hover:text-brand">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <Column title="Equipment" links={categories} />
          <Column title="Services" links={footer.resources} />
          <Column title="Accounts" links={footer.account} />
          <div>
            <Column title="Company" links={footer.company} />
            <div className="mt-6">
              <h4 className={heading}>Contact</h4>
              <div className="mt-3 space-y-1 text-sm text-seam">
                <p>
                  Email:{" "}
                  <a href={`mailto:${contact.email}`} className="break-all transition-colors hover:text-brand">
                    {contact.email}
                  </a>
                </p>
                <p>{contact.hours}</p>
              </div>
              <p className="mt-3 text-sm text-seam">
                Call Us:{" "}
                <a href={contact.tel} className="transition-colors hover:text-brand">
                  {contact.phone}
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <details className="max-w-[640px] text-xs text-seam">
            <summary className="cursor-pointer select-none text-seam transition-colors hover:text-chalk">About National Dispatching</summary>
            <div className="mt-2 leading-relaxed">
              <p>
                National Dispatching, established in 2010, is headquartered in Fresno, California. We are a trusted provider of heavy equipment
                rentals and construction materials, serving clients nationwide. Our founders bring extensive experience operating heavy machinery,
                including bulldozers, excavators and earth-moving equipment, and managing construction projects.
              </p>
              <p style={{ marginTop: "0.6rem" }}>
                We assist contractors of all sizes in acquiring equipment customized to their project requirements. Leveraging our network of over
                5,000 local partners across the nation, National Dispatching serves as a single, reliable source for all equipment and material
                needs, and our logistics and dispatching services keep deliveries on time, optimizing both schedules and budgets.
              </p>
              <p style={{ marginTop: "0.6rem" }}>
                We act as an extension of your team, taking care of the administrative tasks of equipment rental, material procurement and
                dispatching, so you can concentrate on completing projects. Certified Women&apos;s Business Enterprise (WBE).
              </p>
            </div>
          </details>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-seam/30 pt-8 md:flex-row">
          <p className="text-xs text-seam">&copy; 2026 National Dispatching. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-seam">
            {footer.legal.map((l) => (
              <a key={l.label} href={l.href} className="transition-colors hover:text-chalk">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
