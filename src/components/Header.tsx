"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { LanguageSwitch } from "./LanguageSwitch";
import { NAV_ITEMS } from "@/config/nav";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";

export function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const scrolledRef = useRef(false);

  // Only touch React state when the 12px threshold is actually crossed, not on every scroll event.
  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 12;
      if (next === scrolledRef.current) return;
      scrolledRef.current = next;
      setScrolled(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1280 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" || href === "/about") && pathname === href;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <div
        className={cn(
          "mx-auto flex max-w-[76rem] items-center justify-between gap-3 rounded-full py-2 pr-2 pl-4 transition-[background-color,box-shadow] duration-300 sm:pl-5",
          // Blur is costly while scrolling on phones: an almost opaque fill there, glass only on desktop.
          scrolled || open
            ? "bg-white/95 shadow-soft lg:bg-white/90 lg:backdrop-blur-md"
            : "bg-white/85 lg:bg-white/60 lg:backdrop-blur-sm",
        )}
      >
        <Link href="/" aria-label={t.a11y.home} className="shrink-0 rounded-xl py-1" onClick={() => setOpen(false)}>
          <Logo className="origin-left scale-[0.86] sm:scale-100" />
        </Link>

        <nav aria-label={t.a11y.mainNav} className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-3 py-2 text-[0.9rem] font-bold transition-colors hover:bg-sky-soft hover:text-brand",
                    isActive(item.href) ? "text-brand" : "text-ink",
                  )}
                >
                  {t.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitch className="hidden sm:inline-grid" />
          <a href={site.phone.href} className="btn btn-sun hidden !min-h-11 !px-4 !text-sm lg:inline-flex">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {site.phone.display}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
            className="grid h-11 w-11 place-items-center rounded-full bg-brand text-white shadow-lift transition-transform active:scale-95 xl:hidden"
          >
            {/* both icons stay mounted and cross-fade with a CSS rotation */}
            <span className="relative grid h-5 w-5 place-items-center" aria-hidden="true">
              <Menu
                className={cn(
                  "absolute h-5 w-5 transition-[opacity,rotate] duration-200",
                  open ? "rotate-90 opacity-0" : "rotate-0 opacity-100",
                )}
              />
              <X
                className={cn(
                  "absolute h-5 w-5 transition-[opacity,rotate] duration-200",
                  open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu stays mounted (inert while closed) so it can animate both ways with plain CSS. */}
      <div
        aria-hidden="true"
        className={cn(
          "fixed inset-0 -z-10 bg-ink/35 transition-opacity duration-300 xl:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
      />
      <nav
        id="mobile-menu"
        aria-label={t.a11y.mainNav}
        inert={!open}
        className={cn(
          // absolute: the closed panel must not stretch the fixed header over the page
          "absolute inset-x-3 top-full mx-auto mt-2 max-h-[calc(100dvh-6rem)] max-w-[76rem] origin-top sm:inset-x-4 overflow-y-auto overscroll-contain rounded-[2rem] bg-white p-4 shadow-lift transition-[opacity,translate,scale,visibility] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] xl:hidden",
          open ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-3 scale-[0.98] opacity-0",
        )}
      >
        <ul className="grid gap-1 sm:grid-cols-2">
          {NAV_ITEMS.map((item, i) => (
            <li
              key={item.key}
              className={cn(
                "transition-[opacity,translate] duration-300",
                open ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0",
              )}
              style={{ transitionDelay: open ? `${0.04 * i + 0.06}s` : "0s" }}
            >
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-bold transition-colors hover:bg-sky-soft",
                  isActive(item.href) ? "bg-sky-soft text-brand" : "text-ink",
                )}
              >
                <span className="h-2 w-2 rounded-full bg-sun" aria-hidden="true" />
                {t.nav[item.key]}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-sky-soft pt-4">
          <LanguageSwitch />
          <a href={site.phone.href} className="btn btn-sun !min-h-11 !text-sm">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {site.phone.display}
          </a>
        </div>
      </nav>
    </header>
  );
}
