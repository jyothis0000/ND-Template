"use client";

import { useState } from "react";
import { allRentals, categories } from "@/lib/content";

const rentals = allRentals.filter((r) => r.day);
import { Ph, ph } from "./icons";

const PERIODS = [
  { key: "day", label: "Day", glyph: "◔" },
  { key: "week", label: "Week", glyph: "◑" },
  { key: "month", label: "Month", glyph: "●" },
] as const;
type Period = (typeof PERIODS)[number]["key"];

const field =
  "h-[52px] w-full rounded-[10px] border-[1.5px] border-seam bg-chalk px-4 text-[15px] font-semibold text-bedrock outline-none focus:border-brand-ink focus:bg-white";
const toggle = (on: boolean) => (on ? "border-bedrock bg-bedrock text-white" : "border-seam bg-white text-bedrock");
const dollars = (s: string) => Number(s.replace(/[$,]/g, ""));
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

// The reference "material calculator", re-pointed at rental math: published rate × number of periods.
// ponytail: no multi-period discount logic, dispatch confirms final pricing.
export default function RentalEstimator({ slug }: { slug: string }) {
  const [current, setCurrent] = useState(rentals.some((x) => x.slug === slug) ? slug : rentals[0].slug);
  const [start, setStart] = useState("");
  const [period, setPeriod] = useState<Period>("day");
  const [qty, setQty] = useState("");

  const r = rentals.find((x) => x.slug === current)!;
  const n = Math.max(0, Math.floor(Number(qty)));
  const unit = period === "day" ? "day" : period === "week" ? "week" : "month";
  const plural = (k: number) => `${k} ${unit}${k === 1 ? "" : "s"}`;

  return (
    <div className="grid items-start gap-6 md:grid-cols-2">
      <div className="flex flex-col gap-5 rounded-[18px] border border-seam bg-white p-6">
        <div>
          <label htmlFor="calc-equipment" className="mb-2 block font-display text-sm font-bold text-bedrock">
            Equipment
          </label>
          <div className="relative">
            <select id="calc-equipment" value={current} onChange={(e) => setCurrent(e.target.value)} className={`${field} cursor-pointer appearance-none pr-11`}>
              {categories.map((c) => (
                <optgroup key={c.slug} label={c.label}>
                  {rentals
                    .filter((x) => x.category === c.slug)
                    .map((x) => (
                      <option key={x.slug} value={x.slug}>
                        {x.label}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
            <svg className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-shale" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <div>
          <label htmlFor="calc-start" className="mb-2 block font-display text-sm font-bold text-bedrock">
            Rental start date
          </label>
          <input id="calc-start" type="date" value={start} onChange={(e) => setStart(e.target.value)} className={`${field} font-mono font-medium`} />
        </div>
        <div>
          <p className="mb-2 font-display text-sm font-bold text-bedrock">Rental period</p>
          <div className="flex gap-2">
            {PERIODS.map((p) => (
              <button
                key={p.key}
                type="button"
                aria-pressed={period === p.key}
                onClick={() => setPeriod(p.key)}
                className={`flex flex-1 cursor-pointer flex-col items-center gap-1 rounded-[10px] border-[1.5px] px-1.5 py-3 ${toggle(period === p.key)}`}
              >
                <span className="text-[19px] leading-none" aria-hidden="true">
                  {p.glyph}
                </span>
                <span className="font-display text-xs font-bold">{p.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 font-display text-sm font-bold text-bedrock">Rental length</p>
          <label className="block text-xs text-shale">
            Number of {unit}s
            <input
              inputMode="numeric"
              value={qty}
              onChange={(e) => setQty(e.target.value.replace(/\D/g, "").slice(0, 3))}
              className="mt-1 h-[46px] w-full rounded-lg border-[1.5px] border-seam bg-chalk px-2.5 font-mono text-[15px] text-bedrock outline-none focus:border-brand-ink focus:bg-white"
            />
          </label>
        </div>
        <div>
          <div className="mb-2 flex items-baseline justify-between gap-2.5">
            <p className="font-display text-sm font-bold text-bedrock">Quick pick</p>
            <span className="text-xs font-semibold text-brand-ink">{r[period]} per {unit}</span>
          </div>
          <div className="flex gap-2">
            {[1, 2, 4].map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={n === k}
                onClick={() => setQty(String(k))}
                className={`h-11 flex-1 cursor-pointer rounded-lg border-[1.5px] font-mono text-sm font-medium ${toggle(n === k)}`}
              >
                {plural(k)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[18px] border border-seam bg-white shadow-[0_18px_44px_-26px_rgba(27,27,27,0.3)] md:sticky md:top-[88px]">
        <div className="bg-bedrock px-5 py-3">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-brand">Your estimate</span>
        </div>
        <div className="p-6" aria-live="polite">
          {n === 0 ? (
            <div className="px-3 py-6 text-center">
              <div className="mx-auto flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-chalk">
                <Ph d={ph.calculator} className="h-6 w-6 text-shale" />
              </div>
              <p className="mt-3.5 font-display text-base font-bold text-bedrock">Enter a rental length to see the math</p>
              <p className="mt-1.5 text-[13.5px] leading-5 text-shale">
                Pick the equipment, a rental period and how long you need it, and we&apos;ll work out the cost from our published rates.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="font-display text-base font-bold text-bedrock">{r.label}</p>
              <dl className="divide-y divide-seam text-sm">
                <div className="flex justify-between gap-3 py-2">
                  <dt className="text-shale">Rate</dt>
                  <dd className="font-mono text-bedrock">
                    {r[period]} / {unit}
                  </dd>
                </div>
                <div className="flex justify-between gap-3 py-2">
                  <dt className="text-shale">Length</dt>
                  <dd className="font-mono text-bedrock">{plural(n)}</dd>
                </div>
                {start && (
                  <div className="flex justify-between gap-3 py-2">
                    <dt className="text-shale">Starting</dt>
                    <dd className="font-mono text-bedrock">{new Date(`${start}T00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</dd>
                  </div>
                )}
              </dl>
              <div className="flex items-baseline justify-between gap-3 border-t border-seam pt-4">
                <span className="font-display text-sm font-bold text-bedrock">Estimated rental</span>
                <span className="font-display text-3xl font-extrabold text-bedrock">{usd(dollars(r[period]) * n)}</span>
              </div>
              <p className="text-[13.5px] leading-5 text-shale">Based on published rates. Final pricing, delivery and REP® are confirmed by our dispatch team.</p>
              <a
                href={r.ndHref}
                className="block w-full rounded-lg bg-brand px-4 py-3 text-center font-display font-bold text-bedrock transition hover:bg-brand-hover"
              >
                Book this rental
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
