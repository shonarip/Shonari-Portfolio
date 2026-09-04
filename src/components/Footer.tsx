import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="section-pad border-t border-ink-200/60 bg-ink-100/40 py-10">
      <div className="section-max flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-base font-semibold text-ink-900">
            {site.name}
          </p>
          <p className="mt-1 text-sm text-ink-500">
            © {year} · Designed &amp; built with care
          </p>
        </div>
        <a
          href="#top"
          className="text-sm font-medium text-ink-600 transition-colors hover:text-accent-600"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
