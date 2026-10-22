import type { Metadata } from "next";
import { pageMeta } from "@/content/meta";

export const metadata: Metadata = pageMeta(
  "Index",
  "Every piece by Shonari Phillips, grouped by discipline: production, print, manga, photography, and videography.",
);

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
