import { toast } from 'react-toastify';
import VerificationEmailToast from '../VerificationEmailToast';

export const createVerificationEmailToast = async (): Promise<void> => {
  toast(<VerificationEmailToast />, { autoClose: false, closeOnClick: false });
  return;
};
