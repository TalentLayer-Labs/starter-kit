import { NextApiRequest, NextApiResponse } from 'next';
import { getBuilderPlaceByDomain } from '../../../modules/BuilderPlace/actions';
import { SetBuilderPlaceOwner } from '../../../modules/BuilderPlace/types';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const body: SetBuilderPlaceOwner = req.body;
    console.log('Received data:', body);

    if (!body.subdomain || !body.owners || !body.ownerTalentLayerId) {
      return res.status(500).json({ error: 'Missing data.' });
    }

    const builderSpace = await getBuilderPlaceByDomain(body.subdomain as string);
    if (!builderSpace) {
      return res.status(500).json({ error: "Domain doesn't exist." });
    }
    if (builderSpace.owners.length !== 0 || !!builderSpace.ownerTalentLayerId) {
      return res.status(500).json({ error: 'Domain already taken.' });
    }

    try {
      builderSpace.ownerTalentLayerId = body.ownerTalentLayerId;
      builderSpace.owners = body.owners;
      builderSpace.name = body.name;
      builderSpace.save();
      res.status(200).json({ message: 'BuilderPlace domain updated successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
