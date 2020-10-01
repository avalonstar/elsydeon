import { Chat, PrivateMessages } from 'twitch-js'

export interface TwitchCommand {
  name: string
  args?: boolean
  description?: string
  aliases?: string[]
  execute(client: Chat, payload: PrivateMessages, args: string[]): Promise<void>
}
