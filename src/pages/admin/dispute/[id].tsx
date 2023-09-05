import { useRouter } from 'next/router';
import Loading from '../../../components/Loading';
import useUserById from '../../../hooks/useUserById';
import { useContext, useEffect, useState } from 'react';
import StarterKitContext from '../../../context/starterKit';
import UserNeedsMoreRights from '../../../components/UserNeedsMoreRights';
import SingleValueForm from '../../../components/Form/singleValueForm';
import * as Yup from 'yup';
import { useConfig } from '../../../hooks/useConfig';
import TalentLayerArbitrator from '../../../contracts/ABI/TalentLayerArbitrator.json';
import TalentLayerPlatformID from '../../../contracts/ABI/TalentLayerPlatformID.json';
import { Container } from '../../../components/newlayout/container';
import usePlatform from '../../../hooks/usePlatform';
import { useProvider } from 'wagmi';
import { ethers } from 'ethers';
import { useChainId } from '../../../hooks/useChainId';

function AdminDispute() {
  const router = useRouter();
  const { id } = router.query;
  const { isAdmin } = useContext(StarterKitContext);
  const user = useUserById(id as string);
  const config = useConfig();
  const platform = usePlatform(id as string);
  const chainId = useChainId();
  const provider = useProvider({ chainId });
  const arbitratorContractAddress = platform ? platform.arbitrator : null;
  console.log(arbitratorContractAddress, platform);
  const arbitratorContract = arbitratorContractAddress
    ? new ethers.Contract(arbitratorContractAddress, TalentLayerArbitrator.abi, provider)
    : null;
  console.log(arbitratorContract);
  const [arbitratorPrice, setArbitratorPrice] = useState<number | null>(null);
  const [arbitrators, setArbitrators] = useState<string[]>([]);

  // Get arbitrationPrice
  useEffect(() => {
    const fetchData = async () => {
      if (
        arbitratorContract &&
        arbitratorContract.address !== '0x0000000000000000000000000000000000000000'
      ) {
        const price = await arbitratorContract.arbitrationPrice(platform?.id);
        console.log(price);
        setArbitratorPrice(price);
      }
    };
    fetchData();
  }, [arbitratorContract]);

  // Get All arbitrators
  useEffect(() => {
    const fetchData = async () => {
      if (arbitratorContract) {
        const arbitrators = await TalentLayerPlatformID.validArbitrators();
        console.log(arbitrators);
        setArbitrators(arbitrators);
      }
    };
    fetchData();
  }, [platform]);

  if (!user || !config || !platform) {
    return <Loading />;
  }
  if (!isAdmin) {
    return <UserNeedsMoreRights />;
  }

  return (
    <Container>
      <p className='text-xl font-medium tracking-wider'>Configuration {'/'} Dispute</p>
      <p className='mb-6 pb-4 border-b border-gray-gray-200 font-medium'>OnChain</p>

      <Container className='w-3/4'>
        <SingleValueForm
          validationDatas={{
            validationSchema: Yup.object({
              value: Yup.number().required('value is required'),
            }),
            valueType: 'number',
            initialValue: platform?.arbitrationFeeTimeout || 0,
          }}
          contractParams={{
            contractFunctionName: 'updateArbitrationFeeTimeout',
            contractAddress: config.contracts.talentLayerPlatformId,
            contractAbi: TalentLayerPlatformID.abi,
            contractEntity: 'platform',
            contractInputs: process.env.NEXT_PUBLIC_PLATFORM_ID,
          }}
          valueName={'Arbitration fee timeout (in seconds)'}
        />

        <SingleValueForm
          validationDatas={{
            validationSchema: Yup.object({
              value: Yup.number().required('value is required'),
            }),
            valueType: 'number',
            initialValue: arbitratorPrice || 0,
          }}
          contractParams={{
            contractFunctionName: 'setArbitrationPrice',
            contractAddress: config.contracts.talentLayerArbitrator,
            contractAbi: TalentLayerArbitrator.abi,
            contractEntity: 'arbitrator',
            contractInputs: process.env.NEXT_PUBLIC_PLATFORM_ID,
          }}
          valueName={'Arbitration price (in Matic)'}
        />
      </Container>
    </Container>
  );
}

export default AdminDispute;
