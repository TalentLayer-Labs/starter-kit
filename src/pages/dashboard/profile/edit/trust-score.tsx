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
      // Parse the AccessControlConditions JSON
      const condition = firstCredential.credentialDetail.claimsEncrypted?.condition ?? null;
      if (typeof condition === 'string') {
        // @ts-ignore
        firstCredential.credentialDetail.claimsEncrypted.condition = JSON.parse(condition);
      }
      // Handle claims and set state directly because we don't need to decrypt
      const claims = firstCredential.credentialDetail.claims ?? null;
      if (claims && claims.length > 0) {
        const formattedClaims = formatClaims(claims);
        setDecryptedDatas(formattedClaims);
      }
      // Set the first credential
      setCredential(firstCredential);
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

      const decryptedString = JSON.parse(data.decryptedString);
      setDecryptedDatas(decryptedString);
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
      return <ErrorDisplay message="Credential found but without supported claims" learnMoreLink={learnMoreLink} />;
    }
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

      // format value
      try {
        claim.value = JSON.parse(claim.value);
      } catch (e) {} // catch silently
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

  const ClaimsDecrypted = (claims: any): JSX.Element => {
    const formattedClaims = formatClaims(claims.claimsDecrypted);
    if (!formattedClaims) {
      return <div>No claims found</div>;
    }

    return (
      <div className='relative z-20 flex flex-col gap-3 w-full text-gray-800'>
        <h2 className='text-xl font-bold text-center my-4'>Decrypted Claims</h2>
        <TrustScore />
        <div className='grid grid-cols-3 gap-3 mt-3'>
          {formattedClaims.map((claim: any, index: number) => (
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

  // Define the type for matrix points
  type MatrixPoint = {
    totalStars?: number;
    totalPRsMerged?: number;
    totalCommits?: number;
    followers?: number;
    accountCreation?: number;
  };

  const TrustScore = (): JSX.Element => {
    if (!decryptedDatas) {
      return <div>No decrypted datas</div>;
    }

    const maxValue = 500; // represent the max value to reach 100% in one criteria
    const maxYearValue = 20; // represent the max value to reach 100% in one criteria
    
    // Weights for each input data point
    const weights: MatrixPoint = {
      totalStars: 0.1, // not very important as a dev
      totalPRsMerged: 0.6, // quitte important because represent contributions
      totalCommits: 1, // important because represent contributions
      followers: 0.1, // not very important as a dev
      accountCreation: 0.6, // quitte important because reprensent when coding started
    };

    // Filter out the criteria we don't use
    const filteredData = (Array.isArray(decryptedDatas) ? decryptedDatas : []).filter((claim: any) => {
      return ['totalStars', 'totalPRsMerged', 'totalCommits', 'followers', 'accountCreation'].includes(claim.criteria);
    });

    // Apply the range from 0 to maxYearValue (20 years) to a value from 0 to maxValue
    const accountCreationClaim = filteredData.find((claim: any) => claim.criteria === 'accountCreation') as { value: string } | undefined;
    let accountCreationScore = 0;
    if (accountCreationClaim) {
      const accountCreationDate = moment(accountCreationClaim.value, "MM/DD/YYYY");
      const yearsSinceCreation = moment().diff(accountCreationDate, 'years');
      accountCreationScore = (yearsSinceCreation / maxYearValue) * maxValue;
    }

    let weightedMaximum = 0; // represent the adjusted (weighted) total of maximum values

    // Normalize other matrix points to a value between 0 and maxValue
    const normalizedMatrixPoints = filteredData.map((claim: any) => {
      const criteria = claim.criteria as keyof MatrixPoint;
      const weight = weights[criteria] ?? 1;
      weightedMaximum += weight * maxValue;
      const value = claim.value ?? 0;
      if (criteria === 'accountCreation') return accountCreationScore;
      return value * weight;
    });

    // Sum the values of the matrix points
    const trustScore = normalizedMatrixPoints.reduce((acc: number, value: number) => acc + value, 0);

    // Ensure the final trust score is between 0 and 100
    const finalTrustScore = (trustScore/weightedMaximum) * 100;

    return (
      <div className="text-gray-800 flex justify-center items-center bg-white p-2 rounded-xl w-1/2 m-auto">
        <svg className="w-8 h-8 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
        <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">{finalTrustScore.toFixed(2)}</p>
        <p className="text-sm font-medium text-gray-900 dark:text-white">/100</p>
      </div>
    );
  }

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
