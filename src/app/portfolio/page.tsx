import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Featured } from "@/components/Featured";
import { AvailablePrintsSection } from "@/components/AvailablePrintsSection";
import { PhotographySection } from "@/components/PhotographySection";
import { VideographySection } from "@/components/VideographySection";
import { Footer } from "@/components/Footer";
import { NightSky } from "@/components/NightSky";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Portfolio — ${site.name}`,
};

/** Chief lock 2026-10-02: four jumps, labels as locked. */
const sectionLinks = [
  { href: "#work", label: "Featured" },
  { href: "#available-prints", label: "Prints" },
  { href: "#photography", label: "Still frames" },
  { href: "#videography", label: "Motion" },
] as const;

/** Everything that used to sit under the landing, unchanged (Chief lock). */
export default function PortfolioPage() {
  return (
    <>
      <NightSky />
      <Header />
      <main className="pt-16 sm:pt-20">
        <nav
          aria-label="On this page"
          className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-5 gap-y-1 px-4 pb-6 pt-1 sm:px-6 lg:px-8"
        >
          {sectionLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="chyron-label inline-flex min-h-11 items-center text-ink-muted hover:text-accent hover:underline"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <Featured />
        <AvailablePrintsSection />
        <PhotographySection />
        <VideographySection />
      </main>
      <Footer />
    </>
  );
}
