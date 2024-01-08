import { NextApiRequest, NextApiResponse } from 'next';
import {
  getBuilderPlaceById,
  getBuilderPlaceByOwnerId,
  getWorkerProfileById,
  getWorkerProfileByTalentLayerId,
} from '../../../modules/BuilderPlace/actions';
import { SetBuilderPlaceAndHirerOwner } from '../../../modules/BuilderPlace/types';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const body: SetBuilderPlaceAndHirerOwner = req.body;
    console.log('Received data:', body);

    if (!body.builderPlaceId || !body.hirerId || !body.owners || !body.ownerTalentLayerId) {
      return res.status(400).json({ error: 'Missing data.' });
    }

    /**
     * @dev: Checks on the domain
     */
    const existingSpace = await getBuilderPlaceByOwnerId(body.ownerTalentLayerId);
    if (existingSpace) {
      return res.status(401).json({ error: 'You already own a domain' });
    }

    const builderSpace = await getBuilderPlaceById(body.builderPlaceId as string);
    if (!builderSpace) {
      return res.status(400).json({ error: "Domain doesn't exist." });
    }

    if (builderSpace.owners.length !== 0 || !!builderSpace.ownerTalentLayerId) {
      return res.status(401).json({ error: 'Domain already taken.' });
    }

    /**
     * @dev: Checks on the Hirer
     */
    const existingProfile = await getWorkerProfileByTalentLayerId(body.ownerTalentLayerId);
    if (existingProfile) {
      return res.status(401).json({ error: 'You already have a profile' });
    }

    const hirerProfile = await getWorkerProfileById(body.hirerId as string);
    if (!hirerProfile) {
      return res.status(400).json({ error: "Profile doesn't exist." });
    }
    if (!!hirerProfile.talentLayerId) {
      return res.status(401).json({ error: 'Profile already has an owner.' });
    }

    try {
      /**
       * @dev: Update BuilderPlace & Hirer profile
       */
      builderSpace.ownerTalentLayerId = body.ownerTalentLayerId;
      builderSpace.ownerAddress = body.ownerAddress;
      builderSpace.owners = body.owners;
      builderSpace.save();

      hirerProfile.talentLayerId = body.ownerTalentLayerId;
      hirerProfile.status = 'validated';
      hirerProfile.save();

      res.status(200).json({
        message: 'BuilderPlace domain & Hirer profile updated successfully',
        builderPlaceId: builderSpace._id,
        hirerId: hirerProfile._id,
      });
    } catch (error: any) {
      res.status(400).json({ error: error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
