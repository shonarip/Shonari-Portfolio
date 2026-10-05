import { site } from "@/content/site";
import { socialLinks } from "@/content/links";

export function About() {
  return (
    <>
      <section
        id="about"
        aria-labelledby="about-heading"
        className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 md:py-28"
      >
        <h2 id="about-heading" className="sr-only">
          {site.about.heading}
        </h2>
        <p className="micro-label mb-8 text-ink-faint">{site.about.heading}</p>
        <div className="space-y-6">
          {site.about.paragraphs.map((p, i) => (
            <p
              key={i}
              className="font-sans text-base leading-relaxed text-ink-soft sm:text-lg"
            >
              {p}
            </p>
          ))}
        </div>
        <p className="mt-8 font-mono text-xs uppercase tracking-micro text-ink-faint">
          {site.location} · Fort Lauderdale area
        </p>
      </section>

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="mx-auto max-w-xl px-4 pb-20 text-center sm:px-6 md:pb-28"
      >
        <div className="rounded-sm border border-ink/15 bg-canvas/40 px-6 py-10 backdrop-blur-sm sm:px-10">
          <p className="micro-label text-ink-faint">Contact</p>
          <h2
            id="contact-heading"
            className="mt-3 font-display text-2xl tracking-tight text-ink sm:text-3xl"
          >
            {site.contact.heading}
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-ink-soft">
            {site.contact.body}
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-5 py-2.5 font-mono text-xs uppercase tracking-micro text-accent transition-colors hover:border-accent hover:bg-accent/20"
          >
            {site.contact.cta}
          </a>
          <p className="mt-4 font-mono text-xs tracking-micro text-ink-muted">
            {site.email}
          </p>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-micro text-ink-muted transition-colors hover:text-accent"
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
      </section>
    </>
  );
}
