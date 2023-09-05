import { useWeb3Modal } from '@web3modal/react';
import { ContractInterface, ethers } from 'ethers';
import { Field, Form, Formik } from 'formik';
import { useProvider, useSigner } from 'wagmi';
import * as Yup from 'yup';
import { createMultiStepsTransactionToast, showErrorTransactionToast } from '../../utils/toast';
import Loading from '../Loading';
import SubmitButton from './SubmitButton';
import { useChainId } from '../../hooks/useChainId';
import { ObjectShape } from 'yup/lib/object';
import { FEE_RATE_DIVIDER } from '../../config';

interface IFormValuesNumber {
  value?: number;
}
interface IFormValuesString {
  value?: string;
}

interface validationDatasType {
  validationSchema: Yup.ObjectSchema<ObjectShape>;
  valueType: string;
  initialValue?: number | string;
  shouldMultiplyByFeeRate?: boolean;
}

interface contractParamsType {
  contractFunctionName: string;
  contractEntity: string;
  contractInputs: unknown;
  contractAddress: string;
  contractAbi: ContractInterface;
}

function SingleValueForm({
  validationDatas,
  contractParams,
  valueName,
}: {
  validationDatas: validationDatasType;
  contractParams: contractParamsType;
  valueName: string;
}) {
  const { validationSchema, valueType, initialValue, shouldMultiplyByFeeRate } = validationDatas;
  const { contractFunctionName, contractEntity, contractInputs, contractAddress, contractAbi } =
    contractParams;

  const chainId = useChainId();
  const { open: openConnectModal } = useWeb3Modal();
  const provider = useProvider({ chainId });
  const { data: signer } = useSigner({
    chainId,
  });
  let contract: ethers.Contract;

  if (!signer) {
    return <Loading />;
  }

  if (signer) {
    contract = new ethers.Contract(contractAddress, contractAbi, signer);
  }

  //   switch (customType) {
  //     case 'ArbitrationPrice': {
  //       contractFunctionName = 'setArbitrationPrice';
  //       validationSchema = Yup.object({
  //         value: Yup.number().required('value is required'),
  //       });
  //       valueType = 'number';
  //       contract = new ethers.Contract(
  //         config.contracts.talentLayerArbitrator,
  //         TalentLayerArbitrator.abi,
  //         signer,
  //       );
  //       break;
  //     }
  //     case 'ArbitrationFeeTimeout': {
  //       contractFunctionName = 'updateArbitrationFeeTimeout';
  //       initialValue = platform.arbitrationFeeTimeout;
  //       validationSchema = Yup.object({
  //         value: Yup.number().required('value is required'),
  //       });
  //       valueType = 'number';
  //       break;
  //     }
  //     // TODO: update
  //     case 'DisputeStrategy': {
  //       contractFunctionName = 'updateArbitrator';
  //       selectOptions = [
  //         { value: '0x0000000000000000000000000000000000000000', label: 'Self-Managed' },
  //         { value: '0x0000000000000000000000000000000000000000', label: 'Other' },
  //       ];
  //       validationSchema = Yup.object({
  //         value: Yup.number().required('value is required'),
  //       });
  //       valueType = 'select';
  //       break;
  //     }
  //   }

  const onSubmit = async (
    values: IFormValuesString | IFormValuesNumber | undefined,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void },
  ) => {
    if (provider && signer && values) {
      try {
        let value = values[valueName as keyof IFormValuesString];
        if (!value) {
          return;
        }
        if (valueType === 'number') {
          value = shouldMultiplyByFeeRate ? (value as number) * FEE_RATE_DIVIDER : value;
        }
        const tx = await contract[contractFunctionName](contractInputs, value);

        console.log('tx', tx);

        await createMultiStepsTransactionToast(
          chainId,
          {
            pending: 'Updating informations ...',
            success: 'Congrats! Your informations has been updated',
            error: 'An error occurred while updating your informations',
          },
          provider,
          tx,
          contractEntity,
          '',
        );

        setSubmitting(false);
      } catch (error) {
        showErrorTransactionToast(error);
      }
    } else {
      openConnectModal();
    }
  };

  return (
    <Formik
      initialValues={{ [valueName]: initialValue || null }}
      // validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <label className='block'>
            <span>{valueName}</span>
            <div className='mt-1 mb-4 flex rounded-md shadow-sm'>
              {/* {customType === 'DisputeStrategy' && selectOptions ? (
                <Field
                  component='select'
                  id={valueName}
                  name={valueName}
                  className='mt-1 mr-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  placeholder=''>
                  <option value=''>Select a value</option>
                  {selectOptions.map((selectOption, index) => (
                    <option key={index} value={selectOption.value}>
                      {selectOption.label}
                    </option>
                  ))}
                </Field>
              ) : (
                <Field
                  type={valueType}
                  id={valueName}
                  name={valueName}
                  step='any'
                  className='mt-1 mr-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  placeholder=''
                />
              )} */}
              <Field
                type={valueType}
                id={valueName}
                name={valueName}
                step='any'
                className='mt-1 mr-2 block w-full rounded-md text-gray-800 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                placeholder=''
              />
              <SubmitButton isSubmitting={isSubmitting} label='Update' />
            </div>
          </label>
        </Form>
      )}
    </Formik>
  );
}

export default SingleValueForm;
