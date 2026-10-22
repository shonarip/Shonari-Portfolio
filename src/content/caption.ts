/**
 * One caption format for every piece on the site, under its title:
 *   Client or Series · Year · Medium
 * Empty parts are dropped, so "Photography · 2023" is still in the same order.
 */
export function captionLine(source?: string | null, year?: string | null, medium?: string | null): string {
  return [source, year, medium].filter((p) => p && p.trim()).join(" · ");
}
