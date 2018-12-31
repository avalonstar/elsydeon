import chalk from 'chalk';
import dotenv from 'dotenv';

import logger from './logger';
import db from './db';
import discord from './discord';
import twitch from './twitch';

dotenv.load();

async function start() {
  // await db();
  await discord();
  // await twitch();
}

start().then(() => logger.info(chalk.cyan.bold('Elsydeon says hello.')));
