import chalk from 'chalk';
import dotenv from 'dotenv';
import fastify from 'fastify';

import logger from './logger';
import firebase from './firebase';
import discord from './discord';
import twitch from './twitch';

dotenv.load();

const { PORT = 8080 } = process.env;
const app = fastify();
const start = async () => {
  try {
    logger.info(chalk.cyan.bold('Elsydeon says hello.'));
    await firebase();
    await discord();
    // await twitch();

    await app.listen(PORT);
    logger.info(`Fastify is running at ${chalk.bold(`localhost:${PORT}`)}.`);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

start();
