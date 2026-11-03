"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { focus, hero, intro } from "@/lib/home2/site";
import { ArrowLink, smooth, useIntroDone } from "./Chrome";

const PEEK = 0.14; // share of the viewport the first card shows before scrolling

/** The company statement — static. Pinned behind the cards on desktop, a normal block on touch. */
function StudioPanel() {
  return (
    <div className="studio-panel" id="about">
      <span className="cl-line" />
      <figure className="cl-img">
        <img src={intro.img} alt="National Dispatching heavy equipment on a job site" loading="lazy" />
        <figcaption>{intro.imgCap}</figcaption>
      </figure>
      <p className="cl-label">About us</p>
      <h2 className="intro-title">{intro.title}</h2>
      <div className="intro-row">
        <p className="intro-tag">
          {intro.tagline[0]}
          <br />
          {intro.tagline[1]}
        </p>
        <div className="intro-body">
          <p>{intro.text}</p>
          <ArrowLink href="#contact">Talk to dispatch</ArrowLink>
        </div>
      </div>
    </div>
  );
}

/**
 * Pinned hero, in three beats:
 *  1. the focus cards slide in over the hero photo (as on the reference);
 *  2. once they cover the screen, the studio panel takes the photo's place underneath, so the
 *     last cards slide away to uncover it — it is already pinned before the slider ends;
 *  3. it stays exactly where it is for one more screen while the next section rises over it.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const ready = useIntroDone();
  const [m, setM] = useState({ dist: 0, hold: 0, vw: 1 });

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      const desktop = matchMedia("(min-width: 900px) and (pointer: fine)").matches;
      // the whole track (lead-in + cards) travels off-screen to the left
      setM(desktop ? { dist: track.current.scrollWidth, hold: innerHeight, vw: innerWidth } : { dist: 0, hold: 0, vw: 1 });
    };
    measure();
    addEventListener("resize", measure);
    return () => removeEventListener("resize", measure);
  }, []);

  const { dist, hold, vw } = m;

  // The pin height above is applied after mount; tell motion's scroll tracker to re-measure once it's in the DOM,
  // otherwise the first frame can read stale offsets and show the card track already slid away.
  useEffect(() => {
    if (dist) dispatchEvent(new Event("scroll"));
  }, [dist, hold]);
  const r = dist ? dist / (dist + hold) : 1; // share of the pin spent sliding; the rest is the hold
  const pCovered = dist ? (r * (1 - PEEK) * vw) / dist : 1; // first card reaches the left edge

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, r], [0, -dist]);
  const shade = useTransform(scrollYProgress, [0, pCovered], [0, 0.75]);
  const titleX = useTransform(scrollYProgress, [0, pCovered], ["0%", "-12%"]);
  // swap photo → studio while the cards fully cover the screen, so the change is never seen
  const heroO = useTransform(scrollYProgress, [pCovered - 0.002, pCovered], [1, 0]);
  const studioO = useTransform(scrollYProgress, [pCovered - 0.002, pCovered], [0, 1]);

  const enter = (delay: number, y = 24) => ({
    initial: { opacity: 0, y },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { delay, duration: 1.1, ease: smooth },
  });

  return (
    <section ref={ref} className="hh" id="top" style={{ height: dist ? `calc(100vh + ${dist + hold}px)` : undefined }}>
      <div className="hh-sticky">
        <motion.div className="hh-main" style={dist ? { opacity: heroO } : undefined}>
          <img src={hero.img} alt="Site manager with plans in front of an excavator and dump truck" className="hh-bg" fetchPriority="high" />
          <motion.span className="hh-shade" style={{ opacity: shade }} />
          <motion.a href="/home2" className="hh-logo" aria-label="National Dispatching — home" {...enter(0.1, -14)}>
            <img src="/images/home2/logo-white.svg" alt="National Dispatching" />
          </motion.a>
          <motion.div className="hh-content" style={{ x: titleX }}>
            <div className="hh-details">
              <motion.span
                className="hh-rule"
                initial={{ scaleX: 0 }}
                animate={ready ? { scaleX: 1 } : undefined}
                transition={{ delay: 0.35, duration: 1.4, ease: smooth }}
              />
              {hero.details.map((d, i) => (
                <motion.span key={d} {...enter(0.55 + i * 0.08, 12)}>
                  {d}
                </motion.span>
              ))}
              <motion.a href="#focus" className="hh-scroll" {...enter(0.71, 12)}>
                Scroll to explore
                <span className="circle" aria-hidden>
                  →
                </span>
              </motion.a>
            </div>
            <h1 className="hh-title">
              {hero.title.split(" ").map((w, i) => (
                <Fragment key={i}>
                  <span className="mask-w">
                    <motion.span
                      initial={{ y: "105%" }}
                      animate={ready ? { y: "0%" } : undefined}
                      transition={{ delay: 0.15 + i * 0.045, duration: 1.2, ease: smooth }}
                    >
                      {w}
                    </motion.span>
                  </span>{" "}
                </Fragment>
              ))}
            </h1>
          </motion.div>
        </motion.div>

        <motion.div className="hh-studio" style={dist ? { opacity: studioO } : undefined}>
          <StudioPanel />
        </motion.div>

        {/* the first card glides in from the edge once the title has landed */}
        <motion.div
          className="hh-enter"
          initial={{ x: "16vw", opacity: 0 }}
          animate={ready ? { x: "0vw", opacity: 1 } : undefined}
          transition={{ delay: 0.6, duration: 1.6, ease: smooth }}
        >
          <motion.div ref={track} className="hh-track" id="focus" style={{ x, paddingLeft: `${(1 - PEEK) * 100}vw` }}>
            {focus.map((f, i) => (
              <article key={f.title} className="card" style={{ "--c": f.color, "--ink": f.ink } as React.CSSProperties}>
                <div className="card-img" data-explore="Explore">
                  <img src={f.img} alt={f.title} loading={i < 2 ? "eager" : "lazy"} />
                  {/* frosted glass keeps the list legible on any photo */}
                  <ul className="card-items" data-no-explore>
                    {f.items.map((it) => (
                      <li key={it}>
                        <a href="#contact">
                          {it} <span aria-hidden>›</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-body">
                  <a href="#contact" className="card-plus" aria-label={`Enquire about ${f.title}`}>
                    <span />
                    <span />
                  </a>
                  <h2 className="card-title">{f.title}</h2>
                  <span className="card-count">
                    {i + 1} / {focus.length}
                  </span>
                  <p className="card-sub">{f.sub}</p>
                </div>
              </article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
