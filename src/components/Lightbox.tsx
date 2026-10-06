"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { imgProps, SIZES } from "@/content/img";

export type LightboxItem = {
  src: string;
  alt: string;
  title: string;
  /** Short plain-language line under the title, e.g. "Photography · 2023". */
  meta?: string;
};

type Props = {
  items: readonly LightboxItem[];
  /** Index of the open item, or null when closed. */
  index: number | null;
  onClose: () => void;
  onIndex: (next: number) => void;
  /** Label for the dialog, e.g. "Photography". */
  label: string;
};

/**
 * One viewer for every image on the site. The image always fits the space left
 * on screen (object-contain), so a photo opens whole and never cropped.
 */
export function Lightbox({ items, index, onClose, onIndex, label }: Props) {
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const open = index !== null && index >= 0 && index < items.length;
  const count = items.length;

  useEffect(() => setMounted(true), []);

  const step = useCallback(
    (delta: number) => {
      if (index === null || count === 0) return;
      onIndex((index + delta + count) % count);
    },
    [index, count, onIndex],
  );

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      prevFocus?.focus?.();
    };
  }, [open, onClose, step]);

  if (!mounted || !open || index === null) return null;
  const item = items[index];

  return createPortal(
    <div
      className="fixed inset-0 z-[90] flex flex-col bg-canvas/95 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={`${label} viewer`}
    >
      <header className="flex items-start justify-between gap-4 border-b border-ink/10 px-5 py-3 sm:px-8">
        <div className="min-w-0">
          <h2 className="truncate font-display text-lg font-bold tracking-tight text-ink sm:text-2xl">
            {item.title}
          </h2>
          <p className="text-sm text-ink-muted">
            {item.meta ? `${item.meta} · ` : ""}
            {index + 1} of {count}
          </p>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-ink/25 px-5 text-base font-medium text-ink transition-colors hover:border-accent hover:text-accent"
        >
          Close
        </button>
      </header>

      {/* Click on the empty space around the image closes the viewer. */}
      <div
        className="flex min-h-0 flex-1 items-center justify-center p-4 sm:p-8"
        onClick={onClose}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={item.src}
          {...imgProps(item.src, SIZES.full)}
          loading="eager"
          alt={item.alt}
          className="max-h-full max-w-full object-contain shadow-[0_24px_80px_rgba(0,0,0,0.65)]"
          draggable={false}
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {count > 1 && (
        <footer className="flex items-center justify-center gap-3 border-t border-ink/10 px-5 py-3">
          <button
            type="button"
            onClick={() => step(-1)}
            className="btn-secondary min-h-11 px-5 text-sm"
          >
            <span aria-hidden="true">←</span> Previous
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            className="btn-secondary min-h-11 px-5 text-sm"
          >
            Next <span aria-hidden="true">→</span>
          </button>
        </footer>
      )}
    </div>,
    document.body,
  );
}
