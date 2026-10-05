"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { site } from "@/content/site";
import { imgProps, SIZES } from "@/content/img";

const FAN = [
  { restR: -3, restX: -7, restY: 5, fanR: -18, fanX: -96, fanY: 14 },
  { restR: 1.5, restX: 2, restY: 2, fanR: -6, fanX: -34, fanY: -6 },
  { restR: -1.5, restX: -2, restY: 0, fanR: 6, fanX: 34, fanY: -6 },
  { restR: 3, restX: 4, restY: -2, fanR: 18, fanX: 96, fanY: 14 },
] as const;

type MangaItem = (typeof site.manga.items)[number];
type FanFace = (typeof site.manga.fanDecks)[number]["faces"][number];

function MangaCover({ item }: { item: MangaItem }) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!viewerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [viewerOpen]);

  return (
    <article className="mx-auto w-full max-w-full overflow-visible">
      <div className="group relative mx-auto w-full max-w-[380px]">
        <button
          type="button"
          onClick={() => setViewerOpen(true)}
          className="relative mx-auto block aspect-[3/4] w-[min(100%,280px)] overflow-hidden rounded-sm border border-ink/20 bg-canvas/40 shadow-[0_16px_40px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cool sm:w-[300px]"
          aria-label={`Open ${item.title} — ${item.caption}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            {...imgProps(item.image, SIZES.thumb)}
            alt=""
            className="block h-full w-full object-cover object-center opacity-85"
            draggable={false}
          />
        </button>
        <p className="mt-3 text-center font-mono text-2xs uppercase tracking-micro text-ink-faint opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Click to view
        </p>
      </div>

      <div className="mt-4 text-center">
        <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
          <h3 className="font-display text-2xl font-semibold leading-none tracking-tight text-ink sm:text-3xl">
            {item.title}
          </h3>
          <time
            className="font-mono text-sm tracking-micro text-ink-faint"
            dateTime={item.year}
          >
            {item.year}
          </time>
        </div>
        <p className="mt-2 font-mono text-2xs uppercase tracking-micro text-accent/80">
          {item.caption}
        </p>
      </div>

      {mounted &&
        viewerOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[90] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label={`${item.title} lightbox`}
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
                Manga · {item.caption}
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
              className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-8"
              onClick={() => setViewerOpen(false)}
            >
              <div className="mb-6 text-center" onClick={(e) => e.stopPropagation()}>
                <h2 className="font-display text-3xl tracking-tight text-ink sm:text-5xl">
                  {item.title}
                </h2>
                <time
                  className="mt-2 block font-mono text-sm tracking-micro text-ink-faint"
                  dateTime={item.year}
                >
                  {item.year}
                </time>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                {...imgProps(item.image, SIZES.full)}
                alt={item.title}
                className="max-h-[70vh] max-w-full rounded-sm object-contain shadow-[0_24px_80px_rgba(0,0,0,0.65)]"
                draggable={false}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>,
          document.body,
        )}
    </article>
  );
}

/** One fan deck = 2–4 UNIQUE manga/print stills from site.manga.fanDeck */
function FanDeck({
  faces,
  label,
}: {
  faces: readonly FanFace[];
  label: string;
}) {
  const [fanned, setFanned] = useState(false);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const deck = faces.slice(0, 4).map((f) => f.image);
  const poses = FAN.slice(0, deck.length);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (viewerIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewerIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [viewerIndex]);

  const active = viewerIndex !== null ? faces[viewerIndex] : null;

  return (
    <article className="mx-auto w-full max-w-full overflow-visible">
      <div
        className="group relative mx-auto w-full max-w-[380px] overflow-visible"
        onMouseEnter={() => setFanned(true)}
        onMouseLeave={() => setFanned(false)}
        onFocusCapture={() => setFanned(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setFanned(false);
          }
        }}
      >
        <div
          className="relative mx-auto aspect-[3/4] w-[min(100%,280px)] sm:w-[300px]"
          style={{ perspective: "1000px" }}
        >
          {poses.map((pose, i) => {
            const transform = fanned
              ? `translate(${pose.fanX}px, ${pose.fanY}px) rotate(${pose.fanR}deg) scale(0.94)`
              : `translate(${pose.restX}px, ${pose.restY}px) rotate(${pose.restR}deg) scale(1)`;

            return (
              <button
                key={deck[i]}
                type="button"
                onClick={() => setViewerIndex(i)}
                className="absolute inset-0 overflow-hidden rounded-sm border border-ink/20 bg-canvas/40 shadow-[0_16px_40px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cool"
                style={{
                  zIndex: fanned ? 10 + i : i + 1,
                  transform,
                  transformOrigin: "center bottom",
                }}
                aria-label={`Open ${faces[i]?.title ?? label}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  {...imgProps(deck[i], SIZES.thumb)}
                  alt=""
                  className="block h-full w-full object-cover object-center opacity-85"
                  draggable={false}
                />
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-center font-mono text-2xs uppercase tracking-micro text-ink-faint opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Hover to fan · click to view
        </p>
      </div>

      <div className="mt-4 text-center">
        <h3 className="font-display text-xl font-semibold leading-none tracking-tight text-ink sm:text-2xl">
          {label}
        </h3>
        <p className="mt-2 font-mono text-2xs uppercase tracking-micro text-accent/80">
          Manga · Prints
        </p>
      </div>

      {mounted &&
        active &&
        viewerIndex !== null &&
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
                  "linear-gradient(180deg, #4a0610 0%, #1a0208 42%, #050508 100%)",
                opacity: 0.94,
              }}
              onClick={() => setViewerIndex(null)}
            />
            <header className="relative z-10 flex items-center justify-between border-b border-ink/15 px-4 py-3 sm:px-8">
              <p className="font-mono text-2xs uppercase tracking-micro text-ink-faint">
                {active.source === "print" ? "Print" : "Manga"} · fan
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
                <h2 className="font-display text-3xl tracking-tight text-ink sm:text-5xl">
                  {active.title}
                </h2>
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
    </article>
  );
}

export function MangaSection() {
  const [expanded, setExpanded] = useState(false);

  const curated = useMemo(() => {
    const order = [...site.manga.homepageCurated];
    const byTitle = new Map<string, MangaItem>(
      site.manga.items.map((item) => [item.title, item]),
    );
    return order
      .map((title) => byTitle.get(title))
      .filter((item): item is MangaItem => Boolean(item));
  }, []);

  const remaining = useMemo(() => {
    const curatedSet = new Set<string>(site.manga.homepageCurated);
    return site.manga.items.filter((item) => !curatedSet.has(item.title));
  }, []);

  const visible = expanded ? [...curated, ...remaining] : curated;

  // Reach fanDecks — 4 themed packs (Manga / Harmony / Prints / Universal)
  const fanGroups = useMemo(() => {
    return site.manga.fanDecks.map((deck) => ({
      label: deck.theme,
      faces: [...deck.faces] as FanFace[],
    }));
  }, []);

  return (
    <section
      id="manga"
      aria-labelledby="manga-heading"
      className="mx-auto max-w-[1680px] px-4 py-14 sm:px-6 md:py-20 lg:px-8"
    >
      <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
        <p className="micro-label text-ink-faint">{site.manga.heading}</p>
        <h2
          id="manga-heading"
          className="mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl"
        >
          Homage edits
        </h2>
        <p className="mt-4 font-sans text-base leading-relaxed text-ink-soft sm:text-lg">
          {site.manga.intro}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 sm:gap-y-20 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-24">
        {visible.map((item) => (
          <div key={item.title} className="min-w-0">
            <MangaCover item={item} />
          </div>
        ))}
      </div>

      {!expanded && remaining.length > 0 && (
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="inline-flex items-center gap-2 border border-ink/20 bg-canvas/40 px-4 py-2 font-mono text-xs uppercase tracking-micro text-ink-soft transition-colors hover:border-accent/50 hover:text-accent"
          >
            See all homage
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}

      {fanGroups.length > 0 && (
        <div className="mt-20 border-t border-ink/10 pt-14">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="micro-label text-ink-faint">Fan decks</p>
            <h3 className="mt-2 font-display text-2xl tracking-tight text-ink sm:text-3xl">
              Four themes
            </h3>
            <p className="mt-3 font-sans text-sm leading-relaxed text-ink-soft sm:text-base">
              Manga · Harmony · Prints · Universal — four stills each.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 sm:gap-y-20 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-24">
            {fanGroups.map((group) => (
              <div key={group.label} className="min-w-0">
                <FanDeck faces={group.faces} label={group.label} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
