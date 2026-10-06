"use client";

import Link from "next/link";
import { useEffect } from "react";
import { site } from "@/content/site";
import { SkullTurntable } from "./SkullTurntable";

/** First screen: who I am, what I do, and a clear path into the work. */
export function Hero() {
  // Old in-page links (/#work, /#featured, …) now live on /portfolio.
  useEffect(() => {
    const h = window.location.hash;
    if (h && h !== "#top" && h !== "#main") window.location.replace(`/portfolio${h}`);
  }, []);

  const { hero } = site;

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="container-page flex min-h-[100svh] flex-col justify-center pb-10 pt-24 md:pb-14 md:pt-28"
    >
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p className="t-eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-heading" className="t-display mt-5">
            {hero.headline}
          </h1>
          <p className="t-lead mt-6 max-w-xl">{hero.summary}</p>
          <p className="mt-3 max-w-xl text-base text-ink-muted">{hero.context}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href={hero.primary.href} className="btn-primary">
              {hero.primary.label}
              <span aria-hidden="true">→</span>
            </Link>
            <Link href={hero.secondary.href} className="btn-secondary">
              {hero.secondary.label}
            </Link>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[240px] sm:max-w-[320px] lg:col-span-5 lg:max-w-none">
          <SkullTurntable />
        </div>
      </div>

      <nav aria-label="Browse the work by discipline" className="mt-12 border-t border-ink/10 pt-6 md:mt-16">
        <p className="t-small">Browse by discipline</p>
        <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
          {hero.lanes.map((lane) => (
            <li key={lane.href}>
              <Link
                href={lane.href}
                className="inline-flex min-h-11 items-center text-base font-medium text-ink-soft transition-colors hover:text-accent"
              >
                {lane.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
