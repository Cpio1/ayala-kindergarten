"use client";

import { Apple, Carrot, Cherry, CheckCircle2, Fish, Milk, Salad, Soup, Wheat, type LucideIcon } from "lucide-react";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { Star, WaveEdge } from "../decor/Decor";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Food icons orbiting the plate: [icon, angle in degrees, tone]. */
const FOODS: [LucideIcon, number, string][] = [
  [Apple, -90, "bg-sun text-ink"],
  [Carrot, -30, "bg-white text-brand"],
  [Milk, 30, "bg-sky text-brand-deep"],
  [Wheat, 90, "bg-sun text-ink"],
  [Fish, 150, "bg-white text-brand"],
  [Cherry, 210, "bg-sky text-brand-deep"],
];

export function Nutrition() {
  const { t } = useLanguage();
  const n = t.nutrition;

  return (
    <section id="nutrition" aria-labelledby="nutrition-title" className="relative">
      <WaveEdge className="h-10 text-brand sm:h-16" />
      <div className="relative overflow-hidden bg-brand py-14 text-white sm:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/5" />
          <div className="absolute -right-16 -bottom-28 h-80 w-80 rounded-full bg-sky/15" />
          <Star className="absolute top-10 right-[40%] h-5 w-5 animate-twinkle text-sun" />
          <Star className="absolute bottom-14 left-[8%] h-4 w-4 animate-twinkle text-sky [animation-delay:1.2s]" />
        </div>

        <div className="container-page relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="nutrition-title" eyebrow={n.eyebrow} title={n.title} align="left" tone="dark" />
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-xl leading-relaxed text-sky-soft sm:text-lg">{n.text}</p>
            </Reveal>
            <ul className="mt-7 space-y-3">
              {n.points.map((point, i) => (
                <Reveal as="li" key={i} delay={0.15 + i * 0.07} className="flex items-center gap-3 font-bold">
                  <CheckCircle2 className="h-6 w-6 shrink-0 text-sun" aria-hidden="true" />
                  {point}
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal className="relative mx-auto aspect-square w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-[30rem]">
            {/* dashed orbit */}
            <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0 h-full w-full text-white/30">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1.5 2.5" />
            </svg>

            {/* plate */}
            <div className="absolute inset-[24%] grid place-items-center rounded-full bg-white shadow-[0_24px_50px_-20px_rgba(0,0,0,0.45)]">
              <div className="absolute inset-[9%] rounded-full border-[3px] border-dashed border-sky" aria-hidden="true" />
              <div className="relative text-center text-ink">
                <span className="block font-display text-5xl leading-none font-bold text-brand sm:text-6xl">5</span>
                <span className="mt-1 block text-sm font-extrabold">{n.mealsLabel}</span>
                <span className="block text-xs font-bold text-ink-soft">{n.mealsCaption}</span>
              </div>
            </div>

            {/* foods on a slow CSS orbit (compositor-only); still on phones */}
            <div aria-hidden="true" className="absolute inset-0 animate-orbit">
              {FOODS.map(([Icon, angle, tone], i) => {
                const rad = (angle * Math.PI) / 180;
                const x = 50 + 40 * Math.cos(rad);
                const y = 50 + 40 * Math.sin(rad);
                return (
                  <span
                    key={i}
                    className={`absolute grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center shadow-soft animate-orbit-reverse sm:h-14 sm:w-14 ${tone}`}
                    style={{ left: `${x}%`, top: `${y}%`, borderRadius: i % 2 ? "var(--radius-blob-2)" : "var(--radius-blob-1)" }}
                  >
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </span>
                );
              })}
            </div>

            <span className="absolute top-[6%] right-[4%] grid h-11 w-11 animate-float place-items-center rounded-full bg-sun text-ink shadow-sun" aria-hidden="true">
              <Soup className="h-5 w-5" />
            </span>
            <span className="absolute bottom-[4%] left-[6%] grid h-10 w-10 animate-float-slow place-items-center rounded-full bg-white text-brand" aria-hidden="true">
              <Salad className="h-5 w-5" />
            </span>
          </Reveal>
        </div>
      </div>
      <WaveEdge flip className="h-10 text-brand sm:h-16" />
    </section>
  );
}
