import { EmailType, IPayment, IProposal, IReview, IService } from '../../../types';
import { Web3Mail } from '../schemas/web3mail';
import { CronProbe } from '../schemas/cronProbe';

const getTimestampNowSeconds = () => Math.floor(new Date().getTime() / 1000);

export const hasProposalEmailBeenSent = async (proposal: IProposal): Promise<boolean> => {
  console.log(`---------------------- Proposal ${proposal.id} ----------------------`);
  const existingProposal = await Web3Mail.findOne({
    id: `${proposal.id}-${EmailType.NewProposal}`,
  });
  if (!existingProposal) {
    console.log('Proposal not in DB');
    return false;
  }
  console.log('Notification not sent yet');
  return true;
};

export const hasPaymentEmailBeenSent = async (payment: IPayment): Promise<boolean> => {
  console.log(`---------------------- Payment ${payment.id} ----------------------`);
  const existingPayment = await Web3Mail.findOne({
    id: `${payment.id}-${EmailType.FundRelease}`,
  });
  if (!existingPayment) {
    console.log('Payment not in DB');
    return false;
  }
  console.log('Notification not sent yet');
  return true;
};

export const hasReviewEmailBeenSent = async (review: IReview): Promise<boolean> => {
  console.log(`---------------------- Review ${review.id} ----------------------`);
  const existingReview = await Web3Mail.findOne({
    id: `${review.id}-${EmailType.Review}`,
  });
  if (!existingReview) {
    console.log('Review not in DB');
    return false;
  }
  console.log('Notification not sent yet');
  return true;
};

export const hasNewServiceEmailBeenSent = async (
  userId: string,
  service: IService,
): Promise<boolean> => {
  console.log(`---------------------- Service ${service.id} ----------------------`);
  const existingService = await Web3Mail.findOne({
    id: `${userId}-${service.id}-${EmailType.NewService}`,
  });
  if (!existingService) {
    console.log('Service not in DB');
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
