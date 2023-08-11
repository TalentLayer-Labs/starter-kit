import { Field, Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import GigBoard from '../../../components/GigBoard';
import StarterKitContext from '../../../context/starterKit';
import { ServiceStatusEnum } from '../../../types';

const initialValues: any = {
  title: 'My Gig Board',
  about: '',
  keywords: '',
  rateToken: '',
  rateAmount: 0,
};

const BASE_URL = 'localhost:3000';
const GIG_BOARD_IFRAME_PATH = 'gig-board';

const generateGigBoardUrl = (buyerId: string, title: string, skill: ServiceStatusEnum) => {
  return `${BASE_URL}/${GIG_BOARD_IFRAME_PATH}?buyerId=${buyerId}&title=${encodeURIComponent(
    title,
  )}&skill=${ServiceStatusEnum[skill]}`;
};

const GigBoardSettings = () => {
  const { user } = useContext(StarterKitContext);
  const [boardTitle, setBoardTitle] = useState<string>('My Gig Board');
  const [boardSkill, setBoardSkill] = useState<ServiceStatusEnum>(ServiceStatusEnum.Opened);
  const onSubmit = (values: any) => {
    console.log({ values });
  };

  return (
    <div className='max-w-7xl mx-auto text-gray-200 sm:px-4 lg:px-0'>
      <div className='grid grid-cols-2 gap-2'>
        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            // validationSchema={validationSchema}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <div className='grid grid-cols-1 gap-6 border border-gray-700 rounded-xl p-6 bg-endnight'>
                  <label className='block'>
                    <span className='text-gray-100'>Title*</span>
                    <Field
                      type='text'
                      id='title'
                      name='title'
                      className='mt-1 mb-1 block w-full rounded-xl border border-gray-700 bg-midnight shadow-sm focus:ring-opacity-50'
                      placeholder=''
                      onChange={e => setBoardTitle(e?.target?.value)}
                      value={boardTitle}
                    />
                  </label>

                  <label className='block'>
                    <span className='text-gray-100 block'>Filtered By Skills</span>
                    <Field
                      onChange={e =>
                        setBoardSkill(
                          ServiceStatusEnum[e?.target?.value as keyof typeof ServiceStatusEnum],
                        )
                      }
                      as='select'
                      name='skill'
                      className='leading-tight bg-midnight text-xl text-gray-200 block'>
                      {Object.keys(ServiceStatusEnum).map(_serviceStatusEnum => (
                        <option value={_serviceStatusEnum}>{_serviceStatusEnum}</option>
                      ))}
                      {/* <option value='red'>Red</option>
                      <option value='green'>Green</option>
                      <option value='blue'>Blue</option> */}
                    </Field>
                  </label>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div>
          {user?.id && <GigBoard buyerId={user.id} status={boardSkill} title={boardTitle} />}
          <div className='mt-5'>
            {user?.id && generateGigBoardUrl(user.id, boardTitle, boardSkill)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigBoardSettings;
