import Link from "next/link";
import { site } from "@/content/site";
import { altFor } from "@/content/alt";
import { imgProps } from "@/content/img";
import { CmykBar, RegMark } from "./ProofMarks";

const SHEET_SIZES = "(min-width: 640px) 30vw, 45vw";

/**
 * The home page as a contact sheet: a washi press sheet holding six proofs, three across.
 * Each proof keeps its own shape, with crop marks at its trim corners and a frame number
 * and caption beneath. Registration targets sit centred in the sheet margins, a slug line
 * runs along the top, and a CMYK control strip runs along the foot.
 */
export function ContactSheet() {
  const { contactSheet } = site;
  const proofs = contactSheet.proofs;

  return (
    <section id="proofs" aria-labelledby="sheet-heading" className="container-page section scroll-mt-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="t-eyebrow">{contactSheet.eyebrow}</p>
          <h2 id="sheet-heading" className="t-h1 mt-3">
            {contactSheet.heading}
          </h2>
          <p className="t-lead mt-4">{contactSheet.intro}</p>
        </div>
        <Link href="/work" className="link-quiet">
          Open the index <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="paper-washi paper-grain relative mt-10 px-7 pb-12 pt-16 sm:px-14 md:px-20 md:pt-20">
        {/* Registration targets, centred in each margin. */}
        <RegMark size={18} className="absolute left-1/2 top-4 -translate-x-1/2 text-onpaper" />
        <RegMark size={18} className="absolute bottom-4 left-1/2 -translate-x-1/2 text-onpaper" />
        <RegMark size={18} className="absolute left-2 top-1/2 -translate-y-1/2 text-onpaper sm:left-4" />
        <RegMark size={18} className="absolute right-2 top-1/2 -translate-y-1/2 text-onpaper sm:right-4" />

        {/* Slug line, as printed in the top margin of a press sheet. */}
        <p
          aria-hidden="true"
          className="absolute left-7 right-7 top-5 hidden justify-between text-2xs uppercase tracking-micro text-onpaper-soft sm:flex sm:left-14 sm:right-14 md:left-20 md:right-20"
        >
          <span>nariportfolio.com</span>
          <span>
            Sheet 01 · {proofs.length} proofs · 2026
          </span>
        </p>

        <ol className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 sm:gap-x-10 lg:gap-x-16 lg:gap-y-16">
          {proofs.map((proof, i) => {
            const n = String(i + 1).padStart(2, "0");
            return (
              <li key={proof.image}>
                <Link
                  href={proof.href}
                  className="group block focus-visible:outline-offset-[18px]"
                  aria-label={`${proof.title}. Opens ${proof.section}.`}
                >
                  {/* Each proof keeps its own shape; the crop marks hug its trim. */}
                  <div className="flex h-44 items-end justify-center sm:h-60 lg:h-80">
                    <span className="crop inline-block max-h-full max-w-full text-onpaper">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        {...imgProps(proof.image, SHEET_SIZES)}
                        alt={altFor(proof.image, proof.title)}
                        className="block h-auto max-h-44 w-auto max-w-full transition-opacity group-hover:opacity-90 sm:max-h-60 lg:max-h-80"
                      />
                    </span>
                  </div>
                  <p className="mt-6 flex gap-3 text-[14px] leading-snug">
                    <span className="shrink-0 text-onpaper-soft">{n}</span>
                    <span className="min-w-0">
                      <span className="block font-medium underline-offset-4 group-hover:underline">
                        {proof.title}
                      </span>
                      <span className="mt-0.5 block text-2xs uppercase tracking-micro text-onpaper-soft">
                        {proof.section} · {proof.year}
                      </span>
                    </span>
                  </p>
                </Link>
              </li>
            );
          })}
        </ol>

        <CmykBar className="mt-14 text-onpaper" />
      </div>
    </section>
  );
}
