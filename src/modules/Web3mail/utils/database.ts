import { EmailType } from '../../../types';
import { Web3Mail } from '../schemas/web3mail';
import { CronProbe } from '../schemas/cronProbe';
import { getBuilderPlaceFromOwner } from '../../BuilderPlace/request';

const getTimestampNowSeconds = () => Math.floor(new Date().getTime() / 1000);

export const hasEmailBeenSent = async (id: string, emailType: EmailType): Promise<boolean> => {
  console.log(`---------------------- ${emailType} ${id} ----------------------`);
  const existingProposal = await Web3Mail.findOne({
    id: `${id}-${emailType}`,
  });
  if (!existingProposal) {
    console.log('Notification not in DB');
    return false;
  }
  console.log('Notification already sent');
  return true;
};

export const persistEmail = async (id: string, emailType: EmailType) => {
  const sentEmail = await Web3Mail.create({
    id: `${id}-${emailType}`,
    type: emailType,
    sentAt: `${getTimestampNowSeconds()}`,
  });
  sentEmail.save();
};

export const persistCronProbe = async (
  emailType: EmailType,
  successCount: number,
  errorCount: number,
  cronDuration: number,
) => {
  const existingCronProbe = await CronProbe.findOne({
    type: emailType,
  });
  if (existingCronProbe) {
    existingCronProbe.lastRanAt = `${getTimestampNowSeconds()}`;
    existingCronProbe.successCount = successCount;
    existingCronProbe.errorCount = errorCount;
    existingCronProbe.duration = cronDuration;
    existingCronProbe.save();
    return;
  }
  const cronProbe = await CronProbe.create({
    type: emailType,
    lastRanAt: `${getTimestampNowSeconds()}`,
    successCount: successCount,
    errorCount: errorCount,
    duration: cronDuration,
  });
  cronProbe.save();
};

export const getWeb3mailCount = async (): Promise<number> => {
  return Web3Mail.count();
};

export const getWeb3mailCountByMonth = async (): Promise<{ _id: number; count: number }[]> => {
  return Web3Mail.aggregate([
    {
      $project: {
        month: { $month: { $toDate: { $multiply: ['$sentAt', 1000] } } }, // Convert timestamp to milliseconds and to a Date object
        // The $multiply by 1000 is because MongoDB expects time in milliseconds, but often Unix time is in seconds
      },
    },
    {
      $group: {
        _id: '$month', // Group by months
        count: { $sum: 1 }, // Count each group size
      },
    },
    {
      $sort: { _id: 1 }, // Optional: sort by month (1 to 12)
    },
  ]);
};

export const getCronProbeCount = async (): Promise<number> => {
  return CronProbe.count();
};

export const getDomain = async (buyerTlId: string): Promise<string> => {
  const builderPlace = await getBuilderPlaceFromOwner(buyerTlId);
  return builderPlace?.customDomain || builderPlace?.subdomain;
};
