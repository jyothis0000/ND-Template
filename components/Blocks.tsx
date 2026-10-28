/* eslint-disable @next/next/no-img-element -- static assets, sizes are fixed by the design */
import NextLink from "next/link";
import type { Rental } from "@/lib/content";
import { Outline, hero } from "./icons";

// Product card from the reference listing / homepage grid.
export function ProductCard({ r, badge }: { r: Rental; badge?: string }) {
  return (
    <div className="pcard group relative flex flex-col rounded-2xl bg-white border border-seam overflow-hidden hover:shadow-md transition">
      <div className="pcard-gallery aspect-[4/3] bg-ite overflow-x-auto overflow-y-hidden flex snap-x snap-mandatory" role="region" aria-label={`${r.label} photo`}>
        <a href={r.href} className="h-full w-full flex-shrink-0 snap-start" tabIndex={-1} aria-hidden="true" draggable={false}>
          <img src={r.image} alt={r.label} className="pcard-gallery-img h-full w-full object-cover" loading="lazy" width={750} height={475} draggable={false} />
        </a>
      </div>
      {badge && (
        <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-bedrock/85 px-2.5 py-1 font-display text-[11px] font-bold uppercase tracking-wider text-white">
          {badge}
        </span>
      )}
      <a href={r.href} className="block flex-1">
        <div className="p-4">
          <h2 className="font-display font-bold text-base text-bedrock leading-snug group-hover:text-brand-ink transition-colors">{r.label}</h2>
          <p className="font-display text-sm text-shale leading-snug mb-2">
            {r.day ? `Day ${r.day} · Week ${r.week} · Month ${r.month}` : "Call for pricing"}
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
  );
}

// Dark closing band used across the reference's inner pages.
export function CtaBand({ title, body, cta }: { title: React.ReactNode; body: string; cta: { label: string; href: string }[] }) {
  return (
    <section className="bg-bedrock py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 text-center md:px-8">
        <h2 className="text-white">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-seam">{body}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {cta.map((c, i) => (
            <a
              key={c.href}
              href={c.href}
              className={
                i === 0
                  ? "whitespace-nowrap inline-flex items-center justify-center rounded-lg bg-brand px-8 py-4 font-display font-bold text-bedrock transition-colors hover:bg-brand-hover"
                  : "inline-flex items-center justify-center rounded-lg border-2 border-shale px-8 py-4 font-display font-bold text-white transition-colors hover:border-brand hover:text-brand"
              }
            >
              {c.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Breadcrumb({ trail, className = "mb-4 text-sm text-shale" }: { trail: { label: string; href?: string }[]; className?: string }) {
  return (
    <nav className={className} aria-label="Breadcrumb">
      {trail.map((t, i) => (
        <span key={t.label}>
          {i > 0 && <span className="mx-2">/</span>}
          {t.href ? (
            <NextLink href={t.href} className="text-bedrock no-underline hover:underline">
              {t.label}
            </NextLink>
          ) : (
            <span className="text-shale" aria-current="page">
              {t.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
