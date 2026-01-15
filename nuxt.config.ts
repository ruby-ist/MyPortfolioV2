// https://nuxt.com/docs/api/configuration/nuxt-config
import { origamiLastMod, origamiRoutes } from "./app/utils/origami";
import { blogLastMod, blogRoutes } from "./app/utils/blogs";

export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
      ],
    },
  },
  colorMode: {
    preference: "light",
  },
  compatibilityDate: "2025-07-15",
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: "github-light",
            dark: "github-dark",
          },
          langs: ["ruby"],
        },
      },
    },
  },
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@unocss/nuxt",
    "@nuxtjs/sitemap",
    "nuxt-swiper",
    "@nuxt/content",
    "@nuxtjs/color-mode",
  ],
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [...origamiRoutes, ...blogRoutes],
    },
  },
  site: {
    url: "https://srira.me",
    name: "Srira's Portfolio",
  },
  sitemap: {
    urls: [
      { loc: "/", lastmod: "2026-01-15" },
      { loc: "/origami", lastmod: "2026-01-15" },
      { loc: "/projects", lastmod: "2026-01-15" },
      { loc: "/blogs", lastmod: "2026-01-15" },
      ...origamiLastMod,
      ...blogLastMod,
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
