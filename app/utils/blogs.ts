export type { BlogsCollectionItem } from "@nuxt/content";

export const blogLastMod = [
  {
    loc: "/blogs/mixing_into_every_object_in_ruby",
    lastmod: "2026-01-16",
  },
];

export const blogRoutes = blogLastMod.map((blog) => blog.loc);
