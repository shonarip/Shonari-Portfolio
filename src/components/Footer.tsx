import Link from "next/link";
import { site } from "@/content/site";
import { socialLinks } from "@/content/links";

/** Closes every page: a clear contact invitation, then email, social links and resume. */
export function Footer({ invite = true }: { invite?: boolean }) {
  return (
    <footer className="mt-8 border-t border-ink/10 bg-canvas/70">
      {invite && (
        <section aria-labelledby="footer-cta" className="container-page py-16 md:py-24">
          <div className="max-w-2xl">
            <h2 id="footer-cta" className="t-h1">
              {site.contact.heading}
            </h2>
            <p className="t-lead mt-4">{site.contact.body}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={`mailto:${site.email}`} className="btn-primary">
                {site.contact.cta}
                <span aria-hidden="true">→</span>
              </a>
              <a href={`mailto:${site.email}`} className="link-quiet">
                {site.email}
              </a>
            </div>
          </div>
        </section>
      )}

      <div className="border-t border-ink/10">
        <div className="container-page flex flex-col gap-8 py-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-lg font-bold tracking-tight text-ink">{site.name}</p>
            <p className="t-small mt-1">
              {site.title} · {site.location}
            </p>
          </div>

          <nav aria-label="Elsewhere">
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-base text-ink-soft transition-colors hover:text-accent"
                    {...(link.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                    {link.href.startsWith("http") && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={site.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center text-base text-ink-soft transition-colors hover:text-accent"
                >
                  Resume<span className="sr-only"> (PDF, opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="container-page flex flex-wrap items-center justify-between gap-3 pb-10">
          <p className="t-small">© 2026 {site.name}</p>
          <Link href="/portfolio" className="t-small hover:text-accent">
            Back to the work
          </Link>
        </div>
      </div>
    </footer>
  );
}
