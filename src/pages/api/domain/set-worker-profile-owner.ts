import { NextApiRequest, NextApiResponse } from 'next';
import {
  getWorkerProfileById,
  getWorkerProfileByTalentLayerId,
} from '../../../modules/BuilderPlace/actions';
import { SetWorkerProfileOwner } from '../../../modules/BuilderPlace/types';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const body: SetWorkerProfileOwner = req.body;
    console.log('Received data:', body);

    if (!body.id || !body.talentLayerId) {
      return res.status(500).json({ error: 'Missing data.' });
    }

    const existingProfile = await getWorkerProfileByTalentLayerId(body.talentLayerId);
    if (existingProfile) {
      return res.status(401).json({ error: 'You already have a profile' });
    }

    const workerProfile = await getWorkerProfileById(body.id as string);
    if (!workerProfile) {
      return res.status(400).json({ error: "Profile doesn't exist." });
    }
    if (!!workerProfile.talentLayerId) {
      return res.status(401).json({ error: 'Profile already has an owner.' });
    }

    try {
      workerProfile.talentLayerId = body.talentLayerId;
      workerProfile.status = 'validated';
      workerProfile.save();
      res
        .status(200)
        .json({ message: 'Worker Profile updated successfully', id: workerProfile._id });
    } catch (error: any) {
      res.status(400).json({ error: error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
