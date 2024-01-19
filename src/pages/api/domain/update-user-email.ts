import { NextApiRequest, NextApiResponse } from 'next';
import { UpdateUserEmail } from '../../../modules/BuilderPlace/types';
import { getUserById, updateUserEmail } from '../../../modules/BuilderPlace/actions/user';
import { recoverMessageAddress } from 'viem';
import { getUserByEmail } from '../../../modules/BuilderPlace/actions/email';
import { sendTransactionalEmailValidation } from '../utils/sendgrid';
import { MISSING_DATA } from '../../../modules/BuilderPlace/apiResponses';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const body: UpdateUserEmail = req.body;
      console.log('Received data:', body);

      if (
        !body.userId ||
        !body.email ||
        !body.userAddress ||
        !body.signature ||
        !body.domain ||
        !body.name
      ) {
        return res.status(400).json({ error: MISSING_DATA });
      }

      const address = await recoverMessageAddress({
        message: body.userId,
        signature: body.signature,
      });

      const user = await getUserById(body.userId);

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      if (user.address?.toLocaleLowerCase() !== address.toLocaleLowerCase()) {
        return res.status(401).json({ error: 'Restricted access' });
      }

      const existingUser = await getUserByEmail(body.email);

      if (existingUser && existingUser.isEmailVerified) {
        return res.status(401).json({ error: 'Email already taken' });
      }

      // Step 1: Update Email
      const result = await updateUserEmail({ id: Number(body.userId), email: body.email });

      // Step 2: Send verification Email
      await sendTransactionalEmailValidation(body.email, body.userId, body.name, body.domain);

      res.status(200).json({ message: 'User email updated successfully', id: result.id });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
