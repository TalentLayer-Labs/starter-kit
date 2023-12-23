import * as sgMail from '@sendgrid/mail';

const SENDERS_EMAIL = process.env.NEXT_PRIVATE_SENDGRID_VERIFIED_SENDER;
const APIKEY = process.env.NEXT_PRIVATE_SENDGRID_API_KEY;

sgMail.setApiKey(APIKEY as string);

export const sendNormalMessage = async (
  to: string,
  subject: string,
  html: string
) => {
  if (!APIKEY || !SENDERS_EMAIL) {
    console.warn("No APIKEY or SENDERS_EMAIL, skipping email.")
    return
  }


  try {
    await sgMail.send({ from: SENDERS_EMAIL, to: to, subject: subject, html: html });
    console.log('Email sent successfully.');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export const sendTransactionalEmailValidation = async (
  to: string,
  subject: string,
  html: string,
  emailValidationId: string
) => {
  if (!APIKEY || !SENDERS_EMAIL) {
    console.warn("No APIKEY or SENDERS_EMAIL, skipping email.")
    return
  }

  let htmlBody = html;

  htmlBody += `<a href="http://localhost:3000/validate-email?id=${emailValidationId}">Validate my email.</a>`;

  try {
    await sgMail.send({ from: SENDERS_EMAIL, to: to, subject: subject, html: htmlBody });
    console.log('Email sent successfully.');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
