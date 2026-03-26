/* eslint-disable @typescript-eslint/no-unused-expressions */
import { runCommand } from "@oclif/test";
import { expect } from "chai";

describe("tags e2e", () => {
  describe("tags list", () => {
    it("returns tags as JSON", async () => {
      const { stdout } = await runCommand(["tags", "list", "--json"]);
      const data = JSON.parse(stdout);
      expect(data).to.be.an("array").with.length.greaterThan(0);
      expect(data[0]).to.have.property("id");
      expect(data[0]).to.have.property("name");
    });

    it("outputs a formatted table", async () => {
      const { stdout } = await runCommand(["tags", "list"]);
      expect(stdout).to.contain("ID");
      expect(stdout).to.contain("Name");
    });
  });

  describe("tags get", () => {
    it("returns a single tag as JSON", async () => {
      const { stdout } = await runCommand(["tags", "get", "94317", "--json"]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("id");
      expect(data).to.have.property("name");
    });

    it("outputs formatted detail view", async () => {
      const { stdout } = await runCommand(["tags", "get", "94317"]);
      expect(stdout).to.contain("Name");
    });
  });

  describe("tags create", () => {
    it("creates a tag and returns JSON", async () => {
      const { stdout } = await runCommand(["tags", "create", "--name=TestTag", "--json"]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("id");
      expect(data).to.have.property("name");
    });

    it("outputs success message", async () => {
      const { stdout } = await runCommand(["tags", "create", "--name=TestTag"]);
      expect(stdout).to.contain("Created tag");
    });

    it("supports optional flags", async () => {
      const { stdout } = await runCommand([
        "tags",
        "create",
        "--name=ColoredTag",
        "--description=Tagged",
        "--text-color=333",
        "--background-color=fff",
        "--json",
      ]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("id");
    });
  });

  describe("tags update", () => {
    it("updates a tag and returns JSON", async () => {
      const { stdout } = await runCommand(["tags", "update", "94317", "--name=UpdatedTag", "--json"]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("id");
    });
  });

  describe("tags delete", () => {
    it("deletes a tag and confirms", async () => {
      const { stdout } = await runCommand(["tags", "delete", "94317"]);
      expect(stdout).to.contain("Deleted tag");
    });

    it("supports --force flag", async () => {
      const { stdout } = await runCommand(["tags", "delete", "94317", "--force"]);
      expect(stdout).to.contain("Deleted tag");
    });
  });
});
