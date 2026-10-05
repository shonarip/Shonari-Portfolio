import { site } from "./site";

/** Social links minus any Adobe Portfolio destination (site never points to Adobe). */
export const socialLinks = site.social.filter(
  (l) => !/myportfolio\.com|adobe/i.test(l.href + " " + l.label),
);

/** Header nav from site.ts; hash links always resolve to the home page. */
export const navLinks = site.nav.map((n) => ({
  label: n.label,
  href: n.href.startsWith("#") ? `/${n.href}` : n.href,
  external: "external" in n ? Boolean((n as { external?: boolean }).external) : false,
}));
