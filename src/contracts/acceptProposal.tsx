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
  cid: string,
  value: bigint,
): Promise<void> => {
  const config = getConfig(chainId);
  console.log("rateToken: ", rateToken);
  const _balance: any = await tlClient.erc20.balanceOf(rateToken);
  console.log("rateToken: ", rateToken)
  // const _allowance: any = await tlClient.erc20.checkAllowance(rateToken)

  console.log({_balance})
  try {
    if (rateToken === ZERO_ADDRESS) {


      let tx1, cid1;
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
      // Token transfer approval for escrow contract
      const _balance: any = await tlClient.erc20.balanceOf(rateToken);
      const balance: any = await tlClient.erc20.balanceOf(rateToken);
      // if (balance.lt(value)) {
      //   throw new Error('Insufficient balance');
      // }

      const [_address] = await walletClient.getAddresses();

      const allowance: any = await publicClient.readContract({
        address: rateToken,
        abi: ERC20.abi,
        functionName: 'allowance',
        args: [_address, config.contracts.talentLayerEscrow],
      });

      
      console.log("Starter kit: allowed",allowance, value,  allowance < value);
      if (allowance < value) {
        console.log("Starter kit: approval required", );
        // const { request } = await publicClient.simulateContract({
        //   address: config.contracts.talentLayerEscrow,
        //   abi: TalentLayerEscrow.abi,
        //   functionName: 'approve',
        //   args: [config.contracts.talentLayerEscrow, value],
        // });
        // const tx1 = await walletClient.writeContract(request);

        const tx1 = await tlClient.erc20.approve(rateToken, value);

        console.log("Starter kit: asking for approval", { tx1 });

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
      // const { request } = await publicClient.simulateContract({
      //   address: config.contracts.talentLayerEscrow,
      //   abi: TalentLayerEscrow.abi,
      //   functionName: 'createTransaction',
      //   args: [parseInt(serviceId, 10), parseInt(proposalId, 10), metaEvidenceCid, cid],
      // });
      // const tx2 = await walletClient.writeContract(request);
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
