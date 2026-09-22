import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'chrome123',
    lib: {
      entry: 'src/content/index.tsx',
      name: 'SaveBookCard',
      formats: ['iife'],
      fileName: () => 'content.js',
    },
  },
});
