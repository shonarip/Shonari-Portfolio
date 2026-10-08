/**
 * Press-sheet marks that give the site its identity: the hanko seal, registration targets
 * and a CMYK control strip. All are decorative and hidden from screen readers.
 * Marks are hairlines and always sit in the margin, outside the edge of any artwork.
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

/**
 * A registration target: two rings and a crosshair that runs past the outer ring.
 * Strokes stay a hairline (0.75 CSS px) at any size.
 */
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
      strokeWidth="0.75"
    >
      <circle cx="12" cy="12" r="7.5" vectorEffect="non-scaling-stroke" />
      <circle cx="12" cy="12" r="3.5" vectorEffect="non-scaling-stroke" />
      <path d="M12 0v24M0 12h24" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/**
 * A CMYK control strip, as printed along the edge of a press sheet: the four solids,
 * the two-color overprints, 50% tints of C, M and Y, and a black tint ramp.
 * Swatches are screen approximations of SWOP process values.
 */
export const CMYK_STEPS = [
  { label: "C100", hex: "#00aeef" },
  { label: "M100", hex: "#ec008c" },
  { label: "Y100", hex: "#fff200" },
  { label: "K100", hex: "#231f20" },
  { label: "C+M", hex: "#2e3192" },
  { label: "C+Y", hex: "#00a651" },
  { label: "M+Y", hex: "#ed1c24" },
  { label: "C50", hex: "#8ed8f8" },
  { label: "M50", hex: "#f49ac1" },
  { label: "Y50", hex: "#fff799" },
  { label: "K80", hex: "#414042" },
  { label: "K60", hex: "#6d6e71" },
  { label: "K40", hex: "#a7a9ac" },
  { label: "K20", hex: "#d1d3d4" },
] as const;

export function CmykBar({ className = "" }: { className?: string }) {
  return (
    <ul
      aria-hidden="true"
      className={`grid grid-cols-7 gap-y-3 md:grid-cols-[repeat(14,minmax(0,1fr))] ${className}`}
    >
      {CMYK_STEPS.map((s) => (
        <li key={s.label} className="min-w-0">
          <span className="block h-3 sm:h-4" style={{ background: s.hex }} />
          <span className="mt-1.5 block text-2xs tracking-normal opacity-80">{s.label}</span>
        </li>
      ))}
    </ul>
  );
}
