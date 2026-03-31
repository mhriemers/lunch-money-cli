import { LunchMoneyError } from "@lunch-money/lunch-money-js-v2";
import { captureOutput } from "@oclif/test";
import { expect } from "chai";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

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
import { getConfig, runCommand } from "../helpers/index.js";

const RAW = { raw: true };

function tempConfig() {
  const tempDir = mkdtempSync(join(tmpdir(), "lm-test-"));
  return { cleanup: () => rmSync(tempDir, { force: true, recursive: true }), tempDir };
}

describe("error handling", () => {
  afterEach(() => {
    process.exitCode = undefined;
  });

  describe("LunchMoneyError in text mode", () => {
    it("shows error message and status", async () => {
      const { stderr } = await runCommand(
        AccountsList,
        [],
        (c) => {
          c.manualAccounts.getAll.rejects(new LunchMoneyError("Not found", 404));
        },
        RAW,
      );

      expect(stderr).to.contain("Error: Not found");
      expect(stderr).to.contain("Status: 404");
    });

    it("shows error details", async () => {
      const { stderr } = await runCommand(
        AccountsList,
        [],
        (c) => {
          c.manualAccounts.getAll.rejects(
            new LunchMoneyError("Validation failed", 422, null, [
              "Field 'name' is required",
              "Amount must be positive",
            ]),
          );
        },
        RAW,
      );

      expect(stderr).to.contain("Error: Validation failed");
      expect(stderr).to.contain("Status: 422");
      expect(stderr).to.contain("- Field 'name' is required");
      expect(stderr).to.contain("- Amount must be positive");
    });

    it("sets exit code to 1", async () => {
      await runCommand(
        AccountsList,
        [],
        (c) => {
          c.manualAccounts.getAll.rejects(new LunchMoneyError("Fail", 500));
        },
        RAW,
      );

      expect(process.exitCode).to.equal(1);
    });
  });

  describe("LunchMoneyError in JSON mode", () => {
    it("outputs error as JSON", async () => {
      const { stdout } = await runCommand(
        AccountsList,
        ["--json"],
        (c) => {
          c.manualAccounts.getAll.rejects(new LunchMoneyError("Unauthorized", 401, null, ["Invalid API key"]));
        },
        RAW,
      );

      const json = JSON.parse(stdout);
      expect(json.error).to.equal("Unauthorized");
      expect(json.status).to.equal(401);
      expect(json.details).to.deep.equal(["Invalid API key"]);
    });
  });

  describe("generic Error", () => {
    it("shows error message in text mode", async () => {
      const { stderr } = await runCommand(
        AccountsList,
        [],
        (c) => {
          c.manualAccounts.getAll.rejects(new Error("Connection refused"));
        },
        RAW,
      );

      expect(stderr).to.contain("Error: Connection refused");
    });

    it("outputs error as JSON in JSON mode", async () => {
      const { stdout } = await runCommand(
        AccountsList,
        ["--json"],
        (c) => {
          c.manualAccounts.getAll.rejects(new Error("Connection refused"));
        },
        RAW,
      );

      const json = JSON.parse(stdout);
      expect(json.error).to.equal("Connection refused");
    });
  });

  describe("API key resolution", () => {
    it("throws when no API key is available", async () => {
      const { cleanup, tempDir } = tempConfig();
      const originalEnv = process.env.LUNCH_MONEY_API_KEY;
      delete process.env.LUNCH_MONEY_API_KEY;

      try {
        const config = await getConfig();
        const testConfig = new Proxy(config, {
          get(target, prop, receiver) {
            if (prop === "configDir") return tempDir;
            return Reflect.get(target, prop, receiver);
          },
        });

        // Use captureOutput directly — createClient must NOT be stubbed
        // so the real API key resolution runs and fails.
        const { stderr } = await captureOutput(async () => {
          const cmd = new AccountsList([], testConfig);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (cmd as any)._run();
        });

        expect(stderr).to.contain("No API key found");
      } finally {
        if (originalEnv !== undefined) process.env.LUNCH_MONEY_API_KEY = originalEnv;
        cleanup();
      }
    });

    it("uses LUNCH_MONEY_API_KEY env var when no flag or config", async () => {
      const { cleanup, tempDir } = tempConfig();
      const originalEnv = process.env.LUNCH_MONEY_API_KEY;
      process.env.LUNCH_MONEY_API_KEY = "env-token-123";

      try {
        const config = await getConfig();
        const testConfig = new Proxy(config, {
          get(target, prop, receiver) {
            if (prop === "configDir") return tempDir;
            return Reflect.get(target, prop, receiver);
          },
        });

        // Run without --api-key flag — should use env var and succeed (no missing-key error)
        const { createClientStub, error } = await runCommand(AccountsList, ["--json"], undefined, {
          config: testConfig,
        });

        expect(error).to.equal(undefined);
        expect(createClientStub.firstCall.args[0]).to.equal(undefined);
      } finally {
        if (originalEnv === undefined) {
          delete process.env.LUNCH_MONEY_API_KEY;
        } else {
          process.env.LUNCH_MONEY_API_KEY = originalEnv;
        }

        cleanup();
      }
    });
  });

  describe("invalid JSON flags", () => {
    it("throws on invalid --transactions JSON (create)", async () => {
      const { stderr } = await runCommand(TransactionsCreate, ["--transactions", "not-json"], undefined, RAW);
      expect(stderr).to.contain("transactions must be valid JSON");
    });

    it("throws on invalid --transactions JSON (update-many)", async () => {
      const { stderr } = await runCommand(TransactionsUpdateMany, ["--transactions", "{bad"], undefined, RAW);
      expect(stderr).to.contain("transactions must be valid JSON");
    });

    it("throws on invalid --data JSON (accounts update)", async () => {
      const { stderr } = await runCommand(AccountsUpdate, ["42", "--data", "bad-json"], undefined, RAW);
      expect(stderr).to.contain("data must be valid JSON");
    });

    it("throws on invalid --data JSON (transactions update)", async () => {
      const { stderr } = await runCommand(TransactionsUpdate, ["100", "--data", "bad-json"], undefined, RAW);
      expect(stderr).to.contain("data must be valid JSON");
    });

    it("throws on invalid --data JSON (transactions group)", async () => {
      const { stderr } = await runCommand(TransactionsGroup, ["--data", "bad-json"], undefined, RAW);
      expect(stderr).to.contain("data must be valid JSON");
    });

    it("throws on invalid --ids JSON (delete-many)", async () => {
      const { stderr } = await runCommand(TransactionsDeleteMany, ["--ids", "bad-json"], undefined, RAW);
      expect(stderr).to.contain("ids must be valid JSON");
    });

    it("throws on invalid --parts JSON (split)", async () => {
      const { stderr } = await runCommand(TransactionsSplit, ["100", "--parts", "bad-json"], undefined, RAW);
      expect(stderr).to.contain("parts must be valid JSON");
    });

    it("throws on invalid --custom-metadata JSON (accounts create)", async () => {
      const { stderr } = await runCommand(
        AccountsCreate,
        ["--name", "X", "--type", "cash", "--balance", "0", "--custom-metadata", "bad"],
        undefined,
        RAW,
      );
      expect(stderr).to.contain("custom-metadata must be valid JSON");
    });

    it("throws on invalid --custom-metadata JSON (transactions update)", async () => {
      const { stderr } = await runCommand(
        TransactionsUpdate,
        ["100", "--custom-metadata", "bad"],
        undefined,
        RAW,
      );
      expect(stderr).to.contain("custom-metadata must be valid JSON");
    });

    it("throws on invalid --tag-ids JSON", async () => {
      const { stderr } = await runCommand(
        TransactionsUpdate,
        ["100", "--tag-ids", "bad"],
        undefined,
        RAW,
      );
      expect(stderr).to.contain("tag-ids must be valid JSON");
    });

    it("throws on invalid --children JSON (categories create)", async () => {
      const { stderr } = await runCommand(
        CategoriesCreate,
        ["--name", "X", "--children", "bad-json"],
        undefined,
        RAW,
      );
      expect(stderr).to.contain("children must be valid JSON");
    });
  });
});
