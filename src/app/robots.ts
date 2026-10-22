import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://nariportfolio.com").replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
