import type {DeleteTagParams} from '@lunch-money/lunch-money-js-v2'

import {Args, Flags} from '@oclif/core'
import {BaseCommand} from 'lunch-money-cli-core'

export default class TagsDelete extends BaseCommand {
  static override args = {
    id: Args.integer({description: 'Unique identifier of the tag to delete (integer)', required: true}),
  }
  static override description = 'Delete a tag. Fails if transactions or rules depend on it unless --force is set.'
  static override flags = {
    force: Flags.boolean({description: 'Force deletion even if transactions or rules depend on this tag'}),
  }

  async run(): Promise<unknown> {
    const {args, flags} = await this.parse(TagsDelete)
    const client = this.createClient()
    const params: DeleteTagParams = {}
    if (flags.force) params.force = true
    await client.tags.delete(args.id, params)
    return this.output({deleted_id: args.id, success: true}, `Deleted tag ${args.id}.`)
  }
}
