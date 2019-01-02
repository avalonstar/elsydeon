/* eslint-disable no-restricted-globals */

import _ from 'lodash';
import moment from 'moment';

const handlers = require('../utils/quoteHandlers');
const transforms = require('../utils/firebaseTransforms');

const formatText = text => {
  const suffix = ` , ${moment().format('YYYY')}`;
  return text + suffix;
};

const handleAddQuote = (client, { channel, userstate }, args) => {
  const quote = args.join(' ');
  const regex = /"([^"]*?)" ~ (@[A-Za-z0-9_]+)/g;
  if (regex.test(quote)) {
    const quotee = quote.split(regex)[2];
    const text = formatText(quote);
    const payload = {
      quotee: quotee.replace('@', ''),
      quoter: userstate['display-name'],
      source: 'twitch',
      text,
      timestamp: new Date(Date.now())
    };

    const success = `/me has added the quote to the database. Blame yourself or God. avalonSMUG`;
    Promise.all([
      handlers.handleAddQuote(payload),
      client.say(channel, success)
    ]);
  } else {
    const error = `/me has OCD and can't accept that quote. Please format it like so: "<quote>" ~ @username`;
    client.say(channel, error);
  }
};

const handleGetLatestQuote = async (client, { channel }) => {
  const snapshot = await handlers.handleGetLatestQuote();
  const quote = snapshot.docs[0].data();
  client.say(channel, `/me grabs quote #${quote.id}: ${quote.text}`);
};

const handleGetQuote = async (client, { channel, userstate }, args) => {
  if (args.length > 1) {
    const error = `/me slaps ${
      userstate['display-name']
    }. Woah there, one word at a time. avalonBAKA`;
    client.say(channel, error);
  }

  const query = args[0];
  if (!isNaN(query)) {
    const snapshot = await handlers.handleGetQuoteById(query);
    if (snapshot.empty) {
      const error = `/me can't find the quote you asked for. Stop confusing me. avalonBAKA`;
      client.say(channel, error);
    } else {
      const quote = snapshot.docs[0].data();
      client.say(channel, `/me grabs quote #${quote.id}: ${quote.text}`);
    }
  } else if (query) {
    let snapshot = await handlers.handleGetQuotes();
    snapshot = transforms.snapshotToArray(snapshot);
    const quotes = snapshot.filter(q =>
      q.text.toLowerCase().includes(query.toLowerCase())
    );
    if (quotes.length > 0) {
      const quote = _.sample(quotes);
      const success = `/me searches for "${query}" and grabs quote #${quote.id} : ${
        quote.text
      }`;
      client.say(channel, success);
    } else {
      const error = `/me can't find any quotes with "${query}" in them. avalonBLIND`;
      client.say(channel, error);
    }
  } else {
    const snapshot = await handlers.handleGetQuotes();
    const quote = _.sample(snapshot.docs).data();
    client.say(channel, `/me grabs quote #${quote.id}: ${quote.text}`);
  }
};

const handleQuoteListSize = async (client, { channel }) => {
  const size = await handlers.handleQuoteListSize();
  client.say(channel, `/me sees ${size} quotes in the database.`);
};

module.exports = {
  handleAddQuote,
  handleGetLatestQuote,
  handleGetQuote,
  handleQuoteListSize
};
