import { site } from "@/content/site";
import { ProjectCard } from "./ProjectCard";

export function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="section-pad border-b border-ink-200/50 py-20 sm:py-28"
    >
      <div className="section-max">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-600">
            02
          </p>
          <h2
            id="work-heading"
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl"
          >
            Selected work
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">
            A handful of recent projects spanning product design, brand, and
            creative technology. Placeholders ready for your real case studies.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {site.projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
