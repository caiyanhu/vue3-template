import path from "node:path";

import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";
import { px2rem } from "vite-plugin-px2rem";
import svgLoader from "vite-svg-loader";

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    svgLoader({
      svgo: false,
    }),
    px2rem({
      width: 750,
      rootFontSize: 16,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
  },
});
