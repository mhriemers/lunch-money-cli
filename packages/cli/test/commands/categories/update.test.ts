/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import CategoriesUpdate from "../../../src/commands/categories/update.js";
import { runCommand } from "../../helpers/index.js";

describe("categories update", () => {
  it("updates with name flag", async () => {
    const { client } = await runCommand(CategoriesUpdate, ["10", "--name", "Renamed", "--json"], (c) => {
      c.categories.update.resolves({ id: 10 });
    });
    const [id, body] = client.categories.update.firstCall.args;
    expect(id).to.equal(10);
    expect(body.name).to.equal("Renamed");
  });

  it("converts boolean string flags", async () => {
    const { client } = await runCommand(
      CategoriesUpdate,
      ["10", "--is-income", "true", "--exclude-from-budget", "false", "--archived", "true", "--json"],
      (c) => {
        c.categories.update.resolves({ id: 10 });
      },
    );
    const body = client.categories.update.firstCall.args[1];
    expect(body.is_income).to.be.true;
    expect(body.exclude_from_budget).to.be.false;
    expect(body.archived).to.be.true;
  });

  it("converts group-id 'null' to null", async () => {
    const { client } = await runCommand(CategoriesUpdate, ["10", "--group-id", "null", "--json"], (c) => {
      c.categories.update.resolves({ id: 10 });
    });
    expect(client.categories.update.firstCall.args[1].group_id).to.be.null;
  });

  it("converts group-id to integer", async () => {
    const { client } = await runCommand(CategoriesUpdate, ["10", "--group-id", "5", "--json"], (c) => {
      c.categories.update.resolves({ id: 10 });
    });
    expect(client.categories.update.firstCall.args[1].group_id).to.equal(5);
  });

  it("converts order 'null' to null", async () => {
    const { client } = await runCommand(CategoriesUpdate, ["10", "--order", "null", "--json"], (c) => {
      c.categories.update.resolves({ id: 10 });
    });
    expect(client.categories.update.firstCall.args[1].order).to.be.null;
  });

  it("converts collapsed 'null' to null", async () => {
    const { client } = await runCommand(CategoriesUpdate, ["10", "--collapsed", "null", "--json"], (c) => {
      c.categories.update.resolves({ id: 10 });
    });
    expect(client.categories.update.firstCall.args[1].collapsed).to.be.null;
  });

  it("parses --children as JSON", async () => {
    const { client } = await runCommand(CategoriesUpdate, ["10", "--children", "[1, 2, 3]", "--json"], (c) => {
      c.categories.update.resolves({ id: 10 });
    });
    expect(client.categories.update.firstCall.args[1].children).to.deep.equal([1, 2, 3]);
  });

  it("shows confirmation message", async () => {
    const { stdout } = await runCommand(CategoriesUpdate, ["10", "--name", "X"], (c) => {
      c.categories.update.resolves({ id: 10 });
    });
    expect(stdout).to.equal("Updated category 10.\n");
  });
});
