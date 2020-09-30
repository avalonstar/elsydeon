/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */

import _ from 'lodash';
import { format, parseISO } from 'date-fns'

import * as handlers from '../utils/quoteHandlers';
import * as utils from './utils';

const formatText = text => {
  const suffix = ` , ${moment().format('YYYY')}`;
  return text + suffix;
};

export const handleAddQuote = async (input, message) => {
  const quote = input.join(' ');
  const regex = /"([^"]*?)" ~ (@[A-Za-z0-9_]+)/g;
  if (regex.test(quote)) {
    const quotee = quote.split(regex)[2];
    const text = formatText(quote);
    const payload = {
      quotee: quotee.replace('@', ''),
      quoter: message.author.username,
      source: 'discord',
      text,
      timestamp: new Date(Date.now())
    };

    const success = `I've added the quote to the database. Blame yourself or God. <:DerpDerp:431196977263411211>`;
    Promise.all([handlers.handleAddQuote(payload), message.reply(success)]);
  } else {
    const error = `has OCD and can't accept that quote. Please format it like so: "<quote>" ~ @username`;
    message.reply(error);
  }
};

const quoteFound = quote =>
  utils.successEmbed(
    {
      description: `\`\`\`“${quote.text}” ~ @${quote.quotee}\`\`\``,
    },
    {
      text: `Quote #${quote.id}, quoted by ${quote.quoter} in ${format(
        parseISO(quote.timestamp),
        'MMMM \'of\' yyyy',
      )}.`,
    },
  )

export const handleGetLatestQuote = async () => {
  const snapshot = await handlers.handleGetLatestQuote();
  return quoteFound(snapshot.docs[0].data());
};

export const handleGetQuote = async (input, message) => {
  if (input.length > 1) {
    const error = `Woah there, one word at a time, **${
      message.author.username
      }**.`;
    return utils.failureEmbed(error);
  }

  const query = input[0];

  if (!isNaN(query)) {
    const result = await handlers.handleGetQuoteById(Number(query))
    if (!result) {
      const error = `I can't find the quote you asked for, **${message.author.username}**.`
      return utils.failureEmbed(error)
    }
    return quoteFound(result)
  }

  if (query) {
    const result = await handlers.handleGetQuoteByTerm(query)
    if (!result) {
      const error = `I can't find any quotes with "**${query}**" in them.`
      return utils.failureEmbed(error)
    }
    return quoteFound(result)
  }

  const result = await handlers.handleGetRandomQuote()
  return quoteFound(result)
};

export const handleGetQuoteListSize = async message => {
  const { count } = await handlers.handleQuoteListSize();
  message
    .reply(`there are **${count}** quotes in the database.`)
    .catch(console.error);
};
