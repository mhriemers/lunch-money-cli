/* eslint-disable @typescript-eslint/no-unused-expressions */
import { runCommand } from "@oclif/test";
import { expect } from "chai";

describe("user e2e", () => {
  describe("user me", () => {
    it("returns user details as JSON", async () => {
      const { stdout } = await runCommand(["user", "me", "--json"]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("name").that.is.a("string");
      expect(data).to.have.property("email").that.is.a("string");
      expect(data).to.have.property("id").that.is.a("number");
      expect(data).to.have.property("account_id").that.is.a("number");
      expect(data).to.have.property("budget_name").that.is.a("string");
      expect(data).to.have.property("primary_currency").that.is.a("string");
    });

    it("outputs formatted detail view", async () => {
      const { stdout } = await runCommand(["user", "me"]);
      expect(stdout).to.contain("Name");
      expect(stdout).to.contain("Email");
      expect(stdout).to.contain("Budget");
    });
  });
});
