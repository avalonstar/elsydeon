'use strict';

const globals = require('../globals');

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
  quotee = quotee.replace('@', '');
  const { db } = globals;
  return db
    .ref('avalonstar/quotes/list')
    .orderByChild('quotee')
    .equalTo(quotee)
    .once('value');
};

module.exports = {
  handleGetQuotes,
  handleGetQuoteById,
  handleGetQuoteByQuotee
};
