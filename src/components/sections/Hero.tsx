"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Baby, Clock3, MessageCircleHeart, Soup } from "lucide-react";
import { OrganicPhoto } from "../OrganicPhoto";
import { Cloud, Dots, Squiggle, Star, Sun, Swoosh } from "../decor/Decor";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage } from "@/lib/images";

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.75, delay: 0.1 + i * 0.1, ease } }),
};

export function Hero({ image }: { image: SiteImage | null }) {
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
      {/* soft background glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 h-[34rem] w-[34rem] rounded-full bg-sky/50 blur-3xl" />
        <div className="absolute top-1/3 -left-48 h-[28rem] w-[28rem] rounded-full bg-sun-soft/80 blur-3xl" />
        <Cloud className="absolute top-28 left-[6%] hidden w-24 animate-drift text-white lg:block" />
        <Star className="absolute top-[42%] left-[46%] hidden h-5 w-5 animate-twinkle text-sun-dark lg:block" />
      </div>

      <div className="container-page grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
        {/* Text */}
        <div className="relative z-10 text-center lg:text-left">
          <motion.span variants={fadeUp} initial="hidden" animate="show" custom={0} className="eyebrow">
            <Sun className="h-5 w-5" />
            {h.eyebrow}
          </motion.span>

          <motion.h1
            id="hero-title"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-5 text-[1.85rem] leading-[1.18] font-semibold text-ink sm:text-[2.5rem] lg:text-[3.05rem]"
          >
            {h.titleBefore && <>{h.titleBefore} </>}
            <span className="relative inline-block whitespace-nowrap text-brand">
              {h.titleBrand}
              <Swoosh className="absolute -bottom-1.5 left-0 -z-10 h-3.5 w-full text-sun sm:h-4" />
            </span>
            {h.titleAfter && <> {h.titleAfter}</>}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg lg:mx-0"
          >
            {h.subtitle}
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-6 inline-flex items-center gap-2.5 rounded-2xl bg-white py-2 pr-4 pl-2 text-sm font-extrabold text-ink shadow-soft sm:text-base"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-sun text-ink">
              <Baby className="h-5 w-5" aria-hidden="true" />
            </span>
            {h.age}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Link href="/#contacts" className="btn btn-primary">
              <MessageCircleHeart className="h-5 w-5" aria-hidden="true" />
              {h.ctaContact}
            </Link>
            <Link href="/about" className="btn btn-ghost group">
              {h.ctaAbout}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
            className="mt-8 flex flex-wrap justify-center gap-2 lg:justify-start"
          >
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
          </motion.ul>
        </div>

        {/* Photo composition — the frame keeps the photo's own proportions */}
        <div className="relative mx-auto w-full max-w-[34rem] px-3 pt-8 pb-12 sm:px-6 lg:max-w-none lg:px-4">
          <div
            className="relative mx-auto w-full"
            style={{ aspectRatio: image ? `${image.width} / ${image.height}` : "1 / 1" }}
          >
            {/* yellow backing shape */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 translate-x-[4%] translate-y-[7%] bg-sun"
              style={{ borderRadius: "var(--radius-blob-2)" }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease }}
            />
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

            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.15, ease }}
            >
              <OrganicPhoto
                image={image}
                alt={h.photoAlt}
                priority
                morph
                shape="natural"
                sizes="(min-width: 1280px) 36rem, (min-width: 1024px) 45vw, (min-width: 640px) 32rem, 94vw"
                className="relative h-full w-full"
              />
            </motion.div>

            {/* decorations stay on the frame's edges, away from faces */}
            <Sun className="absolute -top-[22%] -right-[7%] w-[22%] drop-shadow-[0_10px_20px_rgba(242,183,5,0.35)]" />
            <Cloud className="absolute -top-[10%] -left-[9%] w-[20%] animate-float-slow text-white drop-shadow-[0_8px_16px_rgba(32,116,237,0.15)]" />
            <Cloud className="absolute -right-[7%] bottom-[18%] w-[13%] animate-float text-white drop-shadow-[0_8px_16px_rgba(32,116,237,0.15)]" />
            <Star className="absolute -top-[14%] left-[30%] h-5 w-5 animate-twinkle text-brand" />
            <Star className="absolute -bottom-[16%] left-[44%] h-4 w-4 animate-twinkle text-sun-dark [animation-delay:1.2s]" />
            <Star className="absolute top-[40%] -right-[5%] h-4 w-4 animate-twinkle text-sky [animation-delay:0.6s]" />
            <Squiggle className="absolute -bottom-[17%] left-[2%] w-[24%] text-brand" />
            <Dots className="absolute -top-[18%] left-[48%] w-[10%] text-sky" />
            <span aria-hidden="true" className="absolute bottom-[22%] -left-[5%] h-4 w-4 animate-float rounded-full bg-brand" />

            {/* fact badges sit outside the photo so no child is covered */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease }}
              className="absolute right-[2%] -bottom-[11%] flex translate-y-1/2 items-center gap-2.5 rounded-2xl bg-white px-3 py-2.5 shadow-soft sm:px-4"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand text-white">
                <Clock3 className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-left leading-tight">
                <span className="block font-display text-sm font-semibold text-ink">{h.badgeHours}</span>
                <span className="block text-xs font-bold text-ink-soft">{h.badgeHoursLabel}</span>
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.6, ease }}
              className="absolute -top-[4%] left-[6%] hidden -translate-y-full items-center gap-2.5 rounded-2xl bg-white px-4 py-2.5 shadow-soft sm:flex"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sun text-ink">
                <Soup className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-left leading-tight">
                <span className="block font-display text-sm font-semibold text-ink">{h.badgeMeals}</span>
                <span className="block text-xs font-bold text-ink-soft">{h.badgeMealsLabel}</span>
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
