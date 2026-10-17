"use client";

import Link from "next/link";
import { ArrowRight, Baby, Clock3, MessageCircleHeart, Soup } from "lucide-react";
import { OrganicPhoto } from "../OrganicPhoto";
import { Cloud, Dots, Squiggle, Star, Sun, Swoosh } from "../decor/Decor";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage } from "@/lib/images";

/** Staggered CSS entrance (see `.enter-rise` in globals.css) — runs before hydration. */
const rise = (i: number) => ({ "--delay": `${0.05 + i * 0.08}s` }) as React.CSSProperties;

export function Hero({ image }: { image: SiteImage | null }) {
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
      {/* soft background glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* radial gradients look like the old blurred blobs but cost nothing to paint */}
        <div className="absolute -top-56 -right-56 h-[46rem] w-[46rem] bg-[radial-gradient(closest-side,rgb(168_221_248/0.5),transparent)]" />
        <div className="absolute top-1/4 -left-64 h-[40rem] w-[40rem] bg-[radial-gradient(closest-side,rgb(255_241_184/0.8),transparent)]" />
        <Cloud className="absolute top-28 left-[6%] hidden w-24 animate-drift text-white lg:block" />
        <Star className="absolute top-[42%] left-[46%] hidden h-5 w-5 animate-twinkle text-sun-dark lg:block" />
      </div>

      <div className="container-page grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
        {/* Text */}
        <div className="relative z-10 text-center lg:text-left">
          <span style={rise(0)} className="enter-rise eyebrow">
            <Sun className="h-5 w-5" />
            {h.eyebrow}
          </span>

          <h1
            id="hero-title"
            style={rise(1)}
            className="enter-rise mt-5 text-[1.85rem] leading-[1.18] font-semibold text-ink sm:text-[2.5rem] lg:text-[3.05rem]"
          >
            {h.titleBefore && <>{h.titleBefore} </>}
            <span className="relative inline-block whitespace-nowrap text-brand">
              {h.titleBrand}
              <Swoosh className="absolute -bottom-1.5 left-0 -z-10 h-3.5 w-full text-sun sm:h-4" />
            </span>
            {h.titleAfter && <> {h.titleAfter}</>}
          </h1>

          <p style={rise(2)} className="enter-rise mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg lg:mx-0">
            {h.subtitle}
          </p>

          <p style={rise(3)} className="enter-rise mt-6 inline-flex items-center gap-2.5 rounded-2xl bg-white py-2 pr-4 pl-2 text-sm font-extrabold text-ink shadow-soft sm:text-base">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-sun text-ink">
              <Baby className="h-5 w-5" aria-hidden="true" />
            </span>
            {h.age}
          </p>

          <div style={rise(4)} className="enter-rise mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link href="/#contacts" className="btn btn-primary">
              <MessageCircleHeart className="h-5 w-5" aria-hidden="true" />
              {h.ctaContact}
            </Link>
            <Link href="/about" className="btn btn-ghost group">
              {h.ctaAbout}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>

          <ul style={rise(5)} className="enter-rise mt-8 flex flex-wrap justify-center gap-2 lg:justify-start">
            {h.chips.map((chip, i) => (
              <li
                key={chip}
                className="inline-flex items-center gap-2 rounded-full border border-brand/10 bg-white/70 px-3.5 py-1.5 text-sm font-bold text-ink-soft"
              >
                <span
                  className={["h-2 w-2 rounded-full", ["bg-brand", "bg-sun-dark", "bg-sky"][i % 3]].join(" ")}
                  aria-hidden="true"
                />
                {chip}
              </li>
            ))}
          </ul>
        </div>

        {/* Photo composition — the frame keeps the photo's own proportions */}
        <div className="relative mx-auto w-full max-w-[34rem] px-3 pt-8 pb-12 sm:px-6 lg:max-w-none lg:px-4">
          <div
            className="relative mx-auto w-full"
            style={{ aspectRatio: image ? `${image.width} / ${image.height}` : "1 / 1" }}
          >
            {/* yellow backing shape */}
            <div aria-hidden="true" className="enter-pop absolute inset-0">
              <div className="h-full w-full translate-x-[4%] translate-y-[7%] bg-sun" style={{ borderRadius: "var(--radius-blob-2)" }} />
            </div>
            {/* dashed orbit */}
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute -inset-[6%] h-[112%] w-[112%] text-brand/25"
            >
              <ellipse
                cx="50"
                cy="50"
                rx="49"
                ry="48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="3 5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <div className="enter-grow absolute inset-0">
              <OrganicPhoto
                image={image}
                alt={h.photoAlt}
                priority
                morph
                shape="natural"
                sizes="(min-width: 1280px) 36rem, (min-width: 1024px) 45vw, (min-width: 640px) 32rem, 94vw"
                className="relative h-full w-full"
              />
            </div>

            {/* decorations stay on the frame's edges, away from faces */}
            <Sun className="absolute -top-[22%] -right-[7%] w-[22%] lg:drop-shadow-[0_10px_20px_rgba(242,183,5,0.35)]" />
            <Cloud className="absolute -top-[10%] -left-[9%] w-[20%] animate-float-slow text-white lg:drop-shadow-[0_8px_16px_rgba(32,116,237,0.15)]" />
            <Cloud className="absolute -right-[7%] bottom-[18%] w-[13%] animate-float text-white lg:drop-shadow-[0_8px_16px_rgba(32,116,237,0.15)]" />
            <Star className="absolute -top-[14%] left-[30%] h-5 w-5 animate-twinkle text-brand" />
            <Star className="absolute -bottom-[16%] left-[44%] h-4 w-4 animate-twinkle text-sun-dark [animation-delay:1.2s]" />
            <Star className="absolute top-[40%] -right-[5%] h-4 w-4 animate-twinkle text-sky [animation-delay:0.6s]" />
            <Squiggle className="absolute -bottom-[17%] left-[2%] w-[24%] text-brand" />
            <Dots className="absolute -top-[18%] left-[48%] w-[10%] text-sky" />
            <span aria-hidden="true" className="absolute bottom-[22%] -left-[5%] h-4 w-4 animate-float rounded-full bg-brand" />

            {/* fact badges sit outside the photo so no child is covered */}
            <div
              style={{ "--delay": "0.5s" } as React.CSSProperties}
              className="enter-rise absolute right-[2%] -bottom-[11%] flex translate-y-1/2 items-center gap-2.5 rounded-2xl bg-white px-3 py-2.5 shadow-soft sm:px-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand text-white">
                <Clock3 className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-left leading-tight">
                <span className="block font-display text-sm font-semibold text-ink">{h.badgeHours}</span>
                <span className="block text-xs font-bold text-ink-soft">{h.badgeHoursLabel}</span>
              </span>
            </div>
            <div
              style={{ "--delay": "0.6s" } as React.CSSProperties}
              className="enter-rise absolute -top-[4%] left-[6%] hidden -translate-y-full items-center gap-2.5 rounded-2xl bg-white px-4 py-2.5 shadow-soft sm:flex">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sun text-ink">
                <Soup className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-left leading-tight">
                <span className="block font-display text-sm font-semibold text-ink">{h.badgeMeals}</span>
                <span className="block text-xs font-bold text-ink-soft">{h.badgeMealsLabel}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
