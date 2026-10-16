"use client";

import Link from "next/link";
import { Clock3, Phone } from "lucide-react";
import { InstagramIcon, WhatsappIcon } from "./BrandIcons";
import { Logo } from "./Logo";
import { Cloud, Star, WaveEdge } from "./decor/Decor";
import { NAV_ITEMS } from "@/config/nav";
import { site, whatsappLink } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Footer() {
  const { t, lang } = useLanguage();
  const f = t.footer;

  return (
    <footer className="relative mt-8">
      <WaveEdge className="h-10 text-brand sm:h-16" />
      <div className="relative overflow-hidden bg-brand text-white">
        <Cloud className="pointer-events-none absolute top-10 right-[6%] w-28 animate-drift text-white/10" />
        <Star className="pointer-events-none absolute bottom-24 left-[46%] h-5 w-5 animate-twinkle text-sun/70" />

        <div className="container-page relative grid gap-10 pt-8 pb-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label={t.a11y.home} className="inline-block rounded-xl">
              <Logo variant="light" />
            </Link>
            <p className="mt-5 max-w-xs font-bold text-sky-soft">{f.tagline}</p>
            <p className="mt-2 text-sm text-sky-soft/70">{site.legalName}</p>
            <div className="mt-5 flex gap-2">
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${site.instagram.handle} (${t.a11y.newTab})`}
                className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-sun hover:text-ink"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp (${t.a11y.newTab})`}
                className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-sun hover:text-ink"
              >
                <WhatsappIcon className="h-5 w-5" />
              </a>
              <a
                href={site.phone.href}
                aria-label={`${t.common.call}: ${site.phone.display}`}
                className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-sun hover:text-ink"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav aria-label={f.nav}>
            <h2 className="font-display text-sm font-semibold tracking-wide text-sun">{f.nav}</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link href={item.href} className="font-semibold text-sky-soft transition-colors hover:text-white">
                    {t.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-semibold tracking-wide text-sun">{f.contacts}</h2>
            <ul className="mt-4 space-y-3 font-semibold text-sky-soft">
              <li>
                <a href={site.phone.href} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <InstagramIcon className="h-4 w-4" />
                  {site.instagram.handle}
                </a>
              </li>
              {site.address && <li>{site.address[lang]}</li>}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold tracking-wide text-sun">{f.hours}</h2>
            <p className="mt-4 flex items-start gap-2 font-semibold text-sky-soft">
              <Clock3 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                {t.common.weekdays}
                <br />
                <span className="font-display text-lg text-white">{site.hours.display}</span>
              </span>
            </p>
          </div>
        </div>

        <div className="border-t border-white/10">
          <p className="container-page py-5 text-center text-sm text-sky-soft/80">{f.rights}</p>
        </div>
      </div>
    </footer>
  );
}
