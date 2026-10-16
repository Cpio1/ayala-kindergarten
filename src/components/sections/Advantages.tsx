"use client";

import { BusFront, Cctv, HeartHandshake, Languages, Puzzle, Soup, type LucideIcon } from "lucide-react";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { Star } from "../decor/Decor";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";

const ICONS: LucideIcon[] = [Cctv, Soup, Puzzle, BusFront, Languages, HeartHandshake];

/** Each card gets its own soft, asymmetric silhouette and accent. */
const STYLES = [
  { radius: "2.25rem 2.25rem 2.25rem 0.75rem", icon: "bg-brand text-white", blob: "bg-sky/60" },
  { radius: "0.75rem 2.25rem 2.25rem 2.25rem", icon: "bg-sun text-ink", blob: "bg-sun-soft" },
  { radius: "2.25rem 0.75rem 2.25rem 2.25rem", icon: "bg-sky text-brand-deep", blob: "bg-sky-soft" },
  { radius: "2.25rem 2.25rem 0.75rem 2.25rem", icon: "bg-sun text-ink", blob: "bg-sun-soft" },
  { radius: "2.25rem 0.75rem 2.25rem 2.25rem", icon: "bg-brand text-white", blob: "bg-sky/60" },
  { radius: "0.75rem 2.25rem 2.25rem 2.25rem", icon: "bg-sky text-brand-deep", blob: "bg-sky-soft" },
];

export function Advantages() {
  const { t } = useLanguage();
  const a = t.advantages;

  return (
    <section id="advantages" aria-labelledby="advantages-title" className="relative py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading id="advantages-title" eyebrow={a.eyebrow} title={a.title} subtitle={a.subtitle} />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {a.items.map((item, i) => {
            const Icon = ICONS[i];
            const s = STYLES[i];
            return (
              <Reveal as="li" key={i} delay={(i % 3) * 0.08}>
                <article
                  className="group relative h-full overflow-hidden bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift sm:p-7"
                  style={{ borderRadius: s.radius }}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -top-10 -right-10 h-32 w-32 transition-transform duration-500 group-hover:scale-125",
                      s.blob,
                    )}
                    style={{ borderRadius: "var(--radius-blob-2)" }}
                  />
                  <Star
                    className="absolute top-5 right-6 h-4 w-4 text-sun-dark opacity-0 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100"
                  />
                  <span
                    className={cn(
                      "relative grid h-14 w-14 place-items-center transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105",
                      s.icon,
                    )}
                    style={{ borderRadius: "var(--radius-blob-1)" }}
                  >
                    <Icon className="h-7 w-7" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <h3 className="relative mt-5 text-lg leading-snug font-semibold text-ink">{item.title}</h3>
                  <p className="relative mt-2 leading-relaxed text-ink-soft">{item.text}</p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
