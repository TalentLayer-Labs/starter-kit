import { NextApiRequest, NextApiResponse } from 'next';
import { OrganizationProps } from '../../../modules/BuilderPlace/types';
import { createOrganization } from '../../../modules/BuilderPlace/actions';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const body: OrganizationProps = req.body;
    console.log('Received data:', body);

    const result = await createOrganization({
      name: body.name,
      about: body.about,
      jobType: body.jobType,
      imageUrl: body.imageUrl,
    });

    if (result.message) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(400).json({ error: result.error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
