type ProjectCardProps = {
  title: string;
  year: string;
  role: string;
  description: string;
  tags: readonly string[];
  href: string;
  index: number;
};

export function ProjectCard({
  title,
  year,
  role,
  description,
  tags,
  href,
  index,
}: ProjectCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-accent-300 hover:shadow-lg hover:shadow-accent-500/5">
      <div
        className="relative flex h-44 items-end overflow-hidden bg-gradient-to-br from-ink-100 via-ink-50 to-accent-100 p-5"
        aria-hidden="true"
      >
        <div className="absolute inset-0 opacity-40 transition-opacity duration-300 group-hover:opacity-60">
          <div
            className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-accent-300/50 blur-2xl transition-transform duration-500 group-hover:scale-110"
            style={{ animationDelay: `${index * 80}ms` }}
          />
          <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-ink-300/30 blur-xl" />
        </div>
        <span className="relative font-display text-5xl font-semibold text-ink-200/80 transition-colors duration-300 group-hover:text-accent-200">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-xl font-semibold tracking-tight text-ink-950">
            <a
              href={href}
              className="after:absolute after:inset-0 focus-visible:outline-none"
            >
              {title}
            </a>
          </h3>
          <time className="shrink-0 text-sm text-ink-400" dateTime={year}>
            {year}
          </time>
        </div>
        <p className="mt-1 text-sm font-medium text-accent-600">{role}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">
          {description}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-ink-100 px-2.5 py-1 text-xs font-medium text-ink-700"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
