import Link from "next/link";
import { site } from "@/content/site";
import { socialLinks } from "@/content/links";
import { ColorBar, RegMark, Seal } from "./ProofMarks";

const linkClass =
  "inline-flex min-h-11 items-center text-2xs font-medium uppercase tracking-micro text-ink transition-colors hover:text-accent";

/** Closes every page: a clear contact invitation, then email, social links and resume. */
export function Footer({ invite = true }: { invite?: boolean }) {
  return (
    <footer className="mt-8 bg-canvas/80">
      {invite && (
        <section aria-labelledby="footer-cta" className="container-page py-16 md:py-28">
          <Seal size={44} className="mb-8" />
          <h2 id="footer-cta" className="t-h1 max-w-4xl">
            {site.contact.heading}
          </h2>
          <p className="t-lead mt-6 max-w-xl">{site.contact.body}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <a href={`mailto:${site.email}`} className="btn-primary">
              {site.contact.cta}
              <span aria-hidden="true">→</span>
            </a>
            <a href={`mailto:${site.email}`} className="link-quiet normal-case tracking-normal">
              {site.email}
            </a>
          </div>
        </section>
      )}

      <div className="container-page flex items-end gap-4 pb-6">
        <RegMark className="mb-1 hidden shrink-0 text-ink-muted sm:block" />
        <ColorBar className="flex-1" />
        <RegMark className="mb-1 hidden shrink-0 text-ink-muted sm:block" />
      </div>

      <div className="border-t border-ink/20">
        <nav aria-label="Elsewhere" className="container-page py-6">
          <ul className="flex flex-wrap gap-x-8 gap-y-1">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={linkClass}
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
              <a href={site.resume} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Resume<span className="sr-only"> (PDF, opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="container-page flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 py-6">
          <p className="t-small">
            © 2026 {site.name} · {site.location} · Colors sampled from the Homage to Nihon series
          </p>
          <Link href="/portfolio" className="t-small hover:text-accent">
            Back to the work
          </Link>
        </div>
      </div>
    </footer>
  );
}
