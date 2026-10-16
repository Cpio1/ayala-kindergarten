import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { AboutCta, AboutHero, AboutValues } from "@/components/sections/AboutPage";
import { Advantages } from "@/components/sections/Advantages";
import { Nutrition } from "@/components/sections/Nutrition";
import { site } from "@/config/site";
import { dictionaries } from "@/i18n/translations";
import { getSpecialImage, getSpecialVideo } from "@/lib/images";

const kk = dictionaries.kk;

export function generateMetadata(): Metadata {
  const photo = getSpecialImage("main-page2") ?? getSpecialImage("main-page");
  return {
    title: kk.meta.aboutTitle,
    description: kk.about.paragraphs.join(" "),
    ...(site.siteUrl && { alternates: { canonical: "/about" } }),
    openGraph: {
      type: "website",
      siteName: "АЯЛА балабақшасы",
      locale: "kk_KZ",
      title: kk.meta.aboutTitle,
      description: kk.about.paragraphs[0],
      ...(site.siteUrl && { url: `${site.siteUrl}/about` }),
      ...(photo && { images: [{ url: photo.src, width: photo.width, height: photo.height, alt: kk.about.photoAlt }] }),
    },
  };
}

export default function AboutPage() {
  return (
    <SiteShell>
      <AboutHero video={getSpecialVideo("main-page2")} image={getSpecialImage("main-page2")} />
      <AboutValues />
      <Advantages />
      <Nutrition />
      <AboutCta />
    </SiteShell>
  );
}
