import { describe, expect, it, vi } from "vitest";

import CategoriesCreate from "../../../src/commands/categories/create.js";
import { mockClient, runCommand } from "../../setup.js";

describe("categories create", () => {
  it("creates with required name flag", async () => {
    const created = { id: 50, name: "Food" };
    const create = vi.fn().mockResolvedValue(created);
    mockClient({ categories: { create } });

    const { result } = await runCommand(CategoriesCreate, ["--name", "Food", "--json"]);
    expect(result).toEqual(created);
    expect(create.mock.calls[0][0]).toMatchObject({ name: "Food" });
  });

  it("maps optional boolean flags", async () => {
    const create = vi.fn().mockResolvedValue({ id: 1, name: "X" });
    mockClient({ categories: { create } });

    await runCommand(
      CategoriesCreate,
      ["--name", "X", "--is-income", "--exclude-from-budget", "--exclude-from-totals", "--archived", "--json"],
    );
    const body = create.mock.calls[0][0];
    expect(body.is_income).toBe(true);
    expect(body.exclude_from_budget).toBe(true);
    expect(body.exclude_from_totals).toBe(true);
    expect(body.archived).toBe(true);
  });

  it("maps --is-group and --children flags", async () => {
    const create = vi.fn().mockResolvedValue({ id: 1, name: "Grp" });
    mockClient({ categories: { create } });

    await runCommand(
      CategoriesCreate,
      ["--name", "Grp", "--is-group", "--children", "[123, 456]", "--json"],
    );
    const body = create.mock.calls[0][0];
    expect(body.is_group).toBe(true);
    expect(body.children).toEqual([123, 456]);
  });

  it("maps --group-id and --order flags", async () => {
    const create = vi.fn().mockResolvedValue({ id: 1, name: "X" });
    mockClient({ categories: { create } });

    await runCommand(
      CategoriesCreate,
      ["--name", "X", "--group-id", "5", "--order", "3", "--json"],
    );
    const body = create.mock.calls[0][0];
    expect(body.group_id).toBe(5);
    expect(body.order).toBe(3);
  });

  it("shows confirmation message", async () => {
    const create = vi.fn().mockResolvedValue({ id: 50, name: "Food" });
    mockClient({ categories: { create } });

    const { stdout } = await runCommand(CategoriesCreate, ["--name", "Food"]);
    expect(stdout).toBe('Created category "Food" (ID: 50).\n');
  });
});
