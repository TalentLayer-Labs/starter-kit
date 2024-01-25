import { NextApiRequest, NextApiResponse } from 'next';
import { SetUserProfileOwner } from '../../../modules/BuilderPlace/types';
import { EntityStatus } from '@prisma/client';
import { getUserByAddress as getTalentLayerUserByAddress } from '../../../queries/users';
import {
  ALREADY_HAVE_PROFILE,
  METHOD_NOT_ALLOWED,
  MISSING_DATA,
  NO_TALENTLAYER_ID_ERROR,
  PROFILE_ALREADY_HAS_OWNER,
  PROFILE_DOES_NOT_EXIST,
} from '../../../modules/BuilderPlace/apiResponses';
import {
  getUserByAddress,
  getUserById,
  removeOwnerFromUser,
  setUserOwner,
} from '../../../modules/BuilderPlace/actions/user';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: METHOD_NOT_ALLOWED });
  }

  const body: SetUserProfileOwner = req.body;
  console.log('Received data:', body);

  if (!body.id || !body.talentLayerId) {
    return res.status(400).json({ error: MISSING_DATA });
  }

  try {
    const [talentLayerResponse, existingProfileWithSameAddress, userProfile] = await Promise.all([
      getTalentLayerUserByAddress(
        Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID),
        body.userAddress,
      ),
      getUserByAddress(body.userAddress),
      getUserById(body.id as string),
    ]);

    const talentLayerUser = talentLayerResponse?.data?.data?.users[0];

    if (!talentLayerUser) {
      return res.status(401).json({ error: NO_TALENTLAYER_ID_ERROR });
    }

    if (
      existingProfileWithSameAddress &&
      existingProfileWithSameAddress.status === EntityStatus.VALIDATED
    ) {
      return res.status(401).json({ error: ALREADY_HAVE_PROFILE });
    }

    if (!userProfile) {
      return res.status(400).json({ error: PROFILE_DOES_NOT_EXIST });
    }

    if (!!userProfile.talentLayerId && userProfile.status === EntityStatus.VALIDATED) {
      return res.status(401).json({ error: PROFILE_ALREADY_HAS_OWNER });
    }

    /**
     * @dev: If existing pending User exists with same address,
     * remove address from pending profile to avoid conflicts on field "unique" constraint
     */
    if (
      existingProfileWithSameAddress &&
      existingProfileWithSameAddress.status === EntityStatus.PENDING
    ) {
      await removeOwnerFromUser(existingProfileWithSameAddress.id.toString());
    }

    /**
     * Update user profile with owner data
     */
    await setUserOwner({
      id: userProfile.id.toString(),
      userAddress: body.userAddress.toLocaleLowerCase(),
      talentLayerId: body.talentLayerId,
    });
    res.status(200).json({ message: 'Worker Profile updated successfully', id: userProfile.id });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
