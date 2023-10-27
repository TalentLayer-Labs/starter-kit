import { NextApiRequest, NextApiResponse } from 'next';
import { getBuilderPlaceByDomain } from '../../../../modules/BuilderPlace/actions';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { slug: domain } = req.query;

  if (!domain) {
    return res.status(500).json({ error: 'No domain provided.' });
  }

  const result = await getBuilderPlaceByDomain(domain as string);

  return res.json(result);
}
