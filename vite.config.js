import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [vue()],
    server: {
      port: 3000
    },
    build: {
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: () => 'vendor'
        }
      }
    },
    define: {
      'process.env': env
    }
  }
}) 