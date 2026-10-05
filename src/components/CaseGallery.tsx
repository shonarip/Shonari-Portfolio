"use client";

import { useState } from "react";
import { ProjectGallery } from "./ProjectGallery";
import { imgProps, SIZES } from "@/content/img";

type Props = {
  title: string;
  images: string[];
};

export function CaseGallery({ title, images }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!images.length) {
    return (
      <p className="font-sans text-sm text-ink-muted">No images in this set yet.</p>
    );
  }

  return (
    <>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <p className="font-mono text-2xs uppercase tracking-micro text-ink-faint">
          {images.length} images
        </p>
        <button
          type="button"
          onClick={() => setOpenIndex(0)}
          className="font-mono text-xs uppercase tracking-micro text-accent transition-colors hover:text-accent-soft"
        >
          Open gallery →
        </button>
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((src, i) => (
          <li key={src}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-ink/15 bg-canvas/40"
              aria-label={`${title} image ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                {...imgProps(src, SIZES.card)}
                alt=""
                className="h-full w-full object-contain object-center opacity-90 transition group-hover:opacity-100"
                draggable={false}
              />
            </button>
          </li>
        ))}
      </ul>

      <ProjectGallery
        open={openIndex !== null}
        onClose={() => setOpenIndex(null)}
        title={title}
        images={images}
        initialIndex={openIndex ?? 0}
      />
    </>
  );
}
