import { defineConfig, presetAttributify, presetUno } from "unocss";

export default defineConfig({
  presets: [presetAttributify(), presetUno()],
  theme: {
    colors: {
      "@gray-1": "#f4f5f7",
      "@gray-2": "#f5f5f5",
      "@gray-3": "#eff1f4",
      "@gray-4": "#e9ebef",
      "@gray-5": "#d9d9d9",
      "@gray-6": "#bbbbbb",
      "@gray-7": "#999999",
      "@gray-8": "#555555",
      "@gray-9": "#333333",
      "@red": "#f04134",
      "@red-2": "#ff0000",
      "@blue": "#337dff",
      "@blue-2": "#e1ecff",
      "@blue-3": "#5392ff",
      "@blue-4": "#125de1",
      "@orange": "#ffbb03",
      "@orange-dark": "#ff931d",
      "@orange-light": "#ffd667",
      "@orange-quota": "#E57E0D",
      "@green": "#10c038",
    },
  },
});
