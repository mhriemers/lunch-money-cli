/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import CategoriesCreate from "../../../src/commands/categories/create.js";
import { runCommand } from "../../helpers/index.js";

describe("categories create", () => {
  it("creates with required name flag", async () => {
    const created = { id: 50, name: "Food" };
    const { result, client } = await runCommand(CategoriesCreate, ["--name", "Food", "--json"], (c) => {
      c.categories.create.resolves(created);
    });
    expect(result).to.deep.equal(created);
    expect(client.categories.create.firstCall.args[0]).to.include({ name: "Food" });
  });

  it("maps optional boolean flags", async () => {
    const { client } = await runCommand(
      CategoriesCreate,
      ["--name", "X", "--is-income", "--exclude-from-budget", "--exclude-from-totals", "--archived", "--json"],
      (c) => {
        c.categories.create.resolves({ id: 1, name: "X" });
      },
    );
    const body = client.categories.create.firstCall.args[0];
    expect(body.is_income).to.be.true;
    expect(body.exclude_from_budget).to.be.true;
    expect(body.exclude_from_totals).to.be.true;
    expect(body.archived).to.be.true;
  });

  it("maps --is-group and --children flags", async () => {
    const { client } = await runCommand(
      CategoriesCreate,
      ["--name", "Grp", "--is-group", "--children", "[123, 456]", "--json"],
      (c) => {
        c.categories.create.resolves({ id: 1, name: "Grp" });
      },
    );
    const body = client.categories.create.firstCall.args[0];
    expect(body.is_group).to.be.true;
    expect(body.children).to.deep.equal([123, 456]);
  });

  it("maps --group-id and --order flags", async () => {
    const { client } = await runCommand(
      CategoriesCreate,
      ["--name", "X", "--group-id", "5", "--order", "3", "--json"],
      (c) => {
        c.categories.create.resolves({ id: 1, name: "X" });
      },
    );
    const body = client.categories.create.firstCall.args[0];
    expect(body.group_id).to.equal(5);
    expect(body.order).to.equal(3);
  });

  it("shows confirmation message", async () => {
    const { stdout } = await runCommand(CategoriesCreate, ["--name", "Food"], (c) => {
      c.categories.create.resolves({ id: 50, name: "Food" });
    });
    expect(stdout).to.equal('Created category "Food" (ID: 50).\n');
  });
});
