import { defineConfig } from 'vitest/config'
import { loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // Manually inject env vars into process.env
  for (const key in env) {
    process.env[key] = env[key];
  }

  return {}
});
