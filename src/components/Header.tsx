"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
          "mx-auto flex max-w-[76rem] items-center justify-between gap-3 rounded-full py-2 pr-2 pl-5 transition-all duration-300",
          scrolled || open ? "bg-white/90 shadow-soft backdrop-blur-md" : "bg-white/60 backdrop-blur-sm",
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
          <LanguageSwitch className="hidden sm:inline-flex" />
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
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 -z-10 bg-ink/30 backdrop-blur-[2px] xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.nav
              key="panel"
              id="mobile-menu"
              aria-label={t.a11y.mainNav}
              className="mx-auto mt-2 max-h-[calc(100dvh-6rem)] max-w-[76rem] overflow-y-auto rounded-[2rem] bg-white p-4 shadow-lift xl:hidden"
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul className="grid gap-1 sm:grid-cols-2">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.key}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i + 0.06 }}
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
                  </motion.li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-sky-soft pt-4">
                <LanguageSwitch layoutId="lang-pill-mobile" />
                <a href={site.phone.href} className="btn btn-sun !min-h-11 !text-sm">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {site.phone.display}
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
