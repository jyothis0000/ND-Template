"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __hgRevealFailsafe?: ReturnType<typeof setTimeout>;
  }
}

const STAGGER_MS = 70;
const MAX_STAGGER = 6;
const SELECTOR = "[data-reveal], [data-reveal-stagger]";

// Port of the reference scroll-reveal: fades [data-reveal] in, and the children of
// [data-reveal-stagger] one after another, the first time they scroll into view.
// A MutationObserver picks up blocks from pages streamed in by client-side navigation.
export default function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    clearTimeout(window.__hgRevealFailsafe);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      root.classList.remove("hg-reveal");
      return;
    }
    const reveal = (el: Element, delay = 0) => {
      if (!(el instanceof HTMLElement)) return;
      if (delay) el.style.setProperty("--hg-reveal-delay", `${delay}ms`);
      el.classList.add("hg-revealed");
    };
    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target;
          obs.unobserve(el);
          if (!el.hasAttribute("data-reveal-stagger")) {
            reveal(el);
            continue;
          }
          Array.from(el.children).forEach((child, i) => {
            const target = getComputedStyle(child).display === "contents" ? child.firstElementChild : child;
            if (target) reveal(target, Math.min(i, MAX_STAGGER) * STAGGER_MS);
          });
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    const seen = new WeakSet<Element>();
    const scan = () =>
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        io.observe(el);
      });
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);
  return null;
}
