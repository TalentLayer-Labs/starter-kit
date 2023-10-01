import { Formik, Form, Field, ErrorMessage } from 'formik';
import { QuestionMarkCircle } from 'heroicons-react';
import router from 'next/router';
import * as Yup from 'yup';
import Loading from '../../components/Loading';
import ServiceItem from '../../components/ServiceItem';
import { generateSubdomainPrefix } from '../../modules/MultiDomain/utils';
import { useCreateSpaceMutation } from '../../modules/MultiDomain/hooks/UseCreateSpaceMutation';

// interface IFormValues {
//   newDomain: string;
// }

// const validationSchema = Yup.object({
//   newDomain: Yup.string().required('title is required'),
// });

// export default function Onboarding() {
//   const [createSpace, setCreateSpace] = useState<CreateSpaceProps>({ name: "", subdomain: "", primaryColor: "", secondaryColor: "" });
//   const [createSpaceResponse, setCreateSpaceResponse] = useState("No response yet");
//   const { data: createdSpace, mutateAsync: createSpaceAsync } = useCreateSpaceMutation();

//   const handleCreateSpace = async () => {
//     try {
//       const subdomainPrefix = generateSubdomainPrefix(createSpace.name);
//       const subdomain = `${subdomainPrefix}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
//       await createSpaceAsync({ ...createSpace, subdomain });
//       setCreateSpaceResponse(`${createSpace.name} space got created` || 'No response yet');
//       window.location.href = `${window.location.protocol}//${subdomain}/admin`;
//     } catch (error) {
//       console.error('Error creating space:', error);
//       setCreateSpaceResponse('Failed to create space');
//     }
//   };

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setCreateSpace(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const subdomainPrefix = generateSubdomainPrefix(createSpace.name);
//   const subdomain = `${subdomainPrefix}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

//   return (
//     <div>
//       <label>
//         Name:
//         <input type="text" name="name" value={createSpace.name} onChange={handleInputChange} />
//       </label>
//       <label>
//         Subdomain:
//         <input type="text" name="subdomain" value={subdomain} disabled />
//       </label>
//       <label>
//         Primary Color:
//         <input type="text" name="primaryColor" value={createSpace.primaryColor} onChange={handleInputChange} />
//       </label>
//       <label>
//         Secondary Color:
//         <input type="text" name="secondaryColor" value={createSpace.secondaryColor} onChange={handleInputChange} />
//       </label>
//       <button onClick={handleCreateSpace}>Create Space</button>
//       <p>{createSpaceResponse}</p>

//     </div>
//   )
// }



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
