"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, ChevronUp, ImageIcon, Maximize2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Lightbox } from "./Lightbox";
import { distribute, RADII, type Placed } from "./layout";
import { InstagramIcon } from "../InstagramIcon";
import { SectionHeading } from "../SectionHeading";
import { Cloud, Star } from "../decor/Decor";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage } from "@/lib/images";
import { cn } from "@/lib/cn";

const INITIAL = 5;

export function Gallery({ images }: { images: SiteImage[] }) {
  const { t } = useLanguage();
  const g = t.gallery;
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  const visible = useMemo(() => (expanded ? images : images.slice(0, INITIAL)), [expanded, images]);
  // Two layouts rendered with CSS breakpoints: no hydration mismatch, no layout jump.
  const layouts = useMemo(() => ({ two: distribute(visible, 2), three: distribute(visible, 3) }), [visible]);

  const renderColumns = (cols: Placed[][]) =>
    cols.map((col, c) => (
      <div key={c} className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-5">
        <AnimatePresence initial={false}>
          {col.map(({ image, index }) => (
            <motion.div
              key={image.src}
              layout="position"
              initial={index >= INITIAL ? { opacity: 0, y: 30, scale: 0.97 } : false}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, delay: index >= INITIAL ? (index - INITIAL) * 0.05 : 0, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`${g.open}: ${index + 1}`}
                className="group relative block w-full overflow-hidden bg-sky-soft shadow-soft"
                style={{
                  borderRadius: RADII[index % RADII.length],
                  aspectRatio: `${image.width} / ${image.height}`,
                }}
              >
                <Image
                  src={image.src}
                  alt={`${g.photoAlt} ${index + 1}`}
                  fill
                  sizes="(min-width: 1024px) 24rem, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-brand-deep/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute right-3 bottom-3 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-white text-brand opacity-0 shadow-soft transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Maximize2 className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    ));

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative overflow-hidden py-16 sm:py-24">
      <Cloud className="pointer-events-none absolute top-16 -left-6 w-28 animate-drift text-sky/60" />
      <Star className="pointer-events-none absolute top-24 right-[10%] h-6 w-6 animate-twinkle text-sun-dark" />
      <div className="container-page relative">
        <SectionHeading id="gallery-title" eyebrow={g.eyebrow} title={g.title} subtitle={g.subtitle} />

        {images.length === 0 ? (
          <div className="mx-auto mt-12 flex max-w-xl flex-col items-center rounded-[2.5rem_2.5rem_2.5rem_0.8rem] bg-white px-6 py-10 text-center shadow-soft">
            <span className="grid h-16 w-16 place-items-center bg-sky-soft text-brand" style={{ borderRadius: "var(--radius-blob-1)" }}>
              <ImageIcon className="h-8 w-8" aria-hidden="true" />
            </span>
            <p className="mt-5 text-lg font-bold text-ink">{g.empty}</p>
            <p className="mt-2 text-ink-soft">{g.emptyHint}</p>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6">
              <InstagramIcon className="h-5 w-5" />
              {site.instagram.handle}
              <span className="sr-only">({t.a11y.newTab})</span>
            </a>
          </div>
        ) : (
          <>
            <div className="mt-12 flex items-start gap-3 sm:gap-5 lg:hidden">{renderColumns(layouts.two)}</div>
            <div className="mt-14 hidden items-start gap-5 lg:flex">{renderColumns(layouts.three)}</div>

            {images.length > INITIAL && (
              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={() => {
                    if (expanded) document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
                    setExpanded((v) => !v);
                  }}
                  aria-expanded={expanded}
                  className={cn("btn group", expanded ? "btn-ghost" : "btn-sun")}
                >
                  {expanded ? g.less : `${g.more} (+${images.length - INITIAL})`}
                  {expanded ? (
                    <ChevronUp className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="h-5 w-5 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Lightbox images={images} index={active} onChange={setActive} />
    </section>
  );
}
