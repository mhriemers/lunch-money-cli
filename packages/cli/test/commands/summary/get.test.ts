/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "chai";

import SummaryGet from "../../../src/commands/summary/get.js";
import { expectFixture, runCommand } from "../../helpers/index.js";

describe("summary get", () => {
  it("returns summary as JSON", async () => {
    const data = { categories: [{ category_name: "Food", spending: "250.00" }] };
    const { result } = await runCommand(
      SummaryGet,
      ["--start-date", "2025-01-01", "--end-date", "2025-01-31", "--json"],
      (c) => {
        c.summary.get.resolves(data);
      },
    );
    expect(result).to.deep.equal(data);
  });

  it("maps required date flags to params", async () => {
    const { client } = await runCommand(SummaryGet, [
      "--start-date",
      "2025-01-01",
      "--end-date",
      "2025-01-31",
      "--json",
    ]);
    const params = client.summary.get.firstCall.args[0];
    expect(params.start_date).to.equal("2025-01-01");
    expect(params.end_date).to.equal("2025-01-31");
  });

  it("maps boolean include flags", async () => {
    const { client } = await runCommand(SummaryGet, [
      "--start-date",
      "2025-01-01",
      "--end-date",
      "2025-01-31",
      "--include-exclude-from-budgets",
      "--include-occurrences",
      "--include-past-budget-dates",
      "--include-totals",
      "--include-rollover-pool",
      "--json",
    ]);
    const params = client.summary.get.firstCall.args[0];
    expect(params.include_exclude_from_budgets).to.be.true;
    expect(params.include_occurrences).to.be.true;
    expect(params.include_past_budget_dates).to.be.true;
    expect(params.include_totals).to.be.true;
    expect(params.include_rollover_pool).to.be.true;
  });

  it("formats categories as a table", async () => {
    const { stdout } = await runCommand(SummaryGet, ["--start-date", "2025-01-01", "--end-date", "2025-01-31"], (c) => {
      c.summary.get.resolves({
        categories: [
          {
            category_id: 42,
            totals: { available: "200.00", budgeted: "500.00", other_activity: "200.00", recurring_activity: "100.00" },
          },
        ],
      });
    });
    expectFixture(stdout, "summary/get-table");
  });
});
