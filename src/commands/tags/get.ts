import { Args } from "@oclif/core";

import { BaseCommand } from "../../base-command.js";
import { tagFields } from "../../columns.js";
import { formatDetail } from "../../formatters.js";

export default class TagsGet extends BaseCommand {
  static override args = {
    id: Args.integer({ description: "Tag ID", required: true }),
  };
static override description = "Get a specific tag";

  async run(): Promise<unknown> {
    const { args } = await this.parse(TagsGet);
    const client = this.createClient();
    const tag = await client.tags.get(args.id);
    return this.output(tag, formatDetail(tag as unknown as Record<string, unknown>, tagFields));
  }
}
