import { describe, expect, it, vi } from "vitest";

import CategoriesUpdate from "../../../src/commands/categories/update.js";
import { mockClient, runCommand } from "../../setup.js";

describe("categories update", () => {
  it("updates with name flag", async () => {
    const update = vi.fn().mockResolvedValue({ id: 10 });
    mockClient({ categories: { update } });

    await runCommand(CategoriesUpdate, ["10", "--name", "Renamed", "--json"]);
    const [id, body] = update.mock.calls[0];
    expect(id).toBe(10);
    expect(body.name).toBe("Renamed");
  });

  it("converts boolean string flags", async () => {
    const update = vi.fn().mockResolvedValue({ id: 10 });
    mockClient({ categories: { update } });

    await runCommand(CategoriesUpdate, [
      "10",
      "--is-income",
      "true",
      "--exclude-from-budget",
      "false",
      "--archived",
      "true",
      "--json",
    ]);
    const body = update.mock.calls[0][1];
    expect(body.is_income).toBe(true);
    expect(body.exclude_from_budget).toBe(false);
    expect(body.archived).toBe(true);
  });

  it("converts group-id 'null' to null", async () => {
    const update = vi.fn().mockResolvedValue({ id: 10 });
    mockClient({ categories: { update } });

    await runCommand(CategoriesUpdate, ["10", "--group-id", "null", "--json"]);
    expect(update.mock.calls[0][1].group_id).toBeNull();
  });

  it("converts group-id to integer", async () => {
    const update = vi.fn().mockResolvedValue({ id: 10 });
    mockClient({ categories: { update } });

    await runCommand(CategoriesUpdate, ["10", "--group-id", "5", "--json"]);
    expect(update.mock.calls[0][1].group_id).toBe(5);
  });

  it("converts order 'null' to null", async () => {
    const update = vi.fn().mockResolvedValue({ id: 10 });
    mockClient({ categories: { update } });

    await runCommand(CategoriesUpdate, ["10", "--order", "null", "--json"]);
    expect(update.mock.calls[0][1].order).toBeNull();
  });

  it("converts collapsed 'null' to null", async () => {
    const update = vi.fn().mockResolvedValue({ id: 10 });
    mockClient({ categories: { update } });

    await runCommand(CategoriesUpdate, ["10", "--collapsed", "null", "--json"]);
    expect(update.mock.calls[0][1].collapsed).toBeNull();
  });

  it("parses --children as JSON", async () => {
    const update = vi.fn().mockResolvedValue({ id: 10 });
    mockClient({ categories: { update } });

    await runCommand(CategoriesUpdate, ["10", "--children", "[1, 2, 3]", "--json"]);
    expect(update.mock.calls[0][1].children).toEqual([1, 2, 3]);
  });

  it("shows confirmation message", async () => {
    const update = vi.fn().mockResolvedValue({ id: 10 });
    mockClient({ categories: { update } });

    const { stdout } = await runCommand(CategoriesUpdate, ["10", "--name", "X"]);
    expect(stdout).toBe("Updated category 10.\n");
  });
});
