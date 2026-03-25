import {Args} from '@oclif/core'
import {BaseCommand} from 'lunch-money-cli-core'

export default class AccountsDelete extends BaseCommand {
  static override args = {
    id: Args.integer({description: 'Unique identifier of the manual account to delete (integer)', required: true}),
  }
  static override description =
    'Delete a manually-managed account. If transactions exist for this account, they will show a warning in the web view.'

  async run(): Promise<unknown> {
    const {args} = await this.parse(AccountsDelete)
    const client = this.createClient()
    await client.manualAccounts.delete(args.id)
    return this.output({deleted_id: args.id, success: true}, `Deleted account ${args.id}.`)
  }
}
