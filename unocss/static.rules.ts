import type { Rule } from "unocss";

export default [
  ["noisy-background", { "background-image": 'url("/noise.avif")' }],
  [
    "noisy-highlighted-background",
    { "background-image": 'url("/noise.avif"), var(--highlight-background)' },
  ],
] as Rule[];
