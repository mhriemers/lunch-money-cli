import { describe, expect, it, vi } from "vitest";

import TagsUpdate from "../../../src/commands/tags/update.js";
import { mockClient, runCommand } from "../../setup.js";

describe("tags update", () => {
  it("updates with name flag", async () => {
    const update = vi.fn().mockResolvedValue({ id: 5 });
    mockClient({ tags: { update } });

    await runCommand(TagsUpdate, ["5", "--name", "Renamed", "--json"]);
    const [id, body] = update.mock.calls[0];
    expect(id).toBe(5);
    expect(body.name).toBe("Renamed");
  });

  it("converts color 'null' to null", async () => {
    const update = vi.fn().mockResolvedValue({ id: 5 });
    mockClient({ tags: { update } });

    await runCommand(
      TagsUpdate,
      ["5", "--text-color", "null", "--background-color", "null", "--json"],
    );
    const body = update.mock.calls[0][1];
    expect(body.text_color).toBeNull();
    expect(body.background_color).toBeNull();
  });

  it("passes color values when not null", async () => {
    const update = vi.fn().mockResolvedValue({ id: 5 });
    mockClient({ tags: { update } });

    await runCommand(
      TagsUpdate,
      ["5", "--text-color", "333", "--background-color", "FFE7D4", "--json"],
    );
    const body = update.mock.calls[0][1];
    expect(body.text_color).toBe("333");
    expect(body.background_color).toBe("FFE7D4");
  });

  it("converts archived boolean string", async () => {
    const update = vi.fn().mockResolvedValue({ id: 5 });
    mockClient({ tags: { update } });

    await runCommand(TagsUpdate, ["5", "--archived", "true", "--json"]);
    expect(update.mock.calls[0][1].archived).toBe(true);
  });

  it("shows confirmation message", async () => {
    const update = vi.fn().mockResolvedValue({ id: 5 });
    mockClient({ tags: { update } });

    const { stdout } = await runCommand(TagsUpdate, ["5", "--name", "X"]);
    expect(stdout).toBe("Updated tag 5.\n");
  });
});
