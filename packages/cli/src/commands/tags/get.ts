import { Args } from "@oclif/core";
import { ApiCommand, formatDetail, tagFields } from "lunch-money-cli-core";

export default class TagsGet extends ApiCommand {
  static override args = {
    id: Args.integer({ description: "Unique identifier of the tag to retrieve (integer)", required: true }),
  };
  static override description = "Retrieve details of a specific tag by its ID";

  async run(): Promise<unknown> {
    const { args, flags } = await this.parse(TagsGet);
    const client = this.createClient(flags["api-key"]);
    const tag = await client.tags.get(args.id);
    return this.output(tag, formatDetail(tag as unknown as Record<string, unknown>, tagFields));
  }
}
