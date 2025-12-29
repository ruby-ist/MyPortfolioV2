import {
  defineConfig,
  presetWebFonts,
  presetMini,
  presetAttributify,
} from "unocss";
import boxRules from "./unocss/box.rules";
import displayRules from "./unocss/display.rules";
import positionRules from "./unocss/position.rules";
import colorRules from "./unocss/color.rules";
import typographyRules from "./unocss/typography.rules";
import animationRules from "./unocss/animation.rules";
import staticRules from "./unocss/static.rules";
import listRules from "./unocss/list.rules";
import tableRules from "./unocss/table.rules";

export default defineConfig({
  presets: [
    presetMini(),
    presetAttributify(),
    presetWebFonts({
      provider: "google",
      fonts: {
        sans: [
          "Bellefair",
          "Life Savers",
          "Wix Madefor Text",
          "Tilt Warp",
          "Inter",
        ],
      },
    }),
  ],
  rules: [
    ...boxRules,
    ...displayRules,
    ...positionRules,
    ...colorRules,
    ...typographyRules,
    ...animationRules,
    ...staticRules,
    ...listRules,
    ...tableRules,
  ],
  variants: [
    (matcher) => {
      if (matcher.startsWith("strict:")) {
        return { matcher: matcher.slice(7) };
      }
    },
  ],
  postprocess: [
    (util) => {
      if (!util.selector.includes(".strict\\:")) return;

      util.entries.forEach(([, val], i) => {
        util.entries[i][1] = `${val} !important`;
      });
    },
  ],
  theme: {
    breakpoints: {
      sm: "320px",
      md: "720px",
      lg: "1080px",
    },
  },
});
