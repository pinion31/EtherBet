/* eslint-disable import/prefer-default-export */
import cron from 'node-cron';
import { getEventsforFutureDays } from './rundown_api';
import logger from '../logger';


export const startCronJob = () => {
  const task = cron.schedule(process.env.CRON_TIME, () => {
    const daysOffset = parseInt(process.env.DAYS_OFFSET, 10) || 0;
    const daysCount = parseInt(process.env.DAYS_COUNT, 10) || 1;
    getEventsforFutureDays(daysCount, daysOffset);
    logger.info(`Starting cron job to pull sports events at ${new Date(Date.now())}`);
    logger.info(`Days Offset ${daysOffset} Days Count:${daysCount}`);
  }, {
    scheduled: true,
    timezone: 'America/Chicago',
  });

  task.start();
};
