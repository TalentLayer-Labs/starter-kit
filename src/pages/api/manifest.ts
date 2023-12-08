import type { NextApiRequest, NextApiResponse } from 'next';
import { getBuilderPlace } from '../../modules/BuilderPlace/queries';
import { IBuilderPlace } from '../../modules/BuilderPlace/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const host = req.headers.host as string;
  const builderPlace = await getBuilderPlace(host);

  try {
    if (!builderPlace) throw new Error('BuilderPlace not found');
    res.status(200).json({
      short_name: `${builderPlace.name} BuilderPlace`,
      name: `${builderPlace.name} BuilderPlace`,
      description: `${builderPlace.name} open source community, find open work and contribute!`,
      icons: [
        {
          src: builderPlace.icon || '/favicon.ico',
          sizes: '64x64 32x32 24x24 16x16',
          type: 'image/x-icon',
        },
        {
          src: builderPlace.icon || '/logo192.png',
          type: 'image/png',
          sizes: '192x192',
        },
        {
          src: builderPlace.icon || '/logo512.png',
          type: 'image/png',
          sizes: '512x512',
        },
      ],
      start_url: `${builderPlace.customDomain || builderPlace.subdomain}`,
      display: 'standalone',
      theme_color: builderPlace?.palette?.primary || '#000000',
      background_color: builderPlace?.palette?.primaryContent || '#ffffff',
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
