import { handleQuoteListSize } from '../../utils/quoteHandlers';

export default {
  name: 'howmanyquotes',
  description: 'Fetch the total number of quotes.',
  aliases: [],
  async execute(client, { channel }) {
    const size = await handleQuoteListSize();
    client.say(channel, `/me sees ${size} quotes in the database.`);
  }
}
