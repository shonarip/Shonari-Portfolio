import type { Metadata } from "next";
import { site } from "./site";

/**
 * Title and link-preview text for one page, so the browser tab and a shared link both read
 * "Page — Shonari Phillips". The share image comes from src/app/opengraph-image.jpg.
 */
export function pageMeta(title: string, description: string): Metadata {
  const full = `${title} — ${site.name}`;
  // Setting openGraph here replaces the file-based image, so name it again.
  const images = [{ url: "/opengraph-image.jpg", width: 1200, height: 630, alt: `${site.name}, graphic designer` }];
  return {
    title: { absolute: full },
    description,
    openGraph: { title: full, description, type: "website", images },
    twitter: { card: "summary_large_image", title: full, description, images },
  };
}
