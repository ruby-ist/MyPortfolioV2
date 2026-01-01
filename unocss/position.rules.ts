import type { Rule } from "unocss";
import { mapProperty, mapUnit } from "./helper";

export default [
  [
    /(fixed|absolute|relative)/,
    ([, value]: string[]) => {
      return {
        position: value,
      };
    },
  ],

  // alignment rules
  [
    /^(-)?(t|r|b|l)-([\d.]+)(\w{1,3})?$/,
    ([, negative, style, value, unit]) => {
      const fullProperty = mapProperty(style);
      const mappedUnit = mapUnit(unit);
      if (negative) {
        return { [fullProperty]: `-${value}${mappedUnit}` };
      } else {
        return { [fullProperty]: `${value}${mappedUnit}` };
      }
    },
  ],

  //variables
  [
    /^(t|r|b|l)-var-([\w-]+)$/,
    ([, style, name]) => ({
      [`${mapProperty(style)}`]: `var(--${name})`,
    }),
  ],

  // Z index rule
  [
    /^(-)?z-(\d+)$/,
    ([, negative, index]) => {
      if (negative) {
        return { "z-index": `-${index}` };
      } else {
        return { "z-index": index };
      }
    },
  ],

  // float rules
  [
    /^float-(\w+)$/,
    ([, value]) => ({
      float: value,
    }),
  ],

  [
    /^clear-(\w+)$/,
    ([, value]) => ({
      clear: value,
    }),
  ],
] as Rule[];
