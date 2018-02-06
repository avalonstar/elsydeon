/* eslint-disable no-restricted-globals */

'use strict';

const _ = require('lodash');
const moment = require('moment');

const handlers = require('../utils/quoteHandlers');
const transforms = require('../utils/firebaseTransforms');
const utils = require('./utils');

const quoteFound = quote =>
  utils.successEmbed(
    {
      title: `Quote #${quote.id}`,
      description: `\`\`\`${quote.text}\`\`\``
    },
    {
      text: `Quoted by ${quote.quoter} ${moment(quote.timestamp).fromNow()}.`
    }
  );

const handleGetQuote = async (input, message) => {
  if (input.length > 1) {
    const error = `Woah there, one word at a time, **${
      message.author.username
    }**.`;
    return utils.failureEmbed(error);
  }

  const query = input[0];

  if (!isNaN(query)) {
    const snapshot = await handlers.handleGetQuoteById(query);
    if (!snapshot.exists()) {
      const error = `I can't find the quote you asked for, **${
        message.author.username
      }**.`;
      return utils.failureEmbed(error);
    }
    return quoteFound(snapshot.val());
  } else if (query) {
    let snapshot = await handlers.handleGetQuotes();
    snapshot = transforms.snapshotToArray(snapshot);
    const quotes = snapshot.filter(q => q.text.includes(query));
    if (!quotes.length > 0) {
      const error = `I can't find any quotes with "**${query}**" in them.`;
      return utils.failureEmbed(error);
    }
    return quoteFound(_.sample(quotes));
  }

  let snapshot = await handlers.handleGetQuotes();
  snapshot = transforms.snapshotToArray(snapshot);
  return quoteFound(_.sample(snapshot));
};

module.exports = {
  handleGetQuote
};
