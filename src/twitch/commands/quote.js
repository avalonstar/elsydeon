/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */

import _ from 'lodash';
import moment from 'moment';

import { handleGetQuoteById, handleGetQuotes } from '../../utils/quoteHandlers';

const handleGetQuote = async (client, { tags, channel }, args) => {
  if (args.length > 1) {
    const error = `/me slaps ${tags.displayName}. Woah there, one word at a time. avalonBAKA`;
    return client.say(channel, error);
  }

  const query = args[0];
  if (!isNaN(query)) {
    const snapshot = await handleGetQuoteById(query);
    if (snapshot.empty) {
      const error = `/me can't find the quote you asked for. Stop confusing me. avalonBAKA`;
      client.say(channel, error);
    } else {
      const quote = snapshot.docs[0].data();
      client.say(channel, `/me grabs quote #${quote.id} from ${moment(quote.timestamp._seconds * 1000).fromNow()}: ${quote.text}`);
    }
  } else if (query) {
    const snapshot = await handleGetQuotes();
    const quotes = snapshot.filter(q =>
      q.text.toLowerCase().includes(query.toLowerCase())
    );
    if (quotes.length > 0) {
      const quote = _.shuffle(quotes).slice(0, 5)[0];
      const success = `/me searches for "${query}" and grabs quote #${quote.id} from ${moment(quote.timestamp._seconds * 1000).fromNow()}: ${
        quote.text
        }`;
      client.say(channel, success);
    } else {
      const error = `/me can't find any quotes with "${query}" in them. avalonBLIND`;
      client.say(channel, error);
    }
  } else {
    const snapshot = await handleGetQuotes();
    const quote = _.shuffle(snapshot).slice(0, 5)[0];
    client.say(channel, `/me grabs quote #${quote.id} from ${moment(quote.timestamp._seconds * 1000).fromNow()}: ${quote.text}`);
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
