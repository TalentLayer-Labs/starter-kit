import { toast } from 'react-toastify';
import TransactionToast from '../components/TransactionToast';
import { getConfig } from '../config';
import { showErrorTransactionToast } from '../utils/toast';
import ERC20 from './ABI/ERC20.json';
import { Address, PublicClient, WalletClient } from 'viem';
import { TalentLayerClient } from '@TalentLayer/client';
import { ZERO_ADDRESS } from '../utils/constant';

// TODO: need to generate this json duynamically and post it to IPFS to be use for dispute resolution
export const metaEvidenceCid = 'QmQ2hcACF6r2Gf8PDxG4NcBdurzRUopwcaYQHNhSah6a8v';

export const validateProposal = async (
  tlClient: TalentLayerClient,
  chainId: number,
  walletClient: WalletClient,
  publicClient: PublicClient,
  serviceId: string,
  proposalId: string,
  rateToken: Address,
  value: bigint,
): Promise<void> => {
  const config = getConfig(chainId);

  const _balance: any = await tlClient.erc20.balanceOf(rateToken);
  
  console.log({_balance})
  try {
    if (rateToken === ZERO_ADDRESS) {


      let tx1: string;
      console.log("proposalId: ", proposalId, {value})
      const {tx} = await tlClient.escrow.approve(serviceId, proposalId, metaEvidenceCid, value)
      tx1 = tx;
      const receipt1 = await toast.promise(publicClient.waitForTransactionReceipt({ hash: tx1 }), {
        pending: {
          render() {
            return (
              <TransactionToast message='Your validation is in progress' transactionHash={tx1} />
            );
          },
        },
        success: 'Transaction validated',
        error: 'An error occurred while validating your transaction',
      });
      if (receipt1.status !== 'success') {
        throw new Error('Approve Transaction failed');
      }
    } else {

      const [_address] = await walletClient.getAddresses();

      const allowance: any = await publicClient.readContract({
        address: rateToken,
        abi: ERC20.abi,
        functionName: 'allowance',
        args: [_address, config.contracts.talentLayerEscrow],
      });

      if (allowance < value) {

        const tx1 = await tlClient.erc20.approve(rateToken, value);

        const receipt1 = await toast.promise(
          publicClient.waitForTransactionReceipt({ hash: tx1 }),
          {
            pending: {
              render() {
                return (
                  <TransactionToast message='Your approval is in progress' transactionHash={tx1} />
                );
              },
            },
            success: 'Transaction validated',
            error: 'An error occurred while updating your profile',
          },
        );
        if (receipt1.status !== 'success') {
          throw new Error('Approve Transaction failed');
        }
      }

      const { tx: tx2 } = await tlClient.escrow.approve(serviceId, proposalId, metaEvidenceCid);
      const receipt2 = await toast.promise(publicClient.waitForTransactionReceipt({ hash: tx2 }), {
        pending: {
          render() {
            return (
              <TransactionToast message='Your validation is in progress' transactionHash={tx2} />
            );
          },
        },
        success: 'Transaction validated',
        error: 'An error occurred while updating your profile',
      });
      if (receipt2.status !== 'success') {
        throw new Error('Transaction failed');
      }
    }
  } catch (error: any) {
    showErrorTransactionToast(error);
  }
};
