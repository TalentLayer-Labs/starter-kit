import { getBuilderPlaceByDomain } from './actions';

// Used inside getServerSideProps
export const getBuilderPlace = async (domain: string) => {
  console.log('serverProps', domain);
  let builderPlace;
  let found = false;

  try {
    builderPlace = await getBuilderPlaceByDomain(domain);
    if (builderPlace?.error) {
      found = false;
    } else {
      found = true;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    found = false;
  }
  const serializedBuilderPlace = JSON.parse(JSON.stringify(builderPlace));
  return {
    props: {
      builderPlace: serializedBuilderPlace,
      found,
    },
  };
};
