'use strict';

const globals = require('../globals');

const handleAddQuote = async payload => {
  const { db } = globals;
  const ref = db.ref('avalonstar/quotes');
  const increment = await ref
    .child('count')
    .transaction(current => (current || 0) + 1);
  const id = increment.snapshot.val();
  return ref
    .child('list')
    .child(`quote-${id}`)
    .setWithPriority(Object.assign({ id }, payload), payload.timestamp);
};

const handleGetQuotes = () => {
  const { db } = globals;
  return db.ref('avalonstar/quotes/list').once('value');
};

const handleGetQuoteById = id => {
  const { db } = globals;
  return db
    .ref('avalonstar/quotes/list')
    .child(`quote-${id}`)
    .once('value');
};

const handleGetQuoteByQuotee = quotee => {
  const { db } = globals;
  return db
    .ref('avalonstar/quotes/list')
    .orderByChild('quotee')
    .equalTo(quotee.replace('@', ''))
    .once('value');
};

module.exports = {
  handleAddQuote,
  handleGetQuotes,
  handleGetQuoteById,
  handleGetQuoteByQuotee
};
