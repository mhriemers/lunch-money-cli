/* eslint-disable @typescript-eslint/no-unused-expressions */
import { runCommand } from "@oclif/test";
import { expect } from "chai";

describe("plaid-accounts e2e", () => {
  describe("plaid-accounts list", () => {
    it("returns plaid accounts as JSON", async () => {
      const { stdout } = await runCommand(["plaid-accounts", "list", "--json"]);
      const data = JSON.parse(stdout);
      expect(data).to.be.an("array").with.length.greaterThan(0);
      expect(data[0]).to.have.property("id");
      expect(data[0]).to.have.property("name");
      expect(data[0]).to.have.property("type");
    });

    it("outputs a formatted table", async () => {
      const { stdout } = await runCommand(["plaid-accounts", "list"]);
      expect(stdout).to.contain("ID");
      expect(stdout).to.contain("Name");
    });
  });

  describe("plaid-accounts get", () => {
    it("returns a single plaid account as JSON", async () => {
      const { stdout } = await runCommand(["plaid-accounts", "get", "119804", "--json"]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("id");
      expect(data).to.have.property("name");
      expect(data).to.have.property("type");
    });

    it("outputs formatted detail view", async () => {
      const { stdout } = await runCommand(["plaid-accounts", "get", "119804"]);
      expect(stdout).to.contain("Name");
      expect(stdout).to.contain("Type");
    });
  });

  describe("plaid-accounts sync", () => {
    it("triggers a sync and confirms", async () => {
      const { stdout } = await runCommand(["plaid-accounts", "sync"]);
      expect(stdout).to.contain("Plaid sync triggered");
    });

    it("supports optional flags", async () => {
      const { stdout } = await runCommand([
        "plaid-accounts",
        "sync",
        "--start-date=2024-01-01",
        "--end-date=2024-01-31",
      ]);
      expect(stdout).to.contain("Plaid sync triggered");
    });
  });
});
