import { CredentialType, IDKitWidget } from '@worldcoin/idkit';
import { useAccount, useQuery } from 'wagmi';
import type { ISuccessResult } from '@worldcoin/idkit';
import Loading from '../components/Loading';
import Toggle from '../components/Toggle';
import { useState } from 'react';

export default function WorldCoin() {
  const { address } = useAccount();
  const [privateState, setPrivateState] = useState(false);
  function setPrivate() {
    console.log('privateState', privateState);
    // TODO: handle private change from Lint
    setPrivateState(!privateState);
  }

  const { data: isVerified, isLoading } = useQuery<boolean>(['is-verified', address], async () => {
    const res = await fetch(`/api/is-verified?address=${address}`);
    const data = await res.json();
    return data.verified;
  });

  const onSuccess = (result: ISuccessResult) => {
    console.log('Result ', result);
    // This is where you should perform frontend actions once a user has been verified, such as redirecting to a new page
  };

  const handleProof = async (result: ISuccessResult) => {
    const reqBody = {
      merkle_root: result.merkle_root,
      nullifier_hash: result.nullifier_hash,
      proof: result.proof,
      credential_type: result.credential_type,
      action: process.env.NEXT_PUBLIC_WLD_ACTION_NAME,
      signal: '',
      userAddress: address,
    };
    fetch('/api/verify-worldcoin', {
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

  if (isLoading) {
    return (
      <div className='my-14 flex justify-center'>
        <Loading />
      </div>
    );
  }

  if (isVerified) {
    return <div>Verified</div>;
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'left',
          justifyContent: 'left',
          minHeight: '2vh',
        }}>
        <div className='flex flex-col '>
          <div className='ml-3 mb-4 block text-blue-600 bg-red-50 hover:bg-redpraha hover:text-white rounded-xl px-5 py-2.5 text-center'>
            <IDKitWidget
              action={process.env.NEXT_PUBLIC_WLD_ACTION_NAME?.toString() ?? ''}
              onSuccess={onSuccess}
              handleVerify={handleProof}
              app_id={process.env.NEXT_PUBLIC_WLD_APP_ID?.toString() ?? ''}
              credential_types={[CredentialType.Orb, CredentialType.Phone]}>
              {({ open }) => <button onClick={open}>Verify with World ID</button>}
            </IDKitWidget>
          </div>
          <div className={''}>
            <p>
              Keep this information private{' '}
              <Toggle isChecked={privateState} onChange={() => setPrivate()} />
            </p>
            <p className='text-xs mb-3 mt-3'>
              🔐 Privacy ensured by the{' '}
              <a
                href='https://litprotocol.com/'
                className='text-gray-400 hover:text-blue-400'
                target='_blank'>
                Lit protocol
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
