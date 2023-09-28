import { createMultiStepsTransactionToast, showErrorTransactionToast } from '../utils/toast';
import { Address } from 'viem';
import { PublicClient, WalletClient} from 'wagmi'
import TalentLayerID from './ABI/TalentLayerID.json';

export const toggleDelegation = async (
  chainId: number,
  user: string,
  config: any,
  DelegateAddress: string,
  publicClient: PublicClient,
  walletClient: WalletClient,
  validateState: boolean,
  
): Promise<void> => {
  try {
        
    let tx: Address;
    let toastMessages;
    if (validateState === true) {
      const { request } = await publicClient.simulateContract({
        address: config.contracts.talentLayerId,
        abi: TalentLayerID.abi,
        functionName: 'addDelegate',
        args: [user, DelegateAddress],
        account: walletClient.account?.address,
      });
      tx = await walletClient.writeContract(request);
      toastMessages = {
        pending: 'Submitting the delegation...',
        success: 'Congrats! the delegation is active',
        error: 'An error occurred while delegation process',
      };
    } else {
      const { request } = await publicClient.simulateContract({
        address: config.contracts.talentLayerId,
        abi: TalentLayerID.abi,
        functionName: 'removeDelegate',
        args: [user, DelegateAddress],
        account: walletClient.account?.address,
      }); 
      tx = await walletClient.writeContract(request);
      toastMessages = {
        pending: 'Canceling the delegation...',
        success: 'The delegation has been canceled',
        error: 'An error occurred while canceling the delegation',
      };
    }
    
    await createMultiStepsTransactionToast(
      chainId,
      toastMessages,
      publicClient,
      tx,
      'Delegation',
      
    );
  } catch (error) {
    showErrorTransactionToast(error);
  }
};
