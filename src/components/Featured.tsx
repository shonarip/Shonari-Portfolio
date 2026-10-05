"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { ProjectGallery } from "./ProjectGallery";
import { imgProps, SIZES } from "@/content/img";

function padIndex(i: number) {
  return String(i + 1).padStart(2, "0");
}

type FeaturedItem = (typeof site.featured)[number];

const BAND_SHIFTS = [
  "bg-[radial-gradient(ellipse_at_20%_0%,rgba(180,30,60,0.14),transparent_55%)]",
  "bg-[radial-gradient(ellipse_at_80%_30%,rgba(90,40,120,0.12),transparent_50%)]",
  "bg-[radial-gradient(ellipse_at_40%_100%,rgba(40,70,140,0.12),transparent_55%)]",
] as const;

function galleryFor(item: FeaturedItem): string[] {
  if ("images" in item && Array.isArray(item.images) && item.images.length > 0) {
    return [...item.images];
  }
  return item.image ? [item.image] : [];
}

function supportingImages(item: FeaturedItem): string[] {
  const all = galleryFor(item);
  return all.length > 1 ? all.slice(1, 3) : [];
}

function FeaturedMedia({ item }: { item: FeaturedItem }) {
  const support = supportingImages(item);

  return (
    <div
      className={[
        "grid gap-3",
        support.length >= 2 ? "lg:grid-cols-12" : "grid-cols-1",
      ].join(" ")}
    >
      <div
        className={[
          "relative overflow-hidden rounded-sm border border-ink/15 bg-transparent",
          support.length >= 2
            ? "aspect-[4/5] sm:aspect-[5/4] lg:col-span-8 lg:aspect-auto lg:min-h-[420px]"
            : "aspect-[16/10] sm:aspect-[5/3]",
        ].join(" ")}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          {...imgProps(item.image, SIZES.card)}
          alt={item.title}
          className="h-full w-full object-contain object-center opacity-90"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
      </div>

      {support.length >= 2 && (
        <div className="grid grid-cols-2 gap-3 lg:col-span-4 lg:grid-cols-1 lg:gap-3">
          {support.map((src) => (
            <div
              key={src}
              className="relative aspect-[4/5] overflow-hidden rounded-sm border border-ink/12 bg-transparent lg:aspect-auto lg:min-h-0 lg:flex-1"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                {...imgProps(src, SIZES.thumb)}
                alt=""
                className="h-full w-full object-contain object-center opacity-85"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function Featured() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const openItem = site.featured.find((f) => f.slug === openSlug) ?? null;

  return (
    <section id="work" aria-labelledby="featured-heading" className="scroll-mt-24 pb-2 pt-0">
      <div className="mx-auto mb-4 flex max-w-[1400px] flex-wrap items-end justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div>
          <p className="micro-label text-ink-faint">Selected</p>
          <h2
            id="featured-heading"
            className="mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl"
          >
            Featured
          </h2>
        </div>
        <a
          href="/work"
          className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-micro text-ink-muted transition-colors hover:text-accent"
        >
          See all works →
        </a>
      </div>

      <div className="flex flex-col">
        {site.featured.map((item, i) => {
          const label = `Featured ${padIndex(i)}`;
          const gallery = galleryFor(item);

          return (
            <article
              key={item.slug}
              className={[
                "relative border-t border-ink/10",
                BAND_SHIFTS[i % BAND_SHIFTS.length],
              ].join(" ")}
            >
              <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-16">
                <div className="flex flex-col justify-center lg:col-span-4 lg:sticky lg:top-24 lg:self-start lg:py-2">
                  <p className="hidden font-mono text-xs uppercase tracking-[0.22em] text-accent sm:block">
                    {label}
                  </p>
                  <p className="mt-4 font-mono text-2xs uppercase tracking-micro text-ink-faint">
                    {item.role}
                  </p>
                  <h3 className="mt-2 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-mono text-xs tracking-micro text-ink-muted">
                    {item.year} · {item.caption}
                  </p>
                  <p className="mt-5 max-w-md font-sans text-sm leading-relaxed text-ink-soft sm:text-base">
                    {item.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => setOpenSlug(item.slug)}
                    className="mt-7 inline-flex min-h-11 w-fit items-center gap-2 border-b border-accent/50 pb-0.5 font-mono text-xs uppercase tracking-micro text-accent transition-colors hover:border-accent hover:text-accent-soft"
                  >
                    View gallery
                    <span aria-hidden="true">→</span>
                  </button>
                </div>

                <div className="relative lg:col-span-8">
                  <p
                    className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-accent lg:hidden"
                    aria-hidden="true"
                  >
                    {label}
                  </p>
                  <button
                    type="button"
                    className="block w-full text-left"
                    onClick={() => setOpenSlug(item.slug)}
                    aria-label={`Open ${item.title} gallery`}
                  >
                    <FeaturedMedia item={item} />
                  </button>
                  {gallery.length > 1 && (
                    <p className="mt-3 font-mono text-2xs uppercase tracking-micro text-ink-faint">
                      {gallery.length} images · click to open
                    </p>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {openItem && (
        <ProjectGallery
          open={Boolean(openItem)}
          onClose={() => setOpenSlug(null)}
          title={openItem.title}
          images={galleryFor(openItem)}
        />
      )}
    </section>
  );
}
