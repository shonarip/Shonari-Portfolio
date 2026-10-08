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
        <Link href="/" className="group inline-flex min-h-12 items-center gap-3" aria-label={`${site.name}, home`}>
          <Seal size={30} />
          <span className="hidden text-2xs font-medium uppercase tracking-micro text-ink transition-colors group-hover:text-accent md:inline">
            {site.name}
          </span>
        </Link>

        <nav aria-label="Primary">
          <ul className="flex items-center gap-4 sm:gap-8">
            {navLinks.map((item, i) => {
              const here =
                !item.href.includes("#") &&
                (pathname === item.href || (item.href === "/portfolio" && pathname.startsWith("/work")));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={here ? "page" : undefined}
                    className={`inline-flex min-h-12 items-baseline gap-1.5 text-2xs font-medium uppercase tracking-micro transition-colors hover:text-accent ${
                      here ? "text-accent" : "text-ink"
                    }`}
                  >
                    <span aria-hidden="true" className="hidden text-ink-muted sm:inline">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={here ? "border-b border-accent" : ""}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
