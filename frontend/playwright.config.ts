import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests-e2e",
  timeout: 30000,

  webServer: [
    {
      command: "npm start",
      cwd: "../backend",
      port: 3000,
      timeout: 20000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "npm run dev",
      cwd: "./frontend",
      port: 5173,
      timeout: 20000,
      reuseExistingServer: !process.env.CI,
    },
  ],

  use: {
    baseURL: "http://localhost:5173",
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
});
