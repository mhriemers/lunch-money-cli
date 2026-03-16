import { Flags } from "@oclif/core";
import { BaseCommand } from "../../base-command.js";
import type { DeleteBudgetParams } from "@lunch-money/lunch-money-js-v2";

export default class BudgetsDelete extends BaseCommand {
  static override description = "Remove a budget for a category and period";

  static override flags = {
    "start-date": Flags.string({ description: "Budget period start date (YYYY-MM-DD)", required: true }),
    "category-id": Flags.integer({ description: "Category ID", required: true }),
  };

  async run(): Promise<unknown> {
    const { flags } = await this.parse(BudgetsDelete);
    const client = this.createClient();
    const params: DeleteBudgetParams = {
      start_date: flags["start-date"],
      category_id: flags["category-id"],
    };
    await client.budgets.delete(params);
    return this.output({ success: true, message: "Budget deleted" }, `Deleted budget for category ${flags["category-id"]} starting ${flags["start-date"]}.`);
  }
}
