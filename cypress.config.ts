import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    video: false,
    screenshotOnRunFailure: false,
    execTimeout: 10000,
  },
  retries: {
    runMode: 3,
    openMode: 3,
  },
})
