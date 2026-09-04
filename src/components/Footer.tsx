import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto max-w-[1400px] px-4 pb-12 pt-8 text-center sm:px-6 lg:px-8">
      <p className="micro-label text-ink-faint">
        © {year} {site.name}
      </p>
    </footer>
  );
}
