/* eslint-disable @typescript-eslint/no-unused-expressions */
import { LunchMoneyError } from "@lunch-money/lunch-money-js-v2";
import { captureOutput } from "@oclif/test";
import { expect } from "chai";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sinon from "sinon";

import AccountsList from "../../src/commands/accounts/list.js";
import TransactionsCreate from "../../src/commands/transactions/create.js";
import { createMockClient, getConfig } from "../helpers/index.js";

describe("error handling", () => {
  afterEach(() => {
    sinon.restore();
    process.exitCode = undefined;
  });

  describe("LunchMoneyError in text mode", () => {
    it("shows error message and status", async () => {
      const client = createMockClient();
      client.manualAccounts.getAll.rejects(new LunchMoneyError("Not found", 404));
      const stub = sinon.stub(AccountsList.prototype, "createClient" as keyof AccountsList);
      stub.returns(client);

      const config = await getConfig();
      const { stderr } = await captureOutput(async () => {
        const cmd = new AccountsList([], config);
        await (cmd as any)._run();
      });

      expect(stderr).to.contain("Error: Not found");
      expect(stderr).to.contain("Status: 404");
    });

    it("shows error details", async () => {
      const client = createMockClient();
      client.manualAccounts.getAll.rejects(
        new LunchMoneyError("Validation failed", 422, null, ["Field 'name' is required", "Amount must be positive"]),
      );
      const stub = sinon.stub(AccountsList.prototype, "createClient" as keyof AccountsList);
      stub.returns(client);

      const config = await getConfig();
      const { stderr } = await captureOutput(async () => {
        const cmd = new AccountsList([], config);
        await (cmd as any)._run();
      });

      expect(stderr).to.contain("Error: Validation failed");
      expect(stderr).to.contain("Status: 422");
      expect(stderr).to.contain("- Field 'name' is required");
      expect(stderr).to.contain("- Amount must be positive");
    });

    it("sets exit code to 1", async () => {
      const client = createMockClient();
      client.manualAccounts.getAll.rejects(new LunchMoneyError("Fail", 500));
      const stub = sinon.stub(AccountsList.prototype, "createClient" as keyof AccountsList);
      stub.returns(client);

      const config = await getConfig();
      await captureOutput(async () => {
        const cmd = new AccountsList([], config);
        await (cmd as any)._run();
      });

      expect(process.exitCode).to.equal(1);
    });
  });

  describe("LunchMoneyError in JSON mode", () => {
    it("outputs error as JSON", async () => {
      const client = createMockClient();
      client.manualAccounts.getAll.rejects(
        new LunchMoneyError("Unauthorized", 401, null, ["Invalid API key"]),
      );
      const stub = sinon.stub(AccountsList.prototype, "createClient" as keyof AccountsList);
      stub.returns(client);

      const config = await getConfig();
      const { stdout } = await captureOutput(async () => {
        const cmd = new AccountsList(["--json"], config);
        await (cmd as any)._run();
      });

      const json = JSON.parse(stdout);
      expect(json.error).to.equal("Unauthorized");
      expect(json.status).to.equal(401);
      expect(json.details).to.deep.equal(["Invalid API key"]);
    });
  });

  describe("generic Error", () => {
    it("shows error message in text mode", async () => {
      const client = createMockClient();
      client.manualAccounts.getAll.rejects(new Error("Connection refused"));
      const stub = sinon.stub(AccountsList.prototype, "createClient" as keyof AccountsList);
      stub.returns(client);

      const config = await getConfig();
      const { stderr } = await captureOutput(async () => {
        const cmd = new AccountsList([], config);
        await (cmd as any)._run();
      });

      expect(stderr).to.contain("Error: Connection refused");
    });

    it("outputs error as JSON in JSON mode", async () => {
      const client = createMockClient();
      client.manualAccounts.getAll.rejects(new Error("Connection refused"));
      const stub = sinon.stub(AccountsList.prototype, "createClient" as keyof AccountsList);
      stub.returns(client);

      const config = await getConfig();
      const { stdout } = await captureOutput(async () => {
        const cmd = new AccountsList(["--json"], config);
        await (cmd as any)._run();
      });

      const json = JSON.parse(stdout);
      expect(json.error).to.equal("Connection refused");
    });
  });

  describe("missing API key", () => {
    it("throws when no API key is available", async () => {
      // Use a temp configDir with no config file so loadConfig returns {}
      const tempDir = mkdtempSync(join(tmpdir(), "lm-test-"));
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

        const { stderr } = await captureOutput(async () => {
          const cmd = new AccountsList([], testConfig);
          await (cmd as any)._run();
        });

        expect(stderr).to.contain("No API key found");
      } finally {
        if (originalEnv !== undefined) process.env.LUNCH_MONEY_API_KEY = originalEnv;
        rmSync(tempDir, { recursive: true, force: true });
      }
    });
  });

  describe("invalid JSON flags", () => {
    it("throws on invalid --transactions JSON", async () => {
      const stub = sinon.stub(TransactionsCreate.prototype, "createClient" as keyof TransactionsCreate);
      stub.returns(createMockClient());

      const config = await getConfig();
      const { stderr } = await captureOutput(async () => {
        const cmd = new TransactionsCreate(["--transactions", "not-json"], config);
        await (cmd as any)._run();
      });

      expect(stderr).to.contain("transactions must be valid JSON");
    });
  });
});
