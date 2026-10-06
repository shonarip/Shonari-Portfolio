import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NightSky } from "@/components/NightSky";
import { site } from "@/content/site";
import { socialLinks } from "@/content/links";

export const metadata: Metadata = {
  title: site.contactPage.title,
  description: site.contactPage.intro,
};

export default function ContactPage() {
  return (
    <>
      <NightSky />
      <Header />
      <main id="main" className="container-page pb-8 pt-28 md:pt-36">
        <section id="contact" aria-labelledby="contact-heading" className="max-w-3xl">
          <p className="t-eyebrow">Contact</p>
          <h1 id="contact-heading" className="t-h1 mt-3">
            Let&apos;s talk about your project
          </h1>
          <p className="t-lead mt-5">{site.contactPage.intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href={`mailto:${site.email}`} className="btn-primary">
              {site.contact.cta}
              <span aria-hidden="true">→</span>
            </a>
            <a href={`mailto:${site.email}`} className="link-quiet">
              {site.email}
            </a>
          </div>
          <p className="t-small mt-4">{site.location}</p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
            {socialLinks
              .filter((l) => !l.href.startsWith("mailto:"))
              .map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="link-quiet"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
          </ul>
        </section>

        <section
          id="about"
          aria-labelledby="about-heading"
          className="mt-20 scroll-mt-16 md:mt-28"
        >
          <div className="paper-pink blueprint px-7 py-12 sm:px-12 md:px-16 md:py-16">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <h2 id="about-heading" className="t-h1 !text-onpaper">
                  {site.about.heading}
                </h2>
              </div>
              <div className="space-y-5 text-[17px] leading-[1.75] lg:col-span-8">
                {site.about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="resume"
          aria-labelledby="resume-heading"
          className="mt-20 border-t border-ink/10 pt-16 md:mt-28 md:pt-20"
        >
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="t-eyebrow">Experience</p>
              <h2 id="resume-heading" className="t-h2 mt-3">
                Resume
              </h2>
            </div>
            <div className="lg:col-span-8">
              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                {site.contactPage.resumeLabel}
                <span aria-hidden="true">↗</span>
              </a>
              <p className="t-small mt-3">{site.contactPage.resumeNote}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
