import { format, parseISO } from 'date-fns'

import {
  handleGetQuoteById,
  handleGetQuoteByTerm,
  handleGetRandomQuote,
} from '../../utils/quoteHandlers'

const getTimestamp = timestamp => format(parseISO(timestamp), 'MMMM yyyy')

const handleGetQuote = async (client, { tags, channel }, args) => {
  let message

  if (args.length > 1) {
    const error = `/me slaps ${tags.displayName}. Woah there, one word at a time. avalonBAKA`
    return client.say(channel, error)
  }

  const query = args[0]
  if (!isNaN(query)) {
    const result = await handleGetQuoteById(Number(query))
    if (result) {
      const timestamp = getTimestamp(result.timestamp)
      message = `/me yeets quote #${result.id} from ${timestamp}: “${result.text}” ~ @${result.quotee}`
    } else {
      message = `/me can't find the quote you asked for. Stop confusing him. avalonBAKA`
    }
  } else if (query) {
    const result = await handleGetQuoteByTerm(query)
    if (result) {
      const timestamp = getTimestamp(result.timestamp)
      message = `/me searches for “${query}” and grabs quote #${result.id} from ${timestamp}: “${result.text}” ~ @${result.quotee}`
    } else {
      message = `/me can't find any quotes with "${query}" in them. avalonBLIND`
    }
  } else {
    const result = await handleGetRandomQuote()
    const timestamp = getTimestamp(result.timestamp)
    message = `/me fetches quote #${result.id} from ${timestamp}: “${result.text}” ~ @${result.quotee}`
  }

  return client.say(channel, message)
}

export default {
  name: 'quote',
  args: true,
  description: 'Fetch a quote from the quote database.',
  aliases: [],
  async execute(client, payload, args) {
    await handleGetQuote(client, payload, args)
  },
}
