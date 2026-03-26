/* eslint-disable @typescript-eslint/no-unused-expressions */
import { runCommand } from "@oclif/test";
import { expect } from "chai";

describe("budgets e2e", () => {
  describe("budgets settings", () => {
    it("returns budget settings as JSON", async () => {
      const { stdout } = await runCommand(["budgets", "settings", "--json"]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("budget_period_granularity");
    });

    it("outputs formatted detail view", async () => {
      const { stdout } = await runCommand(["budgets", "settings"]);
      expect(stdout).to.be.ok;
    });
  });

  describe("budgets upsert", () => {
    it("upserts a budget and returns JSON", async () => {
      const { stdout } = await runCommand([
        "budgets",
        "upsert",
        "--category-id=86",
        "--start-date=2024-01-01",
        "--amount=500",
        "--json",
      ]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("category_id");
      expect(data).to.have.property("amount");
    });

    it("outputs success message", async () => {
      const { stdout } = await runCommand([
        "budgets",
        "upsert",
        "--category-id=86",
        "--start-date=2024-01-01",
        "--amount=500",
      ]);
      expect(stdout).to.contain("Budget saved");
    });

    it("supports optional flags", async () => {
      const { stdout } = await runCommand([
        "budgets",
        "upsert",
        "--category-id=86",
        "--start-date=2024-01-01",
        "--amount=500",
        "--currency=usd",
        "--notes=TestBudget",
        "--json",
      ]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("category_id");
    });
  });

  describe("budgets delete", () => {
    it("deletes a budget and confirms", async () => {
      const { stdout } = await runCommand(["budgets", "delete", "--category-id=86", "--start-date=2024-01-01"]);
      expect(stdout).to.contain("Deleted budget");
    });
  });
});
