import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: "/", // ← importante para Netlify (não use base relativa como no GitHub Pages)
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
