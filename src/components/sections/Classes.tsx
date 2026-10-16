"use client";

import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { Dots, Squiggle } from "../decor/Decor";
import {
  ChessIcon,
  DanceIcon,
  EnglishIcon,
  GymnasticsIcon,
  MusicIcon,
  RoboticsIcon,
  SpeechIcon,
  TaekwondoIcon,
} from "../illustrations/ClassIcons";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";

const ICONS = [
  EnglishIcon,
  SpeechIcon,
  MusicIcon,
  DanceIcon,
  TaekwondoIcon,
  GymnasticsIcon,
  RoboticsIcon,
  ChessIcon,
];
// Checkerboard of tints that stays balanced in both the 2- and 4-column grids.
const BACKS = ["bg-sky-soft", "bg-sun-soft", "bg-sky-soft", "bg-sun-soft", "bg-sun-soft", "bg-sky-soft", "bg-sun-soft", "bg-sky-soft"];

export function Classes() {
  const { t } = useLanguage();
  const c = t.classes;

  return (
    <section id="classes" aria-labelledby="classes-title" className="relative overflow-hidden py-16 sm:py-24">
      <Dots className="pointer-events-none absolute top-24 -left-4 w-24 text-sky" />
      <Squiggle className="pointer-events-none absolute right-[6%] bottom-16 w-28 text-sun" />
      <div className="container-page relative">
        <SectionHeading id="classes-title" eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />

        <ul className="mt-12 grid auto-rows-fr gap-4 min-[460px]:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-4 xl:gap-6">
          {c.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal as="li" key={i} delay={(i % 4) * 0.08}>
                <article
                  className="group relative flex h-full flex-col items-start gap-4 bg-white p-5 shadow-soft ring-1 ring-brand/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift hover:ring-brand/20 sm:p-6"
                  style={{ borderRadius: i % 2 ? "2rem 2rem 2rem 0.75rem" : "2rem 0.75rem 2rem 2rem" }}
                >
                  <span
                    className={cn(
                      "relative grid h-[4.5rem] w-[4.5rem] shrink-0 place-items-center transition-[border-radius,transform] duration-500 group-hover:scale-105",
                      BACKS[i],
                    )}
                    style={{ borderRadius: i % 2 ? "var(--radius-blob-2)" : "var(--radius-blob-1)" }}
                  >
                    <Icon className="h-12 w-12 transition-transform duration-500 group-hover:rotate-[-8deg]" />
                  </span>
                  <div className="min-w-0">
                    <span className="font-display text-xs font-semibold text-brand/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-0.5 text-[1.05rem] leading-snug font-semibold text-ink">{item.title}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{item.text}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
