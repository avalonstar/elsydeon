/* eslint-disable no-restricted-globals */

import _ from 'lodash';

import { handleGetQuoteById, handleGetQuotes } from '../../utils/quoteHandlers';
import { snapshotToArray } from '../../utils/firebaseTransforms';

const handleGetQuote = async (client, { channel, userstate }, args) => {
  if (args.length > 1) {
    const error = `/me slaps ${
      userstate['display-name']
      }. Woah there, one word at a time. avalonBAKA`;
    client.say(channel, error);
  }

  const query = args[0];
  if (!isNaN(query)) {
    const snapshot = await handleGetQuoteById(query);
    if (snapshot.empty) {
      const error = `/me can't find the quote you asked for. Stop confusing me. avalonBAKA`;
      client.say(channel, error);
    } else {
      const quote = snapshot.docs[0].data();
      client.say(channel, `/me grabs quote #${quote.id}: ${quote.text}`);
    }
  } else if (query) {
    let snapshot = await handleGetQuotes();
    snapshot = snapshotToArray(snapshot);
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
    const snapshot = await handleGetQuotes();
    const quote = _.sample(snapshot.docs).data();
    client.say(channel, `/me grabs quote #${quote.id}: ${quote.text}`);
  }
};

export default {
  name: 'quote',
  args: true,
  description: 'Fetch a quote from the quote database.',
  aliases: [],
  async execute(client, payload, args) {
    await handleGetQuote(client, payload, args)
  }
}
