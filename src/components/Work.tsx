import { site } from "@/content/site";
import { ProjectBlock } from "./ProjectBlock";

export function Work() {
  const firstMangaIndex = site.projects.findIndex(
    (project) => project.role === "Manga Edit",
  );

  return (
    <section
      id="work"
      aria-label="Selected work"
      className="mx-auto flex max-w-[1400px] flex-col gap-20 px-4 py-8 sm:gap-28 sm:px-6 md:py-12 lg:px-8"
    >
      {site.projects.map((project, index) => (
        <div
          key={project.title}
          id={index === firstMangaIndex ? "manga" : undefined}
        >
          <ProjectBlock {...project} index={index} />
        </div>
      ))}
    </section>
  );
}
