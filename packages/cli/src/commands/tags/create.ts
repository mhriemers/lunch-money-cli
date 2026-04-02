import type { CreateTagBody } from "@lunch-money/lunch-money-js-v2";

import { Flags } from "@oclif/core";
import { ApiCommand, buildBody, type FieldMapping } from "lunch-money-cli-core";

const optionalFields: FieldMapping[] = [
  { flag: "description" },
  { flag: "text-color" },
  { flag: "background-color" },
  { flag: "archived", type: "boolean" },
];

export default class TagsCreate extends ApiCommand {
  static override description = "Create a new tag. Tag name must be unique.";
  static override flags = {
    archived: Flags.boolean({
      description: "If set, the tag is archived and hidden when creating/updating transactions in the app",
    }),
    "background-color": Flags.string({ description: "Background color as a hex code (e.g. 'FFE7D4')" }),
    description: Flags.string({ description: "Description of the tag (max 200 characters)" }),
    name: Flags.string({
      description: "Name of the new tag (1-100 characters). Must not match any existing tag name.",
      required: true,
    }),
    "text-color": Flags.string({ description: "Text color as a hex code (e.g. '333')" }),
  };

  async run(): Promise<unknown> {
    const { flags } = await this.parse(TagsCreate);
    const client = this.createClient(flags["api-key"]);
    const data: CreateTagBody = {
      name: flags.name,
      ...buildBody<CreateTagBody>(flags, optionalFields),
    };
    const tag = await client.tags.create(data);
    return this.output(tag, `Created tag "${tag.name}" (ID: ${tag.id}).`);
  }
}
