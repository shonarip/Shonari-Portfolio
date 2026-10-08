import Link from "next/link";
import { site } from "@/content/site";
import { Rotator } from "./Rotator";
import { Seal } from "./ProofMarks";

const PORTRAIT = "/work/about/shonari-portrait.jpg";
const PORTRAIT_ALT =
  "Portrait of Shonari Phillips outdoors at dusk, looking at the camera, with short black hair, a light mustache and a white T-shirt, trees and shrubs behind.";

/** The introduction: a washi-paper folder with the portrait set as a proof, and the seal beside the heading. */
export function AboutCard() {
  const { hero } = site;

  return (
    <section id="about" aria-labelledby="about-card-heading" className="container-page scroll-mt-16 py-12 md:py-20">
      <p className="folder-tab paper-washi ml-6 sm:ml-10">
        <span className="text-onpaper-soft">00</span> About
      </p>
      <div className="crop text-ink-muted">
        <div className="paper-washi paper-grain relative px-6 py-10 sm:px-10 md:px-14 md:py-14">
          <p className="rail absolute right-4 top-14 hidden !text-onpaper-soft lg:block" aria-hidden="true">
            File 00 · Introduction
          </p>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 lg:pr-10">
            <div className="lg:col-span-5">
              <div className="crop relative mx-auto w-full max-w-[380px] text-onpaper lg:mx-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PORTRAIT}
                  alt={PORTRAIT_ALT}
                  width={828}
                  height={837}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[828/837] w-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col lg:col-span-7">
              <Seal size={44} className="mb-6" />
              <h2
                id="about-card-heading"
                className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.98] tracking-tight"
              >
                I design <Rotator words={hero.words} />
                <span className="mt-2 block text-[0.55em] italic leading-tight text-onpaper-soft">
                  from first sketch to the finished piece.
                </span>
              </h2>

              <div className="mt-8 space-y-4 text-[15px] leading-[1.75]">
                <p>{hero.aboutLines[0]}</p>
                <p>{hero.aboutLines[1]}</p>
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-onpaper/30 pt-5 text-2xs uppercase tracking-micro">
                <div>
                  <dt className="font-medium">Currently in</dt>
                  <dd className="mt-1 text-onpaper-soft">{site.location}</dd>
                </div>
                <div>
                  <dt className="font-medium">Coordinates</dt>
                  <dd className="mt-1 text-onpaper-soft">{hero.coordinates}</dd>
                </div>
              </dl>

              <div className="mt-8">
                <Link href="/contact#about" className="btn-dark">
                  Read more
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
