import { SiteShell } from "@/components/SiteShell";
import { Gallery } from "@/components/gallery/Gallery";
import { AboutSection } from "@/components/sections/AboutSection";
import { Advantages } from "@/components/sections/Advantages";
import { Classes } from "@/components/sections/Classes";
import { Contacts } from "@/components/sections/Contacts";
import { Documents } from "@/components/sections/Documents";
import { Groups } from "@/components/sections/Groups";
import { Hero } from "@/components/sections/Hero";
import { Nutrition } from "@/components/sections/Nutrition";
import { getGalleryImages, getSpecialImage } from "@/lib/images";

export default function HomePage() {
  return (
    <SiteShell>
      <Hero image={getSpecialImage("main-page")} />
      <Advantages />
      <AboutSection image={getSpecialImage("main-page2")} />
      <Groups />
      <Classes />
      <Nutrition />
      <Gallery images={getGalleryImages()} />
      <Documents />
      <Contacts />
    </SiteShell>
  );
}
