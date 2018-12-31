import chalk from 'chalk';
import dotenv from 'dotenv';

import logger from './logger';
import firebase from './firebase';
import discord from './discord';
import twitch from './twitch';

dotenv.load();

async function start() {
  await firebase();
  await discord();
  // await twitch();
}

start().then(() => logger.info(chalk.cyan.bold('Elsydeon says hello.')));
