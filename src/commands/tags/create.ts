import { Flags } from "@oclif/core";
import { BaseCommand } from "../../base-command.js";
import type { CreateTagBody } from "@lunch-money/lunch-money-js-v2";

export default class TagsCreate extends BaseCommand {
  static override description = "Create a new tag";

  static override flags = {
    name: Flags.string({ description: "Tag name", required: true }),
    description: Flags.string({ description: "Tag description" }),
    "text-color": Flags.string({ description: "Text color (hex code)" }),
    "background-color": Flags.string({ description: "Background color (hex code)" }),
    archived: Flags.boolean({ description: "Mark as archived" }),
  };

  async run(): Promise<unknown> {
    const { flags } = await this.parse(TagsCreate);
    const client = this.createClient();
    const data: CreateTagBody = { name: flags.name };
    if (flags.description) data.description = flags.description;
    if (flags["text-color"]) data.text_color = flags["text-color"];
    if (flags["background-color"]) data.background_color = flags["background-color"];
    if (flags.archived) data.archived = true;
    const tag = await client.tags.create(data);
    const t = tag as unknown as Record<string, unknown>;
    return this.output(tag, `Created tag "${t.name ?? ""}" (ID: ${t.id}).`);
  }
}
