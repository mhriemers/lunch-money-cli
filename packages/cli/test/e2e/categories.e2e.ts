/* eslint-disable @typescript-eslint/no-unused-expressions */
import { runCommand } from "@oclif/test";
import { expect } from "chai";

describe("categories e2e", () => {
  describe("categories list", () => {
    it("returns categories as JSON", async () => {
      const { stdout } = await runCommand(["categories", "list", "--json"]);
      const data = JSON.parse(stdout);
      expect(data).to.be.an("array").with.length.greaterThan(0);
      expect(data[0]).to.have.property("id");
      expect(data[0]).to.have.property("name");
      expect(data[0]).to.have.property("is_income");
    });

    it("outputs a formatted table", async () => {
      const { stdout } = await runCommand(["categories", "list"]);
      expect(stdout).to.contain("ID");
      expect(stdout).to.contain("Name");
    });

    it("supports --flatten flag", async () => {
      const { stdout } = await runCommand(["categories", "list", "--flatten", "--json"]);
      const data = JSON.parse(stdout);
      expect(data).to.be.an("array");
    });

    it("supports --is-group flag", async () => {
      const { stdout } = await runCommand(["categories", "list", "--is-group=true", "--json"]);
      const data = JSON.parse(stdout);
      expect(data).to.be.an("array");
    });
  });

  describe("categories get", () => {
    it("returns a single category as JSON", async () => {
      const { stdout } = await runCommand(["categories", "get", "86", "--json"]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("id");
      expect(data).to.have.property("name");
      expect(data).to.have.property("is_income");
    });

    it("outputs formatted detail view", async () => {
      const { stdout } = await runCommand(["categories", "get", "86"]);
      expect(stdout).to.contain("Name");
    });
  });

  describe("categories create", () => {
    it("creates a category and returns JSON", async () => {
      const { stdout } = await runCommand(["categories", "create", "--name=TestCategory", "--json"]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("id");
      expect(data).to.have.property("name");
    });

    it("outputs success message", async () => {
      const { stdout } = await runCommand(["categories", "create", "--name=TestCategory"]);
      expect(stdout).to.contain("Created category");
    });

    it("supports optional flags", async () => {
      const { stdout } = await runCommand([
        "categories",
        "create",
        "--name=IncomeCategory",
        "--is-income",
        "--description=Monthly",
        "--json",
      ]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("id");
    });
  });

  describe("categories update", () => {
    it("updates a category and returns JSON", async () => {
      const { stdout } = await runCommand(["categories", "update", "86", "--name=Updated", "--json"]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("id");
    });
  });

  describe("categories delete", () => {
    it("deletes a category and confirms", async () => {
      const { stdout } = await runCommand(["categories", "delete", "86"]);
      expect(stdout).to.contain("Deleted category");
    });

    it("supports --force flag", async () => {
      const { stdout } = await runCommand(["categories", "delete", "86", "--force"]);
      expect(stdout).to.contain("Deleted category");
    });
  });
});
