"use client";

import Link from "next/link";
import { useEffect } from "react";
import { site } from "@/content/site";
import { SkullTurntable } from "./SkullTurntable";

/** First screen: the skull as the hero object, the name, and a path into the work. */
export function Hero() {
  // Old in-page links (/#work, /#featured, …) now live on /portfolio.
  useEffect(() => {
    const h = window.location.hash;
    if (h && h !== "#top" && h !== "#main" && h !== "#about" && h !== "#featured") {
      window.location.replace(`/portfolio${h}`);
    }
  }, []);

  const { hero } = site;

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="container-page flex min-h-[100svh] flex-col justify-between pb-8 pt-20"
    >
      <div className="relative flex flex-1 items-center justify-center py-4">
        <p className="t-eyebrow absolute left-0 top-1/2 hidden max-w-[10rem] -translate-y-1/2 md:block">
          {hero.captionLeft}
        </p>
        <p className="t-eyebrow absolute right-0 top-1/2 hidden max-w-[10rem] -translate-y-1/2 text-right md:block">
          {hero.captionRight}
        </p>
        <div className="w-[min(70vw,56svh,540px)] min-w-[220px]">
          <SkullTurntable />
        </div>
      </div>

      <div className="grid items-end gap-8 md:grid-cols-12">
        <div className="md:col-span-8">
          <p className="t-eyebrow mb-4">{hero.eyebrow}</p>
          <h1 id="hero-heading" className="t-display">
            {hero.headline}
          </h1>
        </div>
        <div className="md:col-span-4">
          <p className="t-lead">{hero.summary}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={hero.primary.href} className="btn-primary">
              {hero.primary.label}
              <span aria-hidden="true">→</span>
            </Link>
            <Link href={hero.secondary.href} className="btn-secondary">
              {hero.secondary.label}
            </Link>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="t-eyebrow mx-auto mt-8 inline-flex min-h-11 flex-col items-center gap-1 hover:text-accent"
      >
        Scroll down
        <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
