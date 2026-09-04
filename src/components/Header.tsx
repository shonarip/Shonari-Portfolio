import { site } from "@/content/site";
import { LocalClock } from "./LocalClock";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-canvas/90 backdrop-blur-sm">
      <div className="mx-auto grid max-w-[1400px] gap-4 px-4 py-3 sm:px-6 md:grid-cols-12 md:gap-3 md:py-4 lg:px-8">
        <div className="md:col-span-3">
          <p className="micro-label mb-1 text-ink-faint">Index</p>
          <nav aria-label="Primary" className="flex flex-wrap gap-x-3 gap-y-0.5">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="micro-label hover:underline"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <p className="micro-label mt-1.5 text-ink-muted">{site.location}</p>
        </div>

        <div className="md:col-span-3">
          <p className="micro-label mb-1 text-ink-faint">Meta</p>
          <p className="micro-label leading-relaxed">{site.title}</p>
          <p className="micro-label mt-1 text-ink-muted">
            Open to thoughtful collaborations
          </p>
        </div>

        <div className="md:col-span-3" id="contact">
          <p className="micro-label mb-1 text-ink-faint">Contact</p>
          <a
            href={`mailto:${site.email}`}
            className="micro-label hover:underline"
          >
            {site.email}
          </a>
          <p className="micro-label mt-1.5 max-w-[16rem] leading-relaxed text-ink-muted">
            {site.contact.cta} — {site.contact.body}
          </p>
        </div>

        <div className="flex items-start justify-between gap-4 md:col-span-3 md:flex-col md:items-end lg:flex-row">
          <div className="md:text-right lg:text-left">
            <p className="micro-label mb-1 text-ink-faint">Follow</p>
            <ul className="flex flex-wrap gap-x-3 gap-y-0.5 md:justify-end lg:justify-start">
              {site.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="micro-label hover:underline"
                    {...(link.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="shrink-0 pt-0.5 md:pt-0">
            <LocalClock />
          </div>
        </div>
      </div>
    </header>
  );
}
