/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import TagsList from "../../../src/commands/tags/list.js";
import { expectFixture, runCommand } from "../../helpers/index.js";

describe("tags list", () => {
  it("returns tags as JSON", async () => {
    const data = [{ id: 1, name: "Travel" }];
    const { result } = await runCommand(TagsList, ["--json"], (c) => {
      c.tags.getAll.resolves(data);
    });
    expect(result).to.deep.equal(data);
  });

  it("formats tags as a table", async () => {
    const { stdout } = await runCommand(TagsList, [], (c) => {
      c.tags.getAll.resolves([{ id: 1, name: "Travel", archived: false }]);
    });
    expectFixture(stdout, "tags/list-table");
  });

  it("shows empty table message", async () => {
    const { stdout } = await runCommand(TagsList, [], (c) => {
      c.tags.getAll.resolves([]);
    });
    expect(stdout).to.equal("No results.\n");
  });

  it("handles empty result", async () => {
    const { result } = await runCommand(TagsList, ["--json"]);
    expect(result).to.deep.equal([]);
  });
});
