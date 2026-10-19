"use client";

import { ExternalLink, FileText, FolderOpen, Hourglass } from "lucide-react";
import { Reveal } from "../Reveal";
import { Star } from "../decor/Decor";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Documents() {
  const { t } = useLanguage();
  const d = t.documents;
  const url = site.documentsUrl;

  return (
    <section id="documents" aria-labelledby="documents-title" className="relative py-10 sm:py-16">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem_2.5rem_2.5rem_1rem] bg-sun px-6 py-10 shadow-sun sm:px-12 sm:py-12">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute -top-20 -right-10 h-64 w-64 rounded-full bg-white/25" />
              <div className="absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-sun-dark/25" />
              <Star className="absolute top-8 right-[34%] h-5 w-5 animate-twinkle text-white" />
            </div>

            <div className="relative grid items-center gap-8 md:grid-cols-[auto_1fr_auto]">
              {/* folder illustration */}
              <div aria-hidden="true" className="relative mx-auto h-28 w-32 md:mx-0">
                <div className="absolute inset-x-3 top-0 h-24 rotate-[-8deg] rounded-2xl bg-white/70 shadow-soft" />
                <div className="absolute inset-x-1 top-2 grid h-24 rotate-[5deg] place-items-center rounded-2xl bg-white shadow-soft">
                  <FileText className="h-9 w-9 text-brand" />
                </div>
                <div className="absolute inset-x-0 bottom-0 grid h-16 place-items-center rounded-[1.1rem_1.1rem_1.4rem_1.4rem] bg-brand text-white shadow-lift">
                  <FolderOpen className="h-7 w-7" />
                </div>
              </div>

              <div className="text-center md:text-left">
                <span className="text-xs font-extrabold tracking-[0.18em] text-ink/60">{d.eyebrow}</span>
                <h2 id="documents-title" className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">
                  {d.title}
                </h2>
                <p className="mt-3 max-w-xl leading-relaxed text-ink/80 md:max-w-none">{d.text}</p>
              </div>

              <div className="flex flex-col items-center gap-2 md:items-end">
                {url ? (
                  <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <FolderOpen className="h-5 w-5" aria-hidden="true" />
                    {d.button}
                    <ExternalLink className="h-4 w-4 opacity-80" aria-hidden="true" />
                    <span className="sr-only">({t.a11y.newTab})</span>
                  </a>
                ) : (
                  <div role="status" className="flex max-w-xs items-start gap-3 rounded-3xl bg-white/80 p-4 text-left shadow-soft">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-sky-soft text-brand">
                      <Hourglass className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-bold text-ink">{d.pending}</span>
                      <span className="mt-1 block text-sm text-ink-soft">{d.pendingHint}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
