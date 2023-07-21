import type { ISuccessResult } from '@worldcoin/idkit';
import { CredentialType, IDKitWidget } from '@worldcoin/idkit';
import { useAccount } from 'wagmi';

export default function VerifyButton({ children, next }: { children: any; next: Function }) {
  const { address } = useAccount();

  const onSuccess = (result: ISuccessResult) => {
    // This is where you should perform frontend actions once a user has been verified, such as redirecting to a new page
    next();
  };

  const handleProof = async (result: ISuccessResult) => {
    const reqBody = {
      merkle_root: result.merkle_root,
      nullifier_hash: result.nullifier_hash,
      proof: result.proof,
      credential_type: result.credential_type,
      action: process.env.NEXT_PUBLIC_WLD_ACTION_NAME,
      signal: '',
      address: address,
    };
    fetch('/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    }).then(async (res: Response) => {
      if (res.status == 200) {
        console.log('Successfully verified credential.');
      } else {
        throw new Error('Error: ' + (await res.json()).code) ?? 'Unknown error.';
      }
    });
  };

  return (
    <div>
      <div>
        <IDKitWidget
          action={process.env.NEXT_PUBLIC_WLD_ACTION_NAME!}
          onSuccess={onSuccess}
          handleVerify={handleProof}
          app_id={process.env.NEXT_PUBLIC_WLD_APP_ID!}
          credential_types={[CredentialType.Orb, CredentialType.Phone]}>
          {({ open }) => <div onClick={open}>{children}</div>}
        </IDKitWidget>
      </div>
    </div>
  );
}
