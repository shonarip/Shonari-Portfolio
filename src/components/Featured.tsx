"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/content/site";
import { altFor } from "@/content/alt";
import { imgProps, SIZES } from "@/content/img";
import { CaseFacts } from "./CaseFacts";
import { ProjectGallery } from "./ProjectGallery";

type FeaturedItem = (typeof site.featured)[number];

/** Folder colors, cycled in order. */
const PAPER = ["paper-ai", "paper-shu", "paper-washi"] as const;

/** Where each folder's tab sits along the top edge, so the stack reads as a file drawer. */
const TAB_X = ["md:ml-0", "md:ml-[33%]", "md:ml-[66%]"] as const;

function galleryFor(item: FeaturedItem): string[] {
  if ("images" in item && Array.isArray(item.images) && item.images.length > 0) {
    return [...item.images];
  }
  return item.image ? [item.image] : [];
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function FeaturedMedia({ item, onOpen }: { item: FeaturedItem; onOpen: () => void }) {
  const gallery = galleryFor(item);
  const support = gallery.length > 1 ? gallery.slice(1, 3) : [];
  // Crop marks hug each image, so nothing is letterboxed: every preview keeps its own shape.
  const frame = "crop text-onpaper/70";

  return (
    <div className="grid gap-3 px-3">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open the ${item.title} gallery`}
        className={`group mx-auto block w-fit max-w-full ${frame}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          {...imgProps(item.image, SIZES.card)}
          alt={altFor(item.image, item.title)}
          className="block h-auto max-h-[70vh] w-auto max-w-full"
        />
      </button>
      {support.length > 0 && (
        <ul className="mt-6 grid grid-cols-2 items-start gap-8">
          {support.map((src) => (
            <li key={src} className="flex justify-center">
              <button
                type="button"
                onClick={onOpen}
                aria-label={`Open the ${item.title} gallery`}
                className={`block w-fit max-w-full ${frame}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  {...imgProps(src, SIZES.thumb)}
                  alt={altFor(src, `${item.title}, additional work`)}
                  className="block h-auto max-h-[360px] w-auto max-w-full"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Featured projects: a drawer of paper folders, each written up as a short case study. */
export function Featured({ headingLevel = "h1" }: { headingLevel?: "h1" | "h2" }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const openItem = site.featured.find((f) => f.slug === openSlug) ?? null;
  const Heading = headingLevel;

  return (
    <section id="work" aria-labelledby="featured-heading" className="scroll-mt-16">
      <div className="container-page flex flex-wrap items-end justify-between gap-4 pb-8 pt-6 md:pb-12">
        <Heading id="featured-heading" className="t-h1">
          Featured work
        </Heading>
        <Link href="/work" className="link-quiet">
          See all works <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="flex flex-col">
        {site.featured.map((item, i) => {
          const gallery = galleryFor(item);
          const paper = PAPER[i % PAPER.length];
          return (
            <article
              key={item.slug}
              aria-labelledby={`case-${item.slug}`}
              className={i === 0 ? "" : "-mt-px"}
            >
              <div className="container-page">
                <p className={`folder-tab ${paper} ${TAB_X[i % TAB_X.length]}`}>
                  <span className="text-onpaper-soft">File {pad(i + 1)}</span>
                  {item.caption}
                </p>
              </div>
              <div className={`${paper} paper-grain py-12 md:py-20`}>
                <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-14">
                  <div className="lg:col-span-5">
                    <p aria-hidden="true" className="mb-4 font-display text-[clamp(4rem,9vw,7.5rem)] italic leading-none text-onpaper/20">
                      {pad(i + 1)}
                    </p>
                    <h2 id={`case-${item.slug}`} className="t-h1 !text-onpaper">
                      {item.title}
                    </h2>
                    <p className="mt-6 text-[17px] leading-[1.7]">{item.description}</p>

                    <p className="mt-6 text-2xs font-semibold uppercase tracking-micro">
                      {item.year} · {item.caption}
                    </p>

                    <div className="mt-6">
                      <CaseFacts caseStudy={item.caseStudy} year={item.year} tone="paper" />
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                      <Link href={item.href} className="btn-dark">
                        {item.cta}
                        <span aria-hidden="true">→</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => setOpenSlug(item.slug)}
                        className="inline-flex min-h-11 items-center text-2xs font-semibold uppercase tracking-micro underline underline-offset-4 hover:no-underline"
                      >
                        Open gallery ({gallery.length})
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <FeaturedMedia item={item} onOpen={() => setOpenSlug(item.slug)} />
                  </div>
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
