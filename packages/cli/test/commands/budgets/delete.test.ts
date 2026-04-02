import { describe, expect, it, vi } from "vitest";

import BudgetsDelete from "../../../src/commands/budgets/delete.js";
import { mockClient, runCommand } from "../../setup.js";

describe("budgets delete", () => {
  it("deletes budget by category and start date", async () => {
    const deleteFn = vi.fn();
    mockClient({ budgets: { delete: deleteFn } });

    const { result } = await runCommand(BudgetsDelete, [
      "--category-id",
      "10",
      "--start-date",
      "2025-01-01",
      "--json",
    ]);
    expect(result).toEqual({ message: "Budget deleted", success: true });
    expect(deleteFn).toHaveBeenCalledOnce();
    expect(deleteFn.mock.calls[0][0]).toEqual({
      category_id: 10,
      start_date: "2025-01-01",
    });
  });

  it("shows confirmation message", async () => {
    mockClient({ budgets: { delete: vi.fn() } });

    const { stdout } = await runCommand(BudgetsDelete, ["--category-id", "10", "--start-date", "2025-01-01"]);
    expect(stdout).toBe("Deleted budget for category 10 starting 2025-01-01.\n");
  });
});
