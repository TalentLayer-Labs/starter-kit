import { NextApiRequest, NextApiResponse } from 'next';
import { CreateBuilderPlaceProps } from '../../../modules/BuilderPlace/types';
import { createBuilderPlace } from '../../../modules/BuilderPlace/actions/builderPlace';
import { METHOD_NOT_ALLOWED } from '../../../modules/BuilderPlace/apiResponses';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: METHOD_NOT_ALLOWED });
  }

  const body: CreateBuilderPlaceProps = req.body;
  console.log('Received data:', body);
  try {
    const result = await createBuilderPlace({
      ...body,
    });

    res.status(200).json({ message: result.message, id: result.id });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
