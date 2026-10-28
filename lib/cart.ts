"use client";

import { useSyncExternalStore } from "react";
import { getRental, type Rental } from "./content";

export type Period = "day" | "week" | "month";
export type CartLine = { slug: string; period: Period; length: number; qty: number };
type State = { lines: CartLine[]; open: boolean; ready: boolean };

// Cart lives in localStorage (per browser). ponytail: no server cart; checkout hands the
// order to dispatch by email, since the live WooCommerce cart can't be written to from here.
const KEY = "nd-cart";
const EMPTY: State = { lines: [], open: false, ready: false };
let state: State = EMPTY;
const listeners = new Set<() => void>();

const set = (next: Partial<State>, persist = true) => {
  state = { ...state, ...next };
  if (persist) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state.lines));
    } catch {}
  }
  listeners.forEach((l) => l());
};

const read = (): CartLine[] => {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(v) ? v.filter((l) => getRental(l?.slug)) : [];
  } catch {
    return [];
  }
};

const subscribe = (l: () => void) => {
  listeners.add(l);
  if (!state.ready) set({ lines: read(), ready: true }, false);
  const onStorage = (e: StorageEvent) => e.key === KEY && set({ lines: read() }, false);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
};

const update = (i: number, patch: Partial<CartLine>) =>
  set({ lines: state.lines.map((l, k) => (k === i ? { ...l, ...patch } : l)) });

export const cart = {
  add(line: CartLine) {
    const i = state.lines.findIndex((l) => l.slug === line.slug && l.period === line.period);
    if (i < 0) set({ lines: [...state.lines, line], open: true });
    else set({ lines: state.lines.map((l, k) => (k === i ? { ...l, length: line.length, qty: l.qty + line.qty } : l)), open: true });
  },
  setLength: (i: number, length: number) => update(i, { length: Math.max(1, length) }),
  setQty: (i: number, qty: number) => update(i, { qty: Math.max(1, qty) }),
  setPeriod: (i: number, period: Period) => update(i, { period }),
  remove: (i: number) => set({ lines: state.lines.filter((_, k) => k !== i) }),
  clear: () => set({ lines: [] }),
  setOpen: (open: boolean) => set({ open }, false),
};

export const useCart = () => useSyncExternalStore(subscribe, () => state, () => EMPTY);

export const dollars = (s: string) => Number(s.replace(/[$,]/g, "")) || 0;
export const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
export const unit = (p: Period, n: number) => `${n} ${p}${n === 1 ? "" : "s"}`;

export const lineInfo = (l: CartLine) => {
  const r = getRental(l.slug) as Rental;
  const rate = dollars(r[l.period]);
  return { r, rate, total: rate * l.length * l.qty };
};
export const subtotal = (lines: CartLine[]) => lines.reduce((sum, l) => sum + lineInfo(l).total, 0);
export const count = (lines: CartLine[]) => lines.reduce((n, l) => n + l.qty, 0);
