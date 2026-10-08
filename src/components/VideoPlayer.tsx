"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { mediaUrl } from "@/content/media";

export type VideoPlayerItem = {
  /** The .mp4 path as stored in site.ts; mediaUrl() points it at the media host. */
  src: string;
  poster?: string;
  title: string;
  alt: string;
  /** Short plain-language line under the title, e.g. "3D animation · 2026". */
  meta?: string;
};

type Props = {
  items: readonly VideoPlayerItem[];
  /** Index of the open video, or null when closed. */
  index: number | null;
  onClose: () => void;
  onIndex: (next: number) => void;
};

/**
 * One player for every video on the site, opened over the page like the image viewer.
 * It closes with the Close button, the Escape key, a click outside the video, or the
 * browser's Back button, so a visitor is never stuck inside a video.
 */
export function VideoPlayer({ items, index, onClose, onIndex }: Props) {
  const [mounted, setMounted] = useState(false);
  const [failed, setFailed] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);
  const open = index !== null && index >= 0 && index < items.length;
  const count = items.length;

  useEffect(() => setMounted(true), []);
  useEffect(() => setFailed(false), [index]);

  const step = useCallback(
    (delta: number) => {
      if (index === null || count === 0) return;
      onIndex((index + delta + count) % count);
    },
    [index, count, onIndex],
  );

  /** Every way out goes through history, so Back and Close behave the same. */
  const requestClose = useCallback(() => {
    if ((window.history.state as { videoPlayer?: boolean } | null)?.videoPlayer) {
      window.history.back();
    } else {
      onCloseRef.current();
    }
  }, []);

  // Opening adds one history entry; Back (or Close) removes it and closes the player.
  useEffect(() => {
    if (!open) return;
    window.history.pushState({ ...(window.history.state ?? {}), videoPlayer: true }, "");
    const onPop = () => onCloseRef.current();
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      prevFocus?.focus?.();
    };
  }, [open, requestClose]);

  if (!mounted || !open || index === null) return null;
  const item = items[index];

  return createPortal(
    <div
      className="fixed inset-0 z-[90] flex flex-col bg-canvas/95 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} video player`}
    >
      <header className="flex items-start justify-between gap-4 border-b border-ink/10 px-5 py-3 sm:px-8">
        <div className="min-w-0">
          <h2 className="truncate font-display text-2xl tracking-tight text-ink sm:text-3xl">{item.title}</h2>
          <p className="text-sm text-ink-muted">
            {item.meta ? `${item.meta} · ` : ""}
            {index + 1} of {count}
          </p>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={requestClose}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 border border-ink/40 px-5 text-2xs font-semibold uppercase tracking-micro text-ink transition-colors hover:border-accent hover:text-accent"
        >
          Close <span aria-hidden="true">✕</span>
        </button>
      </header>

      {/* A click on the empty space around the video closes the player. */}
      <div className="flex min-h-0 flex-1 items-center justify-center p-4 sm:p-8" onClick={requestClose}>
        {failed ? (
          <p className="text-ink-soft" onClick={(e) => e.stopPropagation()}>
            This video couldn&apos;t load. Please try again later.
          </p>
        ) : (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            key={item.src}
            className="max-h-full max-w-full bg-black shadow-[0_24px_80px_rgba(0,0,0,0.65)]"
            poster={item.poster}
            controls
            autoPlay
            playsInline
            preload="auto"
            aria-label={`${item.title}. ${item.alt}`}
            onError={() => setFailed(true)}
            onClick={(e) => e.stopPropagation()}
          >
            <source src={mediaUrl(item.src)} type="video/mp4" onError={() => setFailed(true)} />
          </video>
        )}
      </div>

      {count > 1 && (
        <footer className="flex items-center justify-center gap-3 border-t border-ink/10 px-5 py-3">
          <button type="button" onClick={() => step(-1)} className="btn-secondary min-h-11 px-5 text-sm">
            <span aria-hidden="true">←</span> Previous
          </button>
          <button type="button" onClick={() => step(1)} className="btn-secondary min-h-11 px-5 text-sm">
            Next <span aria-hidden="true">→</span>
          </button>
        </footer>
      )}
    </div>,
    document.body,
  );
}
