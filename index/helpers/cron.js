/* eslint-disable import/prefer-default-export */
import cron from 'node-cron';
import { getEventsforFutureDays, getSportsFromDB } from './rundown_api';
import { settleAllBets } from './betHelper';
import logger from '../logger';

import { client } from './redisClient';


export const startCronJob = () => {
  const task = cron.schedule(process.env.CRON_TIME, async () => {
    const daysOffset = parseInt(process.env.DAYS_OFFSET, 10) || 0;
    const daysCount = parseInt(process.env.DAYS_COUNT, 10) || 1;
    logger.info(`Starting cron job to pull sports events at ${new Date(Date.now())}`);
    logger.info(`Days Offset ${daysOffset} Days Count:${daysCount}`);
    await getSportsFromDB()
      .then((result) => {
        if (!result) return logger.info('Error resetting cache for Sports');
        logger.info(`Resetting Cache for Sports: ${result}`);
        client.set('sports', JSON.stringify(result));
      });


    await getEventsforFutureDays(daysCount, daysOffset);
    await settleAllBets();
  }, {
    scheduled: true,
    timezone: 'America/Chicago',
  });

  task.start();
};
