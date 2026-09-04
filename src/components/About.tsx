import { site } from "@/content/site";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-pad border-b border-ink-200/50 py-20 sm:py-28"
    >
      <div className="section-max grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-600">
            01
          </p>
          <h2
            id="about-heading"
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl"
          >
            {site.about.heading}
          </h2>
        </div>
        <div className="space-y-5 lg:col-span-8">
          {site.about.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-lg leading-relaxed text-ink-600 sm:text-xl"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
