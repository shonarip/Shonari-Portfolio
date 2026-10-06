"use client";

import Link from "next/link";
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
  // Square/portrait sources show the whole frame on a dark ground; no crop.
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
    <article className="card overflow-hidden">
      <div className={`relative aspect-video ${contain ? "bg-black" : "bg-canvas-soft"}`}>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={videoRef}
          className={`h-full w-full ${contain ? "object-contain" : "object-cover"}`}
          poster={poster}
          preload="none"
          playsInline
          controls={playing}
          aria-label={`${item.title}. ${item.alt}`}
          onEnded={() => setPlaying(false)}
          onError={() => setFailed(true)}
        >
          <source src={item.src} type="video/mp4" />
        </video>
        {!playing && (
          <button
            type="button"
            onClick={toggle}
            className="absolute inset-0 flex items-center justify-center bg-black/25 transition hover:bg-black/35"
            aria-label={failed ? `${item.title} is unavailable` : `Play ${item.title}`}
          >
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-ink/40 bg-canvas/75 text-sm font-medium text-ink backdrop-blur-sm">
              {failed ? "N/A" : "Play"}
            </span>
          </button>
        )}
      </div>
      <div className="px-5 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-display text-lg tracking-tight text-ink">{item.title}</h3>
          <time className="text-sm text-ink-muted" dateTime={item.year}>
            {item.year}
          </time>
        </div>
        <p className="t-small mt-1">{item.caption}</p>
      </div>
    </article>
  );
}

export function VideographySection() {
  const curated = useMemo(() => {
    const byTitle = new Map(site.videography.items.map((i) => [i.title, i]));
    return site.videography.homepageCurated
      .map((t) => byTitle.get(t))
      .filter((i): i is VideoItem => Boolean(i));
  }, []);

  return (
    <section
      id="videography"
      aria-labelledby="videography-heading"
      className="container-page section scroll-mt-20"
    >
      <div className="max-w-2xl">
        <p className="t-eyebrow">{site.videography.heading}</p>
        <h2 id="videography-heading" className="t-h2 mt-3">
          Motion
        </h2>
        <p className="t-lead mt-4">{site.videography.intro}</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {curated.map((item) => (
          <VideoCard key={item.title} item={item} />
        ))}
      </div>

      <div className="mt-12">
        <Link href={site.videography.seeAll} className="btn-secondary">
          See all videography
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
