import { runCommand } from "@oclif/test";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

describe("root help", () => {
  it("shows help text", async () => {
    const { stdout } = await runCommand(["--help"], { root });
    expect(stdout).toContain("lunch-money-cli");
  });
});

const topics = [
  "accounts",
  "budgets",
  "categories",
  "plaid-accounts",
  "recurring",
  "summary",
  "tags",
  "transactions",
  "user",
];

describe("topic help", () => {
  for (const topic of topics) {
    it(`${topic} --help`, async () => {
      const { stdout } = await runCommand([topic, "--help"], { root });
      expect(stdout).toBeTruthy();
    });
  }
});

const commands = [
  ["accounts", "list"],
  ["budgets", "settings"],
  ["categories", "list"],
  ["plaid-accounts", "list"],
  ["recurring", "list"],
  ["summary", "get"],
  ["tags", "list"],
  ["transactions", "list"],
  ["user", "me"],
];

describe("command help", () => {
  for (const args of commands) {
    it(`${args.join(" ")} --help`, async () => {
      const { stdout } = await runCommand([...args, "--help"], { root });
      expect(stdout).toBeTruthy();
    });
  }
});
