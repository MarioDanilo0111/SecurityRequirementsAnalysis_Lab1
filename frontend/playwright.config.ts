import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests-e2e", // ONLY run tests
  timeout: 30000,

  webServer: [
    {
      command: "E2E_RESET=true npm start",
      cwd: "../backend", // start backend for e2e tests
      port: 3000,
      timeout: 20000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "npm run dev",
      cwd: ".", // frontend folder
      port: 5173,
      timeout: 20000,
      reuseExistingServer: !process.env.CI,
    },
  ],

  testMatch: ["**/tests-e2e/**/*.spec.ts"], // FORCE PLAYWRIGHT to skip backend tests

  use: {
    baseURL: "http://localhost:5173",
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },

  // IMPORTANT: ignore backend completely
  projects: [
    {
      name: "chromium",
      testDir: "./tests-e2e",
    },
  ],
});
