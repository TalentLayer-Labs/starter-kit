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
  valueType: string;
  validationSchema?: Yup.ObjectSchema<ObjectShape>;
  initialValue?: number | string;
  selectOptions?: { value: string; label: string }[];
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
  const { validationSchema, valueType, initialValue, selectOptions, shouldMultiplyByFeeRate } =
    validationDatas;
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
        const tx = await contract[contractFunctionName](contractInputs, value, []);

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
              <Field
                as={valueType === 'select' ? 'select' : undefined}
                type={valueType}
                id={valueName}
                name={valueName}
                step='any'
                className='mt-1 mb-1 block w-full rounded-xl border border-gray-700 bg-midnight shadow-sm focus:ring-opacity-50'
                placeholder=''>
                {valueType === 'select' && selectOptions
                  ? selectOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))
                  : null}
              </Field>
              <SubmitButton isSubmitting={isSubmitting} label='Update' />
            </div>
          </label>
        </Form>
      )}
    </Formik>
  );
}

export default SingleValueForm;
