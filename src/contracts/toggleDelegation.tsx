import { createMultiStepsTransactionToast, showErrorTransactionToast } from '../utils/toast';
import {PublicClient, WalletClient } from 'viem';
import TalentLayerID from './ABI/TalentLayerID.json';
import { useConfig } from '../hooks/useConfig';
import { usePublicClient } from 'wagmi';


export const toggleDelegation = async (
  chainId: number,
  user: string,
  DelegateAddress: string,
  publicClient: PublicClient,
  walletClient: WalletClient,
  validateState: boolean,
): Promise<void> => {
  try { 
    let tx: any;
    let toastMessages;
    const config = useConfig();
    
    if (validateState === true) {
      
      const {request} = await publicClient.simulateContract({
        address: config.contracts.talentLayerId,
        abi: TalentLayerID.abi,
        functionName: 'addDelegate',
        args: [user, DelegateAddress]
        });
      const tx = await walletClient.writeContract(request);
      toastMessages = {
        pending: 'Submitting the delegation...',
        success: 'Congrats! the delegation is active',
        error: 'An error occurred while delegation process',
      };
    } else {
      
      const {request} = await publicClient.simulateContract({
        address: config.contracts.talentLayerId,
        abi: TalentLayerID.abi,
        functionName: 'removeDelegate',
        args: [user, DelegateAddress]
        });
      const tx = await walletClient.writeContract(request);
      toastMessages = {
        pending: 'Canceling the delegation...',
        success: 'The delegation has been canceled',
        error: 'An error occurred while canceling the delegation',
      };
    }

    await createMultiStepsTransactionToast(chainId, toastMessages, usePublicClient({ chainId }), tx, 'Delegation');
  } catch (error) {
    showErrorTransactionToast(error);
  }
};
