import type { CreateCategoryBody } from "@lunch-money/lunch-money-js-v2";

import { Flags } from "@oclif/core";
import { ApiCommand, buildBody, type FieldMapping } from "lunch-money-cli-core";

const optionalFields: FieldMapping[] = [
  { flag: "description" },
  { flag: "is-income", type: "boolean" },
  { flag: "exclude-from-budget", type: "boolean" },
  { flag: "exclude-from-totals", type: "boolean" },
  { flag: "is-group", type: "boolean" },
  { flag: "group-id" },
  { flag: "children", type: "json" },
  { flag: "archived", type: "boolean" },
  { flag: "order" },
  { flag: "collapsed", type: "boolean" },
];

export default class CategoriesCreate extends ApiCommand {
  static override description =
    "Create a new category or category group. Set --is-group to create a category group, optionally with --children to assign existing categories to it.";
  static override flags = {
    archived: Flags.boolean({ description: "If set, the category is archived and hidden in the Lunch Money app" }),
    children: Flags.string({
      description:
        "JSON array of category IDs (integers) or new category names (strings) to add to the group. Only valid when --is-group is set. Example: '[123, 456]' or '[123, \"New Category\"]'",
    }),
    collapsed: Flags.boolean({ description: "If set, the category group appears collapsed in the Lunch Money app" }),
    description: Flags.string({ description: "Description of the category (max 200 characters)" }),
    "exclude-from-budget": Flags.boolean({
      description: "If set, transactions in this category will be excluded from the budget",
    }),
    "exclude-from-totals": Flags.boolean({
      description: "If set, transactions in this category will be excluded from totals",
    }),
    "group-id": Flags.integer({
      description:
        "ID of an existing category group to assign this new category to. Cannot be set if --is-group is also set. (integer)",
    }),
    "is-group": Flags.boolean({ description: "If set, creates a category group instead of a regular category" }),
    "is-income": Flags.boolean({ description: "If set, transactions in this category will be treated as income" }),
    name: Flags.string({
      description:
        "Name of the new category (1-100 characters). Must not match any existing category or category group name.",
      required: true,
    }),
    order: Flags.integer({
      description:
        "Display position index on the categories page (integer). Null-order categories appear alphabetically after ordered ones.",
    }),
  };

  async run(): Promise<unknown> {
    const { flags } = await this.parse(CategoriesCreate);
    const client = this.createClient(flags["api-key"]);
    const data: CreateCategoryBody = {
      name: flags.name,
      ...buildBody<CreateCategoryBody>(flags, optionalFields),
    };
    const category = await client.categories.create(data);
    return this.output(category, `Created category "${category.name}" (ID: ${category.id}).`);
  }
}
