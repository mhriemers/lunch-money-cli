import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    disableConsoleIntercept: true,
    mockReset: true,
    server: {
      deps: {
        inline: [/lunch-money/],
      },
    },
    setupFiles: ["test/setup.ts"],
  },
});
