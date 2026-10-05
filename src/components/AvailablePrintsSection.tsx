"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { site } from "@/content/site";
import { imgProps, SIZES } from "@/content/img";

const AUTO_MS = 3200;
const VISIBLE = 2; // cards each side of center

function wrapOffset(i: number, active: number, n: number) {
  let d = (i - active) % n;
  if (d > n / 2) d -= n;
  if (d < -n / 2) d += n;
  return d;
}

export function AvailablePrintsSection() {
  const images = site.availablePrints.images;
  const n = images.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const go = useCallback(
    (dir: number) => {
      if (!n) return;
      setActive((a) => (a + dir + n) % n);
    },
    [n],
  );

  useEffect(() => {
    if (!n || paused || viewerOpen) return;
    const id = window.setInterval(() => go(1), AUTO_MS);
    return () => window.clearInterval(id);
  }, [n, paused, viewerOpen, go]);

  useEffect(() => {
    if (!viewerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewerOpen(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [viewerOpen, go]);

  if (!n) return null;

  return (
    <section
      id="available-prints"
      aria-labelledby="available-prints-heading"
      className="mx-auto max-w-[1680px] scroll-mt-24 overflow-x-hidden px-4 py-14 sm:px-6 md:py-20 lg:px-8"
    >
      <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
        <p className="micro-label text-ink-faint">{site.availablePrints.heading}</p>
        <h2
          id="available-prints-heading"
          className="mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl"
        >
          Prints
        </h2>
        <p className="mt-4 font-sans text-base leading-relaxed text-ink-soft sm:text-lg">
          {site.availablePrints.intro}
        </p>
      </div>

      <div
        className="mx-auto max-w-5xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setPaused(false);
          }
        }}
      >
        <div
          className="relative mx-auto h-[380px] w-full touch-pan-y sm:h-[480px] lg:h-[560px]"
          aria-roledescription="carousel"
          aria-label="Prints cover-flow"
        >
          {images.map((src, i) => {
            const offset = wrapOffset(i, active, n);
            const abs = Math.abs(offset);
            if (abs > VISIBLE) return null;

            const scale = offset === 0 ? 1 : abs === 1 ? 0.78 : 0.62;
            const x = offset * (abs === 1 ? 42 : 64); // % of container toward edges
            const z = 30 - abs;
            const opacity = offset === 0 ? 1 : abs === 1 ? 0.85 : 0.55;

            return (
              <button
                key={src}
                type="button"
                onClick={() => {
                  if (offset === 0) setViewerOpen(true);
                  else setActive(i);
                }}
                className="absolute left-1/2 top-1/2 overflow-hidden rounded-2xl border border-ink/20 bg-transparent shadow-[0_24px_60px_rgba(0,0,0,0.55)] transition-[transform,opacity] duration-500 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cool"
                style={{
                  width: "min(48vw, 360px)",
                  height: "min(66vw, 500px)",
                  transform: `translate(-50%, -50%) translateX(${x}%) scale(${scale})`,
                  zIndex: z,
                  opacity,
                }}
                aria-label={
                  offset === 0
                    ? `Open print ${i + 1} of ${n}`
                    : `Show print ${i + 1}`
                }
                aria-current={offset === 0 ? "true" : undefined}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  {...imgProps(src, "(min-width: 640px) 360px, 48vw")}
                  alt=""
                  className="h-full w-full object-cover object-center"
                  draggable={false}
                />
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            className="rounded-full border border-ink/25 bg-accent/90 px-5 py-2.5 font-mono text-xs uppercase tracking-micro text-[#14040a] shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-colors hover:bg-accent hover:border-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cool"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="rounded-full border border-ink/25 bg-accent/90 px-5 py-2.5 font-mono text-xs uppercase tracking-micro text-[#14040a] shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-colors hover:bg-accent hover:border-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cool"
          >
            Next
          </button>
        </div>
        <p className="mt-3 text-center font-mono text-2xs uppercase tracking-micro text-ink-faint">
          {active + 1} / {n}
          {paused ? " · paused" : ""}
        </p>
      </div>

      {mounted &&
        viewerOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[90] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Print lightbox"
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, #4a0610 0%, #1a0208 42%, #050508 100%)",
                opacity: 0.94,
              }}
              onClick={() => setViewerOpen(false)}
            />
            <header className="relative z-10 flex items-center justify-between border-b border-ink/15 px-4 py-3 sm:px-8">
              <p className="font-mono text-2xs uppercase tracking-micro text-ink-faint">
                Prints · {active + 1} / {n}
              </p>
              <button
                type="button"
                onClick={() => setViewerOpen(false)}
                className="font-mono text-xs uppercase tracking-micro text-ink-soft transition-colors hover:text-ink"
              >
                Close ✕
              </button>
            </header>
            <div
              className="relative z-10 flex flex-1 items-center justify-center gap-4 px-4 py-8"
              onClick={() => setViewerOpen(false)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                {...imgProps(images[active], SIZES.full)}
                alt=""
                className="max-h-[80vh] max-w-full object-contain"
                onClick={(e) => e.stopPropagation()}
                draggable={false}
              />
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}
