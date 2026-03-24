import type { DeleteBudgetParams } from "@lunch-money/lunch-money-js-v2";

import { Flags } from "@oclif/core";

import { BaseCommand } from "../../base-command.js";

export default class BudgetsDelete extends BaseCommand {
  static override description = "Remove a budget for a category and period";
static override flags = {
    "category-id": Flags.integer({ description: "Category ID", required: true }),
    "start-date": Flags.string({ description: "Budget period start date (YYYY-MM-DD)", required: true }),
  };

  async run(): Promise<unknown> {
    const { flags } = await this.parse(BudgetsDelete);
    const client = this.createClient();
    const params: DeleteBudgetParams = {
      category_id: flags["category-id"],
      start_date: flags["start-date"],
    };
    await client.budgets.delete(params);
    return this.output({ message: "Budget deleted", success: true }, `Deleted budget for category ${flags["category-id"]} starting ${flags["start-date"]}.`);
  }
}
