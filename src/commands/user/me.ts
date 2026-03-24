import { BaseCommand } from "../../base-command.js";
import { userFields } from "../../columns.js";
import { formatDetail } from "../../formatters.js";

export default class UserMe extends BaseCommand {
  static override description = "Get current user profile";

  async run(): Promise<unknown> {
    const client = this.createClient();
    const user = await client.user.getMe();
    return this.output(user, formatDetail(user as unknown as Record<string, unknown>, userFields));
  }
}
