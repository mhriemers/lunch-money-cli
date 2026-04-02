import { describe, expect, it, vi } from "vitest";

import BudgetsSettings from "../../../src/commands/budgets/settings.js";
import { fixture, mockClient, runCommand } from "../../setup.js";

describe("budgets settings", () => {
  it("returns budget settings as JSON", async () => {
    const data = { budget_granularity: "month", budget_quantity: 1 };
    const getSettings = vi.fn().mockResolvedValue(data);
    mockClient({ budgets: { getSettings } });

    const { result } = await runCommand(BudgetsSettings, ["--json"]);
    expect(result).toEqual(data);
    expect(getSettings).toHaveBeenCalledOnce();
  });

  it("formats settings as detail text", async () => {
    const getSettings = vi.fn().mockResolvedValue({
      budget_hide_no_activity: true,
      budget_income_option: "include",
      budget_period_anchor_date: "2025-01-01",
      budget_period_granularity: "month",
      budget_period_quantity: 1,
      budget_rollover_left_to_budget: false,
      budget_use_last_day_of_month: false,
    });
    mockClient({ budgets: { getSettings } });

    const { stdout } = await runCommand(BudgetsSettings, []);
    await expect(stdout).toMatchFileSnapshot(fixture("budgets/settings-detail"));
  });
});
