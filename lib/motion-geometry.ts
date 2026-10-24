type Bounds = { top: number; bottom: number; height: number };
const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function readyToReveal(
  bounds: Bounds,
  viewportHeight: number,
  headerHeight: number,
  heading: boolean,
) {
  if (bounds.height <= 0) return false;
  const available = Math.max(1, viewportHeight - headerHeight - 24);
  const visible =
    Math.min(bounds.bottom, viewportHeight - 24) -
    Math.max(bounds.top, headerHeight);
  // Most of a heading must be on screen, so later lines do not animate offscreen.
  // Cap the requirement for headings taller than a compact viewport can contain.
  const required = Math.min(
    bounds.height * (heading ? 0.9 : 0.18),
    available * (heading ? 0.65 : 0.18),
  );
  return visible >= required;
}

export function typographyParallax(
  top: number,
  height: number,
  viewportHeight: number,
  headerHeight: number,
) {
  // Map the word's own passage through the viewport to the complete 42px range.
  const distance = Math.max(1, viewportHeight - headerHeight + height);
  return (clamp((viewportHeight - top) / distance) - 0.5) * 42;
}
