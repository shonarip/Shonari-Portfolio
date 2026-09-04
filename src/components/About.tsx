import { site } from "@/content/site";

export function About() {
  return (
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
    </section>
  );
}
