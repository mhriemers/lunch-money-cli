import { ApiCommand, formatTable, tagColumns } from "lunch-money-cli-core";

export default class TagsList extends ApiCommand {
  static override description = "Retrieve a list of all tags associated with the user's account";

  async run(): Promise<unknown> {
    const { flags } = await this.parse(TagsList);
    const client = this.createClient(flags["api-key"]);
    const tags = await client.tags.getAll();
    return this.output(tags, formatTable(tags as Record<string, unknown>[], tagColumns));
  }
}
