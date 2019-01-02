import { handleGetLatestQuote } from '../../utils/quoteHandlers';

export default {
  name: 'latestquote',
  description: 'Fetch a the latest quote from the quote database.',
  aliases: ['lastquote'],
  async execute(client, { channel }) {
    const snapshot = await handleGetLatestQuote();
    const quote = snapshot.docs[0].data();
    client.say(channel, `/me grabs quote #${quote.id}: ${quote.text}`);
  }
}
