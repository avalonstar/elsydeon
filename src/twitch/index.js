/* eslint-disable new-cap */
/* eslint-disable no-param-reassign */

import Enmap from 'enmap';
import fs from 'fs';
import TwitchJS from 'twitch-js';

import logger from '../logger';

const { TWITCH_IRC_PASSWORD, TWITCH_IRC_USERNAME } = process.env;
const prefix = '!';

const getCommand = (command, client, input, args) => {
  const list = {
    // Vanity.
    // heybryan: () => vanity.heybryan(client, args),
    // heyeasy: () => vanity.heyeasy(client, args),
    // heyfires: () => vanity.heyfires(client, args),
    // heyheather: () => vanity.heyheather(client, args),
    // heykay: () => vanity.heykay(client, args),
    // heymyri: () => vanity.heymyri(client, args),
    // provoke: () => vanity.provoke(client, args)
  };

  return Object.keys(list).includes(command) && list[command]();
};

const greetings = [
  `is online and ready to serve. avalonDEFEND`
  // `boops your nose. avalonBLEP`,
  // `scolds you for not cleaning up after yourself. avalonBAKA`,
  // `could not find the balls. avalonBLIND`,
  // `thinks your cute. avalonEYES`,
  // `is attracted to you. avalonSHY`,
  // `after realizing that you're not wearing pants: avalonWAAH`,
  // `kicked your RNG in the groin. avalonPLS`,
  // `knows what you did last summer. avalonO`,
  // `isn't here. avalonLURK`,
  // `gives you a hug because you deserve it. avalonHUG`
];

const initialize = () => {
  const { chat: client, chatConstants } = new TwitchJS({
    token: TWITCH_IRC_PASSWORD,
    username: TWITCH_IRC_USERNAME
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

  const log = msg => logger.silly('Twitch Message:', { msg });
  client.on(chatConstants.EVENTS.ALL, log);

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
