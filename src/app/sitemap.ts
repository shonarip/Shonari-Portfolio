import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://nariportfolio.com").replace(/\/$/, "");

/** Case pages that forward to the Index (see app/work/[slug]/page.tsx), so they stay out of the sitemap. */
const MERGED = new Set(["branding", "professional-production", "eyes-of-the-beholder"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/portfolio", "/work", "/contact"];
  const cases = site.projects.filter((p) => !MERGED.has(p.slug)).map((p) => `/work/${p.slug}`);
  return [...pages, ...cases].map((path) => ({
    url: `${BASE}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.startsWith("/work/") ? 0.7 : 0.8,
  }));
}
