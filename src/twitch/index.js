/* eslint-disable new-cap */
/* eslint-disable no-param-reassign */

import Enmap from 'enmap';
import fs from 'fs';
import TwitchJS from 'twitch-js';

import logger from '../logger';

const { TWITCH_IRC_PASSWORD, TWITCH_IRC_USERNAME } = process.env;
const prefix = '!';

const initialize = () => {
  const { chat: client } = new TwitchJS({
    token: TWITCH_IRC_PASSWORD,
    username: TWITCH_IRC_USERNAME, 
    log: { level: 0 }
  });
  client.commands = new Enmap();

  client.connect().then(async () => {
    await client.join('avalonstar');
    logger.info(`Twitch.js is connected.`);

    const commands = fs.readdirSync('./src/twitch/commands').filter(file => file.endsWith('.js'));
    logger.info(`Twitch.js is loading ${commands.length} commands.`);
    commands.forEach(file => {
      const command = require(`./commands/${file}`).default; // eslint-disable-line
      client.commands.set(command.name, command);
    });
  });

  client.on('PRIVMSG', payload => {
    if (!payload.message.startsWith(prefix)) return;

    payload.message = payload.message.substring(prefix.length);
    const [name, ...args] = payload.message.split(' ');

    const command = client.commands.get(name) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(name));
    console.log(command);
    if (!command) return;

    try {
      console.log('payload', payload);
      command.execute(client, payload, args);
    } catch (error) {
      logger.error(error);
    }
  });
};

export default async () => {
  await initialize();
};
