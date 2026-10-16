import { site } from "@/config/site";
import { dictionaries } from "@/i18n/translations";
import type { SiteImage } from "./images";

/** schema.org ChildCare markup — only confirmed data. */
export function preschoolJsonLd(image: SiteImage | null) {
  const kk = dictionaries.kk;
  return {
    "@context": "https://schema.org",
    "@type": "ChildCare",
    name: "Балабақша «АЯЛА»",
    alternateName: ["АЯЛА", "Детский сад «АЯЛА»", site.legalName],
    description: kk.meta.description,
    telephone: site.phone.e164,
    sameAs: [site.instagram.url],
    availableLanguage: "kk",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: site.hours.days,
      opens: site.hours.opens,
      closes: site.hours.closes,
    },
    ...(site.address && {
      address: { "@type": "PostalAddress", streetAddress: site.address.kk, addressCountry: "KZ" },
    }),
    ...(site.coordinates && {
      geo: { "@type": "GeoCoordinates", latitude: site.coordinates.lat, longitude: site.coordinates.lng },
    }),
    ...(site.siteUrl && { url: site.siteUrl }),
    ...(site.siteUrl && image && { image: `${site.siteUrl}${image.src}` }),
  };
}
