/* eslint-disable @typescript-eslint/no-unused-expressions */
import { runCommand } from "@oclif/test";
import { expect } from "chai";

describe("summary e2e", () => {
  describe("summary get", () => {
    it("returns summary as JSON", async () => {
      const { stdout } = await runCommand([
        "summary",
        "get",
        "--start-date",
        "2024-01-01",
        "--end-date",
        "2024-01-31",
        "--json",
      ]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("categories").that.is.an("array");
    });

    it("outputs a formatted table", async () => {
      const { stdout } = await runCommand([
        "summary",
        "get",
        "--start-date",
        "2024-01-01",
        "--end-date",
        "2024-01-31",
      ]);
      expect(stdout).to.be.ok;
    });

    it("supports optional include flags", async () => {
      const { stdout } = await runCommand([
        "summary",
        "get",
        "--start-date",
        "2024-01-01",
        "--end-date",
        "2024-01-31",
        "--include-totals",
        "--include-occurrences",
        "--json",
      ]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("categories");
    });
  });
});
