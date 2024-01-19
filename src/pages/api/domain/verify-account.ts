import { NextApiRequest, NextApiResponse } from 'next';
import { VerifyAccount } from '../../../modules/BuilderPlace/types';
import { recoverMessageAddress } from 'viem';
import { EntityStatus } from '@prisma/client';
import { getUserById, validateUser } from '../../../modules/BuilderPlace/actions/user';
import { MISSING_DATA } from '../../../modules/BuilderPlace/apiResponses';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const body: VerifyAccount = req.body;
    console.log('Received data:', body);

    if (!body.userId || !body.signature) {
      return res.status(400).json({ error: MISSING_DATA });
    }

    const ownerAddress = await recoverMessageAddress({
      message: body.userId,
      signature: body.signature,
    });

    /**
     * @dev: Check whether the user exists in the database & is the owner of the address
     */
    const owner = await getUserById(body.userId);

    if (owner?.address?.toLocaleLowerCase() !== ownerAddress.toLocaleLowerCase()) {
      return res.status(401).json({ error: 'Restricted access' });
    }

    if (owner.status === EntityStatus.VALIDATED) {
      return res.status(400).json({ error: 'Profile already validated' });
    }

    try {
      const result = await validateUser(body.userId);
      res.status(200).json({ message: result?.message, id: result?.id });
    } catch (err: any) {
      console.error(err);
      res.status(err.httpCode || 400).end(String(err));
      return;
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
