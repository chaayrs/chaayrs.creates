import type { SVGProps } from "react";
export function Arrow({
  direction = "up",
  ...props
}: SVGProps<SVGSVGElement> & { direction?: "up" | "down" | "left" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...props}
      style={{
        transform:
          direction === "down"
            ? "rotate(90deg)"
            : direction === "left"
              ? "rotate(225deg)"
              : undefined,
        ...props.style,
      }}
    >
      <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
export function Asterisk(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" {...props}>
      <path
        d="M40 1v78M1 40h78M12.5 12.5l55 55M12.5 67.5l55-55"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
export function Play(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="m9 5 11 7-11 7V5Z" fill="currentColor" />
    </svg>
  );
}
