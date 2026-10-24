/** The development-only override allows browser QA without changing OS settings. */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    (process.env.NODE_ENV === "development" &&
      new URLSearchParams(window.location.search).get("motion") === "reduce")
  );
}
