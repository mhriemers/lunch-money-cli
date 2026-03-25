import type { DeleteCategoryParams } from "@lunch-money/lunch-money-js-v2";

import { Args, Flags } from "@oclif/core";
import { ApiCommand } from "lunch-money-cli-core";

export default class CategoriesDelete extends ApiCommand {
  static override args = {
    id: Args.integer({ description: "Unique identifier of the category to delete (integer)", required: true }),
  };
  static override description =
    "Delete a category or category group. Fails if dependencies exist (budgets, transactions, rules, children, recurring items) unless --force is set.";
  static override flags = {
    force: Flags.boolean({
      description:
        "Force deletion even if there are dependent budgets, transactions, rules, children, or recurring items",
    }),
  };

  async run(): Promise<unknown> {
    const { args, flags } = await this.parse(CategoriesDelete);
    const client = this.createClient(flags["api-key"]);
    const params: DeleteCategoryParams = {};
    if (flags.force) params.force = true;
    await client.categories.delete(args.id, params);
    return this.output({ deleted_id: args.id, success: true }, `Deleted category ${args.id}.`);
  }
}
