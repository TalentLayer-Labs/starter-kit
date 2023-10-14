import { IExecWeb3mail, getWeb3Provider as getMailProvider } from '@iexec/web3mail';
import { IExecDataProtector, getWeb3Provider as getProtectorProvider } from '@iexec/dataprotector';
import { userGaveAccessToPlatform } from '../../modules/Web3mail/utils/data-protector';

/**
 * @dev: The parameter "throwable" will interrupt the function's loop and throw an error if set to true
 * and simply log the error & keep iterating on all the loop's addresses if set to false.
 */

export const sendMailToAddresses = async (
  emailSubject: string,
  emailContent: string,
  addresses: string[],
  throwable = false,
  providedDataProtector?: IExecDataProtector,
  providedWeb3mail?: IExecWeb3mail,
): Promise<{ successCount: number; errorCount: number }> => {
  console.log('Sending email to addresses');
  const privateKey = process.env.NEXT_PUBLIC_WEB3MAIL_PLATFORM_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error('Private key is not set');
  }
  let sentCount = 0,
    nonSentCount = 0;
  let web3mail: IExecWeb3mail, dataProtector: IExecDataProtector;

  try {
    if (!providedDataProtector) {
      const protectorWebProvider = getProtectorProvider(privateKey);
      dataProtector = new IExecDataProtector(protectorWebProvider);
    } else {
      dataProtector = providedDataProtector;
    }
    if (!providedWeb3mail) {
      const mailWeb3Provider = getMailProvider(privateKey);
      web3mail = new IExecWeb3mail(mailWeb3Provider);
    } else {
      web3mail = providedWeb3mail;
    }

    for (const address of addresses) {
      try {
        console.log(`------- Sending web3mail to ${address} -------`);

        // Check whether user granted access to his email
        const protectedEmailAddress = await userGaveAccessToPlatform(address, dataProtector);
        if (!protectedEmailAddress) {
          throwable
            ? throwError(`sendMailToAddresses - User ${address} did not grant access to his email`)
            : console.warn(
                `sendMailToAddresses - User ${address} did not grant access to his email`,
              );
          nonSentCount++;
          continue;
        }

        const mailSent = await web3mail.sendEmail({
          protectedData: protectedEmailAddress,
          emailSubject: emailSubject,
          emailContent: emailContent,
        });
        sentCount++;
        console.log('sent email', mailSent);
      } catch (e) {
        nonSentCount++;
        throwable ? throwError(e) : console.log(e);
      }
    }
  } catch (e) {
    /**@dev: No error should be thrown here if dataProtector or web3mail are provided */
    throwError(e);
  }
  return { successCount: sentCount, errorCount: nonSentCount };
};

const throwError = (message: any) => {
  throw new Error(message);
};
