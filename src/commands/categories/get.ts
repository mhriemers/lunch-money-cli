import { Args } from "@oclif/core";

import { BaseCommand } from "../../base-command.js";
import { categoryFields } from "../../columns.js";
import { formatDetail } from "../../formatters.js";

export default class CategoriesGet extends BaseCommand {
  static override args = {
    id: Args.integer({ description: "Category ID", required: true }),
  };
static override description = "Get a specific category by ID";

  async run(): Promise<unknown> {
    const { args } = await this.parse(CategoriesGet);
    const client = this.createClient();
    const category = await client.categories.get(args.id);
    return this.output(category, formatDetail(category as unknown as Record<string, unknown>, categoryFields));
  }
}
