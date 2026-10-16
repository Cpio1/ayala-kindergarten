"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export function SkipLink() {
  const { t } = useLanguage();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:font-bold focus:text-white"
    >
      {t.a11y.skip}
    </a>
  );
}
