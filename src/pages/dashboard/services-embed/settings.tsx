import { Field, Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import ServicesEmbed from '../../../components/ServicesEmbed';
import StarterKitContext from '../../../context/starterKit';
import { ServiceStatusEnum } from '../../../types';

const BASE_URL = 'http://localhost:3000';
const GIG_BOARD_IFRAME_PATH = 'services-embeddable';

const generateServicesEmbedUrl = (buyerId: string, title: string, skill: ServiceStatusEnum) => {
  return `${BASE_URL}/${GIG_BOARD_IFRAME_PATH}?buyerId=${buyerId}&title=${encodeURIComponent(
    title,
  )}&skill=${ServiceStatusEnum[skill]}`;
};

const generateServicesEmbedIframeCode = (servicesEmbedUrl: string): string => {
  return `<iframe src="${servicesEmbedUrl}" width="600" height="400"></iframe>`;
};

const ServicesEmbedSettings = () => {
  const { user } = useContext(StarterKitContext);
  const [boardTitle, setBoardTitle] = useState<string>('My Gig Board');
  const [boardStatus, setBoardStatus] = useState<ServiceStatusEnum>(ServiceStatusEnum.Opened);

  //  TODO: implement filter for skills on the services hook. Then plug boardSkills in
  const [boardSkills, setBoardSkills] = useState<string[]>([]);

  return (
    <div className='max-w-7xl mx-auto text-gray-200 sm:px-4 lg:px-0'>
      <div className='grid grid-cols-2 gap-2'>
        <div>
          <h1 className='text-title text-4xl mb-4'>Configure Your board</h1>
          {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
          <Formik initialValues={{}} onSubmit={() => {}}>
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

                {/* <label className='block'>
                <span className='text-gray-100 block'>Filtered By Skills</span>
                  <SkillsInput entityId={'keywords'} onSelectedSkills={setBoardSkills} />
                </label> */}
                <label className='block'>
                  <span className='text-gray-100 block'>Filtered By Status</span>
                  <Field
                    onChange={e =>
                      setBoardStatus(
                        ServiceStatusEnum[e?.target?.value as keyof typeof ServiceStatusEnum],
                      )
                    }
                    as='select'
                    name='skill'
                    className='leading-tight bg-midnight text-xl text-gray-200 block'>
                    {Object.keys(ServiceStatusEnum).map(_serviceStatusEnum => (
                      <option key={_serviceStatusEnum} value={_serviceStatusEnum}>
                        {_serviceStatusEnum}
                      </option>
                    ))}
                  </Field>
                </label>
                <label className='block' htmlFor='primaryColor'>
                  <span className='text-gray-100 block'>Board primary color</span>
                  <input type='color' className='w-8 h-8 rounded-none border-0 color-input' />
                </label>
                <label className='block'>
                  <span className='text-gray-100 block'>Board secondary color</span>

                  <input type='color' className='w-8 h-8 rounded-none border-0 color-input' />
                </label>
              </div>
            </Form>
          </Formik>
          <div className='border border-sky-500 p-4 mt-4'>
            <code>
              {user?.id &&
                generateServicesEmbedIframeCode(
                  generateServicesEmbedUrl(user.id, boardTitle, boardStatus),
                )}
            </code>
          </div>
        </div>
        <div>
          {user?.id && <ServicesEmbed buyerId={user.id} status={boardStatus} title={boardTitle} />}
        </div>
      </div>
    </div>
  );
};

export default ServicesEmbedSettings;
