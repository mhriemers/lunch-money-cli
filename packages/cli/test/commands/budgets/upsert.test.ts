import { describe, expect, it, vi } from "vitest";

import BudgetsUpsert from "../../../src/commands/budgets/upsert.js";
import { mockClient, runCommand } from "../../setup.js";

describe("budgets upsert", () => {
  it("creates budget with required flags", async () => {
    const response = { amount: 500, category_id: 10 };
    const upsert = vi.fn().mockResolvedValue(response);
    mockClient({ budgets: { upsert } });

    const { result } = await runCommand(
      BudgetsUpsert,
      ["--amount", "500", "--category-id", "10", "--start-date", "2025-01-01", "--json"],
    );
    expect(result).toEqual(response);
    const body = upsert.mock.calls[0][0];
    expect(body.amount).toBe(500);
    expect(body.category_id).toBe(10);
    expect(body.start_date).toBe("2025-01-01");
  });

  it("maps optional currency and notes flags", async () => {
    const upsert = vi.fn().mockResolvedValue({});
    mockClient({ budgets: { upsert } });

    await runCommand(
      BudgetsUpsert,
      [
        "--amount",
        "250.50",
        "--category-id",
        "10",
        "--start-date",
        "2025-01-01",
        "--currency",
        "eur",
        "--notes",
        "Q1 budget",
        "--json",
      ],
    );
    const body = upsert.mock.calls[0][0];
    expect(body.currency).toBe("eur");
    expect(body.notes).toBe("Q1 budget");
  });

  it("shows confirmation message", async () => {
    const upsert = vi.fn().mockResolvedValue({});
    mockClient({ budgets: { upsert } });

    const { stdout } = await runCommand(
      BudgetsUpsert,
      ["--amount", "500", "--category-id", "10", "--start-date", "2025-01-01"],
    );
    expect(stdout).toBe("Budget saved for category 10 starting 2025-01-01.\n");
  });
});
