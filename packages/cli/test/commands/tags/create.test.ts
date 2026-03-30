/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import TagsCreate from "../../../src/commands/tags/create.js";
import { runCommand } from "../../helpers/index.js";

describe("tags create", () => {
  it("creates with required name flag", async () => {
    const created = { id: 10, name: "Food" };
    const { result, client } = await runCommand(
      TagsCreate,
      ["--name", "Food", "--json"],
      (c) => { c.tags.create.resolves(created); },
    );
    expect(result).to.deep.equal(created);
    expect(client.tags.create.firstCall.args[0]).to.include({ name: "Food" });
  });

  it("maps optional flags", async () => {
    const { client } = await runCommand(
      TagsCreate,
      ["--name", "X", "--description", "Desc", "--text-color", "333", "--background-color", "FFE7D4", "--archived", "--json"],
      (c) => { c.tags.create.resolves({ id: 1, name: "X" }); },
    );
    const body = client.tags.create.firstCall.args[0];
    expect(body.description).to.equal("Desc");
    expect(body.text_color).to.equal("333");
    expect(body.background_color).to.equal("FFE7D4");
    expect(body.archived).to.be.true;
  });

  it("shows confirmation message", async () => {
    const { stdout } = await runCommand(
      TagsCreate,
      ["--name", "Food"],
      (c) => { c.tags.create.resolves({ id: 10, name: "Food" }); },
    );
    expect(stdout).to.equal('Created tag "Food" (ID: 10).\n');
  });
});
