import { useState } from 'react';
import { uploadImage } from '../modules/BuilderPlace/utils';
import Loading from './Loading';

interface ContainerProps {
  label: string;
  legend: string;
  fieldName: string;
  src?: string;
  handle?: string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

function UploadImage({ label, fieldName, legend, src, handle, setFieldValue }: ContainerProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <>
      <label className='block'>
        <span className='font-bold text-md'>{label}</span>
        <span className='italic text-xs'> ({legend})</span>
        <input
          type='file'
          id={fieldName}
          name={fieldName}
          onChange={async (event: any) => {
            await uploadImage(
              event.currentTarget.files[0],
              setFieldValue,
              setErrorMessage,
              fieldName,
              setLoading,
              handle,
            );
          }}
          className='mt-1 mb-1 block w-full rounded-xl border-2 border-info bg-base-200 shadow-sm focus:ring-opacity-50'
          placeholder=''
        />
        {loading && <Loading />}
        {!!src && (
          <div className='flex items-center justify-center py-3'>
            <img width='200' src={src} alt='' />
          </div>
        )}
      </label>
      <span className='text-red-500'>
        <p>{errorMessage}</p>
      </span>
    </>
  );
}

export default UploadImage;
