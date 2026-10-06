import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NightSky } from "@/components/NightSky";
import { CaseGallery } from "@/components/CaseGallery";
import { CaseFacts } from "@/components/CaseFacts";
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
    title: project.title,
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
      <main id="main" className="container-page pb-8 pt-28 md:pt-32">
        <Link href="/work" className="link-quiet">
          <span aria-hidden="true">←</span> All works
        </Link>

        <article className="mt-8">
          <p className="t-eyebrow">
            {project.lane} · {project.caption}
          </p>
          <h1 className="t-h1 mt-3">{project.title}</h1>
          <p className="t-lead mt-5 max-w-2xl">{project.description}</p>

          {"caseStudy" in project && project.caseStudy ? (
            <div className="mt-10 max-w-3xl">
              <CaseFacts caseStudy={project.caseStudy} year={project.year} />
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">{project.caseStudy.summary}</p>
            </div>
          ) : (
            <p className="t-small mt-6">
              {project.role} · {project.year}
            </p>
          )}

          <div className="mt-12">
            <CaseGallery title={project.title} images={images} />
          </div>
        </article>

        {related.length > 0 && (
          <aside aria-labelledby="related-heading" className="mt-20 border-t border-ink/10 pt-10">
            <h2 id="related-heading" className="t-h3">
              More in {project.lane}
            </h2>
            <ul className="mt-4 divide-y divide-ink/10">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={p.href}
                    className="group flex min-h-11 items-baseline justify-between gap-4 py-3"
                  >
                    <span className="font-display text-lg tracking-tight text-ink transition-colors group-hover:text-accent">
                      {p.title}
                    </span>
                    <span className="shrink-0 text-sm text-ink-muted">{p.year}</span>
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
