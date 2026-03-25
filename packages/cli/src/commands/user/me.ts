import {BaseCommand, formatDetail, userFields} from 'lunch-money-cli-core'

export default class UserMe extends BaseCommand {
  static override description =
    'Get details about the user associated with the API token, including name, email, account ID, budget name, and primary currency'

  async run(): Promise<unknown> {
    const client = this.createClient()
    const user = await client.user.getMe()
    return this.output(user, formatDetail(user as unknown as Record<string, unknown>, userFields))
  }
}
