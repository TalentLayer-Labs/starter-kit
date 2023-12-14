import { CheckCircle, ClipboardCopy } from 'heroicons-react';
import { GetServerSidePropsContext } from 'next';
import { useContext } from 'react';
import AccessDenied from '../../../components/AccessDenied';
import Loading from '../../../components/Loading';
import TalentLayerContext from '../../../context/talentLayer';
import useCopyToClipBoard from '../../../hooks/useCopyToClipBoard';
import BuilderPlaceContext from '../../../modules/BuilderPlace/context/BuilderPlaceContext';
import { sharedGetServerSideProps } from '../../../utils/sharedGetServerSideProps';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return sharedGetServerSideProps(context);
}

const BASE_URL = global?.location?.origin;
const IFRAME_PATH = 'embed/work';

const generateEmbedWorkUrl = (title: string) => {
  // ?title=${title}
  return `${BASE_URL}/${IFRAME_PATH}`;
};

const generateServicesEmbedIframeCode = (embedUrl: string): string => {
  return `<iframe src="${embedUrl}" width="800" height="600" style="width: 100%"></iframe>`;
};

export default function EmbedPlace() {
  const { loading } = useContext(TalentLayerContext);
  const { builderPlace, isBuilderPlaceOwner } = useContext(BuilderPlaceContext);
  const { isCopied: isIframeCopied, copyToClipboard: copyIframe } = useCopyToClipBoard();

  if (loading) {
    return (
      <div className='flex justify-center items-center gap-10 flex-col pb-5 mt-5'>
        <Loading />
      </div>
    );
  }

  if (!isBuilderPlaceOwner) {
    return <AccessDenied />;
  }

  return (
    <>
      {isBuilderPlaceOwner && (
        <div className='max-w-7xl mx-auto text-base-content'>
          <div className='-mx-6 -mt-6 sm:mx-0 sm:mt-0'>
            <p className='flex py-2 items-center text-2xl font-bold tracking-wider mb-2 w-full px-6 sm:px-0 mt-6 '>
              embed your place
            </p>
            <p className='text-sm mb-2'>
              here you can embed your work board directly on your own website. this helps create a
              seamless user journey for contributors in your ecosystem - users can discover missions
              on your website, and then be re-directed to your hosted builder.place platform.
            </p>
            <p className='text-sm mb-6 text-landingprimary italic'>
              coming soon: host your entire BuilderPlace platform on your own website domain.
            </p>
          </div>
          <div className=''>
            <h2 className='pb-4 text-base font-bold break-all'>copy the code</h2>
            <div className='border border-info rounded-xl p-6'>
              <p className='text-sm'>
                copy the iFrame code below to embed your work board on a page in your website
              </p>
              <div className='flex flex-row flex-wrap'>
                <code className='bg-info text-info rounded-xl p-2 my-4 overflow-hidden'>
                  {builderPlace?.name &&
                    generateServicesEmbedIframeCode(generateEmbedWorkUrl(builderPlace.name))}
                </code>
                {!isIframeCopied ? (
                  <button
                    className='flex items-center justify-center text-primary text-center bg-primary hover:opacity-70 px-5 py-2.5 rounded-xl text-md w-full sm:w-auto'
                    onClick={() =>
                      builderPlace?.name &&
                      copyIframe(
                        generateServicesEmbedIframeCode(generateEmbedWorkUrl(builderPlace.name)),
                      )
                    }>
                    <ClipboardCopy />
                    <span>copy</span>
                  </button>
                ) : (
                  <button className='flex items-center justify-center text-primary text-center bg-primary hover:opacity-70 px-5 py-2.5 rounded-xl text-md w-full sm:w-auto'>
                    <CheckCircle />
                    <span>copied!</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {isBuilderPlaceOwner && builderPlace?.name && (
        <div className='mt-6'>
          <h2 className='pb-4 text-base font-bold break-all'>preview</h2>
          <p className='text-sm mb-6 text-landingprimary italic'>
            when you post your open-source missions, they will show up here
          </p>
          <div
            className='border border-info rounded-xl overflow-hidden'
            dangerouslySetInnerHTML={{
              __html: generateServicesEmbedIframeCode(generateEmbedWorkUrl(builderPlace.name)),
            }}
          />
        </div>
      )}
    </>
  );
}
