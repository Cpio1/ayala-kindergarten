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
  /** Morphing outline. */
  morph?: boolean;
  /**
   * "blob" — strongly organic outline, the photo is cropped to the frame.
   * "natural" — the frame takes the photo's own proportions and only the corners are
   * softly rounded, so nothing important (faces at the edges) is cut off.
   */
  shape?: "blob" | "natural";
};

/** A photo inside an organic, non-rectangular frame. Faces sit in the upper third, so we bias the crop upward. */
export function OrganicPhoto({ image, alt, sizes, priority, className, morph, shape = "blob" }: Props) {
  const natural = shape === "natural";
  return (
    <div
      className={cn(
        "overflow-hidden bg-sky-soft ring-[6px] ring-white shadow-lift sm:ring-8",
        morph && (natural ? "animate-morph-soft" : "animate-morph"),
        className,
      )}
      style={{
        borderRadius: natural ? "var(--radius-soft)" : "var(--radius-blob-1)",
        transform: "translateZ(0)",
        ...(natural && image && { aspectRatio: `${image.width} / ${image.height}` }),
      }}
    >
      {image ? (
        <Image
          src={image.src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={{ objectPosition: natural ? "50% 50%" : "50% 30%" }}
        />
      ) : (
        <PhotoPlaceholder className="absolute inset-0 h-full w-full" />
      )}
    </div>
  );
}
