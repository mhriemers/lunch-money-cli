import { describe, expect, it, vi } from "vitest";

import TagsGet from "../../../src/commands/tags/get.js";
import { fixture, mockClient, runCommand } from "../../setup.js";

describe("tags get", () => {
  it("returns tag as JSON", async () => {
    const data = { description: "Travel expenses", id: 5, name: "Travel" };
    const get = vi.fn().mockResolvedValue(data);
    mockClient({ tags: { get } });

    const { result } = await runCommand(TagsGet, ["5", "--json"]);
    expect(result).toEqual(data);
    expect(get.mock.calls[0][0]).toBe(5);
  });

  it("formats tag detail as text", async () => {
    const get = vi.fn().mockResolvedValue({
      archived: false,
      background_color: null,
      description: null,
      id: 5,
      name: "Travel",
      text_color: null,
    });
    mockClient({ tags: { get } });

    const { stdout } = await runCommand(TagsGet, ["5"]);
    await expect(stdout).toMatchFileSnapshot(fixture("tags/get-detail"));
  });
});
