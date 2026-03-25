import type {CreateTagBody} from '@lunch-money/lunch-money-js-v2'

import {Flags} from '@oclif/core'
import {BaseCommand} from 'lunch-money-cli-core'

export default class TagsCreate extends BaseCommand {
  static override description = 'Create a new tag. Tag name must be unique.'
  static override flags = {
    archived: Flags.boolean({
      description: 'If set, the tag is archived and hidden when creating/updating transactions in the app',
    }),
    'background-color': Flags.string({description: "Background color as a hex code (e.g. 'FFE7D4')"}),
    description: Flags.string({description: 'Description of the tag (max 200 characters)'}),
    name: Flags.string({
      description: 'Name of the new tag (1-100 characters). Must not match any existing tag name.',
      required: true,
    }),
    'text-color': Flags.string({description: "Text color as a hex code (e.g. '333')"}),
  }

  async run(): Promise<unknown> {
    const {flags} = await this.parse(TagsCreate)
    const client = this.createClient()
    const data: CreateTagBody = {name: flags.name}
    if (flags.description) data.description = flags.description
    if (flags['text-color']) data.text_color = flags['text-color']
    if (flags['background-color']) data.background_color = flags['background-color']
    if (flags.archived) data.archived = true
    const tag = await client.tags.create(data)
    const t = tag as unknown as Record<string, unknown>
    return this.output(tag, `Created tag "${t.name ?? ''}" (ID: ${t.id}).`)
  }
}
