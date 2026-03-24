import { BaseCommand } from "../../base-command.js";
import { userFields } from "../../columns.js";
import { formatDetail } from "../../formatters.js";

export default class UserMe extends BaseCommand {
  static override description = "Get details about the user associated with the API token, including name, email, account ID, budget name, and primary currency";

  async run(): Promise<unknown> {
    const client = this.createClient();
    const user = await client.user.getMe();
    return this.output(user, formatDetail(user as unknown as Record<string, unknown>, userFields));
  }
}
