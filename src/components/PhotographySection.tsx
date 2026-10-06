"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { site } from "@/content/site";
import { imgProps } from "@/content/img";
import { Lightbox, type LightboxItem } from "./Lightbox";

type PhotoItem = (typeof site.photography.items)[number];

/** Square crop used for the round thumbnail only; the viewer always opens the full photo. */
const THUMB_CROP: Record<string, string> = {
  "/work/photography/25_photo_25.jpg": "/work/photography/bubble/25_photo_25-sq.jpg",
};

/** Slow, independent drift for each thumbnail. */
const DRIFT = [
  { dur: 9.2, delay: -1.3, y: 6 },
  { dur: 7.4, delay: -4.1, y: 5 },
  { dur: 10.6, delay: -2.7, y: 7 },
  { dur: 8.1, delay: -5.8, y: 5 },
  { dur: 9.8, delay: -0.6, y: 6 },
];

export function PhotographySection() {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const curated = useMemo(() => {
    const byTitle = new Map(site.photography.items.map((i) => [i.title, i]));
    return site.photography.homepageCurated
      .map((t) => byTitle.get(t))
      .filter((i): i is PhotoItem => Boolean(i));
  }, []);

  const viewerItems: LightboxItem[] = useMemo(
    () =>
      curated.map((p) => ({
        src: p.image,
        alt: p.alt,
        title: p.title,
        meta: `Photography · ${p.year}`,
      })),
    [curated],
  );

  return (
    <section
      id="photography"
      aria-labelledby="photography-heading"
      className="container-page section scroll-mt-20"
    >
      <div className="max-w-2xl">
        <p className="t-eyebrow">{site.photography.heading}</p>
        <h2 id="photography-heading" className="t-h2 mt-3">
          Still frames
        </h2>
        <p className="t-lead mt-4">{site.photography.intro}</p>
      </div>

      <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-5">
        {curated.map((item, i) => {
          const d = DRIFT[i % DRIFT.length];
          return (
            <li
              key={item.title}
              className="still-bubble relative hover:z-10 focus-within:z-10"
              style={
                {
                  "--bob-dur": `${d.dur}s`,
                  "--bob-delay": `${d.delay}s`,
                  "--bob-y": `${d.y}px`,
                } as React.CSSProperties
              }
            >
              <button
                type="button"
                onClick={() => setViewerIndex(i)}
                aria-label={`View ${item.title} full size`}
                className="still-bubble-btn group relative block aspect-square w-full overflow-hidden rounded-full border border-ink/20 bg-canvas-soft"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  {...imgProps(THUMB_CROP[item.image] ?? item.image, "(min-width: 1024px) 200px, 40vw")}
                  alt={item.alt}
                  className="h-full w-full object-cover object-center"
                  draggable={false}
                />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-12">
        <Link href={site.photography.seeAll} className="btn-secondary">
          See all photography
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <Lightbox
        label="Photography"
        items={viewerItems}
        index={viewerIndex}
        onIndex={setViewerIndex}
        onClose={() => setViewerIndex(null)}
      />
    </section>
  );
}
