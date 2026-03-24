import type { UpdateCategoryBody } from "@lunch-money/lunch-money-js-v2";

import { Args, Flags } from "@oclif/core";
import { BaseCommand, parseJsonArg } from "lunch-money-cli-core";

export default class CategoriesUpdate extends BaseCommand {
  static override args = {
    id: Args.integer({ description: "Unique identifier of the category to update (integer)", required: true }),
  };
static override description = "Update properties of an existing category or category group. Only provided fields are updated; omitted fields remain unchanged.";
static override flags = {
    archived: Flags.string({ description: "Whether the category is archived ('true' or 'false')" }),
    children: Flags.string({ description: "JSON array of category IDs (integers) or new category names (strings) to set as children. Replaces existing children. Only valid for category groups. Example: '[123, 456]'" }),
    collapsed: Flags.string({ description: "Whether the category group appears collapsed in the Lunch Money app ('true', 'false', or 'null')" }),
    description: Flags.string({ description: "New description for the category (max 200 characters). Pass empty string to clear." }),
    "exclude-from-budget": Flags.string({ description: "Whether transactions in this category are excluded from the budget ('true' or 'false')" }),
    "exclude-from-totals": Flags.string({ description: "Whether transactions in this category are excluded from totals ('true' or 'false')" }),
    "group-id": Flags.string({ description: "ID of a category group to move this category into, or 'null' to remove from a group (integer or 'null')" }),
    "is-group": Flags.string({ description: "Cannot be used to convert between category and category group. Must match current status. ('true', 'false', or 'null')" }),
    "is-income": Flags.string({ description: "Whether transactions in this category are treated as income ('true' or 'false')" }),
    name: Flags.string({ description: "New name for the category (1-100 characters)" }),
    order: Flags.string({ description: "Display position index (integer or 'null'). Position is relative to other categories in the same group." }),
  };

  async run(): Promise<unknown> {
    const { args, flags } = await this.parse(CategoriesUpdate);
    const client = this.createClient();
    const data: UpdateCategoryBody = {};
    if (flags.name) data.name = flags.name;
    if (flags.description !== undefined) data.description = flags.description;
    if (flags["is-income"] !== undefined) data.is_income = flags["is-income"] === "true";
    if (flags["exclude-from-budget"] !== undefined) data.exclude_from_budget = flags["exclude-from-budget"] === "true";
    if (flags["exclude-from-totals"] !== undefined) data.exclude_from_totals = flags["exclude-from-totals"] === "true";
    if (flags.archived !== undefined) data.archived = flags.archived === "true";
    if (flags["group-id"] !== undefined) data.group_id = flags["group-id"] === "null" ? null : Number.parseInt(flags["group-id"], 10);
    if (flags["is-group"] !== undefined) data.is_group = flags["is-group"] === "null" ? null : flags["is-group"] === "true";
    if (flags.children) data.children = parseJsonArg(flags.children, "children") as UpdateCategoryBody["children"];
    if (flags.order !== undefined) data.order = flags.order === "null" ? null : Number.parseInt(flags.order, 10);
    if (flags.collapsed !== undefined) data.collapsed = flags.collapsed === "null" ? null : flags.collapsed === "true";
    const category = await client.categories.update(args.id, data);
    return this.output(category, `Updated category ${args.id}.`);
  }
}
