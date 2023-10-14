import { NextApiRequest } from 'next';
import { NotificationApiUri } from '../../../types';
import * as vercel from '../../../../vercel.json';
import { parseExpression } from 'cron-parser';

/**
 * @dev: The execution of the web3 mail functions requires a timestamp and a time duration
 * for the query to be executed, in order to fetch data from a certain point in time.
 * An optional retry factor can be set to multiply the time duration, and therefore
 * re-run the cron job again in case of failure.
 *
 * It is possible to set the timestamp manually from the query, for a custom manual execution.
 * In this case, the function execution will not be recorded in the database.
 */
export const calculateCronData = (
  req: NextApiRequest,
  RETRY_FACTOR: number,
  apiUri: NotificationApiUri,
): { cronDuration: number; sinceTimestamp: string } => {
  let sinceTimestamp: string = '';
  let cronDuration = 0;
  if (req.query.sinceTimestamp) {
    sinceTimestamp = req.query.sinceTimestamp as string;
    console.log('Timestamp set from query', sinceTimestamp);
  } else {
    const cronSchedule = vercel?.crons?.find(cron => cron.path.includes(apiUri))?.schedule;
    if (cronSchedule) {
      console.log('Timestamp set from cron', cronSchedule);
    } else {
      throw new Error('No vercel.json configured');
    }

    /** @dev: The timestamp is set to the previous cron execution minus the duration
     of the cron schedule multiplied by a retry factor, so that non sent emails
     can be sent again. */
    const cronExpression = parseExpression(cronSchedule);
    cronDuration =
      cronExpression.next().toDate().getTime() / 1000 -
      cronExpression.prev().toDate().getTime() / 1000;
    sinceTimestamp = (
      cronExpression.prev().toDate().getTime() / 1000 -
      cronDuration * RETRY_FACTOR
    ).toString();
  }
  return { sinceTimestamp, cronDuration };
};
