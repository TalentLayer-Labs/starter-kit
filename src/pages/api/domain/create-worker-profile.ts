import { NextApiRequest, NextApiResponse } from 'next';
import { CreateWorkerProfileProps } from '../../../modules/BuilderPlace/types';
import { getUserByEmail } from '../../../modules/BuilderPlace/actions/email';
import {
  createWorkerProfile,
  updateWorkerProfile,
} from '../../../modules/BuilderPlace/actions/user';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const body: CreateWorkerProfileProps = req.body;
    console.log('Received data:', body);

    /**
     * @dev: Checks on existing user with same email. If Pending, will delete the pending user and create a new one.
     * If Validated, will return an error.
     */
    try {
      const existingProfile = await getUserByEmail(body.email);

      if (existingProfile && existingProfile.status === 'VALIDATED') {
        res.status(400).json({ error: 'A profile with this email already exists' });
        return;
      }

      let result;
      if (!existingProfile) {
        result = await createWorkerProfile({
          ...body,
        });
      } else {
        result = await updateWorkerProfile({
          id: Number(existingProfile.id),
          ...body,
        });
      }

      res.status(200).json({ message: result.message, id: result.id });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
