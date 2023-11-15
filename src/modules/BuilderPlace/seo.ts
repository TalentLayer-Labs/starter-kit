import { IBuilderPlace } from './types';

export const getSeoDefaultConfig = (builderPlace: IBuilderPlace) => {
  if (!builderPlace) {
    const title = 'BuilderPlace';
    const description = 'Empower opens-source contributors to help you achieve your goals';
    const canonical = 'https://builder.place';

    return {
      title,
      description,
      canonical,
      openGraph: {
        type: 'website',
        locale: 'en_US',
        site_name: 'BuilderPlace',
        title,
        description,
      },
    };
  }

  const title = `${builderPlace.name} BuilderPlace`;
  const description = `${builderPlace.name} open source community, find open work and contribute!`;

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      site_name: title,
      title,
      description,
    },
    additionalLinkTags: [
      {
        rel: 'manifest',
        href: '/api/manifest',
      },
    ],
  };
};
