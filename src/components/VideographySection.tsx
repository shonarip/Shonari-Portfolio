"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { site } from "@/content/site";
import variants from "@/content/img-variants.json";
import { VideoPlayer, type VideoPlayerItem } from "./VideoPlayer";

type VideoItem = (typeof site.videography.items)[number];

/** DZ's poster WebP (1800) when it exists; falls back to the original jpg. */
function posterSrc(src?: string) {
  if (!src) return undefined;
  return (variants as string[]).includes(src) ? src.replace(/\.(jpe?g|png)$/i, "-1800.webp") : src;
}

/** A poster card. Pressing it opens the video in the player, which can always be closed. */
function VideoCard({ item, onPlay }: { item: VideoItem; onPlay: () => void }) {
  const poster = posterSrc(item.poster);
  // Square/portrait posters show the whole frame on a dark ground; no crop.
  const [contain, setContain] = useState(false);

  useEffect(() => {
    if (!poster) return;
    const img = new Image();
    img.onload = () => setContain(img.naturalWidth / img.naturalHeight < 1.5);
    img.src = poster;
  }, [poster]);

  return (
    <article className="card overflow-hidden">
      <button
        type="button"
        onClick={onPlay}
        className={`group relative block aspect-video w-full ${contain ? "bg-black" : "bg-canvas-soft"}`}
        aria-label={`Play ${item.title}`}
      >
        {poster && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt=""
            loading="lazy"
            decoding="async"
            className={`h-full w-full ${contain ? "object-contain" : "object-cover"}`}
          />
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition group-hover:bg-black/35">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-ink/40 bg-canvas/75 text-sm font-medium text-ink backdrop-blur-sm">
            Play
          </span>
        </span>
      </button>
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
  const [playing, setPlaying] = useState<number | null>(null);
  const curated = useMemo(() => {
    const byTitle = new Map(site.videography.items.map((i) => [i.title, i]));
    return site.videography.homepageCurated
      .map((t) => byTitle.get(t))
      .filter((i): i is VideoItem => Boolean(i));
  }, []);

  const playerItems: VideoPlayerItem[] = useMemo(
    () =>
      curated.map((item) => ({
        src: item.src,
        poster: posterSrc(item.poster),
        title: item.title,
        alt: item.alt,
        meta: `${item.caption} · ${item.year}`,
      })),
    [curated],
  );

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
        {curated.map((item, i) => (
          <VideoCard key={item.title} item={item} onPlay={() => setPlaying(i)} />
        ))}
      </div>

      <div className="mt-12">
        <Link href={site.videography.seeAll} className="btn-secondary">
          See all videography
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <VideoPlayer
        items={playerItems}
        index={playing}
        onIndex={setPlaying}
        onClose={() => setPlaying(null)}
      />
    </section>
  );
}
