import { Args, Flags } from "@oclif/core";
import { BaseCommand } from "../../base-command.js";
import { parseJsonArg } from "../../client.js";
import type { UpdateCategoryBody } from "@lunch-money/lunch-money-js-v2";

export default class CategoriesUpdate extends BaseCommand {
  static override description = "Update an existing category";

  static override args = {
    id: Args.integer({ description: "Category ID", required: true }),
  };

  static override flags = {
    name: Flags.string({ description: "New name" }),
    description: Flags.string({ description: "New description" }),
    "is-income": Flags.string({ description: "Is income category (true/false)" }),
    "exclude-from-budget": Flags.string({ description: "Exclude from budget (true/false)" }),
    "exclude-from-totals": Flags.string({ description: "Exclude from totals (true/false)" }),
    archived: Flags.string({ description: "Archive status (true/false)" }),
    "group-id": Flags.string({ description: "Move to category group (ID or null)" }),
    "is-group": Flags.string({ description: "Is category group (true/false/null)" }),
    children: Flags.string({ description: "JSON array of child category IDs" }),
    order: Flags.string({ description: "Sort order (number or null)" }),
    collapsed: Flags.string({ description: "Collapse category group (true/false/null)" }),
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
    if (flags["group-id"] !== undefined) data.group_id = flags["group-id"] === "null" ? null : parseInt(flags["group-id"], 10);
    if (flags["is-group"] !== undefined) data.is_group = flags["is-group"] === "null" ? null : flags["is-group"] === "true";
    if (flags.children) data.children = parseJsonArg(flags.children, "children") as UpdateCategoryBody["children"];
    if (flags.order !== undefined) data.order = flags.order === "null" ? null : parseInt(flags.order, 10);
    if (flags.collapsed !== undefined) data.collapsed = flags.collapsed === "null" ? null : flags.collapsed === "true";
    const category = await client.categories.update(args.id, data);
    return this.output(category, `Updated category ${args.id}.`);
  }
}
