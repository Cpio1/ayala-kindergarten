import { Reveal } from "./Reveal";
import { Star } from "./decor/Decor";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  id?: string;
};

export function SectionHeading({ eyebrow, title, subtitle, align = "center", tone = "light", id }: Props) {
  const dark = tone === "dark";
  return (
    <Reveal className={cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      <span className={cn("eyebrow", dark && "bg-white/15 text-white shadow-none")}>
        <Star className={cn("h-4 w-4", dark ? "text-sun" : "text-sun-dark")} />
        {eyebrow}
      </span>
      <h2
        id={id}
        className={cn(
          "mt-4 text-[1.6rem] leading-[1.2] font-semibold sm:text-[2rem] lg:text-[2.35rem]",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", dark ? "text-sky-soft/90" : "text-ink-soft")}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
