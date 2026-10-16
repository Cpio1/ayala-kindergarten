"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AboutMedia } from "./AboutMedia";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage, SiteVideo } from "@/lib/images";
import { cn } from "@/lib/cn";

export function AboutStats({ className }: { className?: string }) {
  const { t } = useLanguage();
  const tones = ["bg-brand text-white", "bg-sun text-ink", "bg-sky text-brand-deep", "bg-white text-ink"];
  return (
    <ul className={cn("grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4", className)}>
      {t.about.stats.map((stat, i) => (
        <Reveal as="li" key={i} delay={i * 0.07}>
          <div
            className={cn("flex h-full flex-col justify-center px-4 py-5 shadow-soft sm:px-6", tones[i])}
            style={{ borderRadius: i % 2 ? "1.75rem 1.75rem 1.75rem 0.6rem" : "1.75rem 0.6rem 1.75rem 1.75rem" }}
          >
            <span className="font-display text-xl font-semibold whitespace-nowrap sm:text-2xl">{stat.value}</span>
            <span className="mt-1 text-sm font-bold opacity-80">{stat.label}</span>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

export function AboutSection({ video, image }: { video: SiteVideo | null; image: SiteImage | null }) {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <section id="about" aria-labelledby="about-title" className="relative py-16 sm:py-24">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <AboutMedia video={video} image={image} alt={a.photoAlt} backing="bg-sky" />
          </Reveal>

          <div>
            <SectionHeading id="about-title" eyebrow={a.eyebrow} title={a.title} align="left" />
            <div className="mt-6 space-y-4">
              {a.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p
                    className={cn(
                      "leading-relaxed sm:text-lg",
                      i === a.paragraphs.length - 1
                        ? "rounded-2xl border-l-4 border-sun bg-white/80 py-3 pr-4 pl-4 font-bold text-ink"
                        : "text-ink-soft",
                    )}
                  >
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <Link href="/about" className="btn btn-ghost group mt-7">
                {a.more}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>

        <AboutStats className="mt-14" />
      </div>
    </section>
  );
}
