"use client";

import { Building2, Clock3, MapPin, Phone } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { InstagramIcon, WhatsappIcon } from "../BrandIcons";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { Cloud, Star, Sun } from "../decor/Decor";
import { mapEmbedUrl, mapLinks, site, whatsappLink } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Contacts() {
  const { t, lang } = useLanguage();
  const c = t.contacts;
  const map = mapEmbedUrl(lang);
  const links = mapLinks();

  const rows = [
    {
      icon: <Building2 className="h-5 w-5" aria-hidden="true" />,
      label: t.common.kindergarten,
      value: site.legalName,
      tone: "bg-sky-soft text-brand",
    },
    {
      icon: <Phone className="h-5 w-5" aria-hidden="true" />,
      label: c.phone,
      value: (
        <a href={site.phone.href} className="hover:text-brand">
          {site.phone.display}
        </a>
      ),
      tone: "bg-sun text-ink",
    },
    {
      icon: <InstagramIcon className="h-5 w-5" />,
      label: c.instagram,
      value: (
        <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
          {site.instagram.handle}
          <span className="sr-only"> ({t.a11y.newTab})</span>
        </a>
      ),
      tone: "bg-brand text-white",
    },
    {
      icon: <Clock3 className="h-5 w-5" aria-hidden="true" />,
      label: c.hours,
      value: (
        <>
          {t.common.weekdays}
          <br />
          {site.hours.display}
        </>
      ),
      tone: "bg-sky text-brand-deep",
    },
    {
      icon: <MapPin className="h-5 w-5" aria-hidden="true" />,
      label: c.address,
      value: site.address ? site.address[lang] : <span className="font-semibold text-ink-soft">{c.addressPending}</span>,
      tone: "bg-sun-soft text-ink",
    },
  ];

  return (
    <section id="contacts" aria-labelledby="contacts-title" className="relative overflow-hidden py-16 sm:py-24">
      <Sun className="pointer-events-none absolute -top-6 -right-10 w-32 opacity-80 sm:w-40" />
      <Cloud className="pointer-events-none absolute bottom-24 -left-8 w-32 animate-float-slow text-sky/50" />
      <div className="container-page relative">
        <SectionHeading id="contacts-title" eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />

        <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          <Reveal className="flex flex-col gap-5">
            <ul className="rounded-[2.25rem_2.25rem_2.25rem_0.8rem] bg-white p-3 shadow-soft sm:p-4">
              {rows.map((row, i) => (
                <li key={i} className="flex items-start gap-4 rounded-2xl p-3 transition-colors hover:bg-cream/70">
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center ${row.tone}`}
                    style={{ borderRadius: i % 2 ? "var(--radius-blob-2)" : "var(--radius-blob-1)" }}
                  >
                    {row.icon}
                  </span>
                  <span className="min-w-0 pt-0.5">
                    <span className="block text-xs font-extrabold tracking-wide text-ink-soft uppercase">{row.label}</span>
                    <span className="mt-0.5 block font-bold break-words text-ink">{row.value}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="grid gap-3 sm:grid-cols-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-[#25D366] text-white shadow-[0_16px_30px_-16px_rgba(37,211,102,0.8)] hover:bg-[#1fb957]"
              >
                <WhatsappIcon className="h-5 w-5" />
                {t.common.whatsapp}
                <span className="sr-only">({t.a11y.newTab})</span>
              </a>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <InstagramIcon className="h-5 w-5" />
                {t.common.instagram}
                <span className="sr-only">({t.a11y.newTab})</span>
              </a>
              <a href={site.phone.href} className="btn btn-sun">
                <Phone className="h-5 w-5" aria-hidden="true" />
                {t.common.call}
              </a>
            </div>

            {map && links && (
              <div className="overflow-hidden rounded-[2rem] bg-white shadow-soft">
                <iframe
                  title={c.mapTitle}
                  src={map}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-64 w-full border-0"
                />
                <div className="flex gap-2 p-3">
                  <a href={links.google} target="_blank" rel="noopener noreferrer" className="btn btn-ghost flex-1 !min-h-10 !text-sm">
                    {c.openGoogle}
                  </a>
                  <a href={links.twoGis} target="_blank" rel="noopener noreferrer" className="btn btn-ghost flex-1 !min-h-10 !text-sm">
                    {c.open2gis}
                  </a>
                </div>
              </div>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative rounded-[0.8rem_2.5rem_2.5rem_2.5rem] bg-white p-6 shadow-lift sm:p-8">
              <Star className="absolute -top-3 right-10 h-7 w-7 animate-twinkle text-sun-dark" />
              <h3 className="text-xl font-semibold text-ink sm:text-2xl">{c.form.title}</h3>
              <div className="mt-5">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
