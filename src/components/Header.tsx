"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/content/links";
import { site } from "@/content/site";
import { Seal } from "./ProofMarks";

/** The seal and name on the left, numbered links on the right. */
export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-canvas/70 backdrop-blur-md">
      <div className="container-page flex min-h-14 items-center justify-between gap-4">
        {/* On the narrowest phones the seal steps aside so all five links fit; Home is still in the nav. */}
        <Link
          href="/"
          className="group inline-flex min-h-12 items-center gap-3 max-[359px]:hidden"
          aria-label={`${site.name}, home`}
        >
          <Seal size={30} />
          <span className="hidden text-2xs font-medium uppercase tracking-micro text-ink transition-colors group-hover:text-accent md:inline">
            {site.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="max-[359px]:w-full">
          <ul className="flex items-center justify-between gap-3 sm:gap-8">
            {navLinks.map((item, i) => {
              const here =
                !item.external &&
                !item.href.includes("#") &&
                (pathname === item.href || (item.href === "/portfolio" && pathname.startsWith("/work")));
              const linkClass = `inline-flex min-h-12 items-baseline gap-1.5 text-2xs font-medium uppercase tracking-normal transition-colors sm:tracking-micro hover:text-accent ${
                here ? "text-accent" : "text-ink"
              }`;
              const number = (
                <span aria-hidden="true" className="hidden text-ink-muted sm:inline">
                  {String(i + 1).padStart(2, "0")}
                </span>
              );
              return (
                <li key={item.href}>
                  {item.external ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {number}
                      <span>{item.label}</span>
                      <span className="sr-only"> (PDF, opens in a new tab)</span>
                    </a>
                  ) : (
                    <Link href={item.href} aria-current={here ? "page" : undefined} className={linkClass}>
                      {number}
                      <span className={here ? "border-b border-accent" : ""}>{item.label}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
