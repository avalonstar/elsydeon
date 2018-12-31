const globals = require('../globals');

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

const handleGetQuotes = () => {
  const { store } = globals;
  return store.collection('quotes').get();
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
  const { store } = globals;
  const collection = await store.collection('quotes').get();
  return collection.size;
};

module.exports = {
  handleAddQuote,
  handleGetLatestQuote,
  handleGetQuotes,
  handleGetQuoteById,
  handleGetQuoteByQuotee,
  handleQuoteListSize
};
