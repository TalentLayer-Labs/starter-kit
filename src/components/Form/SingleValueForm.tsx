import { useWeb3Modal } from '@web3modal/react';
import { Field, Form, Formik } from 'formik';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import * as Yup from 'yup';
import { ObjectShape } from 'yup/lib/object';
import { useChainId } from '../../hooks/useChainId';
import { createMultiStepsTransactionToast, showErrorTransactionToast } from '../../utils/toast';
import SubmitButton from './SubmitButton';
import { Abi, Address } from 'viem';

interface validationDatasType {
  valueType: string;
  validationSchema?: Yup.ObjectSchema<ObjectShape>;
  initialValue?: number | string;
  selectOptions?: { value: string; label: string }[];
  hookModifyValue?: (value: number | string) => number | BigInt | string;
}

interface contractParamsType {
  contractFunctionName: string;
  contractEntity: string;
  contractInputs: unknown;
  contractAddress: Address;
  contractAbi: any;
}

function SingleValueForm({
  validationDatas,
  contractParams,
  valueName,
  callback,
}: {
  validationDatas: validationDatasType;
  contractParams: contractParamsType;
  valueName: string;
  callback?: () => void;
}) {
  const { validationSchema, valueType, initialValue, selectOptions, hookModifyValue } =
    validationDatas;
  const { contractFunctionName, contractEntity, contractInputs, contractAddress, contractAbi } =
    contractParams;

  const chainId = useChainId();
  const { open: openConnectModal } = useWeb3Modal();
  const publicClient = usePublicClient({ chainId });
  const { data: walletClient } = useWalletClient({ chainId });
  const { address } = useAccount();

  const onSubmit = async (
    values: any,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void },
  ) => {
    if (publicClient && walletClient && values) {
      try {
        let value = values[valueName];

        if (value === undefined) {
          return;
        }

        if (hookModifyValue) {
          value = hookModifyValue(value);
        }

        const tx = await walletClient.writeContract({
          address: contractAddress,
          abi: contractAbi,
          functionName: contractFunctionName,
          args: [contractInputs, value],
          account: address,
        });

        await createMultiStepsTransactionToast(
          chainId,
          {
            pending: 'Updating informations ...',
            success: 'Congrats! Your informations has been updated',
            error: 'An error occurred while updating your informations',
          },
          publicClient,
          tx,
          contractEntity,
        );

        if (callback) {
          callback();
        }

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
      initialValues={{ [valueName]: initialValue }}
      validationSchema={validationSchema}
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
                className='mt-1 mb-1 block w-full rounded-xl border border-gray-700 bg-midnight shadow-sm focus:ring-opacity-50 mr-4'
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
