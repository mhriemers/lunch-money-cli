import { Flags } from "@oclif/core";
import { BaseCommand } from "../../base-command.js";
import { parseJsonArg } from "../../client.js";
import type { CreateCategoryBody } from "@lunch-money/lunch-money-js-v2";

export default class CategoriesCreate extends BaseCommand {
  static override description = "Create a new category";

  static override flags = {
    name: Flags.string({ description: "Category name", required: true }),
    description: Flags.string({ description: "Category description" }),
    "is-income": Flags.boolean({ description: "Mark as income category" }),
    "exclude-from-budget": Flags.boolean({ description: "Exclude from budget" }),
    "exclude-from-totals": Flags.boolean({ description: "Exclude from totals" }),
    "is-group": Flags.boolean({ description: "Create as category group" }),
    "group-id": Flags.integer({ description: "Parent category group ID" }),
    children: Flags.string({ description: "JSON array of child category IDs (for groups)" }),
    archived: Flags.boolean({ description: "Mark as archived" }),
    order: Flags.integer({ description: "Sort order" }),
    collapsed: Flags.boolean({ description: "Collapse category group" }),
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
