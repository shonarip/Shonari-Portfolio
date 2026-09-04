import { site } from "@/content/site";

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="section-pad border-b border-ink-200/50 py-20 sm:py-28"
    >
      <div className="section-max">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-600">
            03
          </p>
          <h2
            id="skills-heading"
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl"
          >
            {site.skills.heading}
          </h2>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {site.skills.groups.map((group) => (
            <div
              key={group.title}
              className="rounded-2xl border border-ink-200 bg-white p-7 transition-shadow duration-300 hover:shadow-md"
            >
              <h3 className="font-display text-xl font-semibold text-ink-950">
                {group.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-ink-600"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
