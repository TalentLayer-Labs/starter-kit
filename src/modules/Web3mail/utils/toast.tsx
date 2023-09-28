import { toast } from 'react-toastify';
import Web3mailToast from '../components/Web3mailToast';

export const createWeb3mailToast = async (): Promise<void> => {
  toast(<Web3mailToast />, { autoClose: false, closeOnClick: false });
  return;
};
