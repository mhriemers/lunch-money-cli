/* eslint-disable @typescript-eslint/no-unused-expressions */
import { runCommand } from "@oclif/test";
import { expect } from "chai";

describe("accounts e2e", () => {
  describe("accounts list", () => {
    it("returns accounts as JSON", async () => {
      const { stdout } = await runCommand(["accounts", "list", "--json"]);
      const data = JSON.parse(stdout);
      expect(data).to.be.an("array").with.length.greaterThan(0);
      expect(data[0]).to.have.property("id");
      expect(data[0]).to.have.property("name");
      expect(data[0]).to.have.property("type");
      expect(data[0]).to.have.property("balance");
      expect(data[0]).to.have.property("currency");
    });

    it("outputs a formatted table", async () => {
      const { stdout } = await runCommand(["accounts", "list"]);
      expect(stdout).to.contain("ID");
      expect(stdout).to.contain("Name");
      expect(stdout).to.contain("Type");
    });
  });

  describe("accounts get", () => {
    it("returns a single account as JSON", async () => {
      const { stdout } = await runCommand(["accounts", "get", "119807", "--json"]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("id");
      expect(data).to.have.property("name");
      expect(data).to.have.property("type");
      expect(data).to.have.property("balance");
    });

    it("outputs formatted detail view", async () => {
      const { stdout } = await runCommand(["accounts", "get", "119807"]);
      expect(stdout).to.contain("Name");
      expect(stdout).to.contain("Type");
      expect(stdout).to.contain("Balance");
    });
  });

  describe("accounts create", () => {
    it("creates an account and returns JSON", async () => {
      const { stdout } = await runCommand([
        "accounts",
        "create",
        "--name=TestAccount",
        "--type=cash",
        "--balance=100.00",
        "--json",
      ]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("id");
      expect(data).to.have.property("name");
      expect(data).to.have.property("type");
    });

    it("outputs success message", async () => {
      const { stdout } = await runCommand([
        "accounts",
        "create",
        "--name=TestAccount",
        "--type=cash",
        "--balance=100.00",
      ]);
      expect(stdout).to.contain("Created account");
    });
  });

  describe("accounts update", () => {
    it("updates an account and returns JSON", async () => {
      const { stdout } = await runCommand(["accounts", "update", "119807", "--name=Updated", "--json"]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("id");
      expect(data).to.have.property("name");
    });

    it("accepts --data flag with full JSON body", async () => {
      const { stdout } = await runCommand(["accounts", "update", "119807", '--data={"name":"Updated"}', "--json"]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("id");
    });
  });

  describe("accounts delete", () => {
    it("deletes an account and confirms", async () => {
      const { stdout } = await runCommand(["accounts", "delete", "119807"]);
      expect(stdout).to.contain("Deleted account");
    });

    it("returns JSON confirmation", async () => {
      const { stdout } = await runCommand(["accounts", "delete", "119807", "--json"]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("success", true);
      expect(data).to.have.property("deleted_id");
    });
  });
});
