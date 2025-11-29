// https://nuxt.com/docs/api/configuration/nuxt-config
import { origamiRoutes } from "./app/utils/origami";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@unocss/nuxt"],
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [...origamiRoutes()],
    },
  },
});
