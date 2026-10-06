"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/content/site";
import { altFor } from "@/content/alt";
import { imgProps, SIZES } from "@/content/img";
import { CaseFacts } from "./CaseFacts";
import { ProjectGallery } from "./ProjectGallery";

type FeaturedItem = (typeof site.featured)[number];

function galleryFor(item: FeaturedItem): string[] {
  if ("images" in item && Array.isArray(item.images) && item.images.length > 0) {
    return [...item.images];
  }
  return item.image ? [item.image] : [];
}

function FeaturedMedia({ item, onOpen }: { item: FeaturedItem; onOpen: () => void }) {
  const gallery = galleryFor(item);
  const support = gallery.length > 1 ? gallery.slice(1, 3) : [];

  return (
    <div className="grid gap-3">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open the ${item.title} gallery`}
        className="group relative block aspect-[4/3] w-full overflow-hidden rounded-md border border-ink/10 bg-canvas-soft transition-colors hover:border-accent"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          {...imgProps(item.image, SIZES.card)}
          alt={altFor(item.image, item.title)}
          className="h-full w-full object-contain object-center"
        />
      </button>
      {support.length > 0 && (
        <ul className="grid grid-cols-2 gap-3">
          {support.map((src) => (
            <li key={src}>
              <button
                type="button"
                onClick={onOpen}
                aria-label={`Open the ${item.title} gallery`}
                className="relative block aspect-[4/3] w-full overflow-hidden rounded-md border border-ink/10 bg-canvas-soft transition-colors hover:border-accent"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  {...imgProps(src, SIZES.thumb)}
                  alt={altFor(src, `${item.title}, additional work`)}
                  className="h-full w-full object-contain object-center"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Featured projects, each written up as a short case study. */
export function Featured() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const openItem = site.featured.find((f) => f.slug === openSlug) ?? null;

  return (
    <section id="work" aria-labelledby="featured-heading" className="scroll-mt-20">
      <div className="container-page pt-6 md:pt-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="t-eyebrow">Selected work</p>
            <h1 id="featured-heading" className="t-h1 mt-3">
              Featured projects
            </h1>
          </div>
          <Link href="/work" className="link-quiet">
            See all works <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="mt-10 flex flex-col">
        {site.featured.map((item, i) => {
          const gallery = galleryFor(item);
          return (
            <article
              key={item.slug}
              aria-labelledby={`case-${item.slug}`}
              className="border-t border-ink/10 py-12 md:py-20"
            >
              <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-14">
                <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-last" : ""}`}>
                  <p className="t-eyebrow">{item.caption}</p>
                  <h2 id={`case-${item.slug}`} className="t-h2 mt-3">
                    {item.title}
                  </h2>
                  <p className="t-lead mt-4">{item.description}</p>

                  <div className="mt-8">
                    <CaseFacts caseStudy={item.caseStudy} year={item.year} />
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
                    <Link href={item.href} className="btn-primary">
                      {item.cta}
                      <span aria-hidden="true">→</span>
                    </Link>
                    <button type="button" onClick={() => setOpenSlug(item.slug)} className="link-quiet">
                      Open gallery ({gallery.length})
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <FeaturedMedia item={item} onOpen={() => setOpenSlug(item.slug)} />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {openItem && (
        <ProjectGallery
          open
          onClose={() => setOpenSlug(null)}
          title={openItem.title}
          images={galleryFor(openItem)}
        />
      )}
    </section>
  );
}
