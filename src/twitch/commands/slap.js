export default {
  name: 'slap',
  args: true,
  aliases: [],
  async execute(client, { channel, tags }, args) {
    if (args.length > 1) {
      client.say(channel, `/me slaps ${args.join(' ')} around a bit with a large trout.`);
    } else {
      client.say(channel, `/me slaps ${tags.displayName} around a bit with a large trout.`)
    }
  }
}
