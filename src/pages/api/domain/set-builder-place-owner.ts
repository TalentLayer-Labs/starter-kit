import { NextApiRequest, NextApiResponse } from 'next';
import {
  getBuilderPlaceById,
  getBuilderPlaceByOwnerId,
} from '../../../modules/BuilderPlace/actions';
import { SetBuilderPlaceOwner } from '../../../modules/BuilderPlace/types';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const body: SetBuilderPlaceOwner = req.body;
    console.log('Received data:', body);

    if (!body.id || !body.owners || !body.ownerTalentLayerId) {
      return res.status(500).json({ error: 'Missing data.' });
    }

    const existingSpace = await getBuilderPlaceByOwnerId(body.ownerTalentLayerId);
    if (existingSpace) {
      return res.status(500).json({ error: 'You already own a domain' });
    }

    const builderSpace = await getBuilderPlaceById(body.id as string);
    if (!builderSpace) {
      return res.status(500).json({ error: "Domain doesn't exist." });
    }
    if (builderSpace.owners.length !== 0 || !!builderSpace.ownerTalentLayerId) {
      return res.status(500).json({ error: 'Domain already taken.' });
    }

    try {
      builderSpace.ownerTalentLayerId = body.ownerTalentLayerId;
      builderSpace.ownerAddress = body.ownerAddress;
      builderSpace.owners = body.owners;
      builderSpace.save();
      res
        .status(200)
        .json({ message: 'BuilderPlace domain updated successfully', id: builderSpace._id });
    } catch (error: any) {
      res.status(400).json({ error: error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
