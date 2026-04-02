import { describe, expect, it, vi } from "vitest";

import CategoriesDelete from "../../../src/commands/categories/delete.js";
import { mockClient, runCommand } from "../../setup.js";

describe("categories delete", () => {
  it("deletes category by ID", async () => {
    const deleteFunction = vi.fn().mockResolvedValue({ deleted_id: 10, success: true });
    mockClient({ categories: { delete: deleteFunction } });

    const { result } = await runCommand(CategoriesDelete, ["10", "--json"]);
    expect(result).toEqual({ deleted_id: 10, success: true });
    expect(deleteFunction).toHaveBeenCalledOnce();
    expect(deleteFunction.mock.calls[0][0]).toBe(10);
  });

  it("passes --force flag", async () => {
    const deleteFunction = vi.fn().mockResolvedValue({ deleted_id: 10, success: true });
    mockClient({ categories: { delete: deleteFunction } });

    await runCommand(CategoriesDelete, ["10", "--force", "--json"]);
    expect(deleteFunction.mock.calls[0][1]).toMatchObject({ force: true });
  });

  it("omits force when not set", async () => {
    const deleteFunction = vi.fn().mockResolvedValue({ deleted_id: 10, success: true });
    mockClient({ categories: { delete: deleteFunction } });

    await runCommand(CategoriesDelete, ["10", "--json"]);
    expect(deleteFunction.mock.calls[0][1]).toEqual({});
  });

  it("shows confirmation message", async () => {
    const deleteFunction = vi.fn().mockResolvedValue({ deleted_id: 10, success: true });
    mockClient({ categories: { delete: deleteFunction } });

    const { stdout } = await runCommand(CategoriesDelete, ["10"]);
    expect(stdout).toBe("Deleted category 10.\n");
  });
});
