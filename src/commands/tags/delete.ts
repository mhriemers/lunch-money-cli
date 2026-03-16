import { Args, Flags } from "@oclif/core";
import { BaseCommand } from "../../base-command.js";
import type { DeleteTagParams } from "@lunch-money/lunch-money-js-v2";

export default class TagsDelete extends BaseCommand {
  static override description = "Delete a tag";

  static override args = {
    id: Args.integer({ description: "Tag ID", required: true }),
  };

  static override flags = {
    force: Flags.boolean({ description: "Force delete even with dependencies" }),
  };

  async run(): Promise<unknown> {
    const { args, flags } = await this.parse(TagsDelete);
    const client = this.createClient();
    const params: DeleteTagParams = {};
    if (flags.force) params.force = true;
    await client.tags.delete(args.id, params);
    return this.output({ success: true, deleted_id: args.id }, `Deleted tag ${args.id}.`);
  }
}
