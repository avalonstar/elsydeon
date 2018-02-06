/* eslint-disable no-restricted-globals */

'use strict';

const _ = require('lodash');
const moment = require('moment');

const handlers = require('../utils/quoteHandlers');
const transforms = require('../utils/firebaseTransforms');

const formatText = text => {
  const suffix = ` , ${moment().format('YYYY')}`;
  return text + suffix;
};

const handleAddQuote = (client, input, { channel, userstate }) => {
  const quote = input.join(' ');
  const regex = /"([^"]*?)" ~ (@[A-Za-z0-9_]+)/g;
  if (regex.test(quote)) {
    const quotee = quote.split(regex)[2];
    const text = formatText(quote);
    const payload = {
      quotee: quotee.replace('@', ''),
      quoter: userstate['display-name'],
      text,
      timestamp: Date.now()
    };

    const success = `has added the quote to the database. Blame yourself or God. avalonPLS`;
    Promise.all([
      handlers.handleAddQuote(payload),
      client.action(channel, success)
    ]);
  } else {
    const error = `has OCD and can't accept that quote. Please format it like so: "<quote>" ~ @username`;
    client.action(channel, error);
  }
};

const handleGetQuote = async (client, input, { channel, userstate }) => {
  if (input.length > 1) {
    const error = `slaps ${
      userstate['display-name']
    }. Woah there, one word at a time. avalonBAKA`;
    client.action(channel, error);
  }

  const query = input[0];
  if (!isNaN(query)) {
    const snapshot = await handlers.handleGetQuoteById(query);
    if (snapshot.exists()) {
      const quote = snapshot.val();
      client.action(channel, `grabs quote #${quote.id}: ${quote.text}`);
    } else {
      const error = `can't find the quote you asked for. Stop confusing me. avalonBAKA`;
      client.action(channel, error);
    }
  } else if (query) {
    let snapshot = await handlers.handleGetQuotes();
    snapshot = transforms.snapshotToArray(snapshot);
    const quotes = snapshot.filter(q =>
      q.text.toLowerCase().includes(query.toLowerCase())
    );
    if (quotes.length > 0) {
      const quote = _.sample(quotes);
      const success = `searches for "${query}" and grabs quote #${quote.id} : ${
        quote.text
      }`;
      client.action(channel, success);
    } else {
      const error = `can't find any quotes with "${query}" in them. avalonBLIND`;
      client.action(channel, error);
    }
  } else {
    let snapshot = await handlers.handleGetQuotes();
    snapshot = transforms.snapshotToArray(snapshot);
    const quote = _.sample(snapshot);
    client.action(channel, `grabs quote #${quote.id}: ${quote.text}`);
  }
};

module.exports = {
  handleAddQuote,
  handleGetQuote
};
