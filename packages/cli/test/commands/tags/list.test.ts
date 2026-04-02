import { describe, expect, it, vi } from "vitest";

import TagsList from "../../../src/commands/tags/list.js";
import { fixture, mockClient, runCommand } from "../../setup.js";

describe("tags list", () => {
  it("returns tags as JSON", async () => {
    const data = [{ id: 1, name: "Travel" }];
    const getAll = vi.fn().mockResolvedValue(data);
    mockClient({ tags: { getAll } });

    const { result } = await runCommand(TagsList, ["--json"]);
    expect(result).toEqual(data);
    expect(getAll).toHaveBeenCalledOnce();
  });

  it("formats tags as a table", async () => {
    const getAll = vi.fn().mockResolvedValue([{ archived: false, id: 1, name: "Travel" }]);
    mockClient({ tags: { getAll } });

    const { stdout } = await runCommand(TagsList, []);
    await expect(stdout).toMatchFileSnapshot(fixture("tags/list-table"));
  });

  it("shows empty table message", async () => {
    mockClient({ tags: { getAll: vi.fn().mockResolvedValue([]) } });

    const { stdout } = await runCommand(TagsList, []);
    expect(stdout).toBe("No results.\n");
  });

  it("handles empty result", async () => {
    mockClient({ tags: { getAll: vi.fn().mockResolvedValue([]) } });

    const { result } = await runCommand(TagsList, ["--json"]);
    expect(result).toEqual([]);
  });
});
