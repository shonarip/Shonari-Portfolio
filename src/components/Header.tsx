"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/content/links";

/** Four links spread across the page grid, one per column. */
export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-canvas/70 backdrop-blur-md">
      <nav aria-label="Primary" className="container-page grid grid-cols-4 gap-2">
        {navLinks.map((item) => {
          const here =
            !item.href.includes("#") &&
            (pathname === item.href || (item.href === "/portfolio" && pathname.startsWith("/work")));
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={here ? "page" : undefined}
              className={`inline-flex min-h-12 items-center text-2xs font-medium uppercase tracking-micro transition-colors hover:text-accent ${
                here ? "text-accent" : "text-ink"
              }`}
            >
              <span className={here ? "border-b border-accent" : ""}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
