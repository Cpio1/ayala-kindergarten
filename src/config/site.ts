/**
 * Single source of truth for the kindergarten's data.
 * Edit values here — every section of the site reads from this file.
 * Texts that differ between languages live in src/i18n/translations.ts.
 */

function cleanUrl(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  try {
    return new URL(trimmed).toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

type Localized = { kk: string; ru: string };

export const site = {
  name: "АЯЛА",
  /** Official name of the organization — the same in both languages. */
  legalName: "ТОО «Болашақ и СО»",

  phone: {
    display: "+7 707 322 00 07",
    href: "tel:+77073220007",
    e164: "+77073220007",
  },

  /** Number for wa.me links, digits only. */
  whatsapp: "77073220007",

  instagram: {
    handle: "@ayala_detsad",
    url: "https://www.instagram.com/ayala_detsad",
  },

  /** Confirmed by the kindergarten's 2GIS card (same phone and Instagram). */
  address: {
    kk: "Алматы қ., Алгабас шағынауданы, Қазтуған жырау көшесі, 21",
    ru: "г. Алматы, мкр. Алгабас, ул. Казтуган жырау, 21",
  } as Localized | null,

  /** Map point taken from the same 2GIS card. Set to null to hide the map. */
  coordinates: { lat: 43.248956, lng: 76.812385 } as { lat: number; lng: number } | null,

  /**
   * 2GIS organization card: https://2gis.kz/almaty/firm/70000001033758486
   * («Аяла, частный детский сад», +7 707 322 00 07, @ayala_detsad).
   * If the card changes, replace firmId — the map widget and route button follow it.
   */
  twoGis: {
    city: "almaty",
    firmId: "70000001033758486" as string | null,
  },

  hours: {
    opens: "07:10",
    closes: "18:00",
    display: "07:10–18:00",
    /** schema.org day names for JSON-LD */
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },

  facts: {
    groups: 3,
    mealsPerDay: 5,
  },

  /**
   * Link to the documents folder (Google Drive or Mail.ru Cloud). Provide it via the
   * NEXT_PUBLIC_DOCUMENTS_URL environment variable (Vercel → Settings → Environment Variables)
   * or paste the link here. While empty, an informational state is shown instead of a button.
   */
  documentsUrl: cleanUrl(process.env.NEXT_PUBLIC_DOCUMENTS_URL),

  /** Production domain, e.g. https://ayala.kz — via NEXT_PUBLIC_SITE_URL. */
  siteUrl: cleanUrl(process.env.NEXT_PUBLIC_SITE_URL),
} as const;

export function whatsappLink(text?: string) {
  return `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

/** Official 2GIS «firms on map» widget (the iframe its DGWidgetLoader.js renders). */
export function twoGisWidgetUrl() {
  const { firmId, city } = site.twoGis;
  const c = site.coordinates;
  if (!firmId || !c) return null;
  const options = { pos: { lat: c.lat, lon: c.lng, zoom: 16 }, opt: { city }, org: firmId };
  return `https://widgets.2gis.com/widget?type=firmsonmap&options=${encodeURIComponent(JSON.stringify(options))}`;
}

function twoGisBase(lang: "kk" | "ru") {
  return `https://2gis.kz${lang === "kk" ? "/kk" : ""}/${site.twoGis.city}`;
}

/** The organization card in 2GIS. */
export function twoGisFirmUrl(lang: "kk" | "ru") {
  const { firmId } = site.twoGis;
  return firmId ? `${twoGisBase(lang)}/firm/${firmId}` : null;
}

/** 2GIS directions with the kindergarten as the destination (start point is chosen by the user). */
export function twoGisRouteUrl(lang: "kk" | "ru") {
  const { firmId } = site.twoGis;
  const c = site.coordinates;
  if (!firmId || !c) return twoGisFirmUrl(lang);
  return `${twoGisBase(lang)}/directions/points/${encodeURIComponent(`|${c.lng},${c.lat};${firmId}`)}`;
}
