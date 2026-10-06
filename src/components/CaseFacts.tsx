export type CaseStudyData = {
  client: string;
  role: string;
  tools: string | null;
  deliveredFor: readonly string[];
  summary: string;
};

/** Marked placeholder shown until the tools used on a project are filled in (see site.ts). */
function Placeholder({ children }: { children: string }) {
  return (
    <span
      data-placeholder="true"
      className="rounded-sm border border-dashed border-accent/60 px-1.5 py-0.5 text-sm italic text-ink-soft"
    >
      {children}
    </span>
  );
}

/** The short case-study facts: context, role, tools, year. */
export function CaseFacts({ caseStudy, year }: { caseStudy: CaseStudyData; year: string }) {
  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "Client / context", value: caseStudy.client },
    { label: "My role", value: caseStudy.role },
    {
      label: "Tools",
      value: caseStudy.tools ? caseStudy.tools : <Placeholder>[Add tools used]</Placeholder>,
    },
    { label: "Year", value: year },
  ];
  if (caseStudy.deliveredFor.length > 0) {
    rows.splice(1, 0, { label: "Delivered for", value: caseStudy.deliveredFor.join(", ") });
  }

  return (
    <dl className="grid gap-x-8 gap-y-4 border-y border-ink/10 py-5 sm:grid-cols-2">
      {rows.map((row) => (
        <div key={row.label}>
          <dt className="t-eyebrow">{row.label}</dt>
          <dd className="mt-1.5 text-base leading-relaxed text-ink-soft">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
