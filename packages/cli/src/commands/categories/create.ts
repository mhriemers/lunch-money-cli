import type { CreateCategoryBody } from "@lunch-money/lunch-money-js-v2";

import { Flags } from "@oclif/core";
import { BaseCommand, parseJsonArg } from "lunch-money-cli-core";

export default class CategoriesCreate extends BaseCommand {
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
    const client = this.createClient();
    const data: CreateCategoryBody = { name: flags.name };
    if (flags.description) data.description = flags.description;
    if (flags["is-income"]) data.is_income = true;
    if (flags["exclude-from-budget"]) data.exclude_from_budget = true;
    if (flags["exclude-from-totals"]) data.exclude_from_totals = true;
    if (flags["is-group"]) data.is_group = true;
    if (flags["group-id"]) data.group_id = flags["group-id"];
    if (flags.children) data.children = parseJsonArg(flags.children, "children") as CreateCategoryBody["children"];
    if (flags.archived) data.archived = true;
    if (flags.order !== undefined) data.order = flags.order;
    if (flags.collapsed) data.collapsed = true;
    const category = await client.categories.create(data);
    const c = category as unknown as Record<string, unknown>;
    return this.output(category, `Created category "${c.name ?? ""}" (ID: ${c.id}).`);
  }
}
