import moment from 'moment';

import { handleAddQuote } from '../../utils/quoteHandlers';

const formatText = text => {
  const suffix = ` , ${moment().format('YYYY')}`;
  return text + suffix;
};

const addQuote = (client, { channel, userstate }, args) => {
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
  args: true,
  description: 'Add a quote to the quote database.',
  aliases: ['quoteadd'],
  async execute(client, payload, args) {
    await addQuote(client, payload, args)
  }
}
