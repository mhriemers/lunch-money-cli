import { describe, expect, it, vi } from "vitest";

import TagsDelete from "../../../src/commands/tags/delete.js";
import { mockClient, runCommand } from "../../setup.js";

describe("tags delete", () => {
  it("deletes tag by ID", async () => {
    const deleteFunction = vi.fn().mockResolvedValue({ deleted_id: 5, success: true });
    mockClient({ tags: { delete: deleteFunction } });

    const { result } = await runCommand(TagsDelete, ["5", "--json"]);
    expect(result).toEqual({ deleted_id: 5, success: true });
    expect(deleteFunction.mock.calls[0][0]).toBe(5);
  });

  it("passes --force flag", async () => {
    const deleteFunction = vi.fn().mockResolvedValue({ deleted_id: 5, success: true });
    mockClient({ tags: { delete: deleteFunction } });

    await runCommand(TagsDelete, ["5", "--force", "--json"]);
    expect(deleteFunction.mock.calls[0][1]).toMatchObject({ force: true });
  });

  it("omits force when not set", async () => {
    const deleteFunction = vi.fn().mockResolvedValue({ deleted_id: 5, success: true });
    mockClient({ tags: { delete: deleteFunction } });

    await runCommand(TagsDelete, ["5", "--json"]);
    expect(deleteFunction.mock.calls[0][1]).toEqual({});
  });

  it("shows confirmation message", async () => {
    const deleteFunction = vi.fn().mockResolvedValue({ deleted_id: 5, success: true });
    mockClient({ tags: { delete: deleteFunction } });

    const { stdout } = await runCommand(TagsDelete, ["5"]);
    expect(stdout).toBe("Deleted tag 5.\n");
  });
});
