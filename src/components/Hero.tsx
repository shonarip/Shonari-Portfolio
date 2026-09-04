import { site } from "@/content/site";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="section-pad relative overflow-hidden border-b border-ink-200/50"
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent-200/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-1/4 h-64 w-64 rounded-full bg-ink-200/50 blur-3xl"
        aria-hidden="true"
      />

      <div className="section-max relative grid min-h-[78vh] items-center gap-10 py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-8">
          <p className="animate-fade-up text-sm font-medium uppercase tracking-[0.2em] text-accent-600">
            {site.title}
          </p>
          <h1
            id="hero-heading"
            className="animate-fade-up mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink-950 sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "80ms" }}
          >
            {site.name}
          </h1>
          <p
            className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-ink-600 sm:text-xl"
            style={{ animationDelay: "160ms" }}
          >
            {site.tagline}
          </p>
          <div
            className="animate-fade-up mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "240ms" }}
          >
            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent-700 hover:shadow-md focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
            >
              View selected work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-ink-300 bg-transparent px-6 py-3 text-sm font-semibold text-ink-800 transition-all duration-200 hover:border-ink-500 hover:bg-ink-100 focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
            >
              Get in touch
            </a>
          </div>
        </div>

        <aside
          className="animate-fade-in hidden lg:col-span-4 lg:block"
          style={{ animationDelay: "320ms" }}
          aria-label="Quick details"
        >
          <div className="rounded-2xl border border-ink-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm">
            <dl className="space-y-5">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-ink-400">
                  Based in
                </dt>
                <dd className="mt-1 text-sm font-medium text-ink-800">
                  {site.location}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-ink-400">
                  Focus
                </dt>
                <dd className="mt-1 text-sm font-medium text-ink-800">
                  Product design &amp; front-end craft
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-ink-400">
                  Currently
                </dt>
                <dd className="mt-1 text-sm font-medium text-ink-800">
                  Open to thoughtful collaborations
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </section>
  );
}
