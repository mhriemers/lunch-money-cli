import type { UpdateTagBody } from "@lunch-money/lunch-money-js-v2";

import { Args, Flags } from "@oclif/core";
import { ApiCommand, buildBody, type FieldMapping } from "lunch-money-cli-core";

const fieldMappings: FieldMapping[] = [
  { flag: "name" },
  { flag: "description" },
  { flag: "text-color", type: "nullable" },
  { flag: "background-color", type: "nullable" },
  { flag: "archived", type: "boolean" },
];

export default class TagsUpdate extends ApiCommand {
  static override args = {
    id: Args.integer({ description: "Unique identifier of the tag to update (integer)", required: true }),
  };
  static override description =
    "Update properties of an existing tag. Only provided fields are updated; omitted fields remain unchanged.";
  static override flags = {
    archived: Flags.string({ description: "Whether the tag is archived ('true' or 'false')" }),
    "background-color": Flags.string({
      description: "Background color as a hex code or 'null' to clear (e.g. 'FFE7D4' or 'null')",
    }),
    description: Flags.string({ description: "New description for the tag (max 200 characters)" }),
    name: Flags.string({ description: "New name for the tag (1-100 characters)" }),
    "text-color": Flags.string({ description: "Text color as a hex code or 'null' to clear (e.g. '333' or 'null')" }),
  };

  async run(): Promise<unknown> {
    const { args, flags } = await this.parse(TagsUpdate);
    const client = this.createClient(flags["api-key"]);
    const data = buildBody<UpdateTagBody>(flags, fieldMappings);
    const tag = await client.tags.update(args.id, data);
    return this.output(tag, `Updated tag ${args.id}.`);
  }
}
