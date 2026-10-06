"use client";

import { useEffect, useState } from "react";

const HOLD_MS = 2200;
const FADE_MS = 450;

/**
 * Cycles through short words, one at a time. Reduced-motion visitors get the whole
 * list as plain text, and screen readers always get the whole list.
 */
export function Rotator({ words }: { words: readonly string[] }) {
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

  useEffect(() => {
    if (reduce) return;
    const t = window.setTimeout(
      () => {
        if (shown) {
          setShown(false);
        } else {
          setI((n) => (n + 1) % words.length);
          setShown(true);
        }
      },
      shown ? HOLD_MS : FADE_MS,
    );
    return () => window.clearTimeout(t);
  }, [reduce, shown, words.length]);

  if (reduce) return <span className="italic">{words.join(", ")}.</span>;

  return (
    <>
      <span className="sr-only">{words.join(", ")}.</span>
      <span aria-hidden="true" className="inline-grid align-bottom italic">
        {words.map((w, n) => (
          <span
            key={w}
            style={{ gridArea: "1 / 1", transitionDuration: `${FADE_MS}ms` }}
            className={[
              // Only the current word animates, so the old word is gone before the next one fades in.
              n === i ? "transition-[opacity,transform] ease-out" : "transition-none",
              n === i && shown ? "translate-y-0 opacity-100" : "translate-y-[0.15em] opacity-0",
            ].join(" ")}
          >
            {w}
          </span>
        ))}
      </span>
    </>
  );
}
