import { format, parseISO } from 'date-fns'
import { Message } from 'discord.js'
import { Quote } from 'types'

import * as handlers from '../utils/quoteHandlers'

import { successEmbed, failureEmbed } from './utils'

const quoteFound = (quote: Quote) =>
  successEmbed(
    {
      description: `\`\`\`“${quote.text}” ~ @${quote.quotee}\`\`\``,
    },
    {
      text: `Quote #${quote.id}, quoted by ${quote.quoter} in ${format(
        parseISO(quote.timestamp),
        "MMMM 'of' yyyy",
      )}.`,
    },
  )

export const handleGetLatestQuote = async () => {
  const snapshot = await handlers.handleGetLatestQuote()
  return quoteFound(snapshot.docs[0].data())
}

export const handleGetQuote = async (
  input: string | any[],
  message: Message,
) => {
  if (input.length > 1) {
    const error = `Woah there, one word at a time, **${message.author.username}**.`
    return failureEmbed(error)
  }

  const query = input[0]

  if (!isNaN(query)) {
    const result = await handlers.handleGetQuoteById(Number(query))
    if (!result) {
      const error = `I can't find the quote you asked for, **${message.author.username}**.`
      return failureEmbed(error)
    }
    return quoteFound(result)
  }

  if (query) {
    const result = await handlers.handleGetQuoteByTerm(query)
    if (!result) {
      const error = `I can't find any quotes with "**${query}**" in them.`
      return failureEmbed(error)
    }
    return quoteFound(result)
  }

  const result = await handlers.handleGetRandomQuote()
  return quoteFound(result)
}

export const handleGetQuoteListSize = async (message: Message) => {
  const { quoteCount: count } = await handlers.handleQuoteListSize()
  message
    .reply(`there are **${count}** quotes in the database.`)
    .catch(console.error)
}
