import { SparklesIcon } from '@heroicons/react/24/outline';
import Layout from '../../../../components/EditProfile/Layout';
import { useContext, useEffect, useState } from 'react';
import TalentLayerContext from '../../../../context/talentLayer';
import lit from '../../../../utils/lit';
import Loading from '../../../../components/Loading';
import { ICredential, ICredentialDetailsEncrypted } from '../../../../types';
import { useWalletClient } from 'wagmi';
import { AccessControlConditions } from '@lit-protocol/types';
import moment from 'moment';

function EditTrustScore() {
  const { user } = useContext(TalentLayerContext);
  const [credential, setCredential] = useState<ICredential | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const [decryptedDatas, setDecryptedDatas] = useState(null);
  const learnMoreLink = 'https://docs.talentlayer.org';
  const { data: client } = useWalletClient();

  // Use useEffect to set the initial state based on the user context
  useEffect(() => {
    const credentials = user?.description?.credentials ?? [];
    if (credentials.length > 0) {
      let firstCredential = credentials[0];
      const condition = firstCredential.credentialDetail.claimsEncrypted?.condition ?? null;
      if (typeof condition === 'string') {
        // @ts-ignore
        firstCredential.credentialDetail.claimsEncrypted.condition = JSON.parse(condition);
      }
      setCredential(credentials[0]);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    (async () => {
      await lit.connect();
    })();
  }, []);

  async function decrypt(claimsEncrypted: ICredentialDetailsEncrypted): Promise<void> {
    if (!client || !claimsEncrypted) return;
    setLoading(true);

    try {
      const data = await lit.decrypt(
        client,
        claimsEncrypted.ciphertext,
        claimsEncrypted.dataToEncryptHash,
        claimsEncrypted.condition as AccessControlConditions,
      );

      setDecryptedDatas(JSON.parse(data.decryptedString));
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  const DefaultDisplay = (): JSX.Element => {
    return (
      <>
        <div className='relative z-20 flex flex-col gap-3'>
          <p className=''>
            <span className='text-gray-800'>
              {' '}
              Gain trust in the network
              <br />
              Certify your existing web3 reputation with blockchain
              <br />
              Preserve your privacy
              <br />
            </span>
          </p>
          <a
            aria-current='page'
            href={learnMoreLink}
            className='text-sm text-gray-800 underline-offset-4 underline'>
            {' '}
            Learn More{' '}
          </a>
        </div>
        <div className='absolute right-2 bottom-2 z-10 flex h-14 w-14 items-center justify-center text-redpraha'>
          <SparklesIcon width={56} height={56} />
        </div>
      </>
    );
  };

  const DecryptDisplay = (): JSX.Element => {
    const claimsEncrypted = credential?.credentialDetail?.claimsEncrypted ?? undefined;
    if (!credential) {
      return <ErrorDisplay message="No credential found" learnMoreLink={learnMoreLink} />;
    }
    if (!claimsEncrypted) {
      return <ErrorDisplay message="Credential found but without encrypted claims" learnMoreLink={learnMoreLink} />;
    }
    console.log(claimsEncrypted);
    return (
      <>
        <div className='relative z-20 flex flex-col gap-3 w-full text-gray-800'>
          <div className='grid grid-cols-3 gap-3 mt-3'>
            {[...Array(Number(claimsEncrypted.total)).keys()].map(index => (
              <div key={index} className='bg-white shadow-md p-4 rounded-lg'>
                <div className='font-bold blur-sm'>Title example</div>
                <div className='text-gray-500 text-lg blur-sm'>Text example</div>
              </div>
            ))}
          </div>
          <p className='text-center'>
            We found credentials on your profile
            <br />
            Do you want to decrypt them?
            <br />
          </p>
          <button
            className='text-smunderline-offset-4 underline'
            onClick={() => {
              decrypt(claimsEncrypted as ICredentialDetailsEncrypted);
            }}>
            {' '}
            Decrypt{' '}
          </button>
        </div>
        <div className='absolute right-2 bottom-2 z-10 flex h-14 w-14 items-center justify-center text-redpraha'>
          <SparklesIcon width={56} height={56} />
        </div>
      </>
    );
  };

  const formatClaims = (claims: any) => {
    if (!claims) return;
    claims.map((claim: any) => {
      // format dates
      const isDate = moment(claim.value, moment.ISO_8601, true).isValid();
      if (isDate) {
        claim.value = moment(claim.value).calendar();
      }
      // format arrays
      if (Array.isArray(claim.value)) {
        claim.value = claim.value.join(", ");
      }
      // format condition 
      if (typeof claim.condition === "string") {
        claim.condition = claim.condition.replace('==', '=');
      }
    })

    return claims;

  }

  const ClaimsDecrypted = (claimsDecrypted: any): JSX.Element => {
    const claims = claimsDecrypted.claimsDecrypted ?? undefined;
    const formattedClaims = formatClaims(claims);
    if (!formattedClaims) {
      return <div>No claims found</div>;
    }

    console.log(formattedClaims);
    return (
      <div className='relative z-20 flex flex-col gap-3 w-full text-gray-800'>
        <h2 className='text-xl font-bold text-center my-4'>Decrypted Claims</h2>
        <div className='grid grid-cols-3 gap-3 mt-3'>
          {formattedClaims.map((claim, index: number) => (
            <div key={index} className='bg-white shadow-md p-4 rounded-lg'>
              <div className='font-bold'>{claim.criteria}</div>
              <div className='text-gray-500 text-lg'>
                {claim.condition}{" "}
                {claim.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ErrorDisplay = ({ message, learnMoreLink }: { message: string, learnMoreLink?: string }): JSX.Element => {
    return (
      <div className='text-gray-800'>
        {message}
        <a
          aria-current='page'
          href={learnMoreLink}
          className='text-sm text-gray-800 underline-offset-4 underline'>
          {' '}
          Learn More{' '}
        </a>
      </div>
    );
  };

  return (
    <Layout>
      <h2 className='text-white text-xl font-bold text-center my-4'>Trust score</h2>
      <div className='bg-gray-200 relative flex flex-1 items-center justify-center bg-gradient-to-br p-5 shadow-xl rounded-xl'>
        {loading && <Loading />}
        {!loading && !credential && <DefaultDisplay />}
        {!loading && credential && !decryptedDatas && <DecryptDisplay />}
        {!loading && credential && decryptedDatas && (
          <ClaimsDecrypted claimsDecrypted={decryptedDatas} />
        )}
      </div>
    </Layout>
  );
}

export default EditTrustScore;
