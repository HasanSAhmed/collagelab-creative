// Tiny decorative SVGs — hand-drawn collage flavor.
import type { SVGProps } from "react";

export function ScribbleStar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 60 60" fill="none" {...props}>
      <path
        d="M30 5 L35 22 L54 22 L39 33 L45 52 L30 41 L15 52 L21 33 L6 22 L25 22 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function ScribbleArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 40" fill="none" {...props}>
      <path
        d="M4 22 Q 25 6, 50 22 T 92 18 M82 10 L92 18 L84 28"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function ScribbleCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 60" fill="none" {...props}>
      <path
        d="M50 6 C 22 6, 8 22, 8 32 C 8 48, 30 56, 52 54 C 78 52, 92 38, 92 28 C 92 14, 72 6, 48 8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Sparkle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
    </svg>
  );
}

export function TapeStrip({
  className,
  rotate = -4,
  color = "mustard",
}: {
  className?: string;
  rotate?: number;
  color?: "mustard" | "pink" | "blue";
}) {
  const bg =
    color === "pink"
      ? "rgba(217, 162, 162, 0.7)"
      : color === "blue"
      ? "rgba(58, 107, 137, 0.4)"
      : "rgba(217, 164, 65, 0.6)";
  return (
    <span
      className={className}
      style={{
        background: bg,
        transform: `rotate(${rotate}deg)`,
        mixBlendMode: "multiply",
        boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
        display: "inline-block",
      }}
    />
  );
}
