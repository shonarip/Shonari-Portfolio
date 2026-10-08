/**
 * Print-shop details that give the site its identity: the hanko seal, a registration
 * target and the color bar. All are decorative and hidden from screen readers.
 */

/** The vermilion seal with Shonari's initials. */
export function Seal({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`seal ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.5 }}
    >
      SP
    </span>
  );
}

/** A registration target: crosshair through two rings. */
export function RegMark({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none" />
      <path d="M12 0v24M0 12h24" />
    </svg>
  );
}

/** The site palette, sampled from the Homage to Nihon series. */
export const SWATCHES = [
  { kanji: "藍", name: "Ai", hex: "#293ea9" },
  { kanji: "空", name: "Sora", hex: "#3d7abd" },
  { kanji: "朱", name: "Shu", hex: "#ba4e3f" },
  { kanji: "金茶", name: "Kincha", hex: "#c0aa44" },
  { kanji: "青磁", name: "Seiji", hex: "#5dab9e" },
  { kanji: "和紙", name: "Washi", hex: "#ebe3d3" },
] as const;

/** A printer's color bar: one chip per palette color, labelled in Japanese and English. */
export function ColorBar({ labels = true, className = "" }: { labels?: boolean; className?: string }) {
  return (
    <ul aria-hidden="true" className={`grid grid-cols-6 ${className}`}>
      {SWATCHES.map((s) => (
        <li key={s.name} className="min-w-0">
          <span className="block h-3 sm:h-4" style={{ background: s.hex }} />
          {labels && (
            <span className="mt-2 block truncate text-2xs uppercase tracking-micro text-ink-muted">
              <span className="mr-1.5 normal-case tracking-normal text-ink-soft">{s.kanji}</span>
              <span className="hidden sm:inline">{s.name}</span>
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
