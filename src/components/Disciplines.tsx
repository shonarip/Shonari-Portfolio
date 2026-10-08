import Link from "next/link";
import { site } from "@/content/site";
import { SWATCHES } from "./ProofMarks";

/** Hover fills, cycled in order (written out in full so Tailwind keeps them). */
const HOVER = ["hover:bg-paper-ai", "hover:bg-paper-shu", "hover:bg-paper-washi"] as const;

/** The index of disciplines: one row per lane, each with its own color chip, opening that lane in the archive. */
export function Disciplines() {
  return (
    <section aria-labelledby="disciplines-heading" className="container-page section">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="t-eyebrow">Index</p>
          <h2 id="disciplines-heading" className="t-h1 mt-3">
            Disciplines
          </h2>
        </div>
        <Link href="/work" className="link-quiet">
          Browse the archive <span aria-hidden="true">→</span>
        </Link>
      </div>

      <ol className="mt-10 border-t border-ink/20">
        {site.hero.lanes.map((lane, i) => (
          <li key={lane.href} className="border-b border-ink/20">
            <Link
              href={lane.href}
              className={`group grid min-h-24 grid-cols-[2.5rem_1fr] items-center gap-x-4 gap-y-1 py-5 transition-colors hover:text-onpaper sm:grid-cols-[4rem_1fr_auto] md:px-4 ${HOVER[i % HOVER.length]}`}
            >
              <span className="flex items-center gap-2 text-2xs font-medium uppercase tracking-micro text-ink-muted group-hover:text-onpaper">
                <span
                  aria-hidden="true"
                  className="inline-block h-2.5 w-2.5 shrink-0"
                  style={{ background: SWATCHES[i % SWATCHES.length].hex }}
                />
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-none tracking-tight transition-[font-style] group-hover:italic">
                {lane.label}
              </span>
              <span className="col-start-2 text-[15px] text-ink-muted group-hover:text-onpaper-soft sm:col-start-3 sm:text-right">
                {lane.note}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
