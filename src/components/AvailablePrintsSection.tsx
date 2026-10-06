"use client";

import { useMemo, useRef, useState } from "react";
import { site } from "@/content/site";
import { altFor } from "@/content/alt";
import { imgProps } from "@/content/img";
import { Lightbox, type LightboxItem } from "./Lightbox";

/** Prints available to order: a scrollable strip you control (no autoplay). */
export function AvailablePrintsSection() {
  const images = site.availablePrints.images;
  const stripRef = useRef<HTMLUListElement | null>(null);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const items: LightboxItem[] = useMemo(
    () =>
      images.map((src, i) => ({
        src,
        alt: altFor(src, `Original print ${i + 1} of ${images.length}`),
        title: `Print ${i + 1}`,
        meta: "Prints",
      })),
    [images],
  );

  const scrollBy = (dir: number) => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  if (!images.length) return null;

  return (
    <section
      id="available-prints"
      aria-labelledby="available-prints-heading"
      className="section scroll-mt-20"
    >
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="t-eyebrow">{site.availablePrints.heading}</p>
            <h2 id="available-prints-heading" className="t-h2 mt-3">
              Prints
            </h2>
            <p className="t-lead mt-4">{site.availablePrints.intro}</p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              className="btn-secondary min-h-11 px-5 text-sm"
              aria-label="Scroll prints left"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              className="btn-secondary min-h-11 px-5 text-sm"
              aria-label="Scroll prints right"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>

      <ul
        ref={stripRef}
        className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 scroll-pl-5 sm:px-8 sm:scroll-pl-8 lg:px-[max(2.5rem,calc((100vw-1200px)/2+2.5rem))] lg:scroll-pl-[max(2.5rem,calc((100vw-1200px)/2+2.5rem))]"
        aria-label="Prints"
      >
        {images.map((src, i) => (
          <li key={src} className="shrink-0 snap-start">
            <button
              type="button"
              onClick={() => setViewerIndex(i)}
              aria-label={`View print ${i + 1} of ${images.length} full size`}
              className="block overflow-hidden rounded-md border border-ink/10 bg-canvas-soft transition-colors hover:border-accent"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                {...imgProps(src, "400px")}
                alt={items[i].alt}
                className="h-[340px] w-auto max-w-none sm:h-[420px]"
                draggable={false}
              />
            </button>
          </li>
        ))}
      </ul>

      <Lightbox
        label="Prints"
        items={items}
        index={viewerIndex}
        onIndex={setViewerIndex}
        onClose={() => setViewerIndex(null)}
      />
    </section>
  );
}
