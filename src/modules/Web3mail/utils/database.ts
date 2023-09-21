import { EmailType, IPayment, IProposal, IReview, IService } from '../../../types';
import { Web3Mail } from '../schemas/web3mail';
import { CronProbe } from '../schemas/cronProbe';

const getTimestampNowSeconds = () => Math.floor(new Date().getTime() / 1000);

export const hasProposalEmailBeenSent = async (
  proposal: IProposal,
  emailType: EmailType,
): Promise<boolean> => {
  console.log(`---------------------- Proposal ${proposal.id} ----------------------`);
  const existingProposal = await Web3Mail.findOne({
    id: `${proposal.id}-${emailType}`,
  });
  if (!existingProposal) {
    console.log('Proposal not in DB');
    return false;
  }
  return true;
};

export const hasPaymentEmailBeenSent = async (
  payment: IPayment,
  emailType: EmailType,
): Promise<boolean> => {
  console.log(`---------------------- Payment ${payment.id} ----------------------`);
  const existingPayment = await Web3Mail.findOne({
    id: `${payment.id}-${emailType}`,
  });
  if (!existingPayment) {
    console.log('Payment not in DB');
    return false;
  }
  return true;
};

export const hasReviewEmailBeenSent = async (
  review: IReview,
  emailType: EmailType,
): Promise<boolean> => {
  console.log(`---------------------- Review ${review.id} ----------------------`);
  const existingReview = await Web3Mail.findOne({
    id: `${review.id}-${emailType}`,
  });
  if (!existingReview) {
    console.log('Review not in DB');
    return false;
  }
  return true;
};

export const hasNewServiceEmailBeenSent = async (
  userId: string,
  service: IService,
  emailType: EmailType,
): Promise<boolean> => {
  console.log(`---------------------- Service ${service.id} ----------------------`);
  const existingService = await Web3Mail.findOne({
    id: `${userId}-${service.id}-${emailType}`,
  });
  if (!existingService) {
    console.log('Service not in DB');
    return false;
  }
  return true;
};

export const persistEmail = async (id: string, emailType: EmailType) => {
  const sentEmail = await Web3Mail.create({
    id: `${id}-${emailType}`,
    type: emailType,
    date: `${getTimestampNowSeconds()}`,
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
