import type { UpdateCategoryBody } from "@lunch-money/lunch-money-js-v2";

import { Args, Flags } from "@oclif/core";
import { ApiCommand, buildBody, type FieldMapping } from "lunch-money-cli-core";

const fieldMappings: FieldMapping[] = [
  { flag: "name" },
  { flag: "description" },
  { flag: "is-income", type: "boolean" },
  { flag: "exclude-from-budget", type: "boolean" },
  { flag: "exclude-from-totals", type: "boolean" },
  { flag: "archived", type: "boolean" },
  { flag: "group-id", type: "nullable-int" },
  { flag: "is-group", type: "nullable-boolean" },
  { flag: "children", type: "json" },
  { flag: "order", type: "nullable-int" },
  { flag: "collapsed", type: "nullable-boolean" },
];

export default class CategoriesUpdate extends ApiCommand {
  static override args = {
    id: Args.integer({ description: "Unique identifier of the category to update (integer)", required: true }),
  };
  static override description =
    "Update properties of an existing category or category group. Only provided fields are updated; omitted fields remain unchanged.";
  static override flags = {
    archived: Flags.string({ description: "Whether the category is archived ('true' or 'false')" }),
    children: Flags.string({
      description:
        "JSON array of category IDs (integers) or new category names (strings) to set as children. Replaces existing children. Only valid for category groups. Example: '[123, 456]'",
    }),
    collapsed: Flags.string({
      description: "Whether the category group appears collapsed in the Lunch Money app ('true', 'false', or 'null')",
    }),
    description: Flags.string({
      description: "New description for the category (max 200 characters). Pass empty string to clear.",
    }),
    "exclude-from-budget": Flags.string({
      description: "Whether transactions in this category are excluded from the budget ('true' or 'false')",
    }),
    "exclude-from-totals": Flags.string({
      description: "Whether transactions in this category are excluded from totals ('true' or 'false')",
    }),
    "group-id": Flags.string({
      description:
        "ID of a category group to move this category into, or 'null' to remove from a group (integer or 'null')",
    }),
    "is-group": Flags.string({
      description:
        "Cannot be used to convert between category and category group. Must match current status. ('true', 'false', or 'null')",
    }),
    "is-income": Flags.string({
      description: "Whether transactions in this category are treated as income ('true' or 'false')",
    }),
    name: Flags.string({ description: "New name for the category (1-100 characters)" }),
    order: Flags.string({
      description:
        "Display position index (integer or 'null'). Position is relative to other categories in the same group.",
    }),
  };

  async run(): Promise<unknown> {
    const { args, flags } = await this.parse(CategoriesUpdate);
    const client = this.createClient(flags["api-key"]);
    const data = buildBody<UpdateCategoryBody>(flags, fieldMappings);
    const category = await client.categories.update(args.id, data);
    return this.output(category, `Updated category ${args.id}.`);
  }
}
