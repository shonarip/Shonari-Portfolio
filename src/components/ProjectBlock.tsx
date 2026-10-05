"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { imgProps, SIZES } from "@/content/img";

type ProjectBlockProps = {
  title: string;
  year: string;
  role: string;
  description: string;
  tags: readonly string[];
  href: string;
  image: string;
  images?: readonly string[];
  index: number;
};

const DECK_SIZE = 4;

/** Bigger cards + wider fan */
const FAN = [
  { restR: -3, restX: -7, restY: 5, fanR: -20, fanX: -110, fanY: 16 },
  { restR: 1.5, restX: 2, restY: 2, fanR: -7, fanX: -40, fanY: -7 },
  { restR: -1.5, restX: -2, restY: 0, fanR: 7, fanX: 40, fanY: -7 },
  { restR: 3, restX: 4, restY: -2, fanR: 20, fanX: 110, fanY: 16 },
] as const;

export function ProjectBlock({
  title,
  year,
  description,
  href,
  image,
  images,
}: ProjectBlockProps) {
  const baseId = useId();
  const [srcs, setSrcs] = useState<(string | null)[]>(() => {
    const slots: (string | null)[] = Array(DECK_SIZE).fill(null);
    const seeded = images?.length ? images : [image];
    seeded.slice(0, DECK_SIZE).forEach((src, i) => {
      slots[i] = src;
    });
    return slots;
  });
  const [fanned, setFanned] = useState(false);
  const [studioOpen, setStudioOpen] = useState(false);
  const [viewerSrc, setViewerSrc] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const objectUrls = useRef<string[]>([]);

  useEffect(() => {
    setMounted(true);
    return () => {
      objectUrls.current.forEach((u) => URL.revokeObjectURL(u));
    };
  }, []);

  useEffect(() => {
    if (!studioOpen && !viewerSrc) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (viewerSrc) {
        setViewerSrc(null);
        return;
      }
      if (studioOpen) setStudioOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [studioOpen, viewerSrc]);

  const onPick = (slot: number, file: File | null) => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    objectUrls.current.push(url);
    setSrcs((prev) => {
      const next = [...prev];
      next[slot] = url;
      return next;
    });
  };

  const openStudio = () => setStudioOpen(true);

  return (
    <article className="mx-auto w-full max-w-full overflow-visible">
      <div
        className="group relative mx-auto w-full max-w-[420px] overflow-visible"
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
          className="relative mx-auto aspect-[3/4] w-[min(100%,320px)] sm:w-[340px]"
          style={{ perspective: "1000px" }}
        >
          {FAN.map((pose, i) => {
            const src = srcs[i];
            const transform = fanned
              ? `translate(${pose.fanX}px, ${pose.fanY}px) rotate(${pose.fanR}deg) scale(0.94)`
              : `translate(${pose.restX}px, ${pose.restY}px) rotate(${pose.restR}deg) scale(1)`;

            return (
              <button
                key={i}
                type="button"
                onClick={openStudio}
                className="absolute inset-0 overflow-hidden rounded-sm border border-ink/20 bg-canvas/40 shadow-[0_16px_40px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cool"
                style={{
                  zIndex: fanned ? 10 + i : i + 1,
                  transform,
                  transformOrigin: "center bottom",
                }}
                aria-label={`Open ${title} studio — card ${i + 1}`}
              >
                {src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    {...imgProps(src, SIZES.card)}
                    alt=""
                    className="block h-full w-full object-cover object-center opacity-85"
                    draggable={false}
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center bg-gradient-to-b from-ink/5 to-ink/10 font-mono text-xs uppercase tracking-micro text-ink-muted">
                    Card {i + 1}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-center font-mono text-xs uppercase tracking-micro text-ink-faint opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Hover to fan · click to open studio
        </p>
      </div>

      <div className="mt-5 text-center sm:mt-6">
        <div className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2">
          <h3 className="font-display text-3xl font-semibold leading-none tracking-tight text-ink sm:text-4xl">
            {href && href !== "#" ? (
              <a
                href={href}
                className="hover:text-accent"
                {...(href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {title}
              </a>
            ) : (
              title
            )}
          </h3>
          <time
            className="font-mono text-sm tracking-micro text-ink-faint sm:text-base"
            dateTime={year}
          >
            {year}
          </time>
        </div>
      </div>

      {mounted &&
        studioOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[80] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} image studio`}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, #4a0610 0%, #1a0208 42%, #050508 100%)",
                opacity: 0.92,
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.07),transparent_55%)]" />

            <header className="relative z-10 flex items-center justify-between border-b border-ink/15 px-4 py-3 sm:px-8">
              <p className="font-mono text-2xs uppercase tracking-micro text-ink-faint">
                Shonari Phillips · Studio
              </p>
              <button
                type="button"
                onClick={() => setStudioOpen(false)}
                className="font-mono text-xs uppercase tracking-micro text-ink-soft transition-colors hover:text-ink"
              >
                Close ✕
              </button>
            </header>

            <div className="relative z-10 flex flex-1 flex-col items-center justify-center overflow-y-auto px-4 py-10 sm:px-8">
              <div className="mb-10 max-w-3xl text-center">
                <div className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2">
                  <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
                    {title}
                  </h2>
                  <time
                    className="font-mono text-base tracking-micro text-ink-faint sm:text-xl"
                    dateTime={year}
                  >
                    {year}
                  </time>
                </div>
                <p className="mx-auto mt-4 max-w-xl font-sans text-base leading-relaxed text-ink-soft sm:text-lg">
                  {description}
                </p>
                <p className="mt-4 font-mono text-2xs uppercase tracking-micro text-ink-faint">
                  Click an image to enlarge · use Replace to swap
                </p>
              </div>

              <div className="grid w-full max-w-5xl grid-cols-2 gap-5 sm:grid-cols-4 sm:gap-6">
                {Array.from({ length: DECK_SIZE }, (_, i) => {
                  const src = srcs[i];
                  const inputId = `${baseId}-studio-${i}`;
                  return (
                    <div
                      key={i}
                      className="group/slot relative aspect-[3/4] overflow-hidden rounded-sm border border-ink/25 bg-canvas/30 shadow-[0_12px_36px_rgba(0,0,0,0.5)]"
                    >
                      {src ? (
                        <button
                          type="button"
                          className="absolute inset-0 z-[1] cursor-zoom-in"
                          onClick={() => setViewerSrc(src)}
                          aria-label={`View ${title} image ${i + 1} full size`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            {...imgProps(src, SIZES.thumb)}
                            alt=""
                            className="block h-full w-full object-cover object-center opacity-85 transition-opacity hover:opacity-95"
                            draggable={false}
                          />
                        </button>
                      ) : (
                        <span className="flex h-full w-full flex-col items-center justify-center gap-2 px-2 text-center">
                          <span className="font-mono text-xs uppercase tracking-micro text-ink-muted">
                            Empty
                          </span>
                          <span className="font-sans text-2xs text-ink-faint">
                            Card {i + 1}
                          </span>
                        </span>
                      )}
                      <label
                        htmlFor={inputId}
                        className="absolute bottom-2 right-2 z-[2] cursor-pointer rounded-sm border border-ink/30 bg-canvas/80 px-2 py-1 font-mono text-2xs uppercase tracking-micro text-ink-soft opacity-90 transition-opacity hover:opacity-100"
                      >
                        {src ? "Replace" : "Upload"}
                        <input
                          id={inputId}
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) => {
                            const file = e.target.files?.[0] ?? null;
                            onPick(i, file);
                            e.target.value = "";
                          }}
                        />
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>,
          document.body,
        )}

      {mounted &&
        viewerSrc &&
        createPortal(
          <div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/95 p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} full image`}
            onClick={() => setViewerSrc(null)}
          >
            <button
              type="button"
              className="absolute right-4 top-4 z-10 font-mono text-sm uppercase tracking-micro text-ink-soft hover:text-ink sm:right-8 sm:top-6"
              onClick={() => setViewerSrc(null)}
            >
              Close ✕
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              {...imgProps(viewerSrc, SIZES.full)}
              alt={title}
              className="max-h-full max-w-full object-contain"
              draggable={false}
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body,
        )}
    </article>
  );
}
