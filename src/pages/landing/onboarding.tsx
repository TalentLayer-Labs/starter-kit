import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useCreateSpaceMutation } from "../../modules/MultiDomain/hooks/UseCreateSpaceMutation";
import { generateSubdomainPrefix } from "../../modules/MultiDomain/utils";
import { useState } from 'react';

function onboarding() {
  const { data: createdSpace, mutateAsync: createSpaceAsync } = useCreateSpaceMutation();
  const [name, setName] = useState("");

  const onSubmit = async (
  ) => {
    const subdomainPrefix = generateSubdomainPrefix(name);
    const subdomain = `${subdomainPrefix}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
    await createSpaceAsync({ subdomain: subdomain, name: name, primaryColor: "#ffffff", secondaryColor: "#ffffff" });
    window.location.href = `${window.location.protocol}//${subdomain}/admin`;
  }

  return (
    <>
      <div className='flex'>
        <label className='block flex-1 mr-4'>
          <label htmlFor="custom-domain" className='text-gray-100'>Name</label>
          <input
            type='string'
            id='name'
            className='mt-1 mb-1 block w-full rounded-xl border border-gray-700 bg-midnight shadow-sm focus:ring-opacity-50'
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <button onClick={onSubmit}>Go</button>
    </>
  );
}

export default onboarding;
