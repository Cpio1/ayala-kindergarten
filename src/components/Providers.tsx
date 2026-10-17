"use client";

import { LanguageProvider } from "@/i18n/LanguageProvider";

// Reduced motion is handled in CSS (`prefers-reduced-motion` in globals.css).
export function Providers({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
