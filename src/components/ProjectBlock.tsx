type ProjectBlockProps = {
  title: string;
  year: string;
  role: string;
  description: string;
  tags: readonly string[];
  href: string;
  image: string;
  index: number;
};

const widths = [
  "w-full max-w-5xl",
  "w-full max-w-3xl",
  "w-full max-w-xl",
  "w-full max-w-4xl",
] as const;

export function ProjectBlock({
  title,
  year,
  role,
  description,
  tags,
  href,
  image,
  index,
}: ProjectBlockProps) {
  const width = widths[index % widths.length];

  return (
    <article className={`mx-auto ${width}`}>
      <a
        href={href}
        className="group block focus-visible:outline-none"
        aria-label={`${title}, ${year}`}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        <div className="overflow-hidden border border-ink/10 bg-canvas transition-[opacity,transform] duration-300 group-hover:opacity-90 group-focus-visible:ring-1 group-focus-visible:ring-cool">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt=""
            className="block h-auto w-full object-cover"
          />
        </div>
      </a>

      <div className="mt-4 text-center sm:mt-5">
        <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
          <h3 className="font-sans text-lg text-ink sm:text-xl">
            <a
              href={href}
              className="hover:underline"
              {...(href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {title}
            </a>
          </h3>
          <time
            className="font-mono text-2xs tracking-micro text-ink-faint"
            dateTime={year}
          >
            {year}
          </time>
        </div>
        <p className="mt-1 font-sans text-sm italic text-ink-muted">{role}</p>
        <p className="mx-auto mt-3 max-w-lg font-sans text-sm leading-relaxed text-ink-soft">
          {description}
        </p>
        <ul
          className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1"
          aria-label="Tags"
        >
          {tags.map((tag) => (
            <li key={tag} className="micro-label text-ink-faint">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
