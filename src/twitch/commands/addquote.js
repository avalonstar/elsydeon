import moment from 'moment';

import { handleAddQuote } from '../../utils/quoteHandlers';

const formatText = (text, year) => {
  const suffix = ` , ${year}`;
  return text + suffix;
};

const addQuote = (client, { tags, channel }, args) => {
  const quote = args.join(' ');
  const regex = /"([^"]*?)" ~ (@[A-Za-z0-9_]+)/g;
  if (regex.test(quote)) {
    const quotee = quote.split(regex)[2];
    const year = moment().format('YYYY')
    const text = formatText(quote, year);
    const payload = {
      text,
      year,
      quotee: quotee.replace('@', ''),
      quoter: tags.displayName,
      timestamp: new Date().toISOString()
    };

    const success = `/me has added the quote to the database. Blame yourself or God. avalonSMUG`;
    Promise.all([
      handleAddQuote(payload),
      client.say(channel, success)
    ]);
  } else {
    const error = `/me has OCD and can't accept that quote. Please format it like so: "<quote>" ~ @username`;
    client.say(channel, error);
  }
};

export default {
  name: 'addquote',
  aliases: ['quoteadd'],
  args: true,
  description: 'Add a quote to the quote database.',
  aliases: ['quoteadd'],
  async execute(client, payload, args) {
    await addQuote(client, payload, args)
  }
}
