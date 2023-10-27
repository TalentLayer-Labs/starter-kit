import type { NextApiRequest, NextApiResponse } from 'next';
import { getBuilderPlace } from '../../modules/BuilderPlace/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const host = req.headers.host as string;
  const data = await getBuilderPlace(host);
  const builderPlace = data?.props?.builderPlace;

  try {
    if (!builderPlace) throw new Error('Builder Place not found');
    res.status(200).json({
      short_name: `${builderPlace.name} Builder Place`,
      name: `${builderPlace.name} Builder Place`,
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
      start_url: '.',
      display: 'standalone',
      theme_color: builderPlace?.pallete?.primary || '#000000',
      background_color: builderPlace?.pallete?.primaryContent || '#ffffff',
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
