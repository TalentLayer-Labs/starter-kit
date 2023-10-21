'use client';

import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import SingleValueForm from '../../../components/Form/SingleValueForm';
import Loading from '../../../components/Loading';
import Steps from '../../../components/Steps';
import UserNeedsMoreRights from '../../../components/UserNeedsMoreRights';
import TalentLayerArbitrator from '../../../contracts/ABI/TalentLayerArbitrator.json';
import TalentLayerPlatformID from '../../../contracts/ABI/TalentLayerPlatformID.json';
import { useConfig } from '../../../hooks/useConfig';
import { formatEther } from 'viem';
import { ZERO_ADDRESS } from '../../../utils/constant';
import { usePlatform, useTalentLayer } from '@talentlayer/react';

export default function AdminDispute() {
  const { user, loading, client: talentLayerClient } = useTalentLayer();
  const config = useConfig();
  const [platform] = usePlatform(process.env.NEXT_PUBLIC_PLATFORM_ID as string);
  const [arbitratorPrice, setArbitratorPrice] = useState<number>(0);
  let availableArbitrators: { value: string; label: string }[] = [];

  const fetchArbitrationPrice = async () => {
    if (talentLayerClient) {
      try {
        const _price = await talentLayerClient.disputes.getArbitrationCost();
        setArbitratorPrice(_price);
      } catch (e) {
        console.error(e);
        setArbitratorPrice(0);
      }
    }
  };

  useEffect(() => {
    if (user?.isAdmin != null && platform != null && config != null) {
      fetchArbitrationPrice();
    }
  }, [platform?.id, talentLayerClient, user, platform, config]);

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

  return (
    <div className='max-w-7xl mx-auto text-gray-200 sm:px-4 lg:px-0'>
      <div className=' -mx-6 -mt-6 '>
        <div className='flex py-2 px-6 items-center border-b w-full border-gray-700 mb-8'>
          <p className='text-2xl font-medium flex-1'>Dispute strategy</p>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6 border border-gray-700 rounded-xl p-6 bg-endnight'>
        <SingleValueForm
          validationData={{
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
          validationData={{
            validationSchema: Yup.object({
              'Arbitration fee timeout (in seconds)': Yup.number().required('value is required'),
            }),
            valueType: 'number',
            initialValue: platform?.arbitrationFeeTimeout || 0,
          }}
          contractParams={{
            contractFunctionName: 'setFeeTimeout',
            contractAddress: config.contracts.talentLayerPlatformId,
            contractAbi: TalentLayerPlatformID.abi,
            contractEntity: 'platform',
            contractInputs: process.env.NEXT_PUBLIC_PLATFORM_ID,
          }}
          valueName={'Arbitration fee timeout (in seconds)'}
        />

        <SingleValueForm
          validationData={{
            validationSchema: Yup.object({
              'Arbitration price (in Matic)': Yup.number().required('value is required'),
            }),
            valueType: 'number',
            initialValue: arbitratorPrice ? formatEther(BigInt(arbitratorPrice)) : 0,
          }}
          contractParams={{
            contractFunctionName: 'setPrice',
            contractAddress: config.contracts.talentLayerArbitrator,
            contractAbi: TalentLayerArbitrator.abi,
            contractEntity: 'disputes',
            contractInputs: process.env.NEXT_PUBLIC_PLATFORM_ID,
          }}
          valueName={'Arbitration price (in Matic)'}
        />
      </div>
    </div>
  );
}
