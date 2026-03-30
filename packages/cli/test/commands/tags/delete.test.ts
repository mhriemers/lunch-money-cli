 
import { expect } from "chai";

import TagsDelete from "../../../src/commands/tags/delete.js";
import { runCommand } from "../../helpers/index.js";

describe("tags delete", () => {
  it("deletes tag by ID", async () => {
    const { client, result } = await runCommand(TagsDelete, ["5", "--json"]);
    expect(result).to.deep.equal({ deleted_id: 5, success: true });
    expect(client.tags.delete.firstCall.args[0]).to.equal(5);
  });

  it("passes --force flag", async () => {
    const { client } = await runCommand(TagsDelete, ["5", "--force", "--json"]);
    expect(client.tags.delete.firstCall.args[1]).to.deep.include({ force: true });
  });

  it("omits force when not set", async () => {
    const { client } = await runCommand(TagsDelete, ["5", "--json"]);
    expect(client.tags.delete.firstCall.args[1]).to.deep.equal({});
  });

  it("shows confirmation message", async () => {
    const { stdout } = await runCommand(TagsDelete, ["5"]);
    expect(stdout).to.equal("Deleted tag 5.\n");
  });
});
