import {Args} from '@oclif/core'
import {BaseCommand} from 'lunch-money-cli-core'

export default class TransactionsDelete extends BaseCommand {
  static override args = {
    id: Args.integer({description: 'Unique identifier of the transaction to delete (integer)', required: true}),
  }
  static override description =
    'Delete a transaction by ID. Split or grouped transactions must be unsplit/ungrouped first. This action is not reversible.'

  async run(): Promise<unknown> {
    const {args} = await this.parse(TransactionsDelete)
    const client = this.createClient()
    await client.transactions.delete(args.id)
    return this.output({deleted_id: args.id, success: true}, `Deleted transaction ${args.id}.`)
  }
}
