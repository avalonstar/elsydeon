/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */

import _ from 'lodash';
import moment from 'moment';

import * as handlers from '../utils/quoteHandlers';
import * as transforms from '../utils/firebaseTransforms';
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
      title: `Quote #${quote.id}`,
      description: `\`\`\`${quote.text}\`\`\``
    },
    {
      text: `Quoted by ${quote.quoter} ${moment(quote.timestamp._seconds * 1000).fromNow()}.`
    }
  );

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
    const snapshot = await handlers.handleGetQuoteById(query);
    if (snapshot.empty) {
      const error = `I can't find the quote you asked for, **${
        message.author.username
      }**.`;
      return utils.failureEmbed(error);
    }
    return quoteFound(snapshot.docs[0].data());
  } 
  
  if (query) {
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

export const handleGetQuoteListSize = async message => {
  const size = await handlers.handleQuoteListSize();
  message
    .reply(`there are **${size}** quotes in the database.`)
    .catch(console.error);
};
