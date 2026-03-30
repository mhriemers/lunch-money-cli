/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import TagsGet from "../../../src/commands/tags/get.js";
import { expectFixture, runCommand } from "../../helpers/index.js";

describe("tags get", () => {
  it("returns tag as JSON", async () => {
    const data = { id: 5, name: "Travel", description: "Travel expenses" };
    const { result, client } = await runCommand(TagsGet, ["5", "--json"], (c) => {
      c.tags.get.resolves(data);
    });
    expect(result).to.deep.equal(data);
    expect(client.tags.get.calledOnceWith(5)).to.be.true;
  });

  it("formats tag detail as text", async () => {
    const { stdout } = await runCommand(TagsGet, ["5"], (c) => {
      c.tags.get.resolves({
        archived: false,
        background_color: null,
        description: null,
        id: 5,
        name: "Travel",
        text_color: null,
      });
    });
    expectFixture(stdout, "tags/get-detail");
  });
});
