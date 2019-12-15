/* eslint-disable import/prefer-default-export */
import cron from 'node-cron';
import { getEventsforFutureDays } from './rundown_api';
import logger from '../logger';

export const startCronJob = () => {
  const task = cron.schedule('1 0 * * Mon', () =>  {
    getEventsforFutureDays(1);
    logger.info(`Starting cron job to pull sports events at ${new Date(Date.now())}`);
  }, {
    scheduled: true,
    timezone: 'America/Chicago',
  });

  task.start();
};
