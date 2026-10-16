"use client";

import { OrganicPhoto } from "../OrganicPhoto";
import { VideoPlayer } from "../VideoPlayer";
import { Cloud, Squiggle, Star, Sun } from "../decor/Decor";
import type { SiteImage, SiteVideo } from "@/lib/images";
import { cn } from "@/lib/cn";

type Props = {
  video: SiteVideo | null;
  image: SiteImage | null;
  alt: string;
  priority?: boolean;
  /** Colour of the offset shape behind the media. */
  backing: string;
};

/**
 * The «АЯЛА туралы» media block: the main-page2 video when it exists
 * (in its own proportions, compact), otherwise a photo in an organic frame.
 */
export function AboutMedia({ video, image, alt, priority, backing }: Props) {
  return (
    <div className="relative mx-auto w-full max-w-[22rem] px-6 py-6 sm:max-w-[24rem] lg:max-w-[26rem]">
      <div className={cn("relative mx-auto", video ? "w-[78%] max-w-[18rem]" : "aspect-[4/5] w-[88%]")}>
        <div
          aria-hidden="true"
          className={cn("absolute inset-0 translate-x-[8%] translate-y-[5%]", backing)}
          style={{ borderRadius: "var(--radius-blob-2)" }}
        />
        {video ? (
          <VideoPlayer video={video} className="relative" style={{ borderRadius: "2.5rem 4rem 2.5rem 3.25rem" }} />
        ) : (
          <OrganicPhoto
            image={image}
            alt={alt}
            priority={priority}
            sizes="(min-width: 1024px) 26rem, 80vw"
            className="absolute inset-0"
          />
        )}
        <Sun className="pointer-events-none absolute -top-[9%] -left-[22%] w-[38%]" />
        <Cloud className="pointer-events-none absolute -right-[26%] bottom-[24%] w-[40%] animate-float-slow text-white drop-shadow-[0_8px_16px_rgba(32,116,237,0.15)]" />
        <Star className="pointer-events-none absolute top-[4%] -right-[12%] h-6 w-6 animate-twinkle text-sun-dark" />
        <Star className="pointer-events-none absolute bottom-[10%] -left-[14%] h-4 w-4 animate-twinkle text-brand [animation-delay:1s]" />
        <Squiggle className="pointer-events-none absolute -bottom-[7%] left-[18%] w-[46%] text-sun-dark" />
      </div>
    </div>
  );
}
