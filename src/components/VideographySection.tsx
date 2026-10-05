"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/content/site";
import variants from "@/content/img-variants.json";

type VideoItem = (typeof site.videography.items)[number];

/** DZ's poster WebP (1800) when it exists; falls back to the original jpg. */
function posterSrc(src?: string) {
  if (!src) return undefined;
  return (variants as string[]).includes(src) ? src.replace(/\.(jpe?g|png)$/i, "-1800.webp") : src;
}

function VideoCard({ item }: { item: VideoItem }) {
  const poster = posterSrc(item.poster);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  // Square/portrait/4:3 sources (e.g. Serpent Skull, Cloud Fall) show whole frame on dark ground; no crop.
  const [contain, setContain] = useState(false);

  useEffect(() => {
    if (!poster) return;
    const img = new Image();
    img.onload = () => setContain(img.naturalWidth / img.naturalHeight < 1.5);
    img.src = poster;
  }, [poster]);

  const toggle = () => {
    const el = videoRef.current;
    if (!el || failed) return;
    if (el.paused) {
      void el.play().then(() => setPlaying(true)).catch(() => setFailed(true));
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <article className="overflow-hidden rounded-sm border border-ink/15 bg-canvas/40">
      <div className={`relative aspect-video ${contain ? "bg-[#050508]" : "bg-black/40"}`}>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={videoRef}
          className={`h-full w-full ${contain ? "object-contain" : "object-cover"}`}
          poster={poster}
          preload="none"
          playsInline
          controls={playing}
          onEnded={() => setPlaying(false)}
          onError={() => setFailed(true)}
        >
          <source src={item.src} type="video/mp4" />
        </video>
        {!playing && (
          <button
            type="button"
            onClick={toggle}
            className="absolute inset-0 flex items-center justify-center bg-black/25 transition hover:bg-black/35 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cool"
            aria-label={`Play ${item.title}`}
          >
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-ink/30 bg-canvas/70 font-mono text-xs uppercase tracking-micro text-ink backdrop-blur-sm">
              {failed ? "N/A" : "Play"}
            </span>
          </button>
        )}
      </div>
      <div className="px-4 py-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-display text-lg tracking-tight text-ink">{item.title}</h3>
          <time className="font-mono text-2xs tracking-micro text-ink-faint" dateTime={item.year}>
            {item.year}
          </time>
        </div>
        <p className="mt-1 font-mono text-2xs uppercase tracking-micro text-accent/80">
          {item.caption}
        </p>
      </div>
    </article>
  );
}

export function VideographySection() {
  const curated = useMemo(() => {
    const order = [...site.videography.homepageCurated];
    const byTitle = new Map(site.videography.items.map((i) => [i.title, i]));
    return order
      .map((t) => byTitle.get(t))
      .filter((i): i is VideoItem => Boolean(i));
  }, []);

  return (
    <section
      id="videography"
      aria-labelledby="videography-heading"
      className="mx-auto max-w-[1400px] scroll-mt-24 px-4 py-14 sm:px-6 md:py-20 lg:px-8"
    >
      <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
        <p className="micro-label text-ink-faint">{site.videography.heading}</p>
        <h2
          id="videography-heading"
          className="mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl"
        >
          Motion
        </h2>
        <p className="mt-4 font-sans text-base leading-relaxed text-ink-soft sm:text-lg">
          {site.videography.intro}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
        {curated.map((item) => (
          <VideoCard key={item.title} item={item} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href={site.videography.seeAll}
          className="inline-flex items-center gap-2 border border-ink/20 bg-canvas/40 px-4 py-2 font-mono text-xs uppercase tracking-micro text-ink-soft transition-colors hover:border-accent/50 hover:text-accent"
        >
          See all videography
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
