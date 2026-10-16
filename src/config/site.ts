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

  /**
   * The address is NOT provided yet. When it is, fill it in, e.g.
   * { kk: "Астана қаласы, ... көшесі, 1", ru: "город Астана, улица ..., 1" }
   * — it appears in Contacts, the footer and the structured data automatically.
   */
  address: null as Localized | null,

  /**
   * Map point. Leave null until the exact location is confirmed — no map is shown.
   * Example: { lat: 51.1282, lng: 71.4304 }
   */
  coordinates: null as { lat: number; lng: number } | null,

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

export function mapEmbedUrl(lang: "kk" | "ru") {
  const c = site.coordinates;
  if (!c) return null;
  return `https://www.google.com/maps?q=${c.lat},${c.lng}&hl=${lang}&z=16&output=embed`;
}

export function mapLinks() {
  const c = site.coordinates;
  if (!c) return null;
  return {
    google: `https://www.google.com/maps/search/?api=1&query=${c.lat},${c.lng}`,
    twoGis: `https://2gis.kz/geo/${c.lng},${c.lat}`,
  };
}
