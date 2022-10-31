import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    update: true,
    environment: 'jsdom',
    setupFiles: ['src/__testing__/setup.ts'],
    globals: true,
  },
})
