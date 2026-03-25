import { Args } from "@oclif/core";
import { BaseCommand, categoryFields, formatDetail } from "lunch-money-cli-core";

export default class CategoriesGet extends BaseCommand {
  static override args = {
    id: Args.integer({ description: "Unique identifier of the category to retrieve (integer)", required: true }),
  };
  static override description =
    "Retrieve details of a specific category or category group by its ID. For category groups, the response includes child categories in the 'children' property.";

  async run(): Promise<unknown> {
    const { args } = await this.parse(CategoriesGet);
    const client = this.createClient();
    const category = await client.categories.get(args.id);
    return this.output(category, formatDetail(category as unknown as Record<string, unknown>, categoryFields));
  }
}
