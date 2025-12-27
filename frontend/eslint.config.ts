import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{ts,js}"],
    ignores: ["dist/**", "node_modules/**"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },
    extends: [js.configs.recommended],
  },

  {
    files: ["playwright.config.ts"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  ...tseslint.configs.recommended,
]);
