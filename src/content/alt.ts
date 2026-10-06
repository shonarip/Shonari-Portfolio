import { site } from "./site";

/** Alt text for images that are not part of an archive list in site.ts. */
const EXTRA: Record<string, string> = {
  "/work/physical/tee-02-girls-trips-nobg.png":
    "White T-shirt printed Girls Trip 2022 in blue script above a Virgin Islands eagle crest, with the name Terry below.",
  "/work/physical/tee-01-zoom-nobg.png":
    "Navy T-shirt with a small white outline of a delivery truck marked ZOOM on the chest.",
  "/work/physical/zoom-shirt-nobg.png":
    "Navy T-shirt with a small white outline of a delivery truck marked ZOOM on the chest.",
  "/work/physical/tee-03-bhm-faith-nobg.png":
    "White T-shirt printed Black History, a Heritage of Unshakable Faith, in gold, red and green with a cross and kente-style borders.",
  "/work/physical/51-shirt-nobg.png":
    "Black T-shirt with a silver tiara above glittery pink 51 and the script & Fabulous.",
  "/work/physical/tee-06-teacher-shirt-nobg.png":
    "White T-shirt reading The influence of a great teacher can never be erased, with a pencil labeled Ms. Brittney.",
  "/work/homage/thumb-fermenting.jpg":
    "Glitch-treated manga girl with swirled hair buns, filled with teal, red and green marbled color against a white brushstroke background.",
  "/work/floral-bg.png":
    "Pastel pattern of pink hibiscus, yellow plumeria and blue flowers among green leaves.",
  "/work/branding-mark.jpg":
    "Deeply Rooted logo: a black yoga silhouette in front of a green tree inside a coral circle, with the name arched above.",
  "/work/prez-wash.jpg":
    "Presidential Touch Detailing card with a waving U.S. flag, a washed car headlight and a black limousine, listing shampoo, sanitize and wax.",
};

type WithAlt = { image?: string; poster?: string; alt?: string };

const BY_SRC = new Map<string, string>(Object.entries(EXTRA));
const collect = (items: readonly WithAlt[]) => {
  for (const item of items) {
    const src = item.image ?? item.poster;
    if (src && item.alt) BY_SRC.set(src, item.alt);
  }
};
collect(site.printArchive.items);
collect(site.mangaArchive.items);
collect(site.productionArchive.items);
collect(site.manga.items);
collect(site.photography.items);
collect(site.videography.items);

/** Descriptive alt text for an image path, or the given fallback when none is written. */
export function altFor(src: string, fallback: string): string {
  return BY_SRC.get(src) ?? fallback;
}
