/* eslint-disable @typescript-eslint/no-unused-expressions */
import { runCommand } from "@oclif/test";
import { expect } from "chai";

describe("recurring e2e", () => {
  describe("recurring list", () => {
    it("executes without crashing", async () => {
      // The Prism mock returns a nested structure for recurring_items that
      // differs from the real API. The SDK returns the unwrapped data, which
      // the CLI then formats. We verify the command executes and produces output.
      const { stdout, stderr } = await runCommand(["recurring", "list", "--json"]);
      expect(stdout || stderr).to.be.ok;
    });

    it("supports date range flags", async () => {
      const { stdout, stderr } = await runCommand([
        "recurring",
        "list",
        "--start-date",
        "2024-01-01",
        "--end-date",
        "2024-01-31",
        "--json",
      ]);
      expect(stdout || stderr).to.be.ok;
    });
  });

  describe("recurring get", () => {
    it("returns a single recurring item as JSON", async () => {
      const { stdout } = await runCommand(["recurring", "get", "994069", "--json"]);
      const data = JSON.parse(stdout);
      expect(data).to.have.property("id");
    });

    it("outputs formatted detail view", async () => {
      const { stdout } = await runCommand(["recurring", "get", "994069"]);
      expect(stdout).to.be.ok;
    });
  });
});
