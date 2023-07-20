/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

const outDir = 'dist';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir,
    sourcemap: 'inline',
    minify: 'esbuild',
    manifest: true,
    emptyOutDir: true,
    copyPublicDir: true
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      },
      {
        find: '@styles',
        replacement: path.resolve(__dirname, 'src/styles')
      }
    ]
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './__tests__/setup.ts',
    exclude: ['node_modules', './__tests__/setup.ts']
  },
  server: {
    port: 4000
  }
});
