/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react-swc';
import hash from 'crypto';
import path from 'path';
import { defineConfig } from 'vite';

const outDir = 'dist';

// https://vitejs.dev/config/
const formatScopedName = (local: string, resourcePath: string) => {
  const componentName = resourcePath
    .split('/')
    .slice(-1)[0]
    .replace('.module.scss', '')
    .replace(/-module/, '');
  const hashed = hash.createHash('md5').update(resourcePath).digest('hex').substr(0, 5);
  return `${componentName}_${local}__${hashed}`;
};

export default defineConfig(({ command }) => {
  return {
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
          find: '@components',
          replacement: path.resolve(__dirname, 'src/components')
        },
        {
          find: '@pages',
          replacement: path.resolve(__dirname, 'src/pages')
        },
        {
          find: '@hooks',
          replacement: path.resolve(__dirname, 'src/hooks')
        },
        {
          find: '@assets',
          replacement: path.resolve(__dirname, 'src/assets')
        },
        {
          find: '@styles',
          replacement: path.resolve(__dirname, 'src/styles')
        },
        {
          find: '@__test__',
          replacement: path.resolve(__dirname, '__tests__')
        }
      ]
    },
    envDir: './../',
    css: {
      modules: {
        scopeBehaviour: 'local',
        generateScopedName: !(command === 'serve')
          ? '[local]__[hash:base64:5]'
          : formatScopedName
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@styles/base.scss";`
        }
      }
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './__tests__/setup.ts',
      exclude: ['node_modules', './__tests__/setup.ts', './__tests__/renderWithRouter.ts']
    },
    server: {
      port: 4000,
      proxy: {
        '/api': {
          target: 'http://localhost:5001',
          changeOrigin: true
        }
      }
    }
  };
});
