import { describe, expect, it, vi } from "vitest";

import SummaryGet from "../../../src/commands/summary/get.js";
import { fixture, mockClient, runCommand } from "../../setup.js";

describe("summary get", () => {
  it("returns summary as JSON", async () => {
    const data = { categories: [{ category_name: "Food", spending: "250.00" }] };
    const get = vi.fn().mockResolvedValue(data);
    mockClient({ summary: { get } });

    const { result } = await runCommand(SummaryGet, [
      "--start-date",
      "2025-01-01",
      "--end-date",
      "2025-01-31",
      "--json",
    ]);
    expect(result).toEqual(data);
  });

  it("maps required date flags to params", async () => {
    const get = vi.fn().mockResolvedValue({});
    mockClient({ summary: { get } });

    await runCommand(SummaryGet, ["--start-date", "2025-01-01", "--end-date", "2025-01-31", "--json"]);
    const parameters = get.mock.calls[0][0];
    expect(parameters.start_date).toBe("2025-01-01");
    expect(parameters.end_date).toBe("2025-01-31");
  });

  it("maps boolean include flags", async () => {
    const get = vi.fn().mockResolvedValue({});
    mockClient({ summary: { get } });

    await runCommand(SummaryGet, [
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
    const parameters = get.mock.calls[0][0];
    expect(parameters.include_exclude_from_budgets).toBe(true);
    expect(parameters.include_occurrences).toBe(true);
    expect(parameters.include_past_budget_dates).toBe(true);
    expect(parameters.include_totals).toBe(true);
    expect(parameters.include_rollover_pool).toBe(true);
  });

  it("omits boolean flags from params when not set", async () => {
    const get = vi.fn().mockResolvedValue({});
    mockClient({ summary: { get } });

    await runCommand(SummaryGet, ["--start-date", "2025-01-01", "--end-date", "2025-01-31", "--json"]);
    const parameters = get.mock.calls[0][0];
    expect(parameters).toEqual({ end_date: "2025-01-31", start_date: "2025-01-01" });
  });

  it("formats categories as a table", async () => {
    const get = vi.fn().mockResolvedValue({
      categories: [
        {
          category_id: 42,
          totals: { available: "200.00", budgeted: "500.00", other_activity: "200.00", recurring_activity: "100.00" },
        },
      ],
    });
    mockClient({ summary: { get } });

    const { stdout } = await runCommand(SummaryGet, ["--start-date", "2025-01-01", "--end-date", "2025-01-31"]);
    await expect(stdout).toMatchFileSnapshot(fixture("summary/get-table"));
  });
});
