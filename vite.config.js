import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // ← importante para Netlify (não use base relativa como no GitHub Pages)
});
