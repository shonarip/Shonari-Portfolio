import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { pageMeta } from "@/content/meta";
import { Featured } from "@/components/Featured";
import { AvailablePrintsSection } from "@/components/AvailablePrintsSection";
import { PhotographySection } from "@/components/PhotographySection";
import { VideographySection } from "@/components/VideographySection";
import { Footer } from "@/components/Footer";
import { Backdrop } from "@/components/Backdrop";

export const metadata: Metadata = pageMeta(
  "Work",
  "Client print, signage and apparel work first, then personal manga edits, prints, photography and motion by Shonari Phillips.",
);

/** Client work leads; personal lanes follow under one heading. */
const sectionLinks = [
  { href: "#client-work", label: "Client work" },
  { href: "#personal-work", label: "Personal work" },
  { href: "#homage", label: "Homage to Nihon" },
  { href: "#available-prints", label: "Prints" },
  { href: "#photography", label: "Still frames" },
  { href: "#videography", label: "Motion" },
] as const;

export default function PortfolioPage() {
  return (
    <>
      <Backdrop />
      <Header />
      <main id="main" className="pt-24 md:pt-28">
        <div className="container-page flex flex-wrap items-end justify-between gap-4 pt-6">
          <h1 className="t-h1">Work</h1>
          <Link href="/work" className="link-quiet">
            Open the index <span aria-hidden="true">→</span>
          </Link>
        </div>
        <nav aria-label="On this page" className="container-page mt-4">
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

        <Featured
          group="client"
          id="client-work"
          heading="Client work"
          intro="Print, signage and apparel designed for paying clients and taken through to production."
        />

        <section id="personal-work" aria-labelledby="personal-work-heading" className="mt-24 scroll-mt-16 border-t border-ink/15 pt-16 md:mt-32">
          <div className="container-page">
            <h2 id="personal-work-heading" className="t-h1">
              Personal work
            </h2>
            <p className="t-lead mt-4 max-w-2xl">
              Self-directed series: manga edits, prints, photography and motion.
            </p>
          </div>
        </section>

        <Featured group="personal" id="homage" heading={null} startAt={1} />
        <AvailablePrintsSection />
        <PhotographySection />
        <VideographySection />
      </main>
      <Footer />
    </>
  );
}
