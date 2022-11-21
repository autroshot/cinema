import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    experimentalSessionAndOrigin: true,
    baseUrl: 'http://localhost:3000',
  },
  watchForFileChanges: false,
});
