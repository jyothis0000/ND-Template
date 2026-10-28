"use client";

import { useState } from "react";
import { cart, unit, type Period } from "@/lib/cart";
import type { Rental } from "@/lib/content";
import { btnPrimary, stepper } from "./CartDrawer";

const PERIODS: Period[] = ["day", "week", "month"];

// Buy box: pick a rate period and length, then add to the mini cart (opens the drawer).
export default function AddToCart({ r }: { r: Rental }) {
  const [period, setPeriod] = useState<Period>("day");
  const [length, setLength] = useState(1);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Rental period">
        {PERIODS.map((p) => (
          <button
            key={p}
            type="button"
            role="radio"
            aria-checked={period === p}
            onClick={() => setPeriod(p)}
            className={`rounded-lg border px-3 py-3 text-center transition-colors ${
              period === p ? "border-bedrock bg-bedrock text-white" : "border-seam bg-chalk text-bedrock hover:border-bedrock"
            }`}
          >
            <span className={`block font-display text-sm font-semibold capitalize ${period === p ? "text-seam" : "text-shale"}`}>{p}</span>
            <span className="mt-0.5 block font-display text-xl font-bold">{r[p]}</span>
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 rounded-lg border border-seam px-3 py-2">
        <span className="font-display text-sm font-semibold text-bedrock">Rental length</span>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setLength(Math.max(1, length - 1))} disabled={length <= 1} className={stepper} aria-label="Shorter rental">
            -
          </button>
          <span className="w-16 text-center font-display font-bold text-bedrock">{unit(period, length)}</span>
          <button type="button" onClick={() => setLength(length + 1)} className={stepper} aria-label="Longer rental">
            +
          </button>
        </div>
      </div>
      <button type="button" onClick={() => cart.add({ slug: r.slug, period, length, qty: 1 })} className={`${btnPrimary} w-full px-4 py-3`}>
        Add to Cart
      </button>
    </div>
  );
}
