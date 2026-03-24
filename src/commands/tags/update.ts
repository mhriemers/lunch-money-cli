import type { UpdateTagBody } from "@lunch-money/lunch-money-js-v2";

import { Args, Flags } from "@oclif/core";

import { BaseCommand } from "../../base-command.js";

export default class TagsUpdate extends BaseCommand {
  static override args = {
    id: Args.integer({ description: "Unique identifier of the tag to update (integer)", required: true }),
  };
static override description = "Update properties of an existing tag. Only provided fields are updated; omitted fields remain unchanged.";
static override flags = {
    archived: Flags.string({ description: "Whether the tag is archived ('true' or 'false')" }),
    "background-color": Flags.string({ description: "Background color as a hex code or 'null' to clear (e.g. 'FFE7D4' or 'null')" }),
    description: Flags.string({ description: "New description for the tag (max 200 characters)" }),
    name: Flags.string({ description: "New name for the tag (1-100 characters)" }),
    "text-color": Flags.string({ description: "Text color as a hex code or 'null' to clear (e.g. '333' or 'null')" }),
  };

  async run(): Promise<unknown> {
    const { args, flags } = await this.parse(TagsUpdate);
    const client = this.createClient();
    const data: UpdateTagBody = {};
    if (flags.name) data.name = flags.name;
    if (flags.description !== undefined) data.description = flags.description;
    if (flags["text-color"] !== undefined) data.text_color = flags["text-color"] === "null" ? null : flags["text-color"];
    if (flags["background-color"] !== undefined) data.background_color = flags["background-color"] === "null" ? null : flags["background-color"];
    if (flags.archived !== undefined) data.archived = flags.archived === "true";
    const tag = await client.tags.update(args.id, data);
    return this.output(tag, `Updated tag ${args.id}.`);
  }
}
