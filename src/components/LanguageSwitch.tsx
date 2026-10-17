"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { LANGS } from "@/i18n/translations";
import { cn } from "@/lib/cn";

const LABELS = { kk: "KZ", ru: "RU" } as const;

export function LanguageSwitch({ className }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();
  const index = LANGS.indexOf(lang);
  return (
    <div
      role="group"
      aria-label={t.a11y.language}
      className={cn("relative inline-grid grid-cols-2 rounded-full bg-sky-soft p-1 text-xs font-extrabold", className)}
    >
      {/* sliding pill: equal-width cells, so it moves by whole cell widths */}
      <span
        aria-hidden="true"
        className="absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-brand shadow-soft transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: `translateX(${index * 100}%)` }}
      />
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
              active ? "text-white" : "text-brand-dark hover:text-brand-deep",
            )}
          >
            {LABELS[code]}
          </button>
        );
      })}
    </div>
  );
}
