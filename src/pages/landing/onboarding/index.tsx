import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useCreateBuilderPlaceMutation } from '../../../modules/BuilderPlace/hooks/UseCreateBuilderPlaceMutation';
import { generateSubdomainPrefix } from '../../../modules/BuilderPlace/utils';
import { useState } from 'react';

function onboardingStep1() {
  const { data: createdBuilderPlace, mutateAsync: createBuilderPlaceAsync } =
    useCreateBuilderPlaceMutation();
  const [name, setName] = useState('');

  const sendDomain = async () => {
    const subdomainPrefix = generateSubdomainPrefix(name);
    const subdomain = `${subdomainPrefix}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
    await createBuilderPlaceAsync({
      subdomain: subdomain,
      name: name,
      primaryColor: '#ffffff',
      secondaryColor: '#ffffff',
      ownerTalentLayerId: '1',
    });
    window.location.href = `${window.location.protocol}//${subdomain}/dashboard`;
  };

  return (
    <>
      <div className='flex'>
        <label className='block flex-1 mr-4'>
          <label htmlFor='custom-domain' className='text-stone-800'>
            Name
          </label>
          <input
            type='string'
            id='name'
            className='mt-1 mb-1 block w-full rounded-xl border border-redpraha bg-midnight shadow-sm focus:ring-opacity-50'
            onChange={e => setName(e.target.value)}
          />
        </label>
      </div>
      <button onClick={sendDomain}>Go</button>
    </>
  );
}

export default onboardingStep1;
