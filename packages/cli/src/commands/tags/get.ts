import { Args } from "@oclif/core";
import { BaseCommand, formatDetail, tagFields } from "lunch-money-cli-core";

export default class TagsGet extends BaseCommand {
  static override args = {
    id: Args.integer({ description: "Unique identifier of the tag to retrieve (integer)", required: true }),
  };
  static override description = "Retrieve details of a specific tag by its ID";

  async run(): Promise<unknown> {
    const { args } = await this.parse(TagsGet);
    const client = this.createClient();
    const tag = await client.tags.get(args.id);
    return this.output(tag, formatDetail(tag as unknown as Record<string, unknown>, tagFields));
  }
}
