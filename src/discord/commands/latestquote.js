import { handleGetLatestQuote } from '../quotes';

export default {
  name: 'latestquote',
  description: 'Fetch a the latest quote from the quote database.',
  aliases: ['lastquote'],
  async execute(_client, message) {
    const quote = await handleGetLatestQuote();
    message.channel.send(quote);
  },
};
