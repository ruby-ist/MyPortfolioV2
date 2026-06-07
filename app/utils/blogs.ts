export type { BlogsCollectionItem } from "@nuxt/content";

export const blogLastMod = [
  {
    loc: "/blogs/mixing_into_every_object_in_ruby",
    lastmod: "2026-03-29",
  },
  {
    loc: "/blogs/the_return_of_the_proc",
    lastmod: "2026-03-29",
  },
  {
    loc: "/blogs/refinements_and_the_chamber_of_edge_cases",
    lastmod: "2026-03-29",
  },
  {
    loc: "/blogs/the_fantastic_modules_and_how_to_use_them",
    lastmod: "2026-03-29",
  },
  {
    loc: "/blogs/now_you_inspect_me",
    lastmod: "2026-03-29",
  },
  {
    loc: "/blogs/the_spaced_odyssey",
    lastmod: "2026-06-07",
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
