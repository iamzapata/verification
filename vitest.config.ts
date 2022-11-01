/// <reference types="vitest" />
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
    css: {
      modules: {
        // Simplifies unit tests by
        // having classes in the form of:
        // Button Active
        // instead of
        // _Button_2a1efe _Active_2a1efe
        classNameStrategy: 'non-scoped',
      },
    },
  },
})
