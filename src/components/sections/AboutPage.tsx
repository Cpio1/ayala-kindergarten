"use client";

import Link from "next/link";
import { ChevronRight, HeartHandshake, MessageCircleHeart, Palette, ShieldCheck, Sprout, type LucideIcon } from "lucide-react";
import { AboutStats } from "./AboutSection";
import { AboutMedia } from "./AboutMedia";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { Cloud, Sun, Swoosh } from "../decor/Decor";
import { InstagramIcon, WhatsappIcon } from "../BrandIcons";
import { site, whatsappLink } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage, SiteVideo } from "@/lib/images";
import { cn } from "@/lib/cn";

export function AboutHero({ video, image }: { video: SiteVideo | null; image: SiteImage | null }) {
  const { t } = useLanguage();
  const p = t.aboutPage;
  return (
    <section aria-labelledby="about-page-title" className="relative overflow-hidden pt-28 pb-14 sm:pt-32 lg:pt-36 lg:pb-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-56 -left-56 h-[42rem] w-[42rem] bg-[radial-gradient(closest-side,rgb(168_221_248/0.5),transparent)]" />
        <div className="absolute -right-56 -bottom-16 h-[38rem] w-[38rem] bg-[radial-gradient(closest-side,var(--color-sun-soft),transparent)]" />
      </div>
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="text-center lg:text-left">
          <nav aria-label="breadcrumb" className="enter-rise">
            <ol className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-sm font-bold text-ink-soft shadow-soft">
              <li>
                <Link href="/" className="hover:text-brand">
                  {t.nav.home}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li aria-current="page" className="text-brand">
                {p.breadcrumb}
              </li>
            </ol>
          </nav>
          <h1
            id="about-page-title"
            style={{ "--delay": "0.08s" } as React.CSSProperties}
            className="enter-rise mt-6 text-[2rem] leading-tight font-semibold text-ink sm:text-[2.6rem] lg:text-[3rem]"
          >
            <span className="relative inline-block">
              {p.title}
              <Swoosh className="absolute -bottom-2 left-0 -z-10 h-4 w-full text-sun" />
            </span>
          </h1>
          <p
            style={{ "--delay": "0.16s" } as React.CSSProperties}
            className="enter-rise mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg lg:mx-0"
          >
            {p.intro}
          </p>
          <div
            style={{ "--delay": "0.24s" } as React.CSSProperties}
            className="enter-rise mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Link href="/#contacts" className="btn btn-primary">
              <MessageCircleHeart className="h-5 w-5" aria-hidden="true" />
              {t.hero.ctaContact}
            </Link>
            <Link href="/#groups" className="btn btn-ghost">
              {t.groups.title}
            </Link>
          </div>
        </div>

        <div className="enter-grow">
          <AboutMedia video={video} image={image} alt={t.about.photoAlt} priority backing="bg-brand" />
        </div>
      </div>
    </section>
  );
}

const VALUE_ICONS: LucideIcon[] = [ShieldCheck, Palette, Sprout, HeartHandshake];
const VALUE_TONES = ["bg-brand text-white", "bg-sun text-ink", "bg-sky text-brand-deep", "bg-white text-brand"];

export function AboutValues() {
  const { t } = useLanguage();
  const p = t.aboutPage;
  return (
    <section aria-labelledby="values-title" className="relative py-14 sm:py-20">
      <div className="container-page">
        <SectionHeading id="values-title" eyebrow={p.valuesEyebrow} title={p.valuesTitle} />
        <ol className="mt-12 grid gap-5 md:grid-cols-2">
          {t.about.paragraphs.map((text, i) => {
            const Icon = VALUE_ICONS[i];
            return (
              <Reveal as="li" key={i} delay={(i % 2) * 0.08}>
                <article
                  className="group relative flex h-full gap-5 overflow-hidden bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-7"
                  style={{ borderRadius: i % 2 ? "0.8rem 2.25rem 2.25rem 2.25rem" : "2.25rem 2.25rem 2.25rem 0.8rem" }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute -right-3 -bottom-8 font-display text-[6rem] leading-none font-bold text-sky-soft transition-transform duration-500 group-hover:-translate-y-2"
                  >
                    {i + 1}
                  </span>
                  <span
                    className={cn("relative grid h-14 w-14 shrink-0 place-items-center shadow-soft", VALUE_TONES[i])}
                    style={{ borderRadius: "var(--radius-blob-1)" }}
                  >
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <div className="relative">
                    <h3 className="text-lg font-semibold text-ink">{p.values[i]}</h3>
                    <p className="mt-2 leading-relaxed text-ink-soft">{text}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ol>
        <AboutStats className="mt-10" />
      </div>
    </section>
  );
}

export function AboutCta() {
  const { t } = useLanguage();
  const p = t.aboutPage;
  return (
    <section aria-labelledby="about-cta-title" className="py-12 sm:py-16">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.75rem_2.75rem_2.75rem_1rem] bg-brand px-6 py-12 text-center text-white shadow-lift sm:px-12">
            <Sun className="pointer-events-none absolute -top-10 -right-10 w-40 opacity-90" />
            <Cloud className="pointer-events-none absolute bottom-4 -left-6 w-32 animate-float-slow text-white/15" />
            <h2 id="about-cta-title" className="relative text-2xl font-semibold sm:text-3xl">
              {p.ctaTitle}
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-sky-soft sm:text-lg">{p.ctaText}</p>
            <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/#contacts" className="btn btn-sun">
                <MessageCircleHeart className="h-5 w-5" aria-hidden="true" />
                {p.ctaButton}
              </Link>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn bg-white text-brand hover:bg-sky-soft">
                <WhatsappIcon className="h-5 w-5" />
                {t.common.whatsapp}
                <span className="sr-only">({t.a11y.newTab})</span>
              </a>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn bg-white/10 text-white hover:bg-white/20">
                <InstagramIcon className="h-5 w-5" />
                {site.instagram.handle}
                <span className="sr-only">({t.a11y.newTab})</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
