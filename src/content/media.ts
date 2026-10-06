/**
 * Videos are too large for the static host (Cloudflare Pages allows 25 MiB per file), so in
 * production they are served from an R2 bucket. Set NEXT_PUBLIC_MEDIA_BASE (for example
 * https://media.nariportfolio.com) at build time. Without it, videos load from the site itself,
 * which is what local development uses.
 */
const BASE = (process.env.NEXT_PUBLIC_MEDIA_BASE ?? "").replace(/\/$/, "");

export function mediaUrl(path: string): string {
  if (!BASE) return path;
  if (!path.startsWith("/work/videography/") || !path.toLowerCase().endsWith(".mp4")) return path;
  return BASE + encodeURI(path);
}
