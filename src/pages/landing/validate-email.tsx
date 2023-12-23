import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import HirerProfileLayout from '../../components/HirerProfileLayout';
import { useCreateBuilderPlaceMutation } from '../../modules/BuilderPlace/hooks/UseCreateBuilderPlaceMutation';
import { useValidateEmailMutation } from '../../modules/BuilderPlace/hooks/UseValidateEmail';

function verifyEmail() {
  const { mutateAsync: validateEmailAsync } = useValidateEmailMutation();
  const router = useRouter();
  const { id } = router.query;
  const [pageResponse, setPageResponse] = useState('Missing Id');

  useEffect(() => {
    if (id) {
      setPageResponse('Loading...');
      validateEmailAsync({
        builderPlaceId: id.toString(),
      }).then(res => {
        if (res?.message) {
          setPageResponse(res.message);
        } else {
          setPageResponse('Something went wrong');
        }
      });
    }
  }, [id]);

  return <div>{pageResponse}</div>;
}

export default verifyEmail;
