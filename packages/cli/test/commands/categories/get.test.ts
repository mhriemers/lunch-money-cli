/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import CategoriesGet from "../../../src/commands/categories/get.js";
import { expectFixture, runCommand } from "../../helpers/index.js";

describe("categories get", () => {
  it("returns category as JSON", async () => {
    const data = { id: 10, is_group: false, name: "Food" };
    const { client, result } = await runCommand(CategoriesGet, ["10", "--json"], (c) => {
      c.categories.get.resolves(data);
    });
    expect(result).to.deep.equal(data);
    expect(client.categories.get.calledOnceWith(10)).to.be.true;
  });

  it("formats category detail as text", async () => {
    const { stdout } = await runCommand(CategoriesGet, ["10"], (c) => {
      c.categories.get.resolves({
        archived: false,
        created_at: "2024-01-15T12:00:00.000Z",
        description: null,
        exclude_from_budget: false,
        exclude_from_totals: false,
        group_id: null,
        id: 10,
        is_group: false,
        is_income: false,
        name: "Transport",
        order: null,
      });
    });
    expectFixture(stdout, "categories/get-detail");
  });
});
