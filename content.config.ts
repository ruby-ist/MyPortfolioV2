import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blogs: defineCollection({
      type: "page",
      source: "**/*",
      schema: z.object({
        date: z.string(),
        tags: z.array(z.string()),
      }),
    }),
  },
});
