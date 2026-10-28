"use client";

import NextLink from "next/link";
import { useEffect, useRef } from "react";
import { cart, lineInfo, subtotal, unit, usd, useCart } from "@/lib/cart";

export const btn =
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-display font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
export const btnPrimary = `${btn} bg-brand text-bedrock hover:bg-brand-hover focus-visible:ring-brand`;
export const btnGhost = `${btn} text-bedrock hover:bg-ite focus-visible:ring-seam`;
export const stepper =
  "flex h-11 w-11 items-center justify-center rounded-lg border border-seam text-shale transition-colors hover:bg-ite disabled:cursor-not-allowed disabled:text-seam disabled:hover:bg-white";

export const EmptyCart = ({ onBrowse }: { onBrowse?: () => void }) => (
  <div className="flex h-full flex-col items-center justify-center py-10 text-center">
    <svg className="h-16 w-16 text-seam" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
      />
    </svg>
    <p className="mt-4 font-display text-lg font-bold text-bedrock">Your cart is empty</p>
    <p className="mt-1 text-sm text-shale">Browse our equipment to get started.</p>
    <NextLink href="/equipment" onClick={onBrowse} className={`${btnPrimary} mt-6 px-7 py-3.5 text-base`}>
      Browse Equipment
    </NextLink>
  </div>
);

// Mini cart: the reference site's slide-over cart, holding rental lines instead of tons.
export default function CartDrawer() {
  const { lines, open, ready } = useCart();
  const panel = useRef<HTMLDivElement>(null);
  const close = () => cart.setOpen(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    panel.current?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && cart.setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {open && <div className="fixed inset-0 z-[60] bg-black/40 transition-opacity" onClick={close} aria-hidden="true" />}
      <div className="pointer-events-none fixed inset-0 z-[70] overflow-x-clip">
        <div
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label="Cart"
          aria-hidden={!open}
          inert={!open}
          className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
            open ? "pointer-events-auto translate-x-0" : "pointer-events-none translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-seam px-6 py-4">
            <p className="font-display text-xl font-bold text-bedrock">Your cart</p>
            <button
              type="button"
              onClick={close}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-clay transition-colors hover:bg-ite hover:text-bedrock"
              aria-label="Close cart"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {!ready ? (
              <div className="h-full" aria-busy="true" />
            ) : lines.length === 0 ? (
              <EmptyCart onBrowse={close} />
            ) : (
              <ul className="divide-y divide-seam">
                {lines.map((l, i) => {
                  const { r, rate, total } = lineInfo(l);
                  return (
                    <li key={`${l.slug}-${l.period}`} className="py-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <NextLink href={r.href} onClick={close} className="font-display font-bold text-bedrock hover:text-brand-ink">
                            {r.label}
                          </NextLink>
                          <p className="mt-0.5 text-sm text-shale">
                            {rate ? `${usd(rate)} / ${l.period}` : "Call for pricing"}
                          </p>
                          {l.qty > 1 && (
                            <p className="mt-1 text-xs text-clay">
                              Units: <span className="font-semibold text-bedrock">{l.qty}</span>
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => cart.remove(i)}
                          className="-m-3.5 flex h-11 w-11 shrink-0 items-center justify-center text-clay transition-colors hover:text-signal-red"
                          aria-label={`Remove ${r.label}`}
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button type="button" onClick={() => cart.setLength(i, l.length - 1)} disabled={l.length <= 1} className={stepper} aria-label="Shorter rental">
                            -
                          </button>
                          <span className="w-10 text-center font-display font-bold text-bedrock">{l.length}</span>
                          <button type="button" onClick={() => cart.setLength(i, l.length + 1)} className={stepper} aria-label="Longer rental">
                            +
                          </button>
                          <span className="ml-1 text-sm text-clay">{unit(l.period, l.length).replace(/^\d+ /, "")}</span>
                        </div>
                        <p className="font-display font-bold text-bedrock">{rate ? usd(total) : "—"}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          {lines.length > 0 && (
            <div className="border-t border-seam px-6 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-bold text-bedrock">Subtotal</span>
                <span className="font-display text-xl font-bold text-brand-ink">{usd(subtotal(lines))}</span>
              </div>
              <p className="mt-1 text-xs text-shale">Delivery, REP® and taxes are confirmed by our dispatch team.</p>
              <div className="mt-4 flex flex-col gap-2">
                <NextLink href="/checkout" onClick={close} className={`${btnPrimary} w-full px-7 py-3.5 text-base`}>
                  Proceed to Checkout
                </NextLink>
                <NextLink href="/cart" onClick={close} className={`${btnGhost} w-full px-5 py-2.5 text-sm`}>
                  View cart
                </NextLink>
                <NextLink href="/equipment" onClick={close} className={`${btnGhost} w-full px-5 py-2.5 text-sm`}>
                  Add more equipment to this order
                </NextLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
