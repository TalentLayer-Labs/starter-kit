import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useCreateSpaceMutation } from "../../modules/MultiDomain/hooks/UseCreateSpaceMutation";
import { generateSubdomainPrefix } from "../../modules/MultiDomain/utils";

interface IFormValues {
  name: string
}

const validationSchema = Yup.object({
  name: Yup.string().required('Please provide an name for your space'),
});

function Onboarding() {
  const { data: createdSpace, mutateAsync: createSpaceAsync } = useCreateSpaceMutation();

  const initialValues: IFormValues = {
    name: '',
  };

  const onSubmit = async (
    values: IFormValues,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void },
  ) => {
    setSubmitting(false);
    const subdomainPrefix = generateSubdomainPrefix(values.name);
    const subdomain = `${subdomainPrefix}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
    await createSpaceAsync({ subdomain: subdomain, name: values.name, primaryColor: "#ffffff", secondaryColor: "#ffffff" });
    window.location.href = `${window.location.protocol}//${subdomain}/admin`;
    resetForm();
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      <Form>
        <div className='flex'>
          <label className='block flex-1 mr-4'>
            <span className='text-gray-100'>Name</span>
            <Field
              type='string'
              id='name'
              name='name'
              className='mt-1 mb-1 block w-full rounded-xl border border-gray-700 bg-midnight shadow-sm focus:ring-opacity-50'
              placeholder=''
            />
            <span className='text-red-500'>
              <ErrorMessage name='name' />
            </span>
          </label>
        </div>
        <button type="submit">Go</button>
      </Form >
    </Formik >
  );
}

export default Onboarding;
