import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    update: true,
    environment: 'jsdom',
    setupFiles: ['src/__testing__/setup.ts'],
    globals: true,
  },
})
