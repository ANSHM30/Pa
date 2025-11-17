import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { SitemapPlugin } from "vite-plugin-sitemap";

// 🧭 Your deployed site URL — change this if you use another domain
const siteUrl = "https://anshdev-portfolio.netlify.app";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    SitemapPlugin({
      hostname: siteUrl,
      // List of your main pages or section anchors
      dynamicRoutes: [
        "/",              // Home
        "/#about",
        "/#education",
        "/#experience",
        "/#skills",
        "/#projects",
        "/#contact",
      ],
      changefreq: "monthly",
      priority: 0.8,
    }),
  ],
});
