"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { site } from "@/content/site";
import { imgProps, SIZES } from "@/content/img";

type PhotoItem = (typeof site.photography.items)[number];

/** Bubble-only square crops (lightbox still opens the full photo). Arty 2026-09-25. */
const BUBBLE_CROP: Record<string, string> = {
  "/work/photography/25_photo_25.jpg": "/work/photography/bubble/25_photo_25-sq.jpg",
};

/** Chief lock 2026-09-25 (?v=bubbles, ?v=bubbles-10 = 2 rows of 5 on desktop): floating circular bubbles, 3 sizes, independent drift. */
const SIZE_CLASS = {
  s: "w-[112px] sm:w-[140px] md:w-[160px] lg:w-[150px] xl:w-[164px]",
  m: "w-[136px] sm:w-[172px] md:w-[200px] lg:w-[180px] xl:w-[196px]",
  l: "w-[160px] sm:w-[204px] md:w-[240px] lg:w-[208px] xl:w-[226px]",
} as const;

const BUBBLES: {
  size: keyof typeof SIZE_CLASS;
  dur: number;
  delay: number;
  y: number;
  x: number;
  offset: number;
}[] = [
  // row 1 (desktop)
  { size: "l", dur: 8.2, delay: -1.3, y: 11, x: 4, offset: 0 },
  { size: "s", dur: 6.4, delay: -4.1, y: 8, x: -3, offset: 48 },
  { size: "m", dur: 9.6, delay: -2.7, y: 12, x: 5, offset: -20 },
  { size: "s", dur: 7.1, delay: -5.8, y: 9, x: -4, offset: 36 },
  { size: "m", dur: 6.8, delay: -0.6, y: 10, x: 3, offset: 8 },
  // row 2 (desktop)
  { size: "m", dur: 9.1, delay: -6.2, y: 12, x: -5, offset: 24 },
  { size: "l", dur: 7.7, delay: -3.4, y: 8, x: 4, offset: -16 },
  { size: "s", dur: 8.8, delay: -7.5, y: 11, x: -3, offset: 40 },
  { size: "l", dur: 6.1, delay: -2.2, y: 9, x: 5, offset: -4 },
  { size: "s", dur: 9.9, delay: -8.4, y: 12, x: -4, offset: 32 },
];

export function PhotographySection() {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const curated = useMemo(() => {
    const order = [...site.photography.homepageCurated];
    const byTitle = new Map(site.photography.items.map((i) => [i.title, i]));
    return order
      .map((t) => byTitle.get(t))
      .filter((i): i is PhotoItem => Boolean(i));
  }, []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (viewerIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewerIndex(null);
      if (e.key === "ArrowRight")
        setViewerIndex((i) => (i === null ? 0 : (i + 1) % curated.length));
      if (e.key === "ArrowLeft")
        setViewerIndex((i) =>
          i === null ? 0 : (i - 1 + curated.length) % curated.length,
        );
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [viewerIndex, curated.length]);

  const active = viewerIndex !== null ? curated[viewerIndex] : null;

  return (
    <section
      id="photography"
      aria-labelledby="photography-heading"
      className="mx-auto max-w-[1680px] scroll-mt-24 px-4 py-14 sm:px-6 md:py-20 lg:px-8"
    >
      <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center text-center md:mb-12">
        <p className="micro-label text-ink-faint">{site.photography.heading}</p>
        <h2
          id="photography-heading"
          className="mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl"
        >
          Still frames
        </h2>
        <p className="mt-4 font-sans text-base leading-relaxed text-ink-soft sm:text-lg">
          {site.photography.intro}
        </p>
      </div>

      <div className="still-bubbles mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-4 gap-y-6 px-2 py-6 sm:gap-x-8 sm:gap-y-10 md:gap-x-12 lg:grid lg:max-w-[1240px] lg:grid-cols-5 lg:justify-items-center lg:gap-x-6 lg:gap-y-12">
        {curated.map((item, i) => {
          const b = BUBBLES[i % BUBBLES.length];
          return (
            <div
              key={item.title}
              className="still-bubble relative hover:z-20 focus-within:z-20"
              style={
                {
                  "--bob-dur": `${b.dur}s`,
                  "--bob-delay": `${b.delay}s`,
                  "--bob-y": `${b.y}px`,
                  "--bob-x": `${b.x}px`,
                  marginTop: `${b.offset}px`,
                } as React.CSSProperties
              }
            >
              <button
                type="button"
                onClick={() => setViewerIndex(i)}
                aria-label={`${item.title}, ${item.caption}`}
                className={`still-bubble-btn group relative block aspect-square overflow-hidden rounded-full border border-ink/20 bg-canvas/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cool ${SIZE_CLASS[b.size]}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  {...imgProps(BUBBLE_CROP[item.image] ?? item.image, "200px")}
                  alt={item.title}
                  className="h-full w-full object-cover object-center opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                  draggable={false}
                />
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href={site.photography.seeAll}
          className="inline-flex items-center gap-2 border border-ink/20 bg-canvas/40 px-4 py-2 font-mono text-xs uppercase tracking-micro text-ink-soft transition-colors hover:border-accent/50 hover:text-accent"
        >
          See all photography
          <span aria-hidden="true">→</span>
        </a>
      </div>

      {mounted &&
        active &&
        createPortal(
          <div
            className="fixed inset-0 z-[90] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label={`${active.title} lightbox`}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, #0a1020 0%, #050508 55%, #050508 100%)",
                opacity: 0.95,
              }}
              onClick={() => setViewerIndex(null)}
            />
            <header className="relative z-10 flex items-center justify-between border-b border-ink/15 px-4 py-3 sm:px-8">
              <p className="font-mono text-2xs uppercase tracking-micro text-ink-faint">
                Photography · {active.caption}
              </p>
              <button
                type="button"
                onClick={() => setViewerIndex(null)}
                className="font-mono text-xs uppercase tracking-micro text-ink-soft transition-colors hover:text-ink"
              >
                Close ✕
              </button>
            </header>
            <div
              className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-8"
              onClick={() => setViewerIndex(null)}
            >
              <div className="mb-6 text-center" onClick={(e) => e.stopPropagation()}>
                <h3 className="font-display text-3xl tracking-tight text-ink sm:text-5xl">
                  {active.title}
                </h3>
                <time
                  className="mt-2 block font-mono text-sm tracking-micro text-ink-faint"
                  dateTime={active.year}
                >
                  {active.year}
                </time>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                {...imgProps(active.image, SIZES.full)}
                alt={active.title}
                className="max-h-[70vh] max-w-full rounded-sm object-contain shadow-[0_24px_80px_rgba(0,0,0,0.65)]"
                draggable={false}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}
