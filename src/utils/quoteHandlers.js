'use strict';

const globals = require('../globals');

const handleAddQuote = async payload => {
  const { db } = globals;
  const collection = db.collection('quotes');
  const fetchedCollection = await collection.get();
  const id = fetchedCollection.size + 1;
  return collection.doc().set(Object.assign({ id }, payload));
};

const handleGetQuotes = () => {
  const { db } = globals;
  return db.collection('quotes').get();
};

const handleGetQuoteById = id => {
  const { db } = globals;
  return db
    .collection('quotes')
    .where('id', '==', parseInt(id, 10))
    .get();
};

const handleGetQuoteByQuotee = quotee => {
  const { db } = globals;
  return db.collection('quotes').where('name', '==', quotee.replace('@', ''));
};

const handleQuoteListSize = () => {
  const { db } = globals;
  return db.collection('quotes').size;
};

module.exports = {
  handleAddQuote,
  handleGetQuotes,
  handleGetQuoteById,
  handleGetQuoteByQuotee,
  handleQuoteListSize
};
