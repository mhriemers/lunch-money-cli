import { Flags } from "@oclif/core";
import { BaseCommand } from "../../base-command.js";
import type { UpsertBudgetBody, Currency } from "@lunch-money/lunch-money-js-v2";

export default class BudgetsUpsert extends BaseCommand {
  static override description = "Create or update a budget for a category and period";

  static override flags = {
    "start-date": Flags.string({ description: "Budget period start date (YYYY-MM-DD)", required: true }),
    "category-id": Flags.integer({ description: "Category ID", required: true }),
    amount: Flags.string({ description: "Budget amount", required: true }),
    currency: Flags.string({ description: "Currency code" }),
    notes: Flags.string({ description: "Budget notes" }),
  };

  async run(): Promise<unknown> {
    const { flags } = await this.parse(BudgetsUpsert);
    const client = this.createClient();
    const data: UpsertBudgetBody = {
      start_date: flags["start-date"],
      category_id: flags["category-id"],
      amount: Number(flags.amount),
    };
    if (flags.currency) data.currency = flags.currency as Currency;
    if (flags.notes) data.notes = flags.notes;
    const result = await client.budgets.upsert(data);
    return this.output(result, `Budget saved for category ${flags["category-id"]} starting ${flags["start-date"]}.`);
  }
}
