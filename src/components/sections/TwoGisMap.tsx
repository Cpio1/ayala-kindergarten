"use client";

import { ExternalLink, MapPinned, Navigation } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Dots, Star, Sun } from "../decor/Decor";
import { site, twoGisFirmUrl, twoGisRouteUrl, twoGisWidgetUrl } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * Interactive 2GIS map with the kindergarten's organization card
 * (official «firms on map» widget). Decorations sit outside the map frame
 * so they never cover the map's own controls.
 */
export function TwoGisMap() {
  const { t, lang } = useLanguage();
  const m = t.contacts.map;
  const widget = twoGisWidgetUrl();
  const route = twoGisRouteUrl(lang);
  const firm = twoGisFirmUrl(lang);
  const frameRef = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // The widget is heavy — mount the iframe only when the map is close to the viewport.
  useEffect(() => {
    const node = frameRef.current;
    if (!node || !widget) return;
    const io = new IntersectionObserver(([entry]) => entry.isIntersecting && setLoad(true), { rootMargin: "300px 0px" });
    io.observe(node);
    return () => io.disconnect();
  }, [widget]);

  return (
    <div className="relative">
      {/* decorations around (not over) the map */}
      <Sun className="pointer-events-none absolute -top-9 -right-6 z-0 w-20 sm:-top-10 sm:-right-8 sm:w-24" />
      <Dots className="pointer-events-none absolute -bottom-6 -left-5 z-0 w-16 text-sky" />
      <Star className="pointer-events-none absolute -top-4 left-10 z-0 h-6 w-6 animate-twinkle text-brand" />

      <div className="relative z-10 rounded-[0.8rem_2.5rem_2.5rem_2.5rem] bg-white p-3 shadow-lift sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-3 px-2 pt-1 pb-3 sm:px-3">
          <div className="flex min-w-0 items-center gap-3">
            <span
              className="grid h-11 w-11 shrink-0 place-items-center bg-sun text-ink"
              style={{ borderRadius: "var(--radius-blob-1)" }}
            >
              <MapPinned className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-ink sm:text-xl">{m.title}</h3>
              <p className="text-sm text-ink-soft">{site.address ? site.address[lang] : m.caption}</p>
            </div>
          </div>
        </div>

        <div
          ref={frameRef}
          className="relative h-[320px] overflow-hidden rounded-[1.75rem] bg-sky-soft sm:h-[380px] lg:h-[430px]"
        >
          {widget ? (
            <>
              {!loaded && (
                <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
                  <span className="flex flex-col items-center gap-3 text-brand">
                    <MapPinned className="h-10 w-10 animate-float" />
                    <span className="h-1.5 w-24 overflow-hidden rounded-full bg-white">
                      <span className="block h-full w-1/2 animate-[drift_1.6s_ease-in-out_infinite] rounded-full bg-sun" />
                    </span>
                  </span>
                </div>
              )}
              {load && (
                <iframe
                  title={m.frameTitle}
                  src={widget}
                  loading="lazy"
                  onLoad={() => setLoaded(true)}
                  className="absolute inset-0 h-full w-full border-0 transition-opacity duration-500"
                  style={{ opacity: loaded ? 1 : 0 }}
                  allow="geolocation"
                />
              )}
            </>
          ) : (
            <div role="status" className="grid h-full place-items-center p-6 text-center">
              <p className="max-w-xs font-bold text-ink-soft">{m.pending}</p>
            </div>
          )}
        </div>

        {route && (
          <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto]">
            <a href={route} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <Navigation className="h-5 w-5" aria-hidden="true" />
              {m.route}
              <span className="sr-only">({t.a11y.newTab})</span>
            </a>
            {firm && (
              <a href={firm} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                {m.open}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">({t.a11y.newTab})</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
