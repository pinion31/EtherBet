/* eslint-disable import/prefer-default-export */
const redis = require('redis');
const logger = require('../logger');

export const client = redis.createClient(process.env.REDIS_URL);
client.auth(process.env.REDIS_PWD);

client.on('connect', () => {
  logger.info('Redis DB Connected');
});
