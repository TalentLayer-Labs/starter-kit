import { NextApiRequest, NextApiResponse } from 'next';
import { SetBuilderPlaceAndHirerOwner } from '../../../modules/BuilderPlace/types';
import { EntityStatus } from '@prisma/client';
import { getUserByAddress as getTalentLayerUserByAddress } from '../../../queries/users';
import {
  getBuilderPlaceById,
  getBuilderPlaceByOwnerTalentLayerId,
  removeBuilderPlaceOwner,
  setBuilderPlaceOwner,
} from '../../../modules/BuilderPlace/actions/builderPlace';
import {
  getUserByAddress,
  getUserById,
  removeOwnerFromUser,
  setUserOwner,
} from '../../../modules/BuilderPlace/actions/user';
import { METHOD_NOT_ALLOWED, MISSING_DATA } from '../../../modules/BuilderPlace/apiResponses';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: METHOD_NOT_ALLOWED });
  }

  const body: SetBuilderPlaceAndHirerOwner = req.body;
  console.log('Received data:', body);

  if (!body.builderPlaceId || !body.hirerId || !body.ownerAddress || !body.ownerTalentLayerId) {
    return res.status(400).json({ error: MISSING_DATA });
  }

  if (!process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID) {
    return res.status(500).json({ error: 'Missing default chain config' });
  }

  try {
    const [
      existingSpace,
      builderSpace,
      talentLayerGraphResponse,
      existingProfileWithSameAddress,
      userProfile,
    ] = await Promise.all([
      getBuilderPlaceByOwnerTalentLayerId(body.ownerTalentLayerId),
      getBuilderPlaceById(body.builderPlaceId as string),
      getTalentLayerUserByAddress(
        Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID),
        body.ownerAddress,
      ),
      getUserByAddress(body.ownerAddress),
      getUserById(body.hirerId as string),
    ]);

    const talentLayerUser = talentLayerGraphResponse?.data?.data?.users[0];

    if (existingSpace && existingSpace.status === EntityStatus.VALIDATED) {
      throw new Error('You already own a domain');
    }
    if (!builderSpace) {
      throw new Error("Domain doesn't exist");
    }
    if (builderSpace.status === EntityStatus.VALIDATED) {
      throw new Error('BuilderPlace already has an owner');
    }
    if (!talentLayerUser) {
      throw new Error('Your address does not own a TalentLayer Id');
    }
    if (!userProfile) {
      throw new Error("Profile doesn't exist");
    }
    if (
      existingProfileWithSameAddress &&
      existingProfileWithSameAddress.status === EntityStatus.VALIDATED &&
      existingProfileWithSameAddress.ownedBuilderPlace?.status === EntityStatus.VALIDATED
    ) {
      return res.status(401).json({ error: 'You already own a BuilderPlace' });
    }

    /**
     * @dev: If profile Validated and owner already set, skip the owner setting step
     */
    if (userProfile.status === EntityStatus.PENDING) {
      /**
       * @dev: If existing pending profile with same address, remove address
       * from pending profile to avoid conflicts on field "unique" constraint
       */
      if (
        existingProfileWithSameAddress &&
        existingProfileWithSameAddress.status === EntityStatus.PENDING
      ) {
        //TODO: Prisma carrément suppr le user ?
        await removeOwnerFromUser(existingProfileWithSameAddress.id.toString());
      }

      /**
       * @dev: Set Hirer profile owner
       */
      await setUserOwner({
        id: body.hirerId,
        userAddress: body.ownerAddress.toLocaleLowerCase(),
        talentLayerId: talentLayerUser.id,
      });
    }

    /**
     * @dev: Remove owner from pending domain to avoid conflicts on field "unique" constraint
     */
    if (existingSpace && existingSpace.ownerId && existingSpace.status === EntityStatus.PENDING) {
      //TODO: Prisma carrément suppr la BP ?
      await removeBuilderPlaceOwner({
        id: existingSpace.id,
        ownerId: existingSpace.ownerId,
      });
    }

    await setBuilderPlaceOwner({
      id: body.builderPlaceId,
      ownerId: body.hirerId,
    });

    res.status(200).json({
      message: 'BuilderPlace domain & Hirer profile updated successfully',
      builderPlaceId: body.builderPlaceId,
      hirerId: body.hirerId,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
