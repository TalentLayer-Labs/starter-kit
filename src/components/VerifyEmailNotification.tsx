import Notification from './Notification';
import { sendVerificationEmail } from '../modules/BuilderPlace/request';
import { showErrorTransactionToast } from '../utils/toast';
import { useContext, useState } from 'react';
import TalentLayerContext from '../context/talentLayer';
import { useRouter } from 'next/router';

type VerifyEmailNotificationProps = {
  callback?: () => void | Promise<void>;
};

const VerifyEmailNotification = ({ callback }: VerifyEmailNotificationProps) => {
  const { user, workerProfile } = useContext(TalentLayerContext);
  const router = useRouter();
  const [showNotification, setShowNotification] = useState(true);

  const onVerifyMail = async () => {
    const domain =
      typeof router.query.domain === 'object' && !!router.query.domain
        ? router.query.domain[0]
        : router.query.domain;
    if (workerProfile?.email && !workerProfile.isEmailVerified && user?.id && domain) {
      try {
        const response = await sendVerificationEmail(
          workerProfile.email,
          workerProfile.id,
          workerProfile.name,
          domain,
        );

        if (response.status !== 200) {
          throw new Error('Error sending verification email');
        }

        setShowNotification(false);

        if (callback) {
          await callback();
        }
      } catch (err: any) {
        showErrorTransactionToast(err.message);
      }
    }
  };

  if (!workerProfile?.email || workerProfile?.isEmailVerified || !showNotification) {
    return null;
  }

  return (
    <Notification
      title='Verify your email!'
      text='Needed to active email notifications.'
      link=''
      linkText={'Verify my email'}
      color='success'
      imageUrl={user?.description?.image_url}
      callback={onVerifyMail}
    />
  );
};

export default VerifyEmailNotification;
