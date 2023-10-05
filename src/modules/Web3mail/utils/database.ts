import { EmailType } from '../../../types';
import { Web3Mail } from '../schemas/web3mail';
import { CronProbe } from '../schemas/cronProbe';

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
  console.log('Notification not sent yet');
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
  const cronProbe = await CronProbe.create({
    type: emailType,
    lastRanAt: `${getTimestampNowSeconds()}`,
    successCount: successCount,
    errorCount: errorCount,
    duration: cronDuration,
  });
  cronProbe.save();
};
