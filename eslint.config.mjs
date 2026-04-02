import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import perfectionist from "eslint-plugin-perfectionist";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["**/dist/", "**/node_modules/", "**/*.js", "**/*.mjs"] },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  perfectionist.configs["recommended-natural"],
  prettier,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      camelcase: "off",
    },
  },
);
