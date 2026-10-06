import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Featured } from "@/components/Featured";
import { AvailablePrintsSection } from "@/components/AvailablePrintsSection";
import { PhotographySection } from "@/components/PhotographySection";
import { VideographySection } from "@/components/VideographySection";
import { Footer } from "@/components/Footer";
import { NightSky } from "@/components/NightSky";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Featured design projects, prints, photography, and motion work by Shonari Phillips.",
};

const sectionLinks = [
  { href: "#work", label: "Featured" },
  { href: "#available-prints", label: "Prints" },
  { href: "#photography", label: "Still frames" },
  { href: "#videography", label: "Motion" },
] as const;

export default function PortfolioPage() {
  return (
    <>
      <NightSky />
      <Header />
      <main id="main" className="pt-24 md:pt-28">
        <nav aria-label="On this page" className="container-page">
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {sectionLinks.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-base font-medium text-ink-soft transition-colors hover:text-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
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
