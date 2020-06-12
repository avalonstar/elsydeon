/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */

import algoliasearch from 'algoliasearch'
import shuffle from 'knuth-shuffle-seeded'
import moment from 'moment'

import { handleGetQuoteById, handleGetQuotes } from '../../utils/quoteHandlers'

const { ALGOLIA_APP_ID, ALGOLIA_API_KEY } = process.env
const search = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY)
const index = search.initIndex('quotes')

const handleGetQuote = async (client, { tags, channel }, args) => {
  if (args.length > 1) {
    const error = `/me slaps ${tags.displayName}. Woah there, one word at a time. avalonBAKA`
    return client.say(channel, error)
  }

  const query = args[0]
  if (!isNaN(query)) {
    const snapshot = await handleGetQuoteById(query)
    if (snapshot.empty) {
      const error = `/me can't find the quote you asked for. Stop confusing me. avalonBAKA`
      client.say(channel, error)
    } else {
      const quote = snapshot
      client.say(
        channel,
        `/me yeets quote #${query} from ${moment(
          quote.timestamp,
        ).fromNow()}: “${quote.text}” ~ @${quote.quotee} , ${quote.year}`,
      )
    }
  } else if (query) {
    const results = await index.search({ query })
    if (results.nbHits > 0) {
      const quote = shuffle(results.hits, Date.now())[0]
      const success = `/me searches for “${query}” and grabs quote #${
        quote.id
      } from ${moment(quote.timestamp).fromNow()}: ${
        quote._highlightResult.text.value
      }`
      client.say(channel, success)
    } else {
      const error = `/me can't find any quotes with "${query}" in them. avalonBLIND`
      client.say(channel, error)
    }
  } else {
    const { id, quote } = await handleGetQuotes()
    console.log('quote', quote)
    client.say(
      channel,
      `/me grabs quote #${id} from ${moment(quote.timestamp).fromNow()}: “${
        quote.text
      }” ~ @${quote.quotee} , ${quote.year}`,
    )
  }
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
