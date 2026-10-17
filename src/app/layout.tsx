import type { Metadata, Viewport } from "next";
import { Nunito, Unbounded } from "next/font/google";
import { Providers } from "@/components/Providers";
import { SkipLink } from "@/components/SkipLink";
import { site } from "@/config/site";
import { dictionaries } from "@/i18n/translations";
import { getSpecialImage } from "@/lib/images";
import { preschoolJsonLd } from "@/lib/seo";
import "./globals.css";

// cyrillic-ext covers the Kazakh letters Ә Ғ Қ Ң Ө Ұ Ү Һ І.
const unbounded = Unbounded({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-unbounded",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

const kk = dictionaries.kk;

export function generateMetadata(): Metadata {
  const hero = getSpecialImage("main-page");
  return {
    ...(site.siteUrl && { metadataBase: new URL(site.siteUrl) }),
    title: { default: kk.meta.title, template: "%s" },
    description: kk.meta.description,
    applicationName: "АЯЛА балабақшасы",
    keywords: [
      "АЯЛА",
      "АЯЛА балабақшасы",
      "балабақша",
      "детский сад АЯЛА",
      "Болашақ и СО",
      "қазақ тілді балабақша",
      "ясли",
    ],
    ...(site.siteUrl && { alternates: { canonical: "/" } }),
    openGraph: {
      type: "website",
      siteName: "АЯЛА балабақшасы",
      title: kk.meta.title,
      description: kk.meta.description,
      locale: "kk_KZ",
      alternateLocale: ["ru_RU"],
      ...(site.siteUrl && { url: site.siteUrl }),
      ...(hero && { images: [{ url: hero.src, width: hero.width, height: hero.height, alt: kk.hero.photoAlt }] }),
    },
    twitter: {
      card: hero ? "summary_large_image" : "summary",
      title: kk.meta.title,
      description: kk.meta.description,
    },
    formatDetection: { telephone: true, address: false, email: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#FFF9E8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = preschoolJsonLd(getSpecialImage("main-page"));
  return (
    <html lang="kk" className={`${unbounded.variable} ${nunito.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <Providers>
          <SkipLink />
          {children}
        </Providers>
      </body>
    </html>
  );
}
