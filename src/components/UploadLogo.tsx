import { Dispatch, SetStateAction } from 'react';
import { uploadImage } from '../modules/BuilderPlace/utils';
import Loading from './Loading';

interface ContainerProps {
  logo?: string;
  handle?: string;
  logoLoader: boolean;
  logoErrorMessage: string;
  setLogoLoader: Dispatch<SetStateAction<boolean>>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
  setLogoErrorMessage: Dispatch<SetStateAction<string>>;
}

function UploadLogo({
  logo,
  handle,
  logoLoader,
  logoErrorMessage,
  setLogoLoader,
  setFieldValue,
  setLogoErrorMessage,
}: ContainerProps) {
  return (
    <>
      <label className='block'>
        <span className='text-stone-800 font-bold text-md'>logo</span>
        <input
          type='file'
          id='logo'
          name='logo'
          onChange={async (event: any) => {
            await uploadImage(
              event.currentTarget.files[0],
              setFieldValue,
              setLogoErrorMessage,
              'logo',
              setLogoLoader,
              handle,
            );
          }}
          className='mt-1 mb-1 block w-full rounded-xl border-2 border-gray-200 shadow-sm focus:ring-opacity-50'
          placeholder=''
        />
        {logoLoader && <Loading />}
        {!!logo && (
          <div className='flex items-center justify-center py-3'>
            <img width='300' height='300' src={logo} alt='' />
          </div>
        )}
      </label>
      <span className='text-red-500'>
        <p>{logoErrorMessage}</p>
      </span>
    </>
  );
}

export default UploadLogo;
