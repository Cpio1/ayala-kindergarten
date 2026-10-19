"use client";

import { CalendarHeart } from "lucide-react";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { Cloud, Star, WaveEdge } from "../decor/Decor";
import { ChickArt, MoonArt, SwallowArt } from "../illustrations/GroupArt";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";

const THEMES = [
  {
    Art: ChickArt,
    card: "bg-sun-soft",
    stage: "bg-sun",
    label: "bg-white text-ink",
    age: "bg-white/80 text-ink",
    radius: "3rem 3rem 3rem 1rem",
    stageRadius: "2.25rem 2.25rem 45% 45% / 2.25rem 2.25rem 16% 16%",
  },
  {
    Art: MoonArt,
    card: "bg-white",
    stage: "bg-sky",
    label: "bg-sky-soft text-brand-deep",
    age: "bg-sky-soft text-brand-deep",
    radius: "1rem 3rem 3rem 3rem",
    stageRadius: "0.4rem 2.25rem 45% 45% / 0.4rem 2.25rem 16% 16%",
  },
  {
    Art: SwallowArt,
    card: "bg-brand text-white",
    stage: "bg-sky/40",
    label: "bg-white/15 text-white",
    age: "bg-sun text-ink",
    radius: "3rem 1rem 3rem 3rem",
    stageRadius: "2.25rem 0.4rem 45% 45% / 2.25rem 0.4rem 16% 16%",
  },
];

export function Groups() {
  const { t } = useLanguage();
  const g = t.groups;

  return (
    <section id="groups" aria-labelledby="groups-title" className="relative">
      <WaveEdge className="h-10 text-sky-soft sm:h-16" />
      <div className="relative overflow-hidden bg-sky-soft pt-10 pb-16 sm:pb-24">
        <Cloud className="pointer-events-none absolute top-6 right-[8%] w-28 animate-drift text-white sm:w-36" />
        <Cloud className="pointer-events-none absolute bottom-10 left-[4%] w-20 animate-float-slow text-white" />
        <div className="container-page relative">
          <SectionHeading id="groups-title" eyebrow={g.eyebrow} title={g.title} subtitle={g.subtitle} />

          <ul className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-14 lg:gap-7">
            {g.items.map((item, i) => {
              const th = THEMES[i];
              const dark = i === 2;
              return (
                <Reveal as="li" key={i} delay={i * 0.1}>
                  <article
                    className={cn(
                      "group relative flex h-full flex-col p-3 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-lift",
                      th.card,
                    )}
                    style={{ borderRadius: th.radius }}
                  >
                    <div
                      className={cn("relative grid h-48 place-items-center overflow-hidden", th.stage)}
                      style={{ borderRadius: th.stageRadius }}
                    >
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-16 left-1/2 h-40 w-[130%] -translate-x-1/2 rounded-[50%] bg-white/30"
                      />
                      <Star className="absolute top-5 left-6 h-4 w-4 animate-twinkle text-white" />
                      <Star className="absolute top-10 right-8 h-3 w-3 animate-twinkle text-white [animation-delay:1.4s]" />
                      <th.Art className="relative h-40 w-40 transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:rotate-[-4deg]" />
                    </div>

                    <div className="flex flex-1 flex-col px-4 pt-5 pb-5 sm:px-5">
                      <span className={cn("self-start rounded-full px-3 py-1 text-xs font-extrabold tracking-wide", th.label)}>
                        {item.label}
                      </span>
                      <h3 className={cn("mt-3 text-2xl font-semibold", dark ? "text-white" : "text-ink")}>{item.name}</h3>
                      <p className={cn("mt-3 flex-1 leading-relaxed", dark ? "text-sky-soft" : "text-ink-soft")}>
                        {item.text}
                      </p>
                      <p className={cn("mt-5 inline-flex items-center gap-2 self-start rounded-2xl px-3.5 py-2 text-sm font-extrabold", th.age)}>
                        <CalendarHeart className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {item.age}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
      <WaveEdge flip className="h-10 text-sky-soft sm:h-16" />
    </section>
  );
}
