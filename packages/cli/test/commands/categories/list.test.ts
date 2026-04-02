import { describe, expect, it, vi } from "vitest";

import CategoriesList from "../../../src/commands/categories/list.js";
import { fixture, mockClient, runCommand } from "../../setup.js";

describe("categories list", () => {
  it("returns categories as JSON", async () => {
    const data = [{ id: 1, is_group: false, name: "Food" }];
    const getAll = vi.fn().mockResolvedValue(data);
    mockClient({ categories: { getAll } });

    const { result } = await runCommand(CategoriesList, ["--json"]);
    expect(result).toEqual(data);
  });

  it("formats categories as a table", async () => {
    const getAll = vi
      .fn()
      .mockResolvedValue([{ archived: false, id: 1, is_group: false, is_income: false, name: "Food" }]);
    mockClient({ categories: { getAll } });

    const { stdout } = await runCommand(CategoriesList, []);
    await expect(stdout).toMatchFileSnapshot(fixture("categories/list-table"));
  });

  it("shows empty table message", async () => {
    mockClient({ categories: { getAll: vi.fn().mockResolvedValue([]) } });

    const { stdout } = await runCommand(CategoriesList, []);
    expect(stdout).toBe("No results.\n");
  });

  it("passes --flatten as format=flattened", async () => {
    const getAll = vi.fn().mockResolvedValue([]);
    mockClient({ categories: { getAll } });

    await runCommand(CategoriesList, ["--flatten", "--json"]);
    expect(getAll.mock.calls[0][0]).toMatchObject({ format: "flattened" });
  });

  it("passes --is-group true as boolean", async () => {
    const getAll = vi.fn().mockResolvedValue([]);
    mockClient({ categories: { getAll } });

    await runCommand(CategoriesList, ["--is-group", "true", "--json"]);
    expect(getAll.mock.calls[0][0]).toMatchObject({ is_group: true });
  });

  it("passes --is-group false as boolean", async () => {
    const getAll = vi.fn().mockResolvedValue([]);
    mockClient({ categories: { getAll } });

    await runCommand(CategoriesList, ["--is-group", "false", "--json"]);
    expect(getAll.mock.calls[0][0]).toMatchObject({ is_group: false });
  });

  it("calls getAll with empty params when no flags", async () => {
    const getAll = vi.fn().mockResolvedValue([]);
    mockClient({ categories: { getAll } });

    await runCommand(CategoriesList, ["--json"]);
    expect(getAll.mock.calls[0][0]).toEqual({});
  });

  it("passes both --flatten and --is-group together", async () => {
    const getAll = vi.fn().mockResolvedValue([]);
    mockClient({ categories: { getAll } });

    await runCommand(CategoriesList, ["--flatten", "--is-group", "true", "--json"]);
    const parameters = getAll.mock.calls[0][0];
    expect(parameters.format).toBe("flattened");
    expect(parameters.is_group).toBe(true);
  });
});
