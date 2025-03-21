import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/dwriter/',
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
  optimizeDeps: {
    exclude: ['onnxruntime-web'], // Exclude onnxruntime-web from optimization to avoid eval warnings
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