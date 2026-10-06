"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/content/links";
import { site } from "@/content/site";

const linkBase =
  "inline-flex min-h-11 items-center text-base font-medium transition-colors hover:text-accent";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const items = navLinks.map((item) => {
    const here = !item.external && !item.href.includes("#") && pathname === item.href;
    const cls = `${linkBase} ${here ? "text-accent" : "text-ink-soft"}`;
    return item.external ? (
      <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {item.label}
        <span className="sr-only"> (PDF, opens in a new tab)</span>
      </a>
    ) : (
      <Link key={item.href} href={item.href} className={cls} aria-current={here ? "page" : undefined}>
        {item.label}
      </Link>
    );
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-canvas/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight text-ink transition-colors hover:text-accent"
        >
          {site.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {items}
          <Link href="/contact" className="btn-primary min-h-11 px-5 text-sm">
            Contact
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 items-center rounded-full border border-ink/25 px-4 text-base font-medium text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-ink/10 bg-canvas/95 md:hidden"
        >
          <div className="container-page flex flex-col gap-1 py-4">
            {items}
            <Link href="/contact" className="btn-primary mt-3">
              Contact
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
