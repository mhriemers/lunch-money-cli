/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import CategoriesDelete from "../../../src/commands/categories/delete.js";
import { runCommand } from "../../helpers/index.js";

describe("categories delete", () => {
  it("deletes category by ID", async () => {
    const { result, client } = await runCommand(CategoriesDelete, ["10", "--json"]);
    expect(result).to.deep.equal({ deleted_id: 10, success: true });
    expect(client.categories.delete.calledOnce).to.be.true;
    expect(client.categories.delete.firstCall.args[0]).to.equal(10);
  });

  it("passes --force flag", async () => {
    const { client } = await runCommand(CategoriesDelete, ["10", "--force", "--json"]);
    expect(client.categories.delete.firstCall.args[1]).to.deep.include({ force: true });
  });

  it("omits force when not set", async () => {
    const { client } = await runCommand(CategoriesDelete, ["10", "--json"]);
    expect(client.categories.delete.firstCall.args[1]).to.deep.equal({});
  });

  it("shows confirmation message", async () => {
    const { stdout } = await runCommand(CategoriesDelete, ["10"]);
    expect(stdout).to.equal("Deleted category 10.\n");
  });
});
