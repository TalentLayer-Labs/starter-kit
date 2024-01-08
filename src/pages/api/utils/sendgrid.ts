import * as sgMail from '@sendgrid/mail';
import { renderValidationMail } from './renderValidationEmail';
import { getBuilderPlaceByDomain } from '../../../modules/BuilderPlace/actions';

const SENDERS_EMAIL = process.env.NEXT_PRIVATE_SENDGRID_VERIFIED_SENDER;
const APIKEY = process.env.NEXT_PRIVATE_SENDGRID_API_KEY;

sgMail.setApiKey(APIKEY as string);

export const sendTransactionalEmailValidation = async (
  to: string,
  userId: string,
  name: string,
  domain: string,
) => {
  if (!APIKEY || !SENDERS_EMAIL) {
    throw new Error('No APIKEY or SENDERS_EMAIL, skipping email.');
  }

  const builderPlace = await getBuilderPlaceByDomain(domain);

  console.log('Sending email with variables: ', to, userId, name, domain);
  const htmlBody = renderValidationMail(name, userId, domain, builderPlace.logo);
  const subject = 'Validate your email';

  try {
    console.log('Sending email...');
    await sgMail.send({ from: SENDERS_EMAIL, to: to, subject: subject, html: htmlBody });
    console.log('Email sent successfully.');
  } catch (error: any) {
    throw new Error(error.message);
  }
};
