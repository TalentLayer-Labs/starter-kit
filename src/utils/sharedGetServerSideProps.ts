import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getBuilderPlace } from '../modules/BuilderPlace/queries';

export const sharedGetServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
  customLogic?: (ctx: GetServerSidePropsContext) => Promise<Record<string, any>>,
): Promise<GetServerSidePropsResult<any>> => {
  const { req, res, params } = context;
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  console.log('sharedGetServerSideProps', params, res, req);
  const builderPlace = await getBuilderPlace(params?.domain as string);

  let customProps = {};
  if (customLogic) {
    customProps = await customLogic(context);
  }

  return {
    props: {
      builderPlace,
      ...customProps,
    },
  };
};
