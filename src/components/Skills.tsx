import { site } from "@/content/site";

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 md:py-24"
    >
      <h2 id="skills-heading" className="sr-only">
        {site.skills.heading}
      </h2>
      <p className="micro-label mb-10 text-ink-faint">{site.skills.heading}</p>

      <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
        {site.skills.groups.map((group) => (
          <div key={group.title}>
            <h3 className="font-serif text-sm italic text-ink-muted">
              {group.title}
            </h3>
            <ul className="mt-4 space-y-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="micro-label normal-case tracking-normal text-ink-soft"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
