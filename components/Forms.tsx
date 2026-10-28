"use client";

import { allEquipment, contact } from "@/lib/content";
import { Outline, Ph, hero, ph } from "./icons";

const inputCls =
  "min-h-11 w-full min-w-0 rounded-lg border px-4 py-2.5 text-sm text-bedrock placeholder:text-clay transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 border-seam focus:border-brand-ink focus:ring-brand h-[52px] !text-base";
const buttonCls =
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-display font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-brand text-bedrock hover:bg-brand-hover focus-visible:ring-brand px-7 py-3.5 text-base gap-2.5 w-full";

// ponytail: the live site has no quote API to post to, so both cards hand off to nationaldispatching.com.
const go = (href: string) => (e: React.FormEvent) => {
  e.preventDefault();
  window.location.href = href;
};

export function QuoteCard() {
  return (
    <div className="rounded-2xl border border-seam bg-white p-5 md:p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand text-bedrock">
          <Outline d={hero.checkCircle} width={2} className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold leading-tight text-bedrock">Request a Quick Quote</h3>
          <p className="mt-0.5 text-sm text-shale" aria-live="polite">
            Enter your job site address to start
          </p>
        </div>
      </div>
      <form onSubmit={go(contact.quoteHref)} className="flex flex-col items-stretch gap-2.5">
        <div className="relative">
          <div className="flex min-w-0 flex-col gap-1.5">
            <input
              className={inputCls}
              type="text"
              autoComplete="shipping street-address"
              placeholder="Start typing your job site address"
              aria-label="Job site address"
              maxLength={200}
            />
          </div>
        </div>
        <button className={buttonCls} type="submit">
          Continue
        </button>
      </form>
    </div>
  );
}

export function ZipCard() {
  return (
    <div className="rounded-2xl border border-seam bg-white p-5 md:p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand text-bedrock">
          <Outline d={hero.pin} width={2} className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold leading-tight text-bedrock">Where is your job site?</h3>
          <p className="mt-0.5 text-sm text-shale">Enter your zip code to check local availability</p>
        </div>
      </div>
      <form onSubmit={go(allEquipment.href)} className="flex flex-col items-stretch gap-2.5">
        <div className="flex min-w-0 flex-col gap-1.5">
          <input
            className={inputCls}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={5}
            placeholder="Enter your zip code"
            aria-label="Enter your zip code"
          />
        </div>
        <button className={buttonCls} type="submit">
          Check Availability
        </button>
      </form>
      <a
        href={contact.locationsHref}
        className="mt-2.5 inline-flex items-center gap-1.5 font-display text-sm font-bold text-brand-ink transition-colors hover:text-bedrock focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <Ph d={ph.mapPin} size={16} />
        Browse service locations
      </a>
    </div>
  );
}
