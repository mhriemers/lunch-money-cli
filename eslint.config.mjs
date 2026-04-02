import { includeIgnoreFile } from "@eslint/compat";
import oclif from "eslint-config-oclif";
import prettier from "eslint-config-prettier";
import path from "node:path";
import { fileURLToPath } from "node:url";

const gitignorePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".gitignore");

export default [
  includeIgnoreFile(gitignorePath),
  ...oclif,
  prettier,
  {
    rules: {
      camelcase: "off",
      "mocha/max-top-level-suites": "off",
    },
  },
  {
    files: ["**/test/setup.ts"],
    rules: {
      "mocha/no-top-level-hooks": "off",
    },
  },
];
