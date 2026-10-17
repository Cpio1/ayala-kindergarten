"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * Rendered once in the root layout, outside the page segment: Next.js focuses the first
 * node of a newly navigated segment, and that must not be this link. Styles: `.skip-link`.
 */
export function SkipLink() {
  const { t } = useLanguage();
  return (
    <a href="#main" className="skip-link">
      {t.a11y.skip}
    </a>
  );
}
