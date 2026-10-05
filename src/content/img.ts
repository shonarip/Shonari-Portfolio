import variants from "./img-variants.json";

const HAS = new Set<string>(variants as string[]);

/** Common `sizes` hints. */
export const SIZES = {
  thumb: "(min-width: 1024px) 20vw, 45vw",
  tiny: "96px",
  card: "(min-width: 1024px) 34vw, 90vw",
  full: "92vw",
} as const;

/**
 * Responsive props for a site image: DZ's -400/-1800 WebP copies when they exist,
 * the original otherwise. Always lazy + async decode.
 */
export function imgProps(src: string, sizes: string = SIZES.thumb) {
  if (!src || !HAS.has(src)) {
    return { src, loading: "lazy" as const, decoding: "async" as const };
  }
  const base = src.replace(/\.[^.]+$/, "");
  return {
    src: `${base}-1800.webp`,
    srcSet: `${base}-400.webp 400w, ${base}-1800.webp 1800w`,
    sizes,
    loading: "lazy" as const,
    decoding: "async" as const,
  };
}

/** Grid tile: DZ's -400.webp only (no 1800 fetch). */
export function thumbProps(src: string) {
  if (!src || !HAS.has(src)) return { src, loading: "lazy" as const, decoding: "async" as const };
  return { src: src.replace(/\.[^.]+$/, "-400.webp"), loading: "lazy" as const, decoding: "async" as const };
}
