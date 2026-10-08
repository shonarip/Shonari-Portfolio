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
    <span data-placeholder="true" className="border border-dashed border-current px-1.5 py-0.5 italic">
      {children}
    </span>
  );
}

/** The short case-study facts: context, role, tools, year. `tone="paper"` is for use on a solid paper card. */
export function CaseFacts({
  caseStudy,
  year,
  tone = "dark",
}: {
  caseStudy: CaseStudyData;
  year: string;
  tone?: "dark" | "paper";
}) {
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

  const paper = tone === "paper";

  return (
    <dl
      className={`grid gap-x-8 gap-y-4 border-y py-5 sm:grid-cols-2 ${
        paper ? "border-onpaper/30" : "border-ink/15"
      }`}
    >
      {rows.map((row) => (
        <div key={row.label}>
          <dt className={`text-2xs font-semibold uppercase tracking-micro ${paper ? "text-onpaper" : "text-ink"}`}>
            {row.label}
          </dt>
          <dd className={`mt-1.5 text-[15px] leading-relaxed ${paper ? "text-onpaper-soft" : "text-ink-soft"}`}>
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
