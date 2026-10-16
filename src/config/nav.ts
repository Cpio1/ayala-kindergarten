import type { Dictionary } from "@/i18n/translations";

export type NavKey = keyof Omit<Dictionary["nav"], "cta">;

export const NAV_ITEMS: { key: NavKey; href: string }[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "groups", href: "/#groups" },
  { key: "classes", href: "/#classes" },
  { key: "gallery", href: "/#gallery" },
  { key: "documents", href: "/#documents" },
  { key: "contacts", href: "/#contacts" },
];
