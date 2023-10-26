import { getBuilderPlaceByDomain } from './actions';

// Used inside getServerSideProps
export const getBuilderPlace = async (domain: string) => {
  console.log('serverProps', domain);
  const builderPlace = await getBuilderPlaceByDomain(domain);

  if (!builderPlace) {
    throw new Error('Builder Place not found');
  }

  const serializedBuilderPlace = JSON.parse(JSON.stringify(builderPlace));

  console.log({
    serializedBuilderPlace,
  });
  return {
    props: {
      builderPlace: serializedBuilderPlace,
    },
  };
};
