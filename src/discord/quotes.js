/* eslint-disable no-restricted-globals */

'use strict';

const _ = require('lodash');
const moment = require('moment');

const handlers = require('../utils/quoteHandlers');
const transforms = require('../utils/firebaseTransforms');
const utils = require('./utils');

const formatText = text => {
  const suffix = ` , ${moment().format('YYYY')}`;
  return text + suffix;
};

const handleAddQuote = async (input, message) => {
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
    if (snapshot.empty) {
      const error = `I can't find the quote you asked for, **${
        message.author.username
      }**.`;
      return utils.failureEmbed(error);
    }
    return quoteFound(snapshot.docs[0].data());
  } else if (query) {
    let snapshot = await handlers.handleGetQuotes();
    snapshot = transforms.snapshotToArray(snapshot);
    const quotes = snapshot.filter(q =>
      q.text.toLowerCase().includes(query.toLowerCase())
    );
    if (!quotes.length > 0) {
      const error = `I can't find any quotes with "**${query}**" in them.`;
      return utils.failureEmbed(error);
    }
    return quoteFound(_.sample(quotes));
  }

  const snapshot = await handlers.handleGetQuotes();
  return quoteFound(_.sample(snapshot.docs).data());
};

module.exports = {
  handleAddQuote,
  handleGetQuote
};
