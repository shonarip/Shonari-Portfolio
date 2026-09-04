import { site } from "@/content/site";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="flex min-h-[72vh] flex-col items-center justify-center px-4 pb-16 pt-36 text-center sm:pt-40 md:min-h-[78vh] md:pb-24"
    >
      <p className="font-serif text-sm tracking-wide text-ink-soft sm:text-base">
        {site.name}
      </p>

      <h1
        id="hero-heading"
        className="mt-4 font-blackletter text-[clamp(4.5rem,18vw,11rem)] leading-[0.9] tracking-tight text-ink"
      >
        Craft
      </h1>

      <p className="mt-5 max-w-xl font-serif text-base italic leading-relaxed text-ink-soft sm:text-lg md:text-xl">
        {site.title}
      </p>

      <p className="mt-4 max-w-md font-serif text-sm leading-relaxed text-ink-muted sm:text-base">
        {site.tagline}
      </p>

      <p className="micro-label mt-10 text-ink-faint">
        {site.contact.heading}
      </p>
    </section>
  );
}
