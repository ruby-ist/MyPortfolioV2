import type { Rule } from "unocss";

export default [
  ["noisy-background", { "background-image": 'url("/noise.avif")' }],
  [
    "noisy-highlighted-background",
    { "background-image": 'url("/noise.avif"), var(--highlight-background)' },
  ],
  [
    "eased-theme-transition",
    { transition: "background-color 0.2s ease, color 0.2s ease" },
  ],
] as Rule[];
