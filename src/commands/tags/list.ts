import { BaseCommand } from "../../base-command.js";
import { tagColumns } from "../../columns.js";
import { formatTable } from "../../formatters.js";

export default class TagsList extends BaseCommand {
  static override description = "List all tags";

  async run(): Promise<unknown> {
    const client = this.createClient();
    const tags = await client.tags.getAll();
    return this.output(tags, formatTable(tags as Record<string, unknown>[], tagColumns));
  }
}
