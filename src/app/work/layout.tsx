import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All works",
  description:
    "Every piece by Shonari Phillips, grouped by discipline: production, print, manga, photography, and videography.",
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
