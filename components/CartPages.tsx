"use client";

/* eslint-disable @next/next/no-img-element */
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cart, lineInfo, subtotal, unit, usd, useCart, type CartLine, type Period } from "@/lib/cart";
import { contact } from "@/lib/content";
import { productPhone } from "@/lib/products";
import { EmptyCart, btnGhost, btnPrimary, stepper } from "./CartDrawer";
import { Stars } from "./icons";

const input =
  "min-h-11 w-full min-w-0 rounded-lg border px-4 py-2.5 text-sm text-bedrock placeholder:text-clay transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 border-seam focus:border-brand-ink focus:ring-brand";
const label = "font-display text-sm font-semibold text-bedrock";

function OrderSummary({ lines, children }: { lines: CartLine[]; children?: React.ReactNode }) {
  return (
    <aside className="lg:w-80 lg:shrink-0">
      <div className="rounded-lg border border-seam bg-white p-5 lg:sticky lg:top-28">
        <p className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-clay">Order summary</p>
        <ul className="space-y-3">
          {lines.map((l) => {
            const { r, total } = lineInfo(l);
            return (
              <li key={`${l.slug}-${l.period}`} className="flex items-start justify-between gap-3 text-sm">
                <span className="min-w-0">
                  <span className="block font-semibold text-bedrock">{r.label}</span>
                  <span className="text-shale">
                    {unit(l.period, l.length)}
                    {l.qty > 1 ? ` × ${l.qty}` : ""}
                  </span>
                </span>
                <span className="font-mono text-bedrock">{usd(total)}</span>
              </li>
            );
          })}
        </ul>
        <div className="mt-3 flex items-center justify-between border-t border-seam pt-3">
          <span className="font-display font-bold text-bedrock">Subtotal</span>
          <span className="font-display text-lg font-bold text-brand-ink">{usd(subtotal(lines))}</span>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-shale">
          Based on published rates. Delivery, REP® and taxes are confirmed by our dispatch team before your rental is booked.
        </p>
        {children}
      </div>
    </aside>
  );
}

const PERIODS: Period[] = ["day", "week", "month"];

// Full cart page: the drawer's line items with room for rate period and units.
export function CartView() {
  const { lines, ready } = useCart();
  if (!ready) return <div className="h-64" aria-busy="true" />;
  if (lines.length === 0)
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-seam bg-white">
        <EmptyCart />
      </div>
    );
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
      <div className="min-w-0 flex-1">
        <ul className="divide-y divide-seam rounded-2xl border border-seam bg-white">
          {lines.map((l, i) => {
            const { r, rate, total } = lineInfo(l);
            return (
              <li key={`${l.slug}-${l.period}`} className="flex gap-4 p-5">
                <NextLink href={r.href} className="h-20 w-24 shrink-0 overflow-hidden rounded-lg border border-seam bg-white">
                  <img src={r.image} alt="" className="h-full w-full object-cover" />
                </NextLink>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <NextLink href={r.href} className="font-display font-bold text-bedrock hover:text-brand-ink">
                        {r.label}
                      </NextLink>
                      <p className="mt-0.5 text-sm text-shale">{usd(rate)} / {l.period}</p>
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
                  <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <div className="flex gap-1.5" role="radiogroup" aria-label="Rate period">
                      {PERIODS.map((p) => (
                        <button
                          key={p}
                          type="button"
                          role="radio"
                          aria-checked={l.period === p}
                          onClick={() => cart.setPeriod(i, p)}
                          className={`h-11 rounded-lg border px-3 font-display text-xs font-bold capitalize ${
                            l.period === p ? "border-bedrock bg-bedrock text-white" : "border-seam bg-white text-bedrock hover:border-bedrock"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => cart.setLength(i, l.length - 1)} disabled={l.length <= 1} className={stepper} aria-label="Shorter rental">
                        -
                      </button>
                      <span className="w-8 text-center font-display font-bold text-bedrock">{l.length}</span>
                      <button type="button" onClick={() => cart.setLength(i, l.length + 1)} className={stepper} aria-label="Longer rental">
                        +
                      </button>
                      <span className="ml-1 text-sm text-clay">{l.period}s</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => cart.setQty(i, l.qty - 1)} disabled={l.qty <= 1} className={stepper} aria-label="Fewer units">
                        -
                      </button>
                      <span className="w-8 text-center font-display font-bold text-bedrock">{l.qty}</span>
                      <button type="button" onClick={() => cart.setQty(i, l.qty + 1)} className={stepper} aria-label="More units">
                        +
                      </button>
                      <span className="ml-1 text-sm text-clay">units</span>
                    </div>
                    <p className="ml-auto font-display font-bold text-bedrock">{usd(total)}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 flex flex-wrap justify-between gap-3">
          <NextLink href="/equipment" className={`${btnGhost} px-5 py-2.5 text-sm`}>
            ← Add more equipment
          </NextLink>
          <button type="button" onClick={() => cart.clear()} className={`${btnGhost} px-5 py-2.5 text-sm text-shale`}>
            Clear cart
          </button>
        </div>
      </div>
      <OrderSummary lines={lines}>
        <NextLink href="/checkout" className={`${btnPrimary} mt-4 w-full px-7 py-3.5 text-base`}>
          Proceed to Checkout
        </NextLink>
      </OrderSummary>
    </div>
  );
}

const steps = ["Cart", "Details", "Request sent"];

// Checkout: collects job site and contact details, then hands the order to dispatch by email.
export function CheckoutView() {
  const { lines, ready } = useCart();
  const [sent, setSent] = useState(false);
  const router = useRouter();

  if (!ready) return <div className="h-64" aria-busy="true" />;
  if (lines.length === 0 && !sent)
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-seam bg-white">
        <EmptyCart />
      </div>
    );

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const order = lines
      .map((l) => {
        const { r, rate, total } = lineInfo(l);
        return `- ${r.label}: ${unit(l.period, l.length)} x ${l.qty} unit(s) at ${usd(rate)}/${l.period} = ${usd(total)}`;
      })
      .join("\n");
    const body = [
      "Booking request from the website",
      "",
      order,
      `Subtotal (published rates): ${usd(subtotal(lines))}`,
      "",
      `Name: ${f.first} ${f.last}`,
      `Company: ${f.company || "-"}`,
      `Email: ${f.email}`,
      `Phone: ${f.phone}`,
      `Job site: ${f.site}`,
      `Start date: ${f.start}`,
      `Preferred response: ${f.respond}`,
      `Notes: ${f.notes || "-"}`,
    ].join("\n");
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`Rental booking request – ${f.company || `${f.first} ${f.last}`}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const step = sent ? 2 : 1;
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
      <div className="min-w-0 flex-1">
        <div className="mb-6 flex items-center gap-2">
          <span className="flex gap-0.5">
            <Stars className="h-4 w-4 text-brand-ink" />
          </span>
          <p className="font-display text-sm font-semibold text-bedrock">5-star Google reviews · 5,072+ projects served</p>
        </div>
        <nav className="mb-8" aria-label="Checkout progress">
          <ol className="flex items-center gap-2">
            {steps.map((s, i) => (
              <li key={s} className="contents">
                {i > 0 && <span className="h-px w-4 bg-seam" aria-hidden="true" />}
                <span
                  aria-current={i === step ? "step" : undefined}
                  className={`rounded-full px-3 py-1 font-display text-xs font-bold ${
                    i === step ? "bg-bedrock text-white" : i < step ? "bg-brand text-bedrock" : "bg-ite text-shale"
                  }`}
                >
                  {i + 1}. {s}
                </span>
              </li>
            ))}
          </ol>
        </nav>

        {sent ? (
          <div className="rounded-2xl border border-seam bg-white p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold text-bedrock">Your request is ready to send</h2>
            <p className="mt-3 text-shale leading-relaxed">
              Your email app opened with the booking request addressed to {contact.email}. Send it, and a team member will respond to you shortly
              to confirm pricing, delivery and REP®.
            </p>
            <p className="mt-3 text-shale leading-relaxed">
              Didn&apos;t open? Call central dispatch at{" "}
              <a href={contact.tel} className="font-semibold text-bedrock underline decoration-seam underline-offset-4 hover:text-brand-ink">
                {contact.phone}
              </a>{" "}
              or book by phone at{" "}
              <a href={productPhone.tel} className="font-semibold text-bedrock underline decoration-seam underline-offset-4 hover:text-brand-ink">
                {productPhone.label}
              </a>
              .
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={() => setSent(false)} className={`${btnGhost} border border-seam px-5 py-2.5 text-sm`}>
                Edit details
              </button>
              <button
                type="button"
                onClick={() => {
                  cart.clear();
                  router.push("/");
                }}
                className={`${btnPrimary} px-5 py-2.5 text-sm`}
              >
                Done, clear my cart
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5 rounded-2xl border border-seam bg-white p-6 md:p-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="co-first" className={label}>First name *</label>
                <input id="co-first" name="first" required autoComplete="given-name" className={input} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="co-last" className={label}>Last name *</label>
                <input id="co-last" name="last" required autoComplete="family-name" className={input} />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="co-company" className={label}>Company</label>
              <input id="co-company" name="company" autoComplete="organization" className={input} />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="co-email" className={label}>Email *</label>
                <input id="co-email" name="email" type="email" required autoComplete="email" className={input} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="co-phone" className={label}>Phone *</label>
                <input id="co-phone" name="phone" type="tel" required autoComplete="tel" className={input} />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="co-site" className={label}>Job site address *</label>
              <input id="co-site" name="site" required autoComplete="street-address" className={input} />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="co-start" className={label}>Rental start date *</label>
                <input id="co-start" name="start" type="date" required className={input} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="co-respond" className={label}>How can we respond? *</label>
                <select id="co-respond" name="respond" className={input} defaultValue="Email">
                  <option>Email</option>
                  <option>Phone</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="co-notes" className={label}>Notes for dispatch</label>
              <textarea id="co-notes" name="notes" rows={3} className={input} placeholder="Delivery window, site access, COI on file…" />
            </div>
            <button type="submit" className={`${btnPrimary} h-12 w-full text-base`}>
              Send booking request
            </button>
            <p className="text-xs leading-4 text-shale">
              * Sends your order to {contact.email} from your email app. Rentals are confirmed by our dispatch team. REP® provides coverage for
              specified damages or loss to the rental equipment, refundable with a valid Certificate of Insurance (COI) provided before delivery.
            </p>
          </form>
        )}
      </div>
      <OrderSummary lines={lines} />
    </div>
  );
}
