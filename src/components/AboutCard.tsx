import Link from "next/link";
import { site } from "@/content/site";
import { Rotator } from "./Rotator";

const PORTRAIT = "/work/about/shonari-portrait.jpg";
const PORTRAIT_ALT =
  "Portrait of Shonari Phillips outdoors at dusk, looking at the camera, with short black hair, a light mustache and a white T-shirt, trees and shrubs behind.";

/** The introduction card: a solid color block with a dashed frame, as on the reference layout. */
export function AboutCard() {
  const { hero } = site;

  return (
    <section id="about" aria-labelledby="about-card-heading" className="container-page scroll-mt-16 py-10 md:py-16">
      <div className="paper-pink blueprint px-7 py-12 sm:px-12 md:px-16 md:py-16">
        <p className="folder-tab -ml-7 -mt-12 mb-8 bg-onpaper text-ink sm:-ml-12 md:-ml-16 md:-mt-16">About</p>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <h2 id="about-card-heading" className="font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.98] tracking-tight">
              {site.name}
              <br />
              does <Rotator words={hero.words} />
            </h2>
          </div>

          <div className="lg:col-span-5">
            <div className="mx-auto w-full max-w-[380px] border border-dashed border-onpaper/60 p-2 lg:ml-auto lg:mr-0">
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
        </div>

        <div className="mt-10 grid gap-8 border-t border-dashed border-onpaper/60 pt-8 md:grid-cols-12">
          <div className="space-y-4 text-[15px] leading-[1.75] md:col-span-7">
            <p>{hero.aboutLines[0]}</p>
            <p>{hero.aboutLines[1]}</p>
          </div>
          <dl className="grid grid-cols-2 gap-4 text-2xs uppercase tracking-micro md:col-span-5">
            <div>
              <dt className="font-medium">Currently in</dt>
              <dd className="mt-1 text-onpaper-soft">{site.location}</dd>
            </div>
            <div>
              <dt className="font-medium">Coordinates</dt>
              <dd className="mt-1 text-onpaper-soft">{hero.coordinates}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-8">
          <Link href="/contact#about" className="btn-dark">
            Read more
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
