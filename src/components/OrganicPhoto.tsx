import Image from "next/image";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import type { SiteImage } from "@/lib/images";
import { cn } from "@/lib/cn";

type Props = {
  image: SiteImage | null;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Morphing blob outline (hero) or a static organic radius. */
  morph?: boolean;
};

/** A photo inside an organic, non-rectangular frame. Faces sit in the upper third, so we bias the crop upward. */
export function OrganicPhoto({ image, alt, sizes, priority, className, morph }: Props) {
  return (
    <div
      className={cn(
        "overflow-hidden bg-sky-soft ring-[6px] ring-white shadow-lift sm:ring-8",
        morph ? "animate-morph" : "",
        className,
      )}
      style={{ borderRadius: "var(--radius-blob-1)", transform: "translateZ(0)" }}
    >
      {image ? (
        <Image
          src={image.src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={{ objectPosition: "50% 30%" }}
        />
      ) : (
        <PhotoPlaceholder className="absolute inset-0 h-full w-full" />
      )}
    </div>
  );
}
