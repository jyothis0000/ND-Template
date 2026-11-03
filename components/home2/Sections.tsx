"use client";

import { AnimatePresence, motion, useInView, useMotionValue, useSpring, useTransform, useVelocity } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { approach, shows, voices, work } from "@/lib/home2/site";
import { ArrowLink, ease } from "./Chrome";

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 1.2, delay, ease },
});

const Arrow = ({ flip }: { flip?: boolean }) => (
  <svg viewBox="0 0 16 16" width="12" height="12" style={flip ? { transform: "scaleX(-1)" } : undefined}>
    <path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

type Item = (typeof work.rows)[number][number];

/** Image wipes up from a 40% inset while settling from a slight zoom (reference: data-imageanimate). */
function Card({ p, i }: { p: Item; i: number }) {
  return (
    <motion.a
      href={work.all}
      target="_blank"
      rel="noreferrer noopener"
      className={`ic ${p.big ? "ic-big" : ""}`}
      data-explore="View"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-8% 0px" }}
    >
      {/* chamfer sits on a wrapper so the reveal's own clip-path doesn't overwrite it */}
      <div className={p.big ? "ic-cut" : undefined}>
        <motion.div
          className="ic-img"
          variants={{ hidden: { clipPath: "inset(40% 0% 0% 0%)", opacity: 0.2 }, shown: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 } }}
          transition={{ duration: 1.2, delay: i * 0.08, ease }}
        >
          <motion.img
            src={p.img}
            alt={p.title}
            loading="lazy"
            variants={{ hidden: { scale: 1.07 }, shown: { scale: 1 } }}
            transition={{ duration: 1.4, delay: i * 0.08, ease }}
          />
        </motion.div>
      </div>
      <p className="ic-title">{p.title}</p>
      <p className="ic-place">{p.place}</p>
    </motion.a>
  );
}

/**
 * The small pair sticks at (85% of the viewport − its own height) while the large image scrolls past,
 * so it travels from the top of the row to the bottom — same rule as the reference's sticky-offset script.
 */
function SmallPair({ items }: { items: Item[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const set = () => ref.current?.style.setProperty("--so", `${innerHeight * 0.85 - ref.current.offsetHeight}px`);
    set();
    addEventListener("resize", set);
    return () => removeEventListener("resize", set);
  }, []);
  return (
    <div ref={ref} className="work-small">
      {items.map((p, i) => (
        <Card key={p.title} p={p} i={i + 1} />
      ))}
    </div>
  );
}

export function Work() {
  return (
    <section className="work wrap" id="work">
      <div className="work-head">
        <motion.h2 className="h-l" {...rise()}>
          {work.title}
        </motion.h2>
        <div className="work-bar">
          <ArrowLink href={work.all} external>
            All equipment
          </ArrowLink>
          <div className="filters">
            <span className="filters-title">Browse by category</span>
            {work.filters.map((f) => (
              <a key={f.label} href={f.href} target="_blank" rel="noreferrer noopener">
                {f.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {work.rows.map((row, r) => (
        <div key={r} className={`work-row ${r % 2 ? "is-flip" : ""}`}>
          {row.filter((p) => p.big).map((p) => (
            <Card key={p.title} p={p} i={0} />
          ))}
          <SmallPair items={row.filter((p) => !p.big)} />
        </div>
      ))}
    </section>
  );
}

function Step({ i, s, active, onActive }: { i: number; s: (typeof approach.steps)[number]; active: boolean; onActive: (i: number) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(i);
  }, [inView, i, onActive]);
  return (
    <li ref={ref} className={`ap-step ${active ? "is-on" : ""}`}>
      <span className="ap-no">{String(i + 1).padStart(2, "0")}</span>
      <div>
        <h3>{s.title}</h3>
        <p>{s.text}</p>
      </div>
    </li>
  );
}

/** Sticky photograph on the left cross-fades as each stage passes the middle of the screen. */
export function Approach() {
  const [active, setActive] = useState(0);
  return (
    <section className="ap wrap" id="approach">
      <div className="ap-head">
        <motion.p className="label" {...rise()}>
          How it works
        </motion.p>
        <motion.h2 className="h-xl" {...rise(0.05)}>
          {approach.title}
        </motion.h2>
        <motion.p className="ap-lead" {...rise(0.1)}>
          {approach.text}
        </motion.p>
      </div>
      <div className="ap-grid">
        <div className="ap-media">
          <div className="ap-frame" data-explore="Explore">
            {approach.steps.map((s, i) => (
              <motion.img
                key={s.title}
                src={s.img}
                alt={s.title}
                loading="lazy"
                initial={false}
                animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.08 }}
                transition={{ duration: 1.1, ease }}
              />
            ))}
            <span className="ap-count">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={active}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.6, ease }}
                >
                  {String(active + 1).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
              <span>/ {String(approach.steps.length).padStart(2, "0")}</span>
            </span>
          </div>
        </div>
        <ol className="ap-steps">
          {approach.steps.map((s, i) => (
            <Step key={s.title} i={i} s={s} active={active === i} onActive={setActive} />
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Dark band: one large quote at a time with a timed progress rule, then figures and client marks. */
export function Voices() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const paused = hover || !inView; // only rotate while someone is actually looking
  const n = voices.quotes.length;
  const q = voices.quotes[i];
  const go = (d: number) => setI((i + d + n) % n);

  return (
    <section ref={ref} className="vo" onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)}>
      <div className="wrap">
        <div className="vo-top">
          <motion.p className="label" {...rise()}>
            What contractors say
          </motion.p>
          <div className="vo-nav">
            <button onClick={() => go(-1)} aria-label="Previous quote" className="al-dot">
              <Arrow flip />
            </button>
            <span className="vo-count">
              {i + 1} / {n}
              <motion.i
                key={`${i}-${paused}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: paused ? 0 : 1 }}
                transition={{ duration: paused ? 0.3 : 8, ease: "linear" }}
                onAnimationComplete={() => !paused && go(1)}
              />
            </span>
            <button onClick={() => go(1)} aria-label="Next quote" className="al-dot">
              <Arrow />
            </button>
          </div>
        </div>

        <div className="vo-stage">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
              transition={{ duration: 0.9, ease }}
            >
              <p className="vo-quote">“{q.text}”</p>
              <footer>
                <b>{q.who}</b> <span>— {q.where}</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="vo-stats">
          {voices.stats.map((s, k) => (
            <motion.div key={s.label} className="vo-stat" {...rise(k * 0.08)}>
              <span className="vo-num">{s.value}</span>
              <span className="vo-lab">{s.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="vo-logos">
          {voices.logos.map((l) => (
            <span key={l.src} className="vo-logo">
              <img src={l.src} alt={l.name} loading="lazy" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Hovering a row swaps the pointer for that show's photo, which trails the cursor. */
export function Shows() {
  const [hover, setHover] = useState<number | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 26, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 26, mass: 0.5 });
  const rotate = useTransform(useVelocity(x), [-1500, 1500], [-8, 8], { clamp: true });
  const cur = hover === null ? null : shows.list[hover];

  return (
    <section className="shows wrap" id="shows">
      <motion.h2 className="h-l" {...rise()}>
        {shows.title}
      </motion.h2>
      <ul
        className="list"
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          x.set(e.clientX);
          y.set(e.clientY);
        }}
        onPointerLeave={() => setHover(null)}
      >
        {shows.list.map((s, i) => (
          <motion.li key={s.title} {...rise(i * 0.05)} onPointerEnter={(e) => e.pointerType === "mouse" && setHover(i)}>
            <a href={s.href} target="_blank" rel="noreferrer noopener" className={`list-link ${hover === i ? "is-on" : ""}`}>
              <span className="list-title">{s.title}</span>
              <span className="list-text">{s.text}</span>
              <span className="list-date">{s.date}</span>
              <span className="al-dot" aria-hidden>
                <Arrow />
              </span>
            </a>
          </motion.li>
        ))}
      </ul>
      <ArrowLink href={shows.all} external>
        All articles
      </ArrowLink>

      <motion.figure
        className="peek"
        style={{ left: x, top: y, rotate }}
        animate={{ scale: cur ? 1 : 0, opacity: cur ? 1 : 0 }}
        transition={{ duration: 0.45, ease }}
        aria-hidden
      >
        <AnimatePresence initial={false}>
          {cur && (
            <motion.img
              key={cur.img}
              src={cur.img}
              alt=""
              initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.15 }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease }}
            />
          )}
        </AnimatePresence>
        {cur && <figcaption>{cur.cap}</figcaption>}
      </motion.figure>
    </section>
  );
}
