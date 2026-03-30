/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import BudgetsSettings from "../../../src/commands/budgets/settings.js";
import { expectFixture, runCommand } from "../../helpers/index.js";

describe("budgets settings", () => {
  it("returns budget settings as JSON", async () => {
    const data = { budget_granularity: "month", budget_quantity: 1 };
    const { result, client } = await runCommand(BudgetsSettings, ["--json"], (c) => {
      c.budgets.getSettings.resolves(data);
    });
    expect(result).to.deep.equal(data);
    expect(client.budgets.getSettings.calledOnce).to.be.true;
  });

  it("formats settings as detail text", async () => {
    const { stdout } = await runCommand(BudgetsSettings, [], (c) => {
      c.budgets.getSettings.resolves({
        budget_period_granularity: "month",
        budget_period_quantity: 1,
        budget_period_anchor_date: "2025-01-01",
        budget_use_last_day_of_month: false,
        budget_income_option: "include",
        budget_hide_no_activity: true,
        budget_rollover_left_to_budget: false,
      });
    });
    expectFixture(stdout, "budgets/settings-detail");
  });
});
