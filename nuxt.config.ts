// https://nuxt.com/docs/api/configuration/nuxt-config
import { origamiLastMod, origamiRoutes } from "./app/utils/origami";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@unocss/nuxt", "@nuxtjs/sitemap", "nuxt-swiper"],
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [...origamiRoutes],
    },
  },
  site: {
    url: "https://srira.me",
    name: "Srira's Portfolio",
  },
  sitemap: {
    urls: [
      {
        loc: "/origami",
        lastmod: "2025-11-29",
      },
      ...origamiLastMod,
    ],
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => {
        return tag.startsWith("swiper-");
      },
    },
  },
});