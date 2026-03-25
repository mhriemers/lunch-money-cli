import type { GetBudgetSummaryParams } from "@lunch-money/lunch-money-js-v2";

import { Flags } from "@oclif/core";
import { BaseCommand, formatTable, summaryColumns } from "lunch-money-cli-core";

export default class SummaryGet extends BaseCommand {
  static override description =
    "Retrieve a summary of the user's budget for a date range. For aligned date ranges (matching budget period boundaries), includes budgeted and available amounts per category.";
  static override flags = {
    "end-date": Flags.string({
      description:
        "End of date range in ISO 8601 format (YYYY-MM-DD). For aligned responses, use the last day of a budget period.",
      required: true,
    }),
    "include-exclude-from-budgets": Flags.boolean({
      description: "Include categories that have the 'Exclude from Budgets' flag set in the returned categories array",
    }),
    "include-occurrences": Flags.boolean({
      description:
        "Include an 'occurrences' array for each category with per-period budget details (activity, budgeted amount, notes). Only populated for aligned responses.",
    }),
    "include-past-budget-dates": Flags.boolean({
      description:
        "Include the three budget periods prior to the start date in the occurrences array. Requires --include-occurrences to also be set.",
    }),
    "include-rollover-pool": Flags.boolean({
      description:
        "Include a 'rollover_pool' section with the current rollover pool balance and all previous adjustments",
    }),
    "include-totals": Flags.boolean({
      description:
        "Include a top-level 'totals' section summarizing inflow and outflow across all transactions for the date range",
    }),
    "start-date": Flags.string({
      description:
        "Start of date range in ISO 8601 format (YYYY-MM-DD). For aligned responses, use the first day of a budget period.",
      required: true,
    }),
  };

  async run(): Promise<unknown> {
    const { flags } = await this.parse(SummaryGet);
    const client = this.createClient();
    const params: GetBudgetSummaryParams = {
      end_date: flags["end-date"],
      start_date: flags["start-date"],
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
