import { altFor } from "@/content/alt";
import { imgProps, SIZES } from "@/content/img";

export type CaseFile = {
  /** Anchor id, e.g. "deeply-rooted". */
  id: string;
  title: string;
  client: string;
  year: string;
  /** One or two sentences on what the client needed. `null` shows a marked placeholder. */
  brief: string | null;
  role: string | null;
  /** What was made, in plain words. */
  made: string;
  process: string | null;
  /** Sizes, stock, finish, print method. */
  output: string | null;
  result: string | null;
  images: readonly string[];
};

/** Marked placeholder: shown until the real detail is filled in (see physicalCaseFiles in site.ts). */
function Placeholder({ children }: { children: string }) {
  return (
    <span data-placeholder="true" className="border border-dashed border-current px-1.5 py-0.5 italic">
      {children}
    </span>
  );
}

function Row({ label, value, hint }: { label: string; value: string | null; hint: string }) {
  return (
    <div>
      <dt className="text-2xs font-semibold uppercase tracking-micro text-ink">{label}</dt>
      <dd className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">
        {value ?? <Placeholder>{hint}</Placeholder>}
      </dd>
    </div>
  );
}

/** Two to three short client case studies, shown above the full image archive. */
export function CaseFiles({ files }: { files: readonly CaseFile[] }) {
  return (
    <section aria-labelledby="case-files-h" className="mt-16">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-ink/15 pb-3">
        <h2 id="case-files-h" className="t-h2">
          Case files
        </h2>
        <p className="t-small">
          {files.length} client {files.length === 1 ? "job" : "jobs"}, start to finish
        </p>
      </div>

      <ol className="mt-10 space-y-20">
        {files.map((f, i) => {
          const [lead, ...rest] = f.images;
          return (
            <li key={f.id} id={f.id} className="scroll-mt-24">
              <article className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
                <div className="min-w-0">
                  <p className="t-eyebrow">
                    Case {String(i + 1).padStart(2, "0")} · {f.client} · {f.year}
                  </p>
                  <h3 className="t-h2 mt-3">{f.title}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                    {f.brief ?? <Placeholder>[Brief: what the client needed, in one or two sentences]</Placeholder>}
                  </p>
                  <dl className="mt-6 grid gap-x-8 gap-y-4 border-y border-ink/15 py-5 sm:grid-cols-2">
                    <Row label="My role" value={f.role} hint="[Your role on this job]" />
                    <Row label="What I made" value={f.made} hint="" />
                    <Row label="Process" value={f.process} hint="[Key decisions: sketches, palette, type, revisions]" />
                    <Row label="Output specs" value={f.output} hint="[Sizes, stock or substrate, print method]" />
                    <div className="sm:col-span-2">
                      <Row label="Result" value={f.result} hint="[What happened: launched, reordered, client feedback]" />
                    </div>
                  </dl>
                </div>

                <div className="min-w-0">
                  {lead && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      {...imgProps(lead, SIZES.card)}
                      alt={altFor(lead, `${f.title}, lead image`)}
                      className="mx-auto block h-auto max-h-[32rem] w-auto max-w-full border border-ink/15 p-1"
                    />
                  )}
                  {rest.length > 0 && (
                    <ul className="mt-3 grid grid-cols-3 gap-3">
                      {rest.slice(0, 3).map((src, j) => (
                        <li key={src}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            {...imgProps(src, SIZES.thumb)}
                            alt={altFor(src, `${f.title}, image ${j + 2}`)}
                            className="block aspect-square h-auto w-full border border-ink/15 object-cover p-1"
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
