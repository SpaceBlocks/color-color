import hsluv from "hsluv";
import chroma from "chroma-js";
import { clamp } from "./math";
import { okhsl_to_srgb } from "./ok-color";

const okhslToHex = function (h, s, l) {
  const [r, g, b] = okhsl_to_srgb(h, s, l);
  return chroma.rgb(r, g, b).hex();
};

export const hslToHex = function (h, s, l, colorSpace = "hsluv") {
  switch (colorSpace) {
    case "hsl":
      return chroma.hsl(h, s / 100, l / 100).hex();
    case "okhsl":
      return okhslToHex(h / 360, s / 100, l / 100);
    default:
      return hsluv.hsluvToHex([h, s, l]);
  }
};

export const hexToHsl = function (hex, colorSpace = "hsluv") {
  let h, s, l;
  switch (colorSpace) {
    case "hsl":
      [h, s, l] = chroma(hex).hsl();
      return [h, s * 100, isNaN(l) ? 0 : l];
    default:
      [h, s, l] = hsluv.hexToHsluv(hex);
      return [clamp(0, h, 360), clamp(0, s, 100), clamp(0, l, 100)];
  }
};
