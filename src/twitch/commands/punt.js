export default {
  name: 'punt',
  aliases: [],
  async execute(client, { tags, channel, username }) {
    if (tags.mod === '1' || channel === `#${username}`) {
      client.say(channel, `/me can't punt ${tags.displayName}, they're too kawaii~ avalonEYES`);
    } else {
      client.timeout(channel, username, 1, 'Asked to be punted');
      client.say(channel, `/me rekt you, ${tags.displayName}, for your disrespect, lalafell hater. avalonRAGE`)
    }
  }
}
