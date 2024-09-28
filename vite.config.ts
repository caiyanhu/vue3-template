import path from "node:path";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import svgLoader from "vite-svg-loader";

export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      svgo: false,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
  },
  server: {
    proxy: {
      "/stream": {
        target: "http://nls-gateway-cn-shanghai.aliyuncs.com",
        changeOrigin: true,
      },
      "/chat": {
        target: "http://36.212.55.183:7862",
        changeOrigin: true,
      },
    },
  },
});
