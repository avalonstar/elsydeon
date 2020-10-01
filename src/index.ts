import chalk from 'chalk'

import discord from './discord';
import logger from './logger';
import twitch from './twitch';

const start = async () => {
  try {
    logger.info(chalk.cyan.bold('Elsydeon says hello.'))
    await discord();
    await twitch()
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

start();
