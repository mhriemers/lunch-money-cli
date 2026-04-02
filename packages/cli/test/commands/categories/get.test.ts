import { describe, expect, it, vi } from "vitest";

import CategoriesGet from "../../../src/commands/categories/get.js";
import { fixture, mockClient, runCommand } from "../../setup.js";

describe("categories get", () => {
  it("returns category as JSON", async () => {
    const data = { id: 10, is_group: false, name: "Food" };
    const get = vi.fn().mockResolvedValue(data);
    mockClient({ categories: { get } });

    const { result } = await runCommand(CategoriesGet, ["10", "--json"]);
    expect(result).toEqual(data);
    expect(get.mock.calls[0][0]).toBe(10);
  });

  it("formats category detail as text", async () => {
    const get = vi.fn().mockResolvedValue({
      archived: false,
      created_at: "2024-01-15T12:00:00.000Z",
      description: null,
      exclude_from_budget: false,
      exclude_from_totals: false,
      group_id: null,
      id: 10,
      is_group: false,
      is_income: false,
      name: "Transport",
      order: null,
    });
    mockClient({ categories: { get } });

    const { stdout } = await runCommand(CategoriesGet, ["10"]);
    await expect(stdout).toMatchFileSnapshot(fixture("categories/get-detail"));
  });
});
