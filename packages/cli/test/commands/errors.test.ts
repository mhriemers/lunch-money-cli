import { LunchMoneyClient, LunchMoneyError } from "@lunch-money/lunch-money-js-v2";
import { describe, expect, it, vi } from "vitest";

import AccountsCreate from "../../src/commands/accounts/create.js";
import AccountsList from "../../src/commands/accounts/list.js";
import AccountsUpdate from "../../src/commands/accounts/update.js";
import CategoriesCreate from "../../src/commands/categories/create.js";
import TransactionsCreate from "../../src/commands/transactions/create.js";
import TransactionsDeleteMany from "../../src/commands/transactions/delete-many.js";
import TransactionsGroup from "../../src/commands/transactions/group.js";
import TransactionsSplit from "../../src/commands/transactions/split.js";
import TransactionsUpdateMany from "../../src/commands/transactions/update-many.js";
import TransactionsUpdate from "../../src/commands/transactions/update.js";
import { configWithTempDir, mockClient, runCommand, tempConfigDir } from "../setup.js";

describe("error handling", () => {
  describe("LunchMoneyError in text mode", () => {
    it("shows error message and status", async () => {
      mockClient({
        manualAccounts: { getAll: vi.fn().mockRejectedValue(new LunchMoneyError("Not found", 404)) },
      });

      const { stderr } = await runCommand(AccountsList, [], { raw: true });

      expect(stderr).toContain("Error: Not found");
      expect(stderr).toContain("Status: 404");
    });

    it("shows error details", async () => {
      mockClient({
        manualAccounts: {
          getAll: vi
            .fn()
            .mockRejectedValue(
              new LunchMoneyError("Validation failed", 422, null, [
                "Field 'name' is required",
                "Amount must be positive",
              ]),
            ),
        },
      });

      const { stderr } = await runCommand(AccountsList, [], { raw: true });

      expect(stderr).toContain("Error: Validation failed");
      expect(stderr).toContain("Status: 422");
      expect(stderr).toContain("- Field 'name' is required");
      expect(stderr).toContain("- Amount must be positive");
    });

    it("sets exit code to 1", async () => {
      mockClient({
        manualAccounts: { getAll: vi.fn().mockRejectedValue(new LunchMoneyError("Fail", 500)) },
      });

      await runCommand(AccountsList, [], { raw: true });

      expect(process.exitCode).toBe(1);
    });
  });

  describe("LunchMoneyError in JSON mode", () => {
    it("outputs error as JSON", async () => {
      mockClient({
        manualAccounts: {
          getAll: vi.fn().mockRejectedValue(new LunchMoneyError("Unauthorized", 401, null, ["Invalid API key"])),
        },
      });

      const { stdout } = await runCommand(AccountsList, ["--json"], { raw: true });

      const json = JSON.parse(stdout);
      expect(json.error).toBe("Unauthorized");
      expect(json.status).toBe(401);
      expect(json.details).toEqual(["Invalid API key"]);
    });
  });

  describe("generic Error", () => {
    it("shows error message in text mode", async () => {
      mockClient({
        manualAccounts: { getAll: vi.fn().mockRejectedValue(new Error("Connection refused")) },
      });

      const { stderr } = await runCommand(AccountsList, [], { raw: true });

      expect(stderr).toContain("Error: Connection refused");
    });

    it("outputs error as JSON in JSON mode", async () => {
      mockClient({
        manualAccounts: { getAll: vi.fn().mockRejectedValue(new Error("Connection refused")) },
      });

      const { stdout } = await runCommand(AccountsList, ["--json"], { raw: true });

      const json = JSON.parse(stdout);
      expect(json.error).toBe("Connection refused");
    });
  });

  describe("API key resolution", () => {
    it("throws when no API key is available", async () => {
      const { cleanup, dir } = tempConfigDir();
      const originalEnvironment = process.env.LUNCH_MONEY_API_KEY;
      delete process.env.LUNCH_MONEY_API_KEY;

      try {
        const config = await configWithTempDir(dir);

        const { stderr } = await runCommand(AccountsList, [], { config, raw: true });

        expect(stderr).toContain("No API key found");
      } finally {
        if (originalEnvironment !== undefined) process.env.LUNCH_MONEY_API_KEY = originalEnvironment;
        cleanup();
      }
    });

    it("uses LUNCH_MONEY_API_KEY env var when no flag or config", async () => {
      const { cleanup, dir } = tempConfigDir();
      const originalEnvironment = process.env.LUNCH_MONEY_API_KEY;
      process.env.LUNCH_MONEY_API_KEY = "env-token-123";

      mockClient({ manualAccounts: { getAll: vi.fn().mockResolvedValue([]) } });

      try {
        const config = await configWithTempDir(dir);

        const { stderr } = await runCommand(AccountsList, ["--json"], { config, raw: true });

        expect(stderr).not.toContain("No API key found");
        expect(LunchMoneyClient).toHaveBeenCalledWith({ apiKey: "env-token-123" });
      } finally {
        if (originalEnvironment === undefined) {
          delete process.env.LUNCH_MONEY_API_KEY;
        } else {
          process.env.LUNCH_MONEY_API_KEY = originalEnvironment;
        }

        cleanup();
      }
    });
  });

  describe("invalid JSON flags", () => {
    it("throws on invalid --transactions JSON (create)", async () => {
      mockClient({ transactions: { create: vi.fn() } });
      const { stderr } = await runCommand(TransactionsCreate, ["--transactions", "not-json"], { raw: true });
      expect(stderr).toContain("transactions must be valid JSON");
    });

    it("throws on invalid --transactions JSON (update-many)", async () => {
      mockClient({ transactions: { update: vi.fn() } });
      const { stderr } = await runCommand(TransactionsUpdateMany, ["--transactions", "{bad"], { raw: true });
      expect(stderr).toContain("transactions must be valid JSON");
    });

    it("throws on invalid --data JSON (accounts update)", async () => {
      mockClient({ manualAccounts: { update: vi.fn() } });
      const { stderr } = await runCommand(AccountsUpdate, ["42", "--data", "bad-json"], { raw: true });
      expect(stderr).toContain("data must be valid JSON");
    });

    it("throws on invalid --data JSON (transactions update)", async () => {
      mockClient({ transactions: { update: vi.fn() } });
      const { stderr } = await runCommand(TransactionsUpdate, ["100", "--data", "bad-json"], { raw: true });
      expect(stderr).toContain("data must be valid JSON");
    });

    it("throws on invalid --data JSON (transactions group)", async () => {
      mockClient({ transactions: { group: vi.fn() } });
      const { stderr } = await runCommand(TransactionsGroup, ["--data", "bad-json"], { raw: true });
      expect(stderr).toContain("data must be valid JSON");
    });

    it("throws on invalid --ids JSON (delete-many)", async () => {
      mockClient({ transactions: { delete: vi.fn() } });
      const { stderr } = await runCommand(TransactionsDeleteMany, ["--ids", "bad-json"], { raw: true });
      expect(stderr).toContain("ids must be valid JSON");
    });

    it("throws on invalid --parts JSON (split)", async () => {
      mockClient({ transactions: { split: vi.fn() } });
      const { stderr } = await runCommand(TransactionsSplit, ["100", "--parts", "bad-json"], { raw: true });
      expect(stderr).toContain("parts must be valid JSON");
    });

    it("throws on invalid --custom-metadata JSON (accounts create)", async () => {
      mockClient({ manualAccounts: { create: vi.fn() } });
      const { stderr } = await runCommand(
        AccountsCreate,
        ["--name", "X", "--type", "cash", "--balance", "0", "--custom-metadata", "bad"],
        { raw: true },
      );
      expect(stderr).toContain("custom-metadata must be valid JSON");
    });

    it("throws on invalid --custom-metadata JSON (transactions update)", async () => {
      mockClient({ transactions: { update: vi.fn() } });
      const { stderr } = await runCommand(TransactionsUpdate, ["100", "--custom-metadata", "bad"], { raw: true });
      expect(stderr).toContain("custom-metadata must be valid JSON");
    });

    it("throws on invalid --tag-ids JSON", async () => {
      mockClient({ transactions: { update: vi.fn() } });
      const { stderr } = await runCommand(TransactionsUpdate, ["100", "--tag-ids", "bad"], { raw: true });
      expect(stderr).toContain("tag-ids must be valid JSON");
    });

    it("throws on invalid --children JSON (categories create)", async () => {
      mockClient({ categories: { create: vi.fn() } });
      const { stderr } = await runCommand(CategoriesCreate, ["--name", "X", "--children", "bad-json"], { raw: true });
      expect(stderr).toContain("children must be valid JSON");
    });
  });
});
