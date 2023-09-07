import Loading from '../../../components/Loading';
import { useContext, useEffect, useState } from 'react';
import StarterKitContext from '../../../context/starterKit';
import UserNeedsMoreRights from '../../../components/UserNeedsMoreRights';
import SingleValueForm from '../../../components/Form/SingleValueForm';
import * as Yup from 'yup';
import { useConfig } from '../../../hooks/useConfig';
import TalentLayerPlatformID from '../../../contracts/ABI/TalentLayerPlatformID.json';
import { Container } from '../../../components/newlayout/container';
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
  }

  return (
    <Container>
      <p className='text-xl font-medium tracking-wider'>Configuration {'/'} Fees strategies</p>
      <p className='mb-6 pb-4 border-b border-gray-gray-200 font-medium'>OnChain</p>

      <Container className='w-3/4 grid grid-cols-1 gap-6 border border-gray-700 rounded-xl p-6 bg-endnight'>
        <SingleValueForm
          validationDatas={{
            validationSchema: Yup.object({
              value: Yup.number().required('value is required'),
            }),
            valueType: 'number',
            initialValue: (platform?.originServiceFeeRate || 0) / FEE_RATE_DIVIDER,
            hookModifyValue: handleFeeRates
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
              value: Yup.number().required('value is required'),
            }),
            valueType: 'number',
            initialValue: (platform?.originValidatedProposalFeeRate || 0) / FEE_RATE_DIVIDER,
            hookModifyValue: handleFeeRates
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
              value: Yup.number().required('value is required'),
            }),
            valueType: 'number',
            initialValue: (Number(platform?.servicePostingFee) || 0),
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
              value: Yup.number().required('value is required'),
            }),
            valueType: 'number',
            initialValue: (Number(platform?.proposalPostingFee) || 0),
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
      </Container>
    </Container>
  );
}

export default AdminFees;
