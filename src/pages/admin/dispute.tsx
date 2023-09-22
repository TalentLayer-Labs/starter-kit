import { useContext, useEffect, useState } from 'react';
import { usePublicClient } from 'wagmi';
import * as Yup from 'yup';
import SingleValueForm from '../../components/Form/SingleValueForm';
import Loading from '../../components/Loading';
import Steps from '../../components/Steps';
import UserNeedsMoreRights from '../../components/UserNeedsMoreRights';
import TalentLayerContext from '../../context/talentLayer';
import TalentLayerArbitrator from '../../contracts/ABI/TalentLayerArbitrator.json';
import TalentLayerPlatformID from '../../contracts/ABI/TalentLayerPlatformID.json';
import { useChainId } from '../../hooks/useChainId';
import { useConfig } from '../../hooks/useConfig';
import usePlatform from '../../hooks/usePlatform';
import { formatEther, parseEther } from 'viem';
import { ZERO_ADDRESS } from '../../utils/constant';

function AdminDispute() {
  const { user, loading } = useContext(TalentLayerContext);
  const config = useConfig();
  const platform = usePlatform(process.env.NEXT_PUBLIC_PLATFORM_ID as string);
  const chainId = useChainId();
  const publicClient = usePublicClient({ chainId });
  const arbitratorContractAddress = platform ? platform.arbitrator : null;
  const [arbitratorPrice, setArbitratorPrice] = useState<number>(0);
  let availableArbitrators: { value: string; label: string }[] = [];

  const fetchArbitrationPrice = async () => {
    if (arbitratorContractAddress) {
      const price: any = await publicClient.readContract({
        address: arbitratorContractAddress,
        abi: TalentLayerArbitrator.abi,
        functionName: 'arbitrationPrice',
        args: [platform?.id],
      });
      setArbitratorPrice(price);
    }
  };

  useEffect(() => {
    if (user?.isAdmin != null && platform != null && config != null) {
      fetchArbitrationPrice();
    }
  }, [platform?.id]);

  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return <Steps />;
  }
  if (!user.isAdmin) {
    return <UserNeedsMoreRights />;
  }

  if (config) {
    availableArbitrators = [
      {
        value: config.contracts.talentLayerArbitrator,
        label: 'TalentLayer Arbitrator',
      },
      { value: ZERO_ADDRESS, label: 'None' },
    ];
  }

  const transformPrice = (value: number | string): BigInt => {
    return parseEther(value.toString());
  };

  return (
    <div className='max-w-7xl mx-auto text-gray-200 sm:px-4 lg:px-0'>
      <div className=' -mx-6 -mt-6 '>
        <div className='flex py-2 px-6 items-center border-b w-full border-gray-700 mb-8'>
          <p className='text-2xl font-medium flex-1'>Dispute strategy</p>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6 border border-gray-700 rounded-xl p-6 bg-endnight'>
        <SingleValueForm
          validationDatas={{
            valueType: 'select',
            initialValue: platform?.arbitrator || ZERO_ADDRESS,
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
              'Arbitration fee timeout (in seconds)': Yup.number().required('value is required'),
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
              'Arbitration price (in Matic)': Yup.number().required('value is required'),
            }),
            valueType: 'number',
            initialValue: arbitratorPrice ? formatEther(BigInt(arbitratorPrice)) : 0,
            hookModifyValue: transformPrice,
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
      </div>
    </div>
  );
}

export default AdminDispute;
