/* eslint-disable no-param-reassign */

import Discord from 'discord.js';
import fs from 'fs';

import logger from '../logger';

const { DISCORD_TOKEN } = process.env;
const prefix = '!';
const client = new Discord.Client();
client.commands = new Discord.Collection();

const initialize = async () => {
  client.once('ready', () => {
    client.user.setPresence({ game: { name: 'avalonstar.tv (test)', type: 3 } });
    logger.info(`Discord.js connected as ${client.user.tag}. Ready to serve ${client.users.size} users.`);

    const commands = fs.readdirSync('./src/discord/commands').filter(file => file.endsWith('.js'));
    logger.info(`Discord.js is loading ${commands.length} commands.`);
    commands.forEach(file => {
      const command = require(`./commands/${file}`).default; // eslint-disable-line
      client.commands.set(command.name, command);
    });
  });

  client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    message.content = message.content.substring(prefix.length);
    const [name, ...args] = message.content.split(' ');

    const command = client.commands.get(name) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(name));
    if (!command) return;

    try {
      command.execute(client, message, args);
    } catch (error) {
      logger.error(error);
      message.reply('there was an error while trying to execute that command. Bryan fucked up.');
    }
  });

  client.login(DISCORD_TOKEN);
  return client;
}

export default async () => {
  await initialize();
};
