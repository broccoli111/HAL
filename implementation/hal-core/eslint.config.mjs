import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    ignores: ["dist/**", "coverage/**", "node_modules/**"]
  },
  {
    ...js.configs.recommended,
    languageOptions: {
      ...js.configs.recommended.languageOptions,
      globals: {
        console: "readonly",
        process: "readonly"
      }
    }
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname
      }
    },
    plugins: {
      "@typescript-eslint": tseslint
    },
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ]
    }
  },
  {
    files: ["src/m8/renderer.ts"],
    languageOptions: {
      globals: {
        document: "readonly",
        window: "readonly",
        HTMLElement: "readonly",
        HTMLInputElement: "readonly",
        HTMLButtonElement: "readonly",
        HTMLUListElement: "readonly"
      }
    }
  }
];
