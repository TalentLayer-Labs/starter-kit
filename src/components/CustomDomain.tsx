import { ErrorMessage, Field } from 'formik';

function CustomDomain() {
  return (
    <>
      <label className='block'>
        <span className='text-stone-800 font-bold text-md'>custom domain</span>
        <Field
          type='text'
          id='subdomain'
          name='subdomain'
          className='mt-1 mb-1 block w-full rounded-xl border-2 border-gray-200 bg-midnight shadow-sm focus:ring-opacity-50'
          placeholder={`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
        />
      </label>
      <span className='text-red-500'>
        <ErrorMessage name='subdomain' />
      </span>
    </>
  );
}

export default CustomDomain;
