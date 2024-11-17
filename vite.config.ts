/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import copy from 'rollup-plugin-copy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    copy({
      targets: [
        {
          src: 'src/extension/*',
          dest: 'dist',
          ignore: ['**/.js', '**/*.ts', '**/manifest.json'],
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/__tests__/setup.ts'
  },
  build: {
    emptyOutDir: true,
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        serviceWorker: path.resolve(__dirname, 'src/extension/service-worker.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      }
    }
  },
})
