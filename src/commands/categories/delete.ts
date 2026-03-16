import { Args, Flags } from "@oclif/core";
import { BaseCommand } from "../../base-command.js";
import type { DeleteCategoryParams } from "@lunch-money/lunch-money-js-v2";

export default class CategoriesDelete extends BaseCommand {
  static override description = "Delete a category";

  static override args = {
    id: Args.integer({ description: "Category ID", required: true }),
  };

  static override flags = {
    force: Flags.boolean({ description: "Force delete even with dependencies" }),
  };

  async run(): Promise<unknown> {
    const { args, flags } = await this.parse(CategoriesDelete);
    const client = this.createClient();
    const params: DeleteCategoryParams = {};
    if (flags.force) params.force = true;
    await client.categories.delete(args.id, params);
    return this.output({ success: true, deleted_id: args.id }, `Deleted category ${args.id}.`);
  }
}
