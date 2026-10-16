"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { LANGS } from "@/i18n/translations";
import { cn } from "@/lib/cn";

const LABELS = { kk: "KZ", ru: "RU" } as const;

export function LanguageSwitch({ className, layoutId = "lang-pill" }: { className?: string; layoutId?: string }) {
  const { lang, setLang, t } = useLanguage();
  return (
    <div
      role="group"
      aria-label={t.a11y.language}
      className={cn("relative inline-flex rounded-full bg-sky-soft p-1 text-xs font-extrabold", className)}
    >
      {LANGS.map((code) => {
        const active = code === lang;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            lang={code}
            className={cn(
              "relative z-10 min-h-9 min-w-10 rounded-full px-2.5 transition-colors",
              active ? "text-white" : "text-brand hover:text-brand-dark",
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 -z-10 rounded-full bg-brand shadow-soft"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            {LABELS[code]}
          </button>
        );
      })}
    </div>
  );
}
