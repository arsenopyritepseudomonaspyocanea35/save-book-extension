import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

/**
 * Build 2 of 2 — service worker + options page.
 *
 * Both run as extension pages/workers, so they can be real ES modules and share
 * chunks. `public/` (manifest + icons) is copied into `dist/` by both builds.
 */
export default defineConfig({
  plugins: [solid()],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    target: 'chrome120',
    rollupOptions: {
      input: {
        background: 'src/background/index.ts',
        options: 'index.html',
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
});
