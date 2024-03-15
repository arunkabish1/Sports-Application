import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true,
      },
      registerType: "autoUpdate",
      manifest: {
        name: "Sportschecker",
        short_name: "Sportschecker",
        icons: [
          {
            src: "/pwalogo.png",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
          {
            src: "/pwalogo.png",
            type: "image/png",
            sizes: "16x16",
          },
          {
            src: "/pwalogo.png",
            type: "image/png",
            sizes: "32x32",
          },
          {
            src: "/pwalogo.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "/pwalogo.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "any maskable",
          },
        ],
        theme_color: "#AAF",
      },
    }),
  ],
});
