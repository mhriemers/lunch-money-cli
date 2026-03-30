/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import TagsUpdate from "../../../src/commands/tags/update.js";
import { runCommand } from "../../helpers/index.js";

describe("tags update", () => {
  it("updates with name flag", async () => {
    const { client } = await runCommand(
      TagsUpdate,
      ["5", "--name", "Renamed", "--json"],
      (c) => { c.tags.update.resolves({ id: 5 }); },
    );
    const [id, body] = client.tags.update.firstCall.args;
    expect(id).to.equal(5);
    expect(body.name).to.equal("Renamed");
  });

  it("converts color 'null' to null", async () => {
    const { client } = await runCommand(
      TagsUpdate,
      ["5", "--text-color", "null", "--background-color", "null", "--json"],
      (c) => { c.tags.update.resolves({ id: 5 }); },
    );
    const body = client.tags.update.firstCall.args[1];
    expect(body.text_color).to.be.null;
    expect(body.background_color).to.be.null;
  });

  it("passes color values when not null", async () => {
    const { client } = await runCommand(
      TagsUpdate,
      ["5", "--text-color", "333", "--background-color", "FFE7D4", "--json"],
      (c) => { c.tags.update.resolves({ id: 5 }); },
    );
    const body = client.tags.update.firstCall.args[1];
    expect(body.text_color).to.equal("333");
    expect(body.background_color).to.equal("FFE7D4");
  });

  it("converts archived boolean string", async () => {
    const { client } = await runCommand(
      TagsUpdate,
      ["5", "--archived", "true", "--json"],
      (c) => { c.tags.update.resolves({ id: 5 }); },
    );
    expect(client.tags.update.firstCall.args[1].archived).to.be.true;
  });

  it("shows confirmation message", async () => {
    const { stdout } = await runCommand(
      TagsUpdate,
      ["5", "--name", "X"],
      (c) => { c.tags.update.resolves({ id: 5 }); },
    );
    expect(stdout).to.equal("Updated tag 5.\n");
  });
});
