"use client";

import { useState } from "react";
import { altFor } from "@/content/alt";
import { imgProps, SIZES } from "@/content/img";
import { ProjectGallery } from "./ProjectGallery";

type Props = {
  title: string;
  images: string[];
};

export function CaseGallery({ title, images }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!images.length) {
    return <p className="t-small">No images in this set yet.</p>;
  }

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="t-small">
          {images.length} {images.length === 1 ? "image" : "images"}
        </p>
        <button type="button" onClick={() => setOpenIndex(0)} className="link-quiet">
          View full size <span aria-hidden="true">→</span>
        </button>
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((src, i) => (
          <li key={src}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group relative block aspect-[4/5] w-full overflow-hidden border border-ink/10 bg-canvas-soft transition-colors hover:border-accent"
              aria-label={`View ${title}, image ${i + 1} of ${images.length}, full size`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                {...imgProps(src, SIZES.card)}
                alt={altFor(src, `${title}, image ${i + 1} of ${images.length}`)}
                className="h-full w-full object-contain object-center"
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
