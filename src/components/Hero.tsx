"use client";

import Link from "next/link";
import { useEffect } from "react";
import { site } from "@/content/site";
import { SkullTurntable } from "./SkullTurntable";
import { RegMark } from "./ProofMarks";

/**
 * First screen, set like a proof sheet: the name and a path into the work on the left,
 * the skull framed in crop marks on the right, and a slug line of facts along the bottom.
 */
export function Hero() {
  // Old in-page links (/#work, /#featured, …) now live on /portfolio.
  useEffect(() => {
    const h = window.location.hash;
    if (h && !["#top", "#main", "#about", "#featured", "#proofs"].includes(h)) {
      window.location.replace(`/portfolio${h}`);
    }
  }, []);

  const { hero } = site;
  const [first, ...rest] = hero.headline.split(" ");

  const slug = [
    { label: "Based in", value: site.location },
    { label: "Coordinates", value: hero.coordinates },
    { label: "Practice", value: "Print · Signage · Apparel · Motion" },
    {
      label: "Now",
      value: hero.context
        .replace(/^Currently an? /, "")
        .replace(/\.$/, "")
        .replace(/^./, (c) => c.toUpperCase()),
    },
  ];

  return (
    <section id="top" aria-labelledby="hero-heading" className="relative">
      <p className="rail absolute left-4 top-1/2 hidden -translate-y-1/2 xl:block" aria-hidden="true">
        Portfolio · {site.name} · 2026
      </p>

      <div className="container-page flex min-h-[100svh] flex-col pb-8 pt-24 md:pt-28">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <p className="t-eyebrow mb-5">{hero.eyebrow}</p>
            <h1 id="hero-heading" className="t-display">
              {first}
              <br />
              <em className="text-ink-soft">{rest.join(" ")}</em>
            </h1>
            <p className="t-lead mt-8 max-w-xl">{hero.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={hero.primary.href} className="btn-primary">
                {hero.primary.label}
                <span aria-hidden="true">→</span>
              </Link>
              <Link href={hero.secondary.href} className="btn-secondary">
                {hero.secondary.label}
              </Link>
            </div>
          </div>

          <figure className="order-1 lg:order-2 lg:col-span-5">
            {/*
              The skull is set as a proof: crop marks at the trim corners and a registration
              target centred in the margin on each side. The marks sit outside the frame; the
              model itself is unchanged.
            */}
            <div className="crop relative mx-auto w-[min(70vw,46svh,460px)] min-w-[200px] text-ink-muted">
              <SkullTurntable />
              <RegMark size={18} className="absolute -top-[33px] left-1/2 -translate-x-1/2 text-ink-muted" />
              <RegMark size={18} className="absolute -bottom-[33px] left-1/2 -translate-x-1/2 text-ink-muted" />
              <RegMark size={18} className="absolute -left-[33px] top-1/2 -translate-y-1/2 text-ink-muted" />
              <RegMark size={18} className="absolute -right-[33px] top-1/2 -translate-y-1/2 text-ink-muted" />
            </div>
            <figcaption className="mx-auto mt-12 flex w-[min(70vw,46svh,460px)] min-w-[200px] justify-between gap-4 text-2xs uppercase tracking-micro text-ink-muted">
              <span>{hero.captionLeft}</span>
              <span className="text-right">{hero.captionRight}</span>
            </figcaption>
          </figure>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/20 pt-5 md:grid-cols-4">
          {slug.map((item) => (
            <div key={item.label}>
              <dt className="text-2xs uppercase tracking-micro text-ink-muted">{item.label}</dt>
              <dd className="mt-1 text-[15px] text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
