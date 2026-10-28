"use client";

import { useEffect, useRef, useState } from "react";
import { galleryTiles } from "@/lib/content";

const navBtn =
  "gallery-nav-btn pointer-events-auto absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-bedrock shadow-lg opacity-0 transition-opacity duration-200 hover:bg-chalk focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink disabled:cursor-not-allowed disabled:hover:bg-white lg:flex group-hover/gallery:opacity-100";

// Two-row, horizontally scrollable photo/review collage that sits behind the hero copy.
export default function HeroGallery() {
  const track = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const t = track.current!;
    const sync = () => {
      setAtStart(t.scrollLeft <= 0);
      setAtEnd(t.scrollLeft >= t.scrollWidth - t.clientWidth - 1);
    };
    sync();
    t.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      t.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  const page = (dir: number) => {
    const t = track.current!;
    t.scrollBy({ left: Math.round(t.clientWidth * 0.9) * dir, behavior: "smooth" });
  };

  return (
    <section aria-label="Customer photos">
      <div className="mx-auto max-w-[1280px]">
        <div className="gallery-scroller group/gallery relative">
          <div className="fade-edge fade-left" aria-hidden="true" />
          <div className="fade-edge fade-right" aria-hidden="true" />
          <ul ref={track} className="gallery-track grid snap-x snap-proximity grid-flow-col grid-rows-2 gap-3.5 overflow-x-auto px-5 pb-3 md:px-8" role="list">
            {galleryTiles.map((t, i) => (
              <li key={i} className="w-[300px] snap-start sm:w-[360px]">
                <figure className="gallery-tile relative h-full overflow-hidden rounded-2xl border border-seam bg-white shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.image}
                    alt={`Project photo — ${t.name}`}
                    className="h-[210px] w-full object-cover sm:h-[230px] lg:h-[257px]"
                    loading={i < 4 ? "eager" : "lazy"}
                    decoding="async"
                    width={360}
                    height={257}
                  />
                  <figcaption className="gallery-cap absolute inset-x-0 bottom-0 bg-gradient-to-t from-bedrock/90 via-bedrock/55 to-transparent p-4 pt-10 text-white">
                    <span className="text-sm tracking-tight text-brand" aria-hidden="true">
                      ★★★★★
                    </span>
                    <p className="mt-0.5 font-display text-base font-bold leading-snug">&ldquo;{t.quote}&rdquo;</p>
                    <p className="mt-1 text-sm text-white/85">&mdash; {t.name}, Google review</p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => page(-1)} disabled={atStart} aria-label="Scroll customer photos left" className={`${navBtn} left-3`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" onClick={() => page(1)} disabled={atEnd} aria-label="Scroll customer photos right" className={`${navBtn} right-3`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
