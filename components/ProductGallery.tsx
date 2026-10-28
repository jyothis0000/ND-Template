"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

const arrow =
  "absolute top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-md opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand";

// Product photo gallery from the reference PDP: framed slide strip, position pill, arrows and thumbnails.
// The thumbnail strip always shows; arrows appear once there is more than one photo.
export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((i + d + images.length) % images.length);
  const many = images.length > 1;

  return (
    <div>
      <div className="relative group">
        <div className="relative w-full overflow-hidden rounded-2xl bg-bedrock aspect-[4/3]">
          <div className="absolute inset-0 overflow-hidden">
            <div className="flex h-full w-full transition-transform duration-300 ease-out" style={{ transform: `translateX(-${i * 100}%)` }}>
              {images.map((src, n) => (
                <div key={src} className="relative h-full w-full shrink-0">
                  <img
                    src={src}
                    alt={`${alt} — image ${n + 1} of ${images.length}`}
                    width={1200}
                    height={760}
                    loading={n ? "lazy" : "eager"}
                    fetchPriority={n ? "auto" : "high"}
                    draggable={false}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <p aria-hidden="true" className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-bedrock px-2.5 py-1 font-mono text-xs text-white">
            {i + 1} / {images.length}
          </p>
        </div>
        {many && (
          <>
            <button type="button" onClick={() => go(-1)} className={`${arrow} left-3`} aria-label="Previous media">
              <svg className="h-5 w-5 text-bedrock" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button type="button" onClick={() => go(1)} className={`${arrow} right-3`} aria-label="Next media">
              <svg className="h-5 w-5 text-bedrock" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
      <div className="flex w-0 min-w-full min-h-[80px] gap-2 mt-3 overflow-x-auto">
        {images.map((src, n) => (
          <button
            key={src}
            type="button"
            onClick={() => setI(n)}
            aria-current={n === i}
            className="shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink relative h-[80px] w-[80px] overflow-hidden rounded-lg"
            aria-label={`View image ${n + 1}`}
          >
            <img
              src={src}
              alt={`${alt} thumbnail ${n + 1}`}
              width={160}
              height={101}
              loading="lazy"
              className={`w-[80px] h-[80px] rounded-lg bg-white object-cover border-2 transition-colors cursor-pointer ${n === i ? "border-brand" : "border-seam"}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
