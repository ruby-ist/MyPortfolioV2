import type { Rule } from "unocss";

export default [
  [
    "noisy-background",
    {
      "background-image":
        'url("https://cdn.jsdelivr.net/gh/ruby-ist/MyPortfolioV2@main/public/noise.avif")',
    },
  ],
  [
    "noisy-highlighted-background",
    {
      "background-image":
        'url("https://cdn.jsdelivr.net/gh/ruby-ist/MyPortfolioV2@main/public/noise.avif"), var(--highlight-background)',
    },
  ],
  [
    "eased-theme-transition",
    { transition: "background-color 0.2s ease, color 0.2s ease" },
  ],
  ["image-loaded-transition", { transition: "opacity 0.2s ease-in-out" }],
] as Rule[];
