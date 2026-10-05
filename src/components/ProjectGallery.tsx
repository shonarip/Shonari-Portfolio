"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { imgProps, SIZES } from "@/content/img";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  images: readonly string[];
  initialIndex?: number;
};

export function ProjectGallery({ open, onClose, title, images, initialIndex = 0 }: Props) {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const start = Math.min(Math.max(initialIndex, 0), Math.max(images.length - 1, 0));
    setActive(start);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        setActive((i) => (i + 1) % Math.max(images.length, 1));
      if (e.key === "ArrowLeft")
        setActive(
          (i) => (i - 1 + Math.max(images.length, 1)) % Math.max(images.length, 1),
        );
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, images.length, initialIndex]);

  if (!mounted || !open || images.length === 0) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[95] flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} gallery`}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #4a0610 0%, #1a0208 42%, #050508 100%)",
          opacity: 0.96,
        }}
        onClick={onClose}
      />

      <header className="relative z-10 flex items-center justify-between border-b border-ink/15 px-4 py-3 sm:px-8">
        <div>
          <p className="font-mono text-2xs uppercase tracking-micro text-ink-faint">
            Gallery
          </p>
          <h2 className="font-display text-xl tracking-tight text-ink sm:text-2xl">
            {title}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="font-mono text-xs uppercase tracking-micro text-ink-soft transition-colors hover:text-ink"
        >
          Close ✕
        </button>
      </header>

      <div className="relative z-10 flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-6 sm:px-8">
        <div
          className="mx-auto flex w-full max-w-5xl flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            {...imgProps(images[active], SIZES.full)}
            alt={`${title} ${active + 1}`}
            className="max-h-[58vh] w-full rounded-sm object-contain shadow-[0_24px_80px_rgba(0,0,0,0.65)]"
            draggable={false}
          />
          <p className="mt-3 font-mono text-2xs uppercase tracking-micro text-ink-faint">
            {active + 1} / {images.length}
          </p>
        </div>

        <ul className="mx-auto grid w-full max-w-5xl grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className={[
                  "relative aspect-[4/5] w-full overflow-hidden rounded-sm border bg-canvas/40",
                  i === active
                    ? "border-accent/70 ring-1 ring-accent/40"
                    : "border-ink/15 hover:border-ink/35",
                ].join(" ")}
                aria-label={`Show image ${i + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  {...imgProps(src, SIZES.tiny)}
                  alt=""
                  className="h-full w-full object-contain object-center"
                  draggable={false}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body,
  );
}
