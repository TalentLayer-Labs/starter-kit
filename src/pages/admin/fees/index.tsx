import Loading from '../../../components/Loading';
import { useContext, useEffect, useState } from 'react';
import StarterKitContext from '../../../context/starterKit';
import UserNeedsMoreRights from '../../../components/UserNeedsMoreRights';
import SingleValueForm from '../../../components/Form/SingleValueForm';
import * as Yup from 'yup';
import { useConfig } from '../../../hooks/useConfig';
import TalentLayerPlatformID from '../../../contracts/ABI/TalentLayerPlatformID.json';
import usePlatform from '../../../hooks/usePlatform';
import { FEE_RATE_DIVIDER } from '../../../config';
import Steps from '../../../components/Steps';

function AdminFees() {
  const { isAdmin, user } = useContext(StarterKitContext);
  const config = useConfig();
  const platform = usePlatform(process.env.NEXT_PUBLIC_PLATFORM_ID as string);

  const [isLoading, setIsLoading] = useState(true);
  const [isAdminOfThisPlatform, setIsAdminOfThisPlatform] = useState(false);

  // Handle loading state
  useEffect(() => {
    if (isAdmin != null && user != null && platform != null && config != null) {
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

  const handleFeeRates = (value: number | string) => {
    return Number(value) * FEE_RATE_DIVIDER;
  };

  return (
    <div className='max-w-7xl mx-auto text-gray-200 sm:px-4 lg:px-0'>
      <div className=' -mx-6 -mt-6 '>
        <div className='flex py-2 px-6 items-center border-b w-full border-gray-700 mb-8'>
          <p className='text-2xl font-medium flex-1'>Fees strategies</p>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6 border border-gray-700 rounded-xl p-6 bg-endnight'>
        <SingleValueForm
          validationDatas={{
            validationSchema: Yup.object({
              'Fees (in %) on escrow for bringing the service':
                Yup.number().required('value is required'),
            }),
            valueType: 'number',
            initialValue: (platform?.originServiceFeeRate || 0) / FEE_RATE_DIVIDER,
            hookModifyValue: handleFeeRates,
          }}
          contractParams={{
            contractFunctionName: 'updateOriginServiceFeeRate',
            contractAddress: config.contracts.talentLayerPlatformId,
            contractAbi: TalentLayerPlatformID.abi,
            contractEntity: 'platform',
            contractInputs: process.env.NEXT_PUBLIC_PLATFORM_ID,
          }}
          valueName={'Fees (in %) on escrow for bringing the service'}
        />

        <SingleValueForm
          validationDatas={{
            validationSchema: Yup.object({
              'Fees (in %) paid for validating a proposal':
                Yup.number().required('value is required'),
            }),
            valueType: 'number',
            initialValue: (platform?.originValidatedProposalFeeRate || 0) / FEE_RATE_DIVIDER,
            hookModifyValue: handleFeeRates,
          }}
          contractParams={{
            contractFunctionName: 'updateOriginValidatedProposalFeeRate',
            contractAddress: config.contracts.talentLayerPlatformId,
            contractAbi: TalentLayerPlatformID.abi,
            contractEntity: 'platform',
            contractInputs: process.env.NEXT_PUBLIC_PLATFORM_ID,
          }}
          valueName={'Fees (in %) paid for validating a proposal'}
        />

        <SingleValueForm
          validationDatas={{
            validationSchema: Yup.object({
              'Fees (in Matic) asked by the platform to post a proposal on the platform':
                Yup.number().required('value is required'),
            }),
            valueType: 'number',
            initialValue: Number(platform?.servicePostingFee) || 0,
          }}
          contractParams={{
            contractFunctionName: 'updateServicePostingFee',
            contractAddress: config.contracts.talentLayerPlatformId,
            contractAbi: TalentLayerPlatformID.abi,
            contractEntity: 'platform',
            contractInputs: process.env.NEXT_PUBLIC_PLATFORM_ID,
          }}
          valueName={'Fees (in Matic) asked by the platform to post a proposal on the platform'}
        />

        <SingleValueForm
          validationDatas={{
            validationSchema: Yup.object({
              'Fees (in Matic) asked by the platform to post a service on the platform':
                Yup.number().required('value is required'),
            }),
            valueType: 'number',
            initialValue: Number(platform?.proposalPostingFee) || 0,
          }}
          contractParams={{
            contractFunctionName: 'updateProposalPostingFee',
            contractAddress: config.contracts.talentLayerPlatformId,
            contractAbi: TalentLayerPlatformID.abi,
            contractEntity: 'platform',
            contractInputs: process.env.NEXT_PUBLIC_PLATFORM_ID,
          }}
          valueName={'Fees (in Matic) asked by the platform to post a service on the platform'}
        />
      </div>
    </div>
  );
}

export default AdminFees;
