/* eslint-disable @typescript-eslint/no-unused-expressions */
import { runCommand } from "@oclif/test";
import { expect } from "chai";

describe("transactions e2e", () => {
  describe("transactions list", () => {
    it("returns transactions as JSON", async () => {
      const { stdout } = await runCommand([
        "transactions",
        "list",
        "--start-date=2024-01-01",
        "--end-date=2024-01-31",
        "--json",
      ]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("transactions").that.is.an("array");
      const txns = data.transactions;
      expect(txns.length).to.be.greaterThan(0);
      expect(txns[0]).to.have.property("id");
      expect(txns[0]).to.have.property("date");
      expect(txns[0]).to.have.property("amount");
      expect(txns[0]).to.have.property("payee");
      expect(txns[0]).to.have.property("currency");
    });

    it("outputs a formatted table", async () => {
      const { stdout } = await runCommand([
        "transactions",
        "list",
        "--start-date=2024-01-01",
        "--end-date=2024-01-31",
      ]);
      expect(stdout).to.contain("ID");
      expect(stdout).to.contain("Date");
      expect(stdout).to.contain("Payee");
    });

    it("supports filter flags", async () => {
      const { stdout } = await runCommand([
        "transactions",
        "list",
        "--start-date=2024-01-01",
        "--end-date=2024-01-31",
        "--limit=10",
        "--status=reviewed",
        "--json",
      ]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("transactions").that.is.an("array");
    });

    it("supports boolean include flags", async () => {
      const { stdout } = await runCommand([
        "transactions",
        "list",
        "--start-date=2024-01-01",
        "--end-date=2024-01-31",
        "--include-pending",
        "--include-children",
        "--json",
      ]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("transactions");
    });
  });

  describe("transactions get", () => {
    it("returns a single transaction as JSON", async () => {
      const { stdout } = await runCommand(["transactions", "get", "2112150654", "--json"]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("id");
      expect(data).to.have.property("date");
      expect(data).to.have.property("amount");
      expect(data).to.have.property("payee");
    });

    it("outputs formatted detail view", async () => {
      const { stdout } = await runCommand(["transactions", "get", "2112150654"]);
      expect(stdout).to.contain("Payee");
      expect(stdout).to.contain("Amount");
      expect(stdout).to.contain("Date");
    });
  });

  describe("transactions create", () => {
    it("creates transactions and returns JSON", async () => {
      const txns = JSON.stringify([{ date: "2024-01-15", amount: "42.50", payee: "TestStore" }]);
      const { stdout } = await runCommand(["transactions", "create", `--transactions=${txns}`, "--json"]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("transactions").that.is.an("array");
    });

    it("outputs success message", async () => {
      const txns = JSON.stringify([{ date: "2024-01-15", amount: "42.50", payee: "TestStore" }]);
      const { stdout } = await runCommand(["transactions", "create", `--transactions=${txns}`]);
      expect(stdout).to.contain("Created");
      expect(stdout).to.contain("transaction");
    });

    it("supports optional create flags", async () => {
      const txns = JSON.stringify([{ date: "2024-01-15", amount: "42.50", payee: "TestStore" }]);
      const { stdout } = await runCommand([
        "transactions",
        "create",
        `--transactions=${txns}`,
        "--skip-duplicates",
        "--apply-rules",
        "--json",
      ]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("transactions");
    });
  });

  describe("transactions update", () => {
    it("updates a transaction with individual flags", async () => {
      const { stdout } = await runCommand([
        "transactions",
        "update",
        "2112150654",
        "--payee=UpdatedPayee",
        "--json",
      ]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("id");
    });

    it("updates a transaction with --data flag", async () => {
      const { stdout } = await runCommand([
        "transactions",
        "update",
        "2112150654",
        '--data={"payee":"Updated"}',
        "--json",
      ]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("id");
    });

    it("outputs success message", async () => {
      const { stdout } = await runCommand(["transactions", "update", "2112150654", "--payee=Updated"]);
      expect(stdout).to.contain("Updated transaction");
    });
  });

  describe("transactions update-many", () => {
    it("updates multiple transactions and returns JSON", async () => {
      const txns = JSON.stringify([{ id: 1, payee: "BulkUpdated" }]);
      const { stdout } = await runCommand(["transactions", "update-many", `--transactions=${txns}`, "--json"]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("transactions").that.is.an("array");
    });
  });

  describe("transactions delete", () => {
    it("deletes a transaction and confirms", async () => {
      const { stdout } = await runCommand(["transactions", "delete", "2112150654"]);
      expect(stdout).to.contain("Deleted transaction");
    });
  });

  describe("transactions delete-many", () => {
    it("deletes multiple transactions", async () => {
      const ids = JSON.stringify([1, 2, 3]);
      const { stdout } = await runCommand(["transactions", "delete-many", `--ids=${ids}`]);
      expect(stdout).to.contain("Deleted");
      expect(stdout).to.contain("transaction");
    });
  });

  describe("transactions group", () => {
    it("groups transactions and returns JSON", async () => {
      const data = JSON.stringify({ date: "2024-01-15", payee: "Group", ids: [1, 2] });
      const { stdout } = await runCommand(["transactions", "group", `--data=${data}`, "--json"]);
      const result = JSON.parse(stdout);
      expect(result).to.have.property("id");
    });

    it("outputs success message", async () => {
      const data = JSON.stringify({ date: "2024-01-15", payee: "Group", ids: [1, 2] });
      const { stdout } = await runCommand(["transactions", "group", `--data=${data}`]);
      expect(stdout).to.contain("Grouped transactions");
    });
  });

  describe("transactions ungroup", () => {
    it("ungroups a transaction and confirms", async () => {
      const { stdout } = await runCommand(["transactions", "ungroup", "123456789"]);
      expect(stdout).to.contain("Ungrouped transaction");
    });
  });

  describe("transactions unsplit", () => {
    it("unsplits a transaction and confirms", async () => {
      const { stdout } = await runCommand(["transactions", "unsplit", "123456789"]);
      expect(stdout).to.contain("Unsplit transaction");
    });
  });
});
