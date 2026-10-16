import type { SiteImage } from "@/lib/images";

export type Placed = { image: SiteImage; index: number };

/**
 * Greedy masonry: each photo goes to the currently shortest column.
 * The result for the first N photos never changes when more are added,
 * so revealing extra photos only appends — nothing jumps around.
 */
export function distribute(images: SiteImage[], columns: number): Placed[][] {
  const cols: Placed[][] = Array.from({ length: columns }, () => []);
  const heights = new Array<number>(columns).fill(0);
  images.forEach((image, index) => {
    let target = 0;
    for (let c = 1; c < columns; c++) if (heights[c] < heights[target] - 0.01) target = c;
    cols[target].push({ image, index });
    heights[target] += image.height / image.width;
  });
  return cols;
}

/** A rotating set of playful corner radii so no two neighbours look alike. */
export const RADII = [
  "2rem 2rem 2rem 0.6rem",
  "0.6rem 2rem 2rem 2rem",
  "2.4rem 0.8rem 2.4rem 2.4rem",
  "2rem 2rem 0.6rem 2rem",
  "50% 50% 2rem 2rem / 22% 22% 2rem 2rem",
  "2rem 0.6rem 2rem 2rem",
  "2rem 2rem 2rem 2rem",
];
