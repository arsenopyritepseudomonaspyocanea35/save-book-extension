import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

/**
 * Build 1 of 2 — the content script.
 *
 * MV3 content scripts cannot be ES modules, so this entry is bundled as one
 * self-contained classic IIFE: no imports and no code splitting at runtime.
 * Anything shared with the other targets is duplicated into this bundle rather
 * than fetched, which is why the size stays close to the hand-written version.
 */
export default defineConfig({
  plugins: [solid()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'chrome120',
    lib: {
      entry: 'src/content/index.tsx',
      name: 'SaveBookCard',
      formats: ['iife'],
      fileName: () => 'content.js',
    },
  },
});
