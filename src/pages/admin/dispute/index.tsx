import Loading from '../../../components/Loading';
import { useContext, useEffect, useState } from 'react';
import StarterKitContext from '../../../context/starterKit';
import UserNeedsMoreRights from '../../../components/UserNeedsMoreRights';
import SingleValueForm from '../../../components/Form/SingleValueForm';
import * as Yup from 'yup';
import { useConfig } from '../../../hooks/useConfig';
import TalentLayerArbitrator from '../../../contracts/ABI/TalentLayerArbitrator.json';
import TalentLayerPlatformID from '../../../contracts/ABI/TalentLayerPlatformID.json';
import { Container } from '../../../components/newlayout/container';
import usePlatform from '../../../hooks/usePlatform';
import { useProvider } from 'wagmi';
import { ethers } from 'ethers';
import { useChainId } from '../../../hooks/useChainId';
import Steps from '../../../components/Steps';

function AdminDispute() {
  const { isAdmin, user } = useContext(StarterKitContext);
  const config = useConfig();
  const platform = usePlatform(process.env.NEXT_PUBLIC_PLATFORM_ID as string);
  const chainId = useChainId();
  const provider = useProvider({ chainId });
  const arbitratorContractAddress = platform ? platform.arbitrator : null;
  const arbitratorContract = arbitratorContractAddress
    ? new ethers.Contract(arbitratorContractAddress, TalentLayerArbitrator.abi, provider)
    : null;
  const [arbitratorPrice, setArbitratorPrice] = useState<number>(-1);
  let availableArbitrators: { value: string; label: string }[] = [];
  const [isLoading, setIsLoading] = useState(true);
  const [isAdminOfThisPlatform, setIsAdminOfThisPlatform] = useState(false);
  const fetchArbitrationPrice = async () => {
    if (arbitratorContract && arbitratorContract.address !== ethers.constants.AddressZero) {
      const price = await arbitratorContract.arbitrationPrice(platform?.id);
      setArbitratorPrice(price);
    }
  };

  // Handle loading state
  useEffect(() => {
    if (isAdmin != null && user != null && platform != null && config != null) {
      fetchArbitrationPrice();
      setIsAdminOfThisPlatform(platform?.address === user?.address && isAdmin);
      setIsLoading(false);
    }
  }, [isAdmin, user, platform, config]);

  if (isLoading) {
    return <Loading />;
  }
  if (!user) {
    return <Steps />;
  }
  if (!isLoading && !isAdminOfThisPlatform) {
    return <UserNeedsMoreRights />;
  }

  if (config) {
    availableArbitrators = [
      {
        value: config.contracts.talentLayerArbitrator,
        label: 'TalentLayer Arbitrator',
      },
      { value: ethers.constants.AddressZero, label: 'None' },
    ];
  }

  return (
    <Container>
      <p className='text-xl font-medium tracking-wider'>Configuration {'/'} Dispute</p>
      <p className='mb-6 pb-4 border-b border-gray-gray-200 font-medium'>OnChain</p>

      <Container className='w-3/4 grid grid-cols-1 gap-6 border border-gray-700 rounded-xl p-6 bg-endnight'>
        <SingleValueForm
          validationDatas={{
            valueType: 'select',
            initialValue: platform?.arbitrator || ethers.constants.AddressZero,
            selectOptions: availableArbitrators,
          }}
          contractParams={{
            contractFunctionName: 'updateArbitrator',
            contractAddress: config.contracts.talentLayerPlatformId,
            contractAbi: TalentLayerPlatformID.abi,
            contractEntity: 'platform',
            contractInputs: process.env.NEXT_PUBLIC_PLATFORM_ID,
          }}
          valueName={'Choose your dispute strategy'}
          callback={fetchArbitrationPrice}
        />

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
            initialValue: arbitratorPrice,
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
