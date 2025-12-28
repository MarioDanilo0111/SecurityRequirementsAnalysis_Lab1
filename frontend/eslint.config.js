import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { ignores: ["dist/**", "node_modules/**", "test-results/**"] },

  // JavaScript / TypeScript rules
  {
    files: ["src/**/*.{ts,js}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
  },

  // Playwright config override
  {
    files: ["playwright.config.ts"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
]);
