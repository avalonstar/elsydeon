'use strict';

const logger = require('winston');
const Discord = require('discord.js');

const initializeDiscord = () => {
  const client = new Discord.Client();
  client.login(process.env.DISCORD_TOKEN);

  client.on('ready', () => {
    client.user.setPresence({ game: { name: 'avalonstar.tv', type: 3 } });
    logger.info('Discord.js is connected.');
  });

  return client;
};

module.exports = async () => {
  await initializeDiscord();
};
