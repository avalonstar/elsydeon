import redis from 'redis';

import logger from './logger';

const { REDIS_URL } = process.env;
const client = redis.createClient(REDIS_URL);

const initialize = async () => {
  client.on('connect', () => {
    logger.info(`Redis client connected to Heroku Redis.`);
  });

  return client;
}

export default async () => {
  await initialize();
}