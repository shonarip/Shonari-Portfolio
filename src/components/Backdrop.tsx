/**
 * Page background: a near-black base with three slow, soft color washes (pink, periwinkle,
 * violet), a faint blueprint grid that fades toward the edges, film grain, and a vignette.
 * Pure CSS: no canvas or JavaScript. Motion is very slow and stops for reduced-motion visitors.
 * The washes stay dark enough that all text on top keeps WCAG AA contrast.
 */
export function Backdrop() {
  return (
    <div aria-hidden="true" className="backdrop pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-canvas">
      <div className="backdrop-orb backdrop-orb-pink" />
      <div className="backdrop-orb backdrop-orb-blue" />
      <div className="backdrop-orb backdrop-orb-violet" />
      <div className="backdrop-grid" />
      <div className="backdrop-grain" />
      <div className="backdrop-vignette" />
    </div>
  );
}
