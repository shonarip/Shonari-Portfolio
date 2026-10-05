"use client";

import Link from "next/link";
import { useEffect } from "react";
import { site } from "@/content/site";
import { SkullTurntable } from "./SkullTurntable";
import { HeroHeading } from "./HeroHeading";

/** Full-height landing: the only thing on screen when the site opens. */
export function Hero() {
  // Old in-page links (/#work, /#featured, …) now live on /portfolio.
  useEffect(() => {
    const h = window.location.hash;
    if (h && h !== "#top") window.location.replace(`/portfolio${h}`);
  }, []);

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="flex h-[100svh] min-h-[560px] flex-col items-center justify-center px-4 pb-4 pt-14 text-center sm:pt-16"
    >
      <HeroHeading id="hero-heading" />

      <p className="mt-1.5 max-w-2xl font-display text-base font-semibold tracking-tight text-ink-soft sm:text-lg md:text-xl">
        {site.mantra}
      </p>

      <p className="mt-0.5 max-w-xl font-sans text-sm leading-relaxed text-ink-muted sm:text-base">
        {site.tagline}
      </p>

      <SkullTurntable />

      <a
        href={site.heroSkull.href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 mt-2 inline-flex min-h-11 items-center gap-1.5 font-mono text-2xs uppercase tracking-micro text-ink-faint transition-colors hover:text-accent"
      >
        Watch on YouTube
        <span aria-hidden="true">↗</span>
      </a>

      <div className="relative z-20 mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href={site.landing.primary.href}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-accent bg-accent px-6 font-mono text-xs uppercase tracking-micro text-canvas transition-colors hover:bg-accent-soft hover:border-accent-soft"
        >
          {site.landing.primary.label}
          <span aria-hidden="true">→</span>
        </Link>
        <Link
          href={site.landing.secondary.href}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/40 bg-canvas/30 px-6 font-mono text-xs uppercase tracking-micro text-ink backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
        >
          {site.landing.secondary.label}
        </Link>
      </div>

      {site.clientStrip ? (
        <p className="mt-2 max-w-2xl font-mono text-2xs uppercase tracking-micro text-ink-faint">
          {site.clientStrip}
        </p>
      ) : (
        /* Holds the line's old height so the centered stack, and the buttons, stay put */
        <div aria-hidden="true" className="h-[34px] md:h-[21px]" />
      )}
    </section>
  );
}
