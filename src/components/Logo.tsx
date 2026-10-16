import { cn } from "@/lib/cn";

/**
 * Text logo: «АЯЛА» set in the display face, with a small rising sun
 * above the last letter and a yellow smile-arc underneath.
 */
export function Logo({ variant = "color", className }: { variant?: "color" | "light"; className?: string }) {
  const light = variant === "light";
  return (
    <span className={cn("inline-flex flex-col leading-none select-none", className)}>
      <span className="relative inline-flex items-end font-display text-[1.6rem] font-bold tracking-[0.04em]">
        <span className={light ? "text-white" : "text-brand"}>АЯЛ</span>
        <span className="relative">
          <span className={light ? "text-sun" : "text-brand"}>А</span>
          <svg
            viewBox="0 0 28 28"
            className="absolute -top-[0.62em] left-1/2 h-[0.78em] w-[0.78em] -translate-x-1/2"
            aria-hidden="true"
            focusable="false"
          >
            <circle cx="14" cy="14" r="6" fill="#FFD43B" />
            <g stroke="#FFD43B" strokeWidth="2.4" strokeLinecap="round">
              <path d="M14 2.5v3M14 22.5v3M2.5 14h3M22.5 14h3M5.9 5.9l2.1 2.1M20 20l2.1 2.1M22.1 5.9 20 8M8 20l-2.1 2.1" />
            </g>
          </svg>
        </span>
        <svg
          viewBox="0 0 100 12"
          className="absolute -bottom-[0.32em] left-[4%] h-[0.38em] w-[92%]"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M3 3c28 9 66 9 94 0" fill="none" stroke="#FFD43B" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      </span>
      <span
        className={cn(
          "mt-[0.55rem] pl-0.5 text-[0.62rem] font-extrabold tracking-[0.32em] uppercase",
          light ? "text-sky" : "text-ink-soft",
        )}
      >
        балабақша
      </span>
    </span>
  );
}
