import { ErrorMessage, Field } from 'formik';

function CustomDomain() {
  return (
    <>
      <label className='block'>
        <span className='font-bold text-md'>custom subdomain</span>
        <div className={'flex flex-row items-center  text-gray-500'}>
          <Field
            type='text'
            id='subdomain'
            name='subdomain'
            className='mt-1 mb-1 block w-full rounded-xl border-2  border-info bg-base-200 shadow-sm focus:ring-opacity-50'
          />
          <span>.{process.env.NEXT_PUBLIC_ROOT_DOMAIN}</span>
        </div>
      </label>
      <span className='text-red-500'>
        <ErrorMessage name='subdomain' />
      </span>
    </>
  );
}

export default CustomDomain;
