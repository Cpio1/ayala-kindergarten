"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage } from "@/lib/images";

type Props = {
  images: SiteImage[];
  index: number | null;
  onChange: (index: number | null) => void;
};

export function Lightbox({ images, index, onChange }: Props) {
  const { t } = useLanguage();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const open = index !== null;
  const count = images.length;

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      onChange((index + delta + count) % count);
    },
    [index, count, onChange],
  );

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        // keep focus inside the dialog
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, [open, go, onChange]);

  const image = index !== null ? images[index] : null;

  if (!image || index === null) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${t.gallery.photoAlt} ${index + 1} ${t.gallery.of} ${count}`}
      className="lightbox-in fixed inset-0 z-[80] flex items-center justify-center bg-ink/92 p-3 sm:p-8"
      onClick={(e) => e.target === e.currentTarget && onChange(null)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      {/* keyed: each photo re-mounts and plays the short CSS entrance */}
      <div
        key={image.src}
        className="lightbox-photo-in relative h-full max-h-[86vh] w-full max-w-6xl"
        onClick={(e) => e.target === e.currentTarget && onChange(null)}
      >
        <Image
          src={image.src}
          alt={`${t.gallery.photoAlt} ${index + 1}`}
          fill
          sizes="100vw"
          quality={85}
          className="pointer-events-none object-contain"
        />
      </div>

      <button
        ref={closeRef}
        type="button"
        onClick={() => onChange(null)}
        aria-label={t.gallery.close}
        className="absolute top-3 right-3 grid h-12 w-12 place-items-center rounded-full bg-white text-ink shadow-soft transition-transform hover:scale-105 sm:top-5 sm:right-5"
      >
        <X className="h-6 w-6" aria-hidden="true" />
      </button>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={t.gallery.prev}
            className="absolute top-1/2 left-2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-brand shadow-soft transition-transform hover:scale-105 sm:left-5"
          >
            <ChevronLeft className="h-7 w-7" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={t.gallery.next}
            className="absolute top-1/2 right-2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-brand shadow-soft transition-transform hover:scale-105 sm:right-5"
          >
            <ChevronRight className="h-7 w-7" aria-hidden="true" />
          </button>
          <p
            className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/15 px-4 py-1.5 font-display text-sm text-white"
            aria-live="polite"
          >
            {index + 1} {t.gallery.of} {count}
          </p>
        </>
      )}
    </div>
  );
}
