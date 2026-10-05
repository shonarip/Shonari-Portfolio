import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NightSky } from "@/components/NightSky";
import { CaseGallery } from "@/components/CaseGallery";
import { site } from "@/content/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function galleryFor(project: (typeof site.projects)[number]): string[] {
  if ("images" in project && Array.isArray(project.images) && project.images.length > 0) {
    return [...project.images];
  }
  return project.image ? [project.image] : [];
}

/** One-image case pages now live in /work lanes; their URLs forward there. */
const MERGED_CASES: Record<string, string> = {
  prints: "Print",
  branding: "Design",
  "professional-production": "Production",
  "eyes-of-the-beholder": "Design",
};

export function generateStaticParams() {
  return site.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = site.projects.find((p) => p.slug === slug);
  if (!project) {
    return { title: site.name };
  }
  return {
    title: `${project.title} — ${site.name}`,
    description: project.description,
  };
}

export default async function WorkCasePage({ params }: PageProps) {
  const { slug } = await params;
  if (slug in MERGED_CASES) redirect(`/work?lane=${MERGED_CASES[slug]}`);
  const project = site.projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const related = site.projects
    .filter((p) => p.slug !== slug && p.lane === project.lane && !(p.slug in MERGED_CASES))
    .slice(0, 4);

  const images = galleryFor(project);

  return (
    <>
      <NightSky />
      <Header />
      <main className="mx-auto max-w-5xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <Link
          href="/work"
          className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-micro text-ink-muted transition-colors hover:text-accent"
        >
          ← All works
        </Link>

        <article className="mt-8">
          <p className="font-mono text-2xs uppercase tracking-micro text-ink-faint">
            {project.lane} · {project.role} · {project.year}
          </p>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-micro text-accent/80">
            {project.caption}
          </p>
          <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-ink-soft sm:text-lg">
            {project.description}
          </p>

          {"caseStudy" in project && project.caseStudy && (
            <dl className="mt-8 grid max-w-3xl gap-x-8 gap-y-5 border-y border-ink/10 py-6 sm:grid-cols-3">
              <div>
                <dt className="micro-label text-ink-faint">Client</dt>
                <dd className="mt-1.5 font-sans text-sm leading-relaxed text-ink-soft">{project.caseStudy.client}</dd>
              </div>
              <div>
                <dt className="micro-label text-ink-faint">Role</dt>
                <dd className="mt-1.5 font-sans text-sm leading-relaxed text-ink-soft">{project.caseStudy.role}</dd>
              </div>
              <div>
                <dt className="micro-label text-ink-faint">Delivered for</dt>
                <dd className="mt-1.5 font-sans text-sm leading-relaxed text-ink-soft">
                  {project.caseStudy.deliveredFor.join(", ")}
                </dd>
              </div>
              <p className="font-sans text-sm leading-relaxed text-ink-soft sm:col-span-3 sm:text-base">
                {project.caseStudy.summary}
              </p>
            </dl>
          )}

          <div className="mt-10">
            <CaseGallery title={project.title} images={images} />
          </div>
        </article>

        {related.length > 0 && (
          <aside className="mt-16 border-t border-ink/10 pt-8">
            <p className="micro-label text-ink-faint">More in {project.lane}</p>
            <ul className="mt-4 space-y-2">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={p.href}
                    className="group flex items-baseline justify-between gap-4 py-2 font-mono text-xs uppercase tracking-micro text-ink-muted transition-colors hover:text-accent"
                  >
                    <span className="font-display text-base normal-case tracking-tight text-ink group-hover:text-accent">
                      {p.title}
                    </span>
                    <span className="shrink-0 text-ink-faint">{p.year}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </main>
      <Footer />
    </>
  );
}
