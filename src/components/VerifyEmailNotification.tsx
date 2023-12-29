import Notification from './Notification';
import { verifyEmail } from '../modules/BuilderPlace/request';
import { showMongoErrorTransactionToast } from '../utils/toast';
import { useContext, useState } from 'react';
import TalentLayerContext from '../context/talentLayer';

type VerifyEmailNotificationProps = {
  callback?: () => void | Promise<void>;
};

const VerifyEmailNotification = ({ callback }: VerifyEmailNotificationProps) => {
  const { user, workerData, refreshWorkerData } = useContext(TalentLayerContext);

  const onVerifyMail = async () => {
    if (workerData?.email && !workerData.emailVerified && user?.id) {
      try {
        const response = await verifyEmail(workerData.email, user.id);
        console.log('response', response);
      } catch (e) {
        console.log('Error', e);
        showMongoErrorTransactionToast(e);
      }
      if (callback) {
        await callback();
      }
      await refreshWorkerData();
    }
  };

  return (
    <div>
      {!!workerData?.email && !workerData?.emailVerified && (
        <Notification
          title='Verify your email !'
          text='Tired of paying gas fees ? Verify your email and get gassless transactions !'
          link=''
          linkText={'Verify my email'}
          color='success'
          imageUrl={user?.description?.image_url}
          callback={onVerifyMail}
        />
      )}
    </div>
  );
};

export default VerifyEmailNotification;
