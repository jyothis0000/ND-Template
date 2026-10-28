"use client";

import NextLink from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  allEquipment,
  categories,
  contact,
  guides,
  locationOptions,
  mobileBigLinks,
  moreLinks,
  rentals,
  services,
  type Link,
} from "@/lib/content";
import { cart, count, useCart } from "@/lib/cart";
import CartDrawer from "./CartDrawer";
import { Outline, Ph, hero, ph } from "./icons";

type Menu = "shop" | "services" | "more" | null;

const popular = rentals.slice(0, 6);
const dropLink = "block py-2 font-display text-sm font-semibold text-bedrock transition-colors hover:text-brand-ink";
const dropEyebrow = "mb-2 font-display text-xs font-bold uppercase tracking-wider text-clay";
const mobileLink = "border-b border-white/20 py-3 font-display text-2xl font-bold text-white opacity-90 hover:opacity-100";
const mobileEyebrow = "pb-1 pt-6 font-display text-xs font-bold uppercase tracking-widest text-white/70";
const inputCls =
  "min-h-11 w-full min-w-0 rounded-lg border px-4 py-2.5 text-sm text-bedrock placeholder:text-clay transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 border-seam focus:border-brand-ink focus:ring-brand";

const Caret = ({ open }: { open: boolean }) => (
  <Ph d={ph.caret} size={14} className={`transition-transform ${open ? "-rotate-90" : "rotate-90"}`} />
);

function Dropdown({
  label,
  id,
  open,
  setOpen,
  eyebrow,
  links,
}: {
  label: string;
  id: Exclude<Menu, null>;
  open: Menu;
  setOpen: (m: Menu) => void;
  eyebrow?: string;
  links: Link[];
}) {
  const isOpen = open === id;
  return (
    <div className="relative" onMouseEnter={() => setOpen(id)} onMouseLeave={() => setOpen(null)}>
      <button
        type="button"
        onClick={() => setOpen(isOpen ? null : id)}
        className="flex items-center gap-1 font-display text-sm font-semibold transition-colors hover:text-brand-ink text-bedrock"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <Caret open={isOpen} />
      </button>
      {isOpen && (
        <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
          <div className="w-[240px] rounded-xl border border-seam bg-white p-5 shadow-lg">
            {eyebrow && <p className={dropEyebrow}>{eyebrow}</p>}
            {links.map((l) => (
              <a key={l.label} href={l.href} className={dropLink}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LocationOptions({ value, onPick }: { value: string | null; onPick: (v: string) => void }) {
  return (
    <>
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-clay">Choose a location</p>
      {locationOptions.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onPick(o)}
          className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
            value === o ? "bg-brand/10 font-semibold text-bedrock" : "text-shale hover:bg-chalk"
          }`}
        >
          <Outline d={hero.pin} width={2} className="h-3.5 w-3.5 text-clay" />
          {o}
        </button>
      ))}
    </>
  );
}

// Cart icon with the item-count badge from the reference header; opens the mini cart.
function CartButton({
  className,
  iconClassName,
  onOpen,
  badge = "absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-bedrock",
}: {
  className: string;
  iconClassName: string;
  onOpen?: () => void;
  badge?: string;
}) {
  const n = count(useCart().lines);
  return (
    <button
      type="button"
      onClick={() => {
        onOpen?.();
        cart.setOpen(true);
      }}
      className={className}
      aria-label={n ? `Open cart, ${n} item${n === 1 ? "" : "s"}` : "Open cart"}
    >
      <Ph d={ph.cart} className={iconClassName} />
      {n > 0 && <span className={badge}>{n}</span>}
    </button>
  );
}

function SearchForm({ onClose }: { onClose: () => void }) {
  return (
    <form action={contact.searchAction} method="get" role="search" className="flex min-w-0 flex-1 items-center gap-2">
      <input name="s" type="search" autoFocus placeholder="Search equipment" aria-label="Search equipment" className={inputCls} />
      <button
        type="button"
        onClick={onClose}
        aria-label="Close search"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-bedrock transition-colors hover:bg-ite hover:text-brand-ink"
      >
        <Ph d={ph.close} size={20} />
      </button>
    </form>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState<Menu>(null);
  const [search, setSearch] = useState<"desktop" | "mobile" | null>(null);
  const [locOpen, setLocOpen] = useState<"desktop" | "mobile" | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const locRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      setOpen(null);
      setLocOpen(null);
      setSearch(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    if (locOpen !== "desktop") return;
    const onDown = (e: MouseEvent) => {
      if (!locRef.current?.contains(e.target as Node)) setLocOpen(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [locOpen]);

  const pickLocation = (v: string) => {
    setLocation(v);
    setLocOpen(null);
  };

  return (
    <>
      <div className="bg-bedrock text-chalk" data-national-announcement="true">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 py-2 text-center text-xs md:px-8">
          <a href={contact.quoteHref} className="font-display font-semibold transition-colors hover:text-brand">
            Request a Quick Quote
          </a>
          <span className="hidden text-chalk/30 sm:inline" aria-hidden="true">
            |
          </span>
          <a href={contact.tel} className="font-display font-semibold transition-colors hover:text-brand">
            Central Dispatch <span className="font-mono">{contact.phone}</span>
          </a>
        </div>
      </div>

      <header
        className={`sticky z-50 transition-all duration-200 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"}`}
        style={{ top: 0 }}
        role="banner"
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-4 md:px-8">
          <div className="flex min-w-0 items-center gap-4 lg:gap-8">
            <NextLink href="/" className="flex shrink-0 items-center gap-2" aria-label="National Dispatching - Home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo-dark.svg" alt="National Dispatching" className="h-9 w-auto md:h-11" width="444" height="131" />
            </NextLink>
            <div ref={locRef} className="relative hidden min-w-0 md:block">
              <button
                type="button"
                onClick={() => setLocOpen(locOpen ? null : "desktop")}
                className="flex max-w-full items-center gap-1.5 rounded-full border border-seam bg-chalk px-3 py-1.5 text-sm transition-colors hover:border-brand hover:bg-brand/5"
                aria-expanded={locOpen === "desktop"}
                aria-haspopup="true"
              >
                <Outline d={hero.pin} width={2} className={`h-4 w-4 shrink-0 ${location ? "text-brand-ink" : "text-clay"}`} />
                <span className={`truncate font-display font-semibold ${location ? "max-w-[240px] text-bedrock" : "text-shale"}`}>
                  {location ?? "Set Location"}
                </span>
              </button>
              {locOpen === "desktop" && (
                <div className="absolute left-0 top-full z-50 mt-2 min-w-64 rounded-xl border border-seam bg-white p-4 shadow-lg" role="menu">
                  <LocationOptions value={location} onPick={pickLocation} />
                </div>
              )}
            </div>
          </div>

          <nav className={`hidden items-center gap-4 md:flex lg:gap-6 ${search === "desktop" ? "flex-1" : ""}`} aria-label="Main navigation">
            {search === "desktop" ? (
              <SearchForm onClose={() => setSearch(null)} />
            ) : (
              <>
                <div className="relative" onMouseEnter={() => setOpen("shop")} onMouseLeave={() => setOpen(null)}>
                  <button
                    type="button"
                    onClick={() => setOpen(open === "shop" ? null : "shop")}
                    className="flex items-center gap-1 whitespace-nowrap font-display text-sm font-semibold text-bedrock transition-colors hover:text-brand-ink"
                    aria-expanded={open === "shop"}
                    aria-haspopup="true"
                  >
                    Rent Equipment
                    <Caret open={open === "shop"} />
                  </button>
                  {open === "shop" && (
                    <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
                      <div className="flex w-[680px] gap-8 rounded-xl border border-seam bg-white p-6 shadow-lg">
                        <div className="flex-1">
                          <p className={dropEyebrow}>Most Popular</p>
                          {popular.map((l) => (
                            <a key={l.href} href={l.href} className={dropLink}>
                              {l.label}
                            </a>
                          ))}
                        </div>
                        <div className="flex-1 border-l border-seam pl-8">
                          <p className={dropEyebrow}>Shop by Category</p>
                          {categories.map((l) => (
                            <a key={l.href} href={l.href} className={dropLink}>
                              {l.label}
                            </a>
                          ))}
                          <a
                            href={allEquipment.href}
                            className="mt-2 block border-t border-seam pt-3 font-display text-sm font-bold text-brand-ink transition-colors hover:text-bedrock"
                          >
                            {allEquipment.label} →
                          </a>
                        </div>
                        <div className="flex-1 border-l border-seam pl-8">
                          <p className={dropEyebrow}>Help Me Choose</p>
                          {guides.map((l) => (
                            <a key={l.href} href={l.href} className={dropLink}>
                              {l.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <Dropdown label="Services" id="services" open={open} setOpen={setOpen} eyebrow="Our Services" links={services} />
                <Dropdown label="More" id="more" open={open} setOpen={setOpen} links={moreLinks} />
                <button
                  type="button"
                  onClick={() => setSearch("desktop")}
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-bedrock transition-colors hover:bg-ite hover:text-brand-ink"
                  aria-label="Search"
                  aria-expanded={false}
                >
                  <Ph d={ph.search} size={22} />
                </button>
              </>
            )}
            <a
              href={contact.quoteHref}
              className="hidden whitespace-nowrap rounded-lg bg-brand px-5 py-2.5 font-display text-sm font-bold text-bedrock transition-colors hover:bg-brand-hover lg:block"
            >
              Get a Quote
            </a>
            <CartButton
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-bedrock transition-colors hover:bg-ite hover:text-brand-ink"
              iconClassName="h-7 w-7"
            />
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setSearch(search === "mobile" ? null : "mobile")}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-bedrock"
              aria-label="Search"
              aria-expanded={search === "mobile"}
            >
              <Ph d={ph.search} size={22} />
            </button>
            <CartButton className="relative flex h-10 w-10 items-center justify-center rounded-lg text-bedrock" iconClassName="h-5 w-5" />
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative z-50 flex h-10 w-10 items-center justify-center"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <div className="flex w-6 flex-col gap-1.5" aria-hidden="true">
                <span className={`block h-0.5 w-full bg-bedrock transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
                <span className={`block h-0.5 w-full bg-bedrock transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-full bg-bedrock transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {search === "mobile" && (
          <div className="flex border-t border-seam px-4 py-3 md:hidden">
            <SearchForm onClose={() => setSearch(null)} />
          </div>
        )}

        <div className="flex items-center justify-start gap-2 border-t border-seam bg-chalk px-4 py-2 md:hidden">
          <Outline d={hero.pin} width={2} className={location ? "h-3.5 w-3.5 shrink-0 text-brand-ink" : "h-3.5 w-3.5 text-clay"} />
          {location && <span className="min-w-0 truncate text-xs font-display font-semibold text-bedrock">{location}</span>}
          <button
            type="button"
            onClick={() => setLocOpen("mobile")}
            className="text-xs font-display font-semibold text-brand-ink transition-colors hover:text-bedrock"
          >
            {location ? "Change" : "Set Location"}
          </button>
        </div>
      </header>

      {locOpen === "mobile" && (
        <>
          <div className="fixed inset-0 z-50 bg-black/40 md:hidden" onClick={() => setLocOpen(null)} aria-hidden="true" />
          <div className="fixed left-4 right-4 top-24 z-50 rounded-xl border border-seam bg-white p-4 shadow-lg md:hidden" role="dialog" aria-label="Set location">
            <LocationOptions value={location} onPick={pickLocation} />
          </div>
        </>
      )}

      <div
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-59 bg-black/10 transition-opacity duration-300 ease-in-out md:hidden ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 top-0 z-60 overflow-x-clip md:hidden" style={{ height: "100dvh" }}>
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
          inert={!menuOpen}
          className={`absolute inset-y-0 right-0 flex w-4/5 flex-col overflow-y-auto bg-bedrock px-7 pb-12 pt-5 transition-transform duration-300 ease-in-out ${
            menuOpen ? "pointer-events-auto translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <NextLink href="/" aria-label="National Dispatching - Home" onClick={() => setMenuOpen(false)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo-white.svg" alt="National Dispatching" className="h-12 w-auto" />
            </NextLink>
            <div className="flex items-center gap-1">
              <CartButton
                className="relative flex h-11 w-11 items-center justify-center text-white"
                iconClassName="h-6 w-6"
                onOpen={() => setMenuOpen(false)}
                badge="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-bedrock"
              />
              <button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)} className="-mr-1 flex h-11 w-11 items-center justify-center text-white">
                <Ph d={ph.close} size={28} />
              </button>
            </div>
          </div>
          <nav className="mt-8 flex flex-col" aria-label="Mobile menu">
            <p className="pb-1 font-display text-xs font-bold uppercase tracking-widest text-white/70">Most Popular</p>
            {popular.map((l) => (
              <a key={l.href} href={l.href} className={mobileLink}>
                {l.label}
              </a>
            ))}
            <p className={mobileEyebrow}>Shop by Category</p>
            {[...categories, allEquipment].map((l) => (
              <a key={l.href} href={l.href} className={mobileLink}>
                {l.label}
              </a>
            ))}
            <p className={mobileEyebrow}>Help Me Choose</p>
            {guides.map((l) => (
              <a key={l.href} href={l.href} className={mobileLink}>
                {l.label}
              </a>
            ))}
            <p className={mobileEyebrow}>Services</p>
            {services.map((l) => (
              <a key={l.href} href={l.href} className={mobileLink}>
                {l.label}
              </a>
            ))}
            <div className="mt-6 flex flex-col">
              {mobileBigLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="flex items-center justify-between border-b border-white/20 py-4 font-display text-3xl font-bold text-white last:border-0 opacity-90 hover:opacity-100"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </nav>
          <div className="mt-auto pt-10 space-y-3">
            <a
              href={contact.quoteHref}
              className="flex items-center gap-3 whitespace-nowrap rounded-xl bg-brand px-5 py-4 font-display text-lg font-bold text-bedrock transition-colors hover:bg-brand-hover"
            >
              <Ph d={ph.tag} size={24} className="shrink-0 text-bedrock" />
              Get a Quote
            </a>
          </div>
        </div>
      </div>
      <CartDrawer />
    </>
  );
}
