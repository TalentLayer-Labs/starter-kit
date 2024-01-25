import { NextApiRequest, NextApiResponse } from 'next';
import { ValidateBuilderPlaceAndOwner } from '../../../modules/BuilderPlace/types';
import { recoverMessageAddress } from 'viem';
import { EntityStatus } from '@prisma/client';
import { getUserById, validateUser } from '../../../modules/BuilderPlace/actions/user';
import {
  getBuilderPlaceById,
  getBuilderPlaceBySubdomain,
  removeBuilderSubdomain,
  updateBuilderPlace,
  validateBuilderPlace,
} from '../../../modules/BuilderPlace/actions/builderPlace';
import { METHOD_NOT_ALLOWED, MISSING_DATA } from '../../../modules/BuilderPlace/apiResponses';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: METHOD_NOT_ALLOWED });
  }

  const body: ValidateBuilderPlaceAndOwner = req.body;
  console.log('Received data:', body);

  if (!body.builderPlaceId || !body.ownerId || !body.signature) {
    return res.status(400).json({ error: MISSING_DATA });
  }

  try {
    const [ownerAddress, owner, builderPlace, existingSubDomain] = await Promise.all([
      recoverMessageAddress({
        message: body.builderPlaceId.toString(),
        signature: body.signature,
      }),
      getUserById(body.ownerId),
      getBuilderPlaceById(body.builderPlaceId),
      getBuilderPlaceBySubdomain(body.subdomain),
    ]);

    if (!owner) {
      return res.status(400).json({ error: "Owner doesn't exist" });
    }

    if (owner?.address?.toLocaleLowerCase() !== ownerAddress.toLocaleLowerCase()) {
      return res.status(401).json({ error: 'Restricted access' });
    }

    if (!builderPlace) {
      return res.status(400).json({ error: "BuilderPlace doesn't exist" });
    }

    if (builderPlace.ownerId !== owner.id) {
      return res.status(401).json({ error: 'Restricted Access' });
    }

    if (builderPlace.status === EntityStatus.VALIDATED) {
      return res.status(401).json({ error: 'Domain already has an owner' });
    }

    if (existingSubDomain && existingSubDomain.status === EntityStatus.VALIDATED) {
      return res.status(401).json({ error: 'Subdomain already taken' });
    }

    /**
     * @dev: Validate & Update BuilderPlace & Hirer profile
     */
    if (owner.status !== EntityStatus.VALIDATED) {
      await validateUser(body.ownerId);
    }

    /**
     * @dev: Remove existing subdomain if it exists in a PENDING BuilderPlace
     */
    if (existingSubDomain && existingSubDomain.status === EntityStatus.PENDING) {
      await removeBuilderSubdomain(existingSubDomain.id);
    }

    await validateBuilderPlace(body.builderPlaceId);

    /**
     * @dev: Update BuilderPlace
     */
    await updateBuilderPlace({
      builderPlaceId: body.builderPlaceId,
      subdomain: body.subdomain,
      logo: body.logo,
      palette: body.palette,
      signature: body.signature,
    });

    res.status(200).json({
      message: 'BuilderPlace domain & Hirer profile updated successfully',
      builderPlaceId: body.builderPlaceId,
      hirerId: body.ownerId,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
