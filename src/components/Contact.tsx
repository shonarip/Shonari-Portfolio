import { site } from "@/content/site";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-pad py-20 sm:py-28"
    >
      <div className="section-max grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-600">
            04
          </p>
          <h2
            id="contact-heading"
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl"
          >
            {site.contact.heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">
            {site.contact.body}
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-accent-600 transition-colors hover:text-accent-700"
          >
            {site.email}
            <span aria-hidden="true">→</span>
          </a>
          <ul className="mt-8 flex flex-wrap gap-4" aria-label="Social links">
            {site.social.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="link-underline text-sm font-medium text-ink-600 hover:text-ink-950"
                  {...(link.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <form
            className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm sm:p-8"
            action={`mailto:${site.email}`}
            method="get"
            encType="text/plain"
            aria-label="Contact form"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-ink-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="mt-1.5 w-full rounded-lg border border-ink-200 bg-ink-50/50 px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-accent-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent-500/30"
                  placeholder="Your name"
                />
              </div>
              <div className="sm:col-span-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-ink-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1.5 w-full rounded-lg border border-ink-200 bg-ink-50/50 px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-accent-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent-500/30"
                  placeholder="you@example.com"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-ink-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="body"
                  rows={5}
                  required
                  className="mt-1.5 w-full resize-y rounded-lg border border-ink-200 bg-ink-50/50 px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-accent-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent-500/30"
                  placeholder="Tell me a little about your project…"
                />
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent-700 hover:shadow-md focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
              >
                {site.contact.cta}
              </button>
              <p className="text-xs text-ink-400">
                Opens your email client via mailto.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
