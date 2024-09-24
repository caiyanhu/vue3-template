import path from "node:path";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { px2rem } from "vite-plugin-px2rem";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
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
