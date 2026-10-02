import { defineConfig, devices } from "@playwright/test";

// The suite drives a production build of the storefront against the real API, which runs on a
// throwaway in-memory database seeded with the demo catalogue (backend: `yarn dev:memory`).
// A production build matters here: some bugs (masked Server Action errors) only exist in one.
const API_PORT = 3100;
const APP_PORT = 3101;
const backendDir = process.env.BACKEND_DIR ?? "../fashion-ecommerce-backend";

const appEnv = {
  API_URL: `http://localhost:${API_PORT}/api/v1`,
  NEXTAUTH_URL: `http://localhost:${APP_PORT}`,
  NEXTAUTH_SECRET: "e2e-only-secret",
};

export default defineConfig({
  testDir: "./e2e",
  // One worker: every test shares the same seeded database.
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${APP_PORT}`,
    locale: "en-US",
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: [
    {
      command: "node scripts/dev-memory.js",
      cwd: backendDir,
      env: {
        PORT: String(API_PORT),
        NODE_ENV: "test",
        CORS_ORIGINS: `http://localhost:${APP_PORT}`,
      },
      url: `http://localhost:${API_PORT}/api/v1/categories/main`,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      // The data cache survives rebuilds; clearing it keeps a rerun from seeing stale products.
      command: `rm -rf .next/cache/fetch-cache && yarn build && yarn start -p ${APP_PORT}`,
      env: appEnv,
      url: `http://localhost:${APP_PORT}/en`,
      reuseExistingServer: !process.env.CI,
      timeout: 300_000,
    },
  ],
});
