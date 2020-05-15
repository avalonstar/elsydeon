import chalk from 'chalk';
import fastify from 'fastify';

import discord from './discord';
import firebase from './firebase';
import logger from './logger';
import redis from './redis';
import twitch from './twitch';

const { PORT = 8080 } = process.env;
const app = fastify();
const start = async () => {
  try {
    logger.info(chalk.cyan.bold('Elsydeon says hello.'));
    await redis();
    await firebase();
    await discord();
    await twitch();

    await app.listen(PORT, '0.0.0.0');
    logger.info(`Fastify is running at ${chalk.bold(`localhost:${PORT}`)}.`);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

start();
