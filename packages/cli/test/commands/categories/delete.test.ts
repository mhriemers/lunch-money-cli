import { describe, expect, it, vi } from "vitest";

import CategoriesDelete from "../../../src/commands/categories/delete.js";
import { mockClient, runCommand } from "../../setup.js";

describe("categories delete", () => {
  it("deletes category by ID", async () => {
    const deleteFn = vi.fn().mockResolvedValue({ deleted_id: 10, success: true });
    mockClient({ categories: { delete: deleteFn } });

    const { result } = await runCommand(CategoriesDelete, ["10", "--json"]);
    expect(result).toEqual({ deleted_id: 10, success: true });
    expect(deleteFn).toHaveBeenCalledOnce();
    expect(deleteFn.mock.calls[0][0]).toBe(10);
  });

  it("passes --force flag", async () => {
    const deleteFn = vi.fn().mockResolvedValue({ deleted_id: 10, success: true });
    mockClient({ categories: { delete: deleteFn } });

    await runCommand(CategoriesDelete, ["10", "--force", "--json"]);
    expect(deleteFn.mock.calls[0][1]).toMatchObject({ force: true });
  });

  it("omits force when not set", async () => {
    const deleteFn = vi.fn().mockResolvedValue({ deleted_id: 10, success: true });
    mockClient({ categories: { delete: deleteFn } });

    await runCommand(CategoriesDelete, ["10", "--json"]);
    expect(deleteFn.mock.calls[0][1]).toEqual({});
  });

  it("shows confirmation message", async () => {
    const deleteFn = vi.fn().mockResolvedValue({ deleted_id: 10, success: true });
    mockClient({ categories: { delete: deleteFn } });

    const { stdout } = await runCommand(CategoriesDelete, ["10"]);
    expect(stdout).toBe("Deleted category 10.\n");
  });
});
