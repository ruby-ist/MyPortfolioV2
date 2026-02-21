export type { BlogsCollectionItem } from "@nuxt/content";

export const blogLastMod = [
  {
    loc: "/blogs/mixing_into_every_object_in_ruby",
    lastmod: "2026-02-07",
  },
  {
    loc: "/blogs/the_return_of_the_proc",
    lastmod: "2026-02-08",
  },
  {
    loc: "/blogs/refinements_and_the_chamber_of_edge_cases",
    lastmod: "2026-02-21",
  },
];

export const blogRoutes = blogLastMod.map((blog) => blog.loc);

export function toLocaleDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
