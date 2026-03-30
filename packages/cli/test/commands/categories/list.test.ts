/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import CategoriesList from "../../../src/commands/categories/list.js";
import { expectFixture, runCommand } from "../../helpers/index.js";

describe("categories list", () => {
  it("returns categories as JSON", async () => {
    const data = [{ id: 1, name: "Food", is_group: false }];
    const { result } = await runCommand(CategoriesList, ["--json"], (c) => {
      c.categories.getAll.resolves(data);
    });
    expect(result).to.deep.equal(data);
  });

  it("formats categories as a table", async () => {
    const { stdout } = await runCommand(CategoriesList, [], (c) => {
      c.categories.getAll.resolves([{ id: 1, name: "Food", is_group: false, is_income: false, archived: false }]);
    });
    expectFixture(stdout, "categories/list-table");
  });

  it("shows empty table message", async () => {
    const { stdout } = await runCommand(CategoriesList, [], (c) => {
      c.categories.getAll.resolves([]);
    });
    expect(stdout).to.equal("No results.\n");
  });

  it("passes --flatten as format=flattened", async () => {
    const { client } = await runCommand(CategoriesList, ["--flatten", "--json"]);
    expect(client.categories.getAll.firstCall.args[0]).to.deep.include({ format: "flattened" });
  });

  it("passes --is-group true as boolean", async () => {
    const { client } = await runCommand(CategoriesList, ["--is-group", "true", "--json"]);
    expect(client.categories.getAll.firstCall.args[0]).to.deep.include({ is_group: true });
  });

  it("passes --is-group false as boolean", async () => {
    const { client } = await runCommand(CategoriesList, ["--is-group", "false", "--json"]);
    expect(client.categories.getAll.firstCall.args[0]).to.deep.include({ is_group: false });
  });

  it("calls getAll with empty params when no flags", async () => {
    const { client } = await runCommand(CategoriesList, ["--json"]);
    expect(client.categories.getAll.firstCall.args[0]).to.deep.equal({});
  });
});
