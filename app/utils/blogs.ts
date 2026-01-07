export type { BlogsCollectionItem } from "@nuxt/content";

export const blogLastMod = [
  {
    loc: "/blogs/consequences_of_using_mixins_at_the_top_level",
    lastmod: "2026-01-07",
  },
];

export const blogRoutes = blogLastMod.map((blog) => blog.loc);
