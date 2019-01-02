import { handleQuoteListSize } from '../quotes';

export default {
  name: 'howmanyquotes',
  description: 'Fetch the total number of quotes.',
  aliases: [],
  async execute(client, payload) {
    await handleQuoteListSize(client, payload);
  }
}
