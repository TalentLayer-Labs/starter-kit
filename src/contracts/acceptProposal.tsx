import { toast } from 'react-toastify';
import TransactionToast from '../components/TransactionToast';
import { getConfig } from '../config';
import { showErrorTransactionToast } from '../utils/toast';
import ERC20 from './ABI/ERC20.json';
import TalentLayerEscrow from './ABI/TalentLayerEscrow.json';
import { Address, PublicClient, WalletClient } from 'viem';
import { ZERO_ADDRESS } from '../utils/constant';

// TODO: need to generate this json duynamically and post it to IPFS to be use for dispute resolution
export const metaEvidenceCid = 'QmQ2hcACF6r2Gf8PDxG4NcBdurzRUopwcaYQHNhSah6a8v';

export const validateProposal = async (
  chainId: number,
  walletClient: WalletClient,
  publicClient: PublicClient,
  serviceId: string,
  proposalId: string,
  rateToken: Address,
  cid: string,
  value: bigint,
): Promise<void> => {
  const config = getConfig(chainId);

  try {
    if (rateToken === ZERO_ADDRESS) {
      const { request } = await publicClient.simulateContract({
        address: config.contracts.talentLayerEscrow,
        abi: TalentLayerEscrow.abi,
        functionName: 'createTransaction',
        args: [parseInt(serviceId, 10), parseInt(proposalId, 10), metaEvidenceCid, cid],
        value: value,
        account: walletClient.account?.address,
      });

      const tx1 = await walletClient.writeContract(request);
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
      // Token transfer approval for escrow contract
      const balance: any = await publicClient.readContract({
        address: rateToken,
        abi: ERC20.abi,
        functionName: 'balanceOf',
        args: [walletClient.getAddresses()],
      });
      if (balance.lt(value)) {
        throw new Error('Insufficient balance');
      }

      const allowance: any = await publicClient.readContract({
        address: rateToken,
        abi: ERC20.abi,
        functionName: 'allowance',
        args: [walletClient.getAddresses(), config.contracts.talentLayerEscrow],
      });

      if (allowance.lt(value)) {
        const { request } = await publicClient.simulateContract({
          address: config.contracts.talentLayerEscrow,
          abi: TalentLayerEscrow.abi,
          functionName: 'approve',
          args: [config.contracts.talentLayerEscrow, value],
          account: walletClient.account?.address,
        });
        const tx1 = await walletClient.writeContract(request);

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
      const { request } = await publicClient.simulateContract({
        address: config.contracts.talentLayerEscrow,
        abi: TalentLayerEscrow.abi,
        functionName: 'createTransaction',
        args: [parseInt(serviceId, 10), parseInt(proposalId, 10), metaEvidenceCid, cid],
        account: walletClient.account?.address,
      });
      const tx2 = await walletClient.writeContract(request);
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
