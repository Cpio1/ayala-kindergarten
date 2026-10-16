import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.siteUrl) return [];
  return ["", "/about"].map((path) => ({
    url: `${site.siteUrl}${path}`,
    changeFrequency: "monthly",
    priority: path ? 0.8 : 1,
  }));
}
