export default {
  name: 'ping',
  description: 'What do you think this does? Come on.',
  aliases: ['p'],
  async execute(client, message) {
    const msg = await message.channel.send('Ping?');
    msg.edit(
      `Pong! Latency is ${msg.createdTimestamp -
        message.createdTimestamp}ms. API Latency is ${Math.round(
        client.ping,
      )}ms`,
    );
  },
};
