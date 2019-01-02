import redis from 'redis';
import { promisify } from 'util';

import globals from '../globals';

const { REDIS_URL } = process.env;
const client = redis.createClient(REDIS_URL);
const getAsync = promisify(client.get).bind(client);

const handleAddQuote = async payload => {
  const { store } = globals;
  const collection = store.collection('quotes');
  const fetchedCollection = await collection.get();
  const id = fetchedCollection.size + 1;
  return collection.doc().set(Object.assign({ id }, payload));
};

const handleGetLatestQuote = () => {
  const { store } = globals;
  return store
    .collection('quotes')
    .orderBy('timestamp', 'desc')
    .limit(1)
    .get();
};

const handleGetQuotes = async () => {
  const quotes = await getAsync('quotes');
  return JSON.parse(quotes);
};

const handleGetQuoteById = id => {
  const { store } = globals;
  return store
    .collection('quotes')
    .where('id', '==', parseInt(id, 10))
    .get();
};

const handleGetQuoteByQuotee = quotee => {
  const { store } = globals;
  return store.collection('quotes').where('name', '==', quotee.replace('@', ''));
};

const handleQuoteListSize = async () => {
  const quotes = await getAsync('quotes');
  return JSON.parse(quotes).length;
};

module.exports = {
  handleAddQuote,
  handleGetLatestQuote,
  handleGetQuotes,
  handleGetQuoteById,
  handleGetQuoteByQuotee,
  handleQuoteListSize
};
