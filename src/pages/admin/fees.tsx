import { useContext } from 'react';
import { formatEther, parseEther } from 'viem';
import * as Yup from 'yup';
import SingleValueForm from '../../components/Form/SingleValueForm';
import Loading from '../../components/Loading';
import Steps from '../../components/Steps';
import UserNeedsMoreRights from '../../components/UserNeedsMoreRights';
import { FEE_RATE_DIVIDER } from '../../config';
import TalentLayerContext from '../../context/talentLayer';
import TalentLayerPlatformID from '../../contracts/ABI/TalentLayerPlatformID.json';
import { useConfig } from '../../hooks/useConfig';
import usePlatform from '../../hooks/usePlatform';

function AdminFees() {
  const { user, loading } = useContext(TalentLayerContext);
  const config = useConfig();
  const platform = usePlatform(process.env.NEXT_PUBLIC_PLATFORM_ID as string);

  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return <Steps />;
  }
  if (!user.isAdmin) {
    return <UserNeedsMoreRights />;
  }

  const transformFeeRate = (value: number | string): number => {
    return Math.round((Number(value) * FEE_RATE_DIVIDER) / 100);
  };

  const transformFee = (value: number | string): BigInt => {
    return parseEther(value.toString());
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
              'Fees (in %) on escrow for bringing the service': Yup.number()
                .required('value is required')
                .min(0)
                .max(100),
            }),
            valueType: 'number',
            initialValue: ((platform?.originServiceFeeRate || 0) * 100) / FEE_RATE_DIVIDER,
            hookModifyValue: transformFeeRate,
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
              'Fees (in %) paid for validating a proposal': Yup.number()
                .required('value is required')
                .min(0)
                .max(100),
            }),
            valueType: 'number',
            initialValue:
              ((platform?.originValidatedProposalFeeRate || 0) * 100) / FEE_RATE_DIVIDER,
            hookModifyValue: transformFeeRate,
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
            initialValue: platform?.servicePostingFee
              ? formatEther(BigInt(platform?.servicePostingFee))
              : 0,
            hookModifyValue: transformFee,
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
            initialValue: platform?.proposalPostingFee
              ? formatEther(BigInt(platform?.proposalPostingFee))
              : 0,
            hookModifyValue: transformFee,
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
