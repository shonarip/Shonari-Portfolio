"use client";

import { useMemo, useState } from "react";
import { altFor } from "@/content/alt";
import { imgProps, SIZES } from "@/content/img";
import { ProjectGallery } from "./ProjectGallery";

export type ImageGroup = { title: string; images: readonly string[] };

type Props = {
  title: string;
  images: readonly string[];
  /** Optional sections. When given, images are shown under each heading, in this order. */
  groups?: readonly ImageGroup[];
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function CaseGallery({ title, images, groups }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // One flat list drives the full-size viewer, so Next/Previous follow the on-page order.
  const flat = useMemo(() => (groups ? groups.flatMap((g) => [...g.images]) : [...images]), [groups, images]);

  if (!flat.length) {
    return <p className="t-small">No images in this set yet.</p>;
  }

  const tile = (src: string, i: number) => (
    <li key={src} className="mb-3 break-inside-avoid">
      <button
        type="button"
        onClick={() => setOpenIndex(i)}
        className="group block w-full border border-ink/15 p-1 transition-colors hover:border-accent"
        aria-label={`View ${title}, image ${i + 1} of ${flat.length}, full size`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          {...imgProps(src, SIZES.thumb)}
          alt={altFor(src, `${title}, image ${i + 1} of ${flat.length}`)}
          className="block h-auto w-full"
          draggable={false}
        />
      </button>
    </li>
  );

  // Masonry: each preview keeps its own shape, so there are no bars and no cropping.
  const masonry = "columns-2 gap-3 sm:columns-3 lg:columns-4";

  let offset = 0;

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="t-small">
          {flat.length} {flat.length === 1 ? "image" : "images"}
          {groups ? ` in ${groups.length} sections` : ""}
        </p>
        <button type="button" onClick={() => setOpenIndex(0)} className="link-quiet">
          View full size <span aria-hidden="true">→</span>
        </button>
      </div>

      {groups ? (
        <>
          <nav aria-label="Sections" className="mb-10">
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {groups.map((g) => (
                <li key={g.title}>
                  <a
                    href={`#${slugify(g.title)}`}
                    className="inline-flex min-h-11 items-center text-2xs font-medium uppercase tracking-micro text-ink-soft transition-colors hover:text-accent"
                  >
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-16">
            {groups.map((g) => {
              const start = offset;
              offset += g.images.length;
              return (
                <section key={g.title} id={slugify(g.title)} aria-labelledby={`${slugify(g.title)}-h`} className="scroll-mt-20">
                  <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2 border-b border-ink/15 pb-3">
                    <h2 id={`${slugify(g.title)}-h`} className="t-h3">
                      {g.title}
                    </h2>
                    <p className="t-small">
                      {g.images.length} {g.images.length === 1 ? "piece" : "pieces"}
                    </p>
                  </div>
                  <ul className={masonry}>{g.images.map((src, j) => tile(src, start + j))}</ul>
                </section>
              );
            })}
          </div>
        </>
      ) : (
        <ul className={masonry}>{flat.map((src, i) => tile(src, i))}</ul>
      )}

      <ProjectGallery
        open={openIndex !== null}
        onClose={() => setOpenIndex(null)}
        title={title}
        images={flat}
        initialIndex={openIndex ?? 0}
      />
    </>
  );
}
