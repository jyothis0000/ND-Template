"use client";

import Lenis from "lenis";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { company, focus, hero, industries, prefooter, preloader } from "@/lib/home2/site";

export const ease = [0.14, 0.83, 0.4, 1] as const; // the reference's house curve
export const smooth = [0.65, 0, 0.35, 1] as const; // symmetric in-out for the intro choreography

/* The preloader announces when it has handed over, so the page animates in after it — not on a guessed timer. */
let introDone = false;
const INTRO_EVENT = "nd:intro";
export const finishIntro = () => {
  introDone = true;
  dispatchEvent(new Event(INTRO_EVENT));
};

export function useIntroDone() {
  const [done, setDone] = useState(introDone);
  useEffect(() => {
    if (introDone || !document.querySelector(".pl")) return setDone(true); // pages without a preloader
    const on = () => setDone(true);
    addEventListener(INTRO_EVENT, on);
    return () => removeEventListener(INTRO_EVENT, on);
  }, []);
  return done;
}

let lenis: Lenis | null = null;

/** Inertial scrolling, as on the reference. Kept in module scope so overlays can pause it. */
export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.09 });
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);
  return null;
}

export const lock = (on: boolean) => {
  if (lenis) (on ? lenis.stop() : lenis.start());
  document.documentElement.style.overflow = on ? "hidden" : "";
};

/** Centred rectangle (with a chamfered top-left corner) as a px polygon, so clip-path can tween it. */
const rect = (w: number, h: number, bw: number, bh: number, cut: number) => {
  const x0 = (w - bw) / 2, y0 = (h - bh) / 2, x1 = x0 + bw, y1 = y0 + bh;
  return `polygon(${x0 + cut}px ${y0}px, ${x1}px ${y0}px, ${x1}px ${y1}px, ${x0}px ${y1}px, ${x0}px ${y0 + cut}px)`;
};

/**
 * Initials stack, expand into words, then the hero photo opens from a point to a card to full screen.
 * Only transform, opacity and clip-path animate (no width/height), and the photo is decoded before it opens.
 */
export function Preloader() {
  const [stage, setStage] = useState(0); // 0 words · 1 photo · 2 gone
  const words = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<{ shift: number; w: number; h: number } | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const el = words.current;
      if (!el) return;
      const lead = Math.max(...Array.from(el.querySelectorAll<HTMLElement>(".pl-first"), (s) => s.offsetWidth));
      setGeo({ shift: (el.offsetWidth - lead) / 2, w: innerWidth, h: innerHeight });
    };
    document.fonts.ready.then(measure); // measure with the real font, not the fallback
  }, []);

  const decoded = useRef<Promise<unknown> | null>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStage(2);
      finishIntro();
      return;
    }
    scrollTo(0, 0);
    lock(true);
    const img = new Image();
    img.src = hero.img;
    decoded.current = img.decode().catch(() => {});
    return () => lock(false);
  }, []);

  // the words get their full time from the moment they actually start (after the font is ready)
  useEffect(() => {
    if (!geo || !decoded.current) return;
    let live = true;
    let t: ReturnType<typeof setTimeout>;
    Promise.all([decoded.current, new Promise((r) => setTimeout(r, 1750))]).then(() => {
      if (!live) return;
      setStage(1);
      t = setTimeout(() => {
        setStage(2);
        lock(false);
        finishIntro();
      }, 1500);
    });
    return () => {
      live = false;
      clearTimeout(t);
    };
  }, [geo]);

  return (
    <AnimatePresence>
      {stage < 2 && (
        <motion.div className="pl" exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}>
          <motion.div
            className="pl-words"
            animate={stage === 1 ? { opacity: 0, y: -18, filter: "blur(6px)" } : { opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: smooth }}
          >
            <motion.div
              ref={words}
              className="pl-words-in"
              style={{ visibility: geo ? "visible" : "hidden" }}
              animate={geo ? { x: [geo.shift, geo.shift, 0] } : undefined}
              transition={{ duration: 1.55, times: [0, 0.4, 1], ease: smooth }}
            >
              {preloader.map((w, i) => (
                <div key={w} className="pl-word">
                  <span className="pl-mask">
                    <motion.span
                      className="pl-first"
                      initial={{ y: "100%" }}
                      animate={geo ? { y: "0%" } : undefined}
                      transition={{ delay: i * 0.07, duration: 0.7, ease: smooth }}
                    >
                      {w[0]}
                    </motion.span>
                  </span>
                  <motion.span
                    className="pl-rest"
                    initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
                    animate={geo ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
                    transition={{ delay: 0.62 + i * 0.05, duration: 0.9, ease: smooth }}
                  >
                    {w.slice(1)}
                  </motion.span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {stage === 1 && geo && (
            <motion.div
              className="pl-img"
              initial={{ clipPath: rect(geo.w, geo.h, 0, 0, 0) }}
              animate={{
                clipPath: [rect(geo.w, geo.h, 0, 0, 0), rect(geo.w, geo.h, 320, 200, 40), rect(geo.w, geo.h, geo.w, geo.h, 0)],
              }}
              transition={{ duration: 1.45, times: [0, 0.36, 1], ease: smooth }}
            >
              <motion.img src={hero.img} alt="" initial={{ scale: 1.3 }} animate={{ scale: 1 }} transition={{ duration: 1.45, ease: smooth }} />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Underline that slides out right and back in from the left on hover. */
export function LineLink({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) {
  return (
    <a href={href} className="ll" {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}>
      {children}
      <span className="ll-line" aria-hidden>
        <i />
        <i />
      </span>
    </a>
  );
}

export function ArrowLink({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) {
  return (
    <a href={href} className="al" {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}>
      <span className="al-text">{children}</span>
      <span className="al-dot" aria-hidden>
        <svg viewBox="0 0 16 16" width="12" height="12">
          <path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </span>
    </a>
  );
}

const companyLinks = [
  ["About us", "/home2#about"],
  ["How it works", "/home2#approach"],
  ["Latest insights", "/home2#shows"],
  ["Contact", "/home2#contact"],
  ["Privacy", "/home2/privacy"],
];

function Offices() {
  return (
    <div className="offices">
      {company.offices.map((o) => (
        <div key={o.name}>
          <p className="t-semi">{o.name}</p>
          <p>
            {o.lines[0]}
            <br />
            {o.lines[1]}
          </p>
          <LineLink href={company.phoneHref}>{o.phone}</LineLink>
          <LineLink href={`mailto:${company.email}`}>E-mail</LineLink>
        </div>
      ))}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const ready = useIntroDone();
  const wasOpen = useRef(false);
  useEffect(() => {
    // only touch the scroll lock when the menu actually toggles — never on mount, mid-preloader
    if (open === wasOpen.current) return;
    wasOpen.current = open;
    lock(open);
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [open]);
  const close = () => setOpen(false);

  return (
    <>
      <motion.button
        className={`menu-btn ${open ? "is-open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Menu"
        initial={{ opacity: 0, y: -14 }}
        animate={ready ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.25, duration: 0.9, ease: smooth }}
      >
        <span className="menu-btn-text">
          <span>Menu</span>
          <span>Close</span>
        </span>
        <span className="menu-btn-icon" aria-hidden>
          <i />
          <i />
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="menu"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.9, ease }}
            data-lenis-prevent
          >
            <img className="menu-bg" src={prefooter} alt="" />
            <motion.span className="menu-line" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 1.1, ease }} />
            <div className="menu-grid">
              <div>
                <p className="menu-label">Our services</p>
                {focus.map((f, i) => (
                  <motion.a
                    key={f.title}
                    href="/home2#focus"
                    className="menu-xl"
                    onClick={close}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.05, duration: 0.9, ease }}
                  >
                    {f.title}
                  </motion.a>
                ))}
              </div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}>
                <p className="menu-label">Equipment</p>
                <a href="/home2#work" className="menu-m" onClick={close}>Popular rentals</a>
                <p className="menu-label menu-label-gap">Company</p>
                {companyLinks.map(([l, h]) => (
                  <a key={h} href={h} className="menu-m" onClick={close}>{l}</a>
                ))}
              </motion.div>
            </div>
            <motion.div className="menu-foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }}>
              <div className="socials">
                {company.socials.map((s) => (
                  <LineLink key={s.label} href={s.href} external>{s.label}</LineLink>
                ))}
              </div>
              <Offices />
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

/** Grey disc that trails the pointer over anything marked data-explore. */
export function ExploreCursor() {
  const x = useSpring(useMotionValue(-200), { stiffness: 260, damping: 28 });
  const y = useSpring(useMotionValue(-200), { stiffness: 260, damping: 28 });
  const [label, setLabel] = useState<string | null>(null);
  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as Element;
      const t = el.closest?.("[data-no-explore]") ? null : el.closest?.("[data-explore]");
      setLabel(t ? t.getAttribute("data-explore") || "Explore" : null);
    };
    addEventListener("pointermove", move);
    return () => removeEventListener("pointermove", move);
  }, [x, y]);
  return (
    <motion.span
      className="cursor"
      style={{ left: x, top: y }}
      animate={{ scale: label ? 1 : 0 }}
      transition={{ duration: 0.4, ease }}
      aria-hidden
    >
      {label}
    </motion.span>
  );
}

/*
 * This site sets no cookies, runs no analytics and loads nothing from third parties, so there is nothing to
 * consent to. We still say so once, plainly. Remembering that the visitor closed this note is the only storage.
 */
export function PrivacyNote() {
  const [show, setShow] = useState(false);
  const ready = useIntroDone();
  useEffect(() => {
    if (!ready) return;
    let t: ReturnType<typeof setTimeout> | undefined;
    try {
      if (!localStorage.getItem("nd-note")) t = setTimeout(() => setShow(true), 1800);
    } catch {}
    return () => clearTimeout(t);
  }, [ready]);
  const ok = () => {
    try {
      localStorage.setItem("nd-note", "1");
    } catch {}
    setShow(false);
  };
  return (
    <AnimatePresence>
      {show && (
        <motion.aside
          className="note"
          role="status"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease }}
        >
          <p>
            <b>No cookies, no tracking.</b> This site sets no cookies and loads nothing from third parties. <a href="/home2/privacy">Privacy</a>
          </p>
          <button onClick={ok}>OK</button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

// Current year, read in the browser only: this app prerenders pages (Cache Components), which can't call
// `new Date()` while building, so the server HTML leaves it out and the year fills in on load.
const noSubscribe = () => () => {};
function Year() {
  return useSyncExternalStore(noSubscribe, () => new Date().getFullYear(), () => null);
}

export function Footer() {
  return (
    <footer id="contact">
      <section className="pf">
        <img src={prefooter} alt="" className="pf-bg" />
        <div className="pf-inner">
          <div>
            <p className="t-semi">Our services</p>
            {focus.map((f) => (
              <a key={f.title} href="/home2#focus" className="pf-xl">
                {f.title}
              </a>
            ))}
          </div>
          <div>
            <p className="t-semi">Industries we serve</p>
            <ul className="pf-list">
              {industries.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="ft">
        <div className="ft-top">
          <nav>
            <a href="/home2#focus" className="ft-on">
              Our services <span aria-hidden>+</span>
            </a>
            <a href="/home2#work">Popular rentals</a>
            <a href="/home2#approach">How it works</a>
            <a href="/home2#shows">Insights</a>
            <a href={company.phoneHref}>Call {company.phone}</a>
          </nav>
          <img src="/images/home2/logo-white.svg" alt="National Dispatching" className="ft-logo" />
        </div>
        <div className="ft-mid">
          <Offices />
          <div className="socials">
            {company.socials.map((s) => (
              <LineLink key={s.label} href={s.href} external>{s.label}</LineLink>
            ))}
          </div>
        </div>
        <div className="ft-bottom">
          <span>
            © <Year /> {company.legal}. {company.group}.
          </span>
          <a href="#top" className="ft-top-link">
            Back to top <span aria-hidden>↑</span>
          </a>
          <span className="ft-legal">
            <a href="/home2/privacy">Privacy</a>
            <a href={company.terms} target="_blank" rel="noreferrer noopener">
              Terms of use
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
