import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NightSky } from "@/components/NightSky";
import { site } from "@/content/site";
import { socialLinks } from "@/content/links";

export const metadata: Metadata = {
  title: `${site.contactPage.title} — ${site.name}`,
  description: site.contactPage.intro,
};

const card =
  "rounded-sm border border-ink/15 bg-canvas/40 px-6 py-10 backdrop-blur-sm sm:px-10";

export default function ContactPage() {
  return (
    <>
      <NightSky />
      <Header />
      <main className="mx-auto flex max-w-2xl flex-col gap-8 px-4 pb-16 pt-28 sm:px-6 md:pt-32">
        <section id="contact" aria-labelledby="contact-heading" className={`${card} text-center`}>
          <p className="micro-label text-ink-faint">Contact</p>
          <h1
            id="contact-heading"
            className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl"
          >
            {site.contactPage.title}
          </h1>
          <p className="mx-auto mt-4 max-w-md font-sans text-base leading-relaxed text-ink-soft">
            {site.contactPage.intro}
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-accent bg-accent px-6 font-mono text-xs uppercase tracking-micro text-canvas transition-colors hover:border-accent-soft hover:bg-accent-soft"
          >
            {site.contact.cta}
            <span aria-hidden="true">→</span>
          </a>
          <p className="mt-4 font-mono text-xs tracking-micro text-ink-soft">
            <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center hover:text-accent">
              {site.email}
            </a>
          </p>
          <p className="font-mono text-xs uppercase tracking-micro text-ink-faint">{site.location}</p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5">
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
        </section>

        <section id="about" aria-labelledby="about-heading" className={card}>
          <h2 id="about-heading" className="micro-label mb-6 text-center text-ink-faint">
            {site.about.heading}
          </h2>
          <div className="space-y-5">
            {site.about.paragraphs.map((p, i) => (
              <p key={i} className="font-sans text-base leading-relaxed text-ink-soft sm:text-lg">
                {p}
              </p>
            ))}
          </div>
        </section>

        <section id="resume" aria-labelledby="resume-heading" className={`${card} text-center`}>
          <h2 id="resume-heading" className="micro-label text-ink-faint">
            Resume
          </h2>
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/40 bg-canvas/30 px-6 font-mono text-xs uppercase tracking-micro text-ink transition-colors hover:border-accent hover:text-accent"
          >
            {site.contactPage.resumeLabel}
            <span aria-hidden="true">↗</span>
          </a>
          <p className="mt-3 font-mono text-2xs uppercase tracking-micro text-ink-faint">
            {site.contactPage.resumeNote}
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
