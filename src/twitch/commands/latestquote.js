import { handleGetLatestQuote } from '../../utils/quoteHandlers';

export default {
  name: 'latestquote',
  description: 'Fetch a the latest quote from the quote database.',
  aliases: ['lastquote'],
  async execute(client, { channel }) {
    const quote = await handleGetLatestQuote();
    client.say(channel, `/me grabs this quote: ${quote.text}`);
  }
}
