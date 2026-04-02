import { describe, expect, it, vi } from "vitest";

import TagsCreate from "../../../src/commands/tags/create.js";
import { mockClient, runCommand } from "../../setup.js";

describe("tags create", () => {
  it("creates with required name flag", async () => {
    const created = { id: 10, name: "Food" };
    const create = vi.fn().mockResolvedValue(created);
    mockClient({ tags: { create } });

    const { result } = await runCommand(TagsCreate, ["--name", "Food", "--json"]);
    expect(result).toEqual(created);
    expect(create.mock.calls[0][0]).toMatchObject({ name: "Food" });
  });

  it("maps optional flags", async () => {
    const create = vi.fn().mockResolvedValue({ id: 1, name: "X" });
    mockClient({ tags: { create } });

    await runCommand(
      TagsCreate,
      [
        "--name",
        "X",
        "--description",
        "Desc",
        "--text-color",
        "333",
        "--background-color",
        "FFE7D4",
        "--archived",
        "--json",
      ],
    );
    const body = create.mock.calls[0][0];
    expect(body.description).toBe("Desc");
    expect(body.text_color).toBe("333");
    expect(body.background_color).toBe("FFE7D4");
    expect(body.archived).toBe(true);
  });

  it("shows confirmation message", async () => {
    const create = vi.fn().mockResolvedValue({ id: 10, name: "Food" });
    mockClient({ tags: { create } });

    const { stdout } = await runCommand(TagsCreate, ["--name", "Food"]);
    expect(stdout).toBe('Created tag "Food" (ID: 10).\n');
  });
});
