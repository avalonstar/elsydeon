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
      description: `\`\`\`${quote.text}\`\`\``
    },
    {
      text: `Quote #${quote.id}. Quoted by ${quote.quoter} ${moment(
        quote.timestamp
      ).fromNow()}.`
    }
  );

const handleGetInput = async (input, message) => {
  if (input.length > 1) {
    return utils.failureEmbed(
      `Woah there, one word at a time, **${message.author.username}**.`
    );
  }

  const query = input[0];
  if (!isNaN(query)) {
    const snapshot = await handlers.handleGetQuoteById(query);
    if (snapshot.exists()) {
      return quoteFound(snapshot.val());
    } else {
      return utils.failureEmbed(
        `I can't find the quote you asked for, **${message.author.username}**.`
      );
    }
  } else if (query) {
    let snapshot = await handlers.handleGetQuotes();
    snapshot = transforms.snapshotToArray(snapshot);
    const quotes = snapshot.filter(q => q.text.includes(query));
    if (quotes.length > 0) {
      return quoteFound(_.sample(quotes));
    } else {
      return utils.failureEmbed(
        `I can't find any quotes with "**${query}**" in them.`
      );
    }
  } else {
    let snapshot = await handlers.handleGetQuotes();
    snapshot = transforms.snapshotToArray(snapshot);
    return quoteFound(_.sample(snapshot));
  }
};

module.exports = {
  handleGetInput
};
