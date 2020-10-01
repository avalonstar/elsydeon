import { EmbedField, MessageEmbedFooter } from 'discord.js'

export const successEmbed = (
  contentArgs: { title?: string; description?: string; fields?: EmbedField[] },
  footerArgs: MessageEmbedFooter,
) => ({
  embed: {
    color: 4886754,
    footer: { ...footerArgs },
    ...contentArgs,
  },
})

export const failureEmbed = (description: string) => ({
  embed: {
    title: 'ERROR',
    description,
    color: 16716340,
    thumbnail: {
      url: 'https://static-cdn.jtvnw.net/emoticons/v1/296250/2.0',
    },
  },
})
