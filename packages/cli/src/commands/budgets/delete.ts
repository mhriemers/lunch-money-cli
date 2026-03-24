import type { DeleteBudgetParams } from "@lunch-money/lunch-money-js-v2";

import { Flags } from "@oclif/core";
import { BaseCommand } from "lunch-money-cli-core";

export default class BudgetsDelete extends BaseCommand {
  static override description = "Remove a budget entry for a specific category and budget period start date";
static override flags = {
    "category-id": Flags.integer({ description: "ID of the category whose budget should be removed (integer)", required: true }),
    "start-date": Flags.string({ description: "Start date of the budget period to remove (YYYY-MM-DD). Must be a valid budget period start date.", required: true }),
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
