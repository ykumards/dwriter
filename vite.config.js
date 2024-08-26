import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  worker: {
    format: 'es', // Ensures the format is ES modules
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'tf-models': ['@xenova/transformers']
        }
      }
    }
  },
  resolve: {
    alias: {
      'transformers': '@xenova/transformers',
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
});