import type { GetAllCategoriesParams } from "@lunch-money/lunch-money-js-v2";

import { Flags } from "@oclif/core";

import { BaseCommand } from "../../base-command.js";
import { categoryColumns } from "../../columns.js";
import { formatTable } from "../../formatters.js";

export default class CategoriesList extends BaseCommand {
  static override description = "List all categories";
static override flags = {
    flatten: Flags.boolean({ description: "Flatten nested category groups" }),
    "is-group": Flags.string({ description: "Only return category groups (true) or non-groups (false)" }),
  };

  async run(): Promise<unknown> {
    const { flags } = await this.parse(CategoriesList);
    const client = this.createClient();
    const params: GetAllCategoriesParams = {};
    if (flags.flatten) params.format = "flattened";
    if (flags["is-group"] !== undefined) params.is_group = flags["is-group"] === "true";
    const categories = await client.categories.getAll(params);
    return this.output(categories, formatTable(categories as Record<string, unknown>[], categoryColumns));
  }
}
