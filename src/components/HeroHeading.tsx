"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

const HOLD_MS = 2000;
const FADE_MS = 500;

/** Landing H1: white lead + one accent word cycling Prints, Signage, Apparel. */
export function HeroHeading({ id }: { id: string }) {
  const words = site.heroWords;
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(true);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Out, swap, in: one word fully fades out before the next fades in (no overlap).
  useEffect(() => {
    if (reduce) return;
    let t: number;
    if (shown) {
      t = window.setTimeout(() => setShown(false), HOLD_MS);
    } else {
      t = window.setTimeout(() => {
        setI((n) => (n + 1) % words.length);
        setShown(true);
      }, FADE_MS);
    }
    return () => window.clearTimeout(t);
  }, [reduce, shown, words.length]);

  const cls =
    "max-w-4xl font-display text-[clamp(1.5rem,4.4vw,3.25rem)] leading-[1.1] tracking-tight text-ink";

  if (reduce) {
    return (
      <h1 id={id} className={cls}>
        {site.heroLead}{" "}
        <span className="text-accent">{words.join(", ")}.</span>
      </h1>
    );
  }

  return (
    <h1 id={id} className={cls}>
      <span className="sr-only">{site.heroLabel}</span>
      <span aria-hidden="true">
        {site.heroLead}{" "}
        {/* All words share one grid cell, so the box is always as wide as the widest word */}
        <span className="inline-grid whitespace-nowrap text-left align-bottom">
          {words.map((w, n) => (
            <span
              key={w}
              style={{ gridArea: "1 / 1", transitionDuration: `${FADE_MS}ms` }}
              className={[
                "text-accent transition-[opacity,transform] ease-out",
                n === i && shown ? "translate-y-0 opacity-100" : n === i ? "-translate-y-[0.2em] opacity-0" : "translate-y-[0.2em] opacity-0",
              ].join(" ")}
            >
              {w}
            </span>
          ))}
        </span>
      </span>
    </h1>
  );
}
