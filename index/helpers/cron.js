/* eslint-disable import/prefer-default-export */
import cron from 'node-cron';
import { getEventsforFutureDays } from './rundown_api';
import logger from '../logger';


export const startCronJob = () => {
  const task = cron.schedule(process.env.CRON_TIME, () => {
    getEventsforFutureDays(1);
    logger.info(`Starting cron job to pull sports events at ${new Date(Date.now())}`);
  }, {
    scheduled: true,
    timezone: 'America/Chicago',
  });

  task.start();
};
