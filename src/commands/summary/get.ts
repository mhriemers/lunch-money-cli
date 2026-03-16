import { Flags } from "@oclif/core";
import { BaseCommand } from "../../base-command.js";
import { formatTable } from "../../formatters.js";
import { summaryColumns } from "../../columns.js";
import type { GetBudgetSummaryParams } from "@lunch-money/lunch-money-js-v2";

export default class SummaryGet extends BaseCommand {
  static override description = "Get budget summary for a date range";

  static override flags = {
    "start-date": Flags.string({ description: "Start date (YYYY-MM-DD)", required: true }),
    "end-date": Flags.string({ description: "End date (YYYY-MM-DD)", required: true }),
    "include-exclude-from-budgets": Flags.boolean({ description: "Include categories with 'Exclude from Budgets' flag" }),
    "include-occurrences": Flags.boolean({ description: "Include occurrences array for each category" }),
    "include-past-budget-dates": Flags.boolean({ description: "Include three prior budget occurrences (requires --include-occurrences)" }),
    "include-totals": Flags.boolean({ description: "Include top-level totals section" }),
    "include-rollover-pool": Flags.boolean({ description: "Include rollover pool section" }),
  };

  async run(): Promise<unknown> {
    const { flags } = await this.parse(SummaryGet);
    const client = this.createClient();
    const params: GetBudgetSummaryParams = {
      start_date: flags["start-date"],
      end_date: flags["end-date"],
    };
    if (flags["include-exclude-from-budgets"]) params.include_exclude_from_budgets = true;
    if (flags["include-occurrences"]) params.include_occurrences = true;
    if (flags["include-past-budget-dates"]) params.include_past_budget_dates = true;
    if (flags["include-totals"]) params.include_totals = true;
    if (flags["include-rollover-pool"]) params.include_rollover_pool = true;
    const result = await client.summary.get(params);
    const r = result as unknown as { categories?: Record<string, unknown>[] };
    const rows = r.categories ?? [];
    return this.output(result, formatTable(rows, summaryColumns));
  }
}
