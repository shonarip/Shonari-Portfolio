import { LocalClock } from "./LocalClock";
import { navLinks } from "@/content/links";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-canvas/55 backdrop-blur-md">
      <div className="flex items-center justify-between gap-3 px-2 py-0 sm:px-3 sm:py-0.5">
        <nav
          aria-label="Primary"
          className="flex shrink-0 items-center gap-x-3"
        >
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="chyron-label inline-flex min-h-11 items-center hover:text-accent hover:underline"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="shrink-0 pl-3 pr-1">
          <LocalClock />
        </div>
      </div>
    </header>
  );
}
