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
import { MISSING_DATA } from '../../../modules/BuilderPlace/apiResponses';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const body: ValidateBuilderPlaceAndOwner = req.body;
    console.log('Received data:', body);

    if (!body.builderPlaceId || !body.ownerId || !body.signature) {
      return res.status(400).json({ error: MISSING_DATA });
    }

    const ownerAddress = await recoverMessageAddress({
      message: body.builderPlaceId.toString(),
      signature: body.signature,
    });

    /**
     * @dev: Check whether the user exists in the database & is the owner of the address
     */
    const owner = await getUserById(body.ownerId);

    if (owner?.address?.toLocaleLowerCase() !== ownerAddress.toLocaleLowerCase()) {
      return res.status(401).json({ error: 'Restricted access' });
    }

    /**
     * @dev: Check whether the BuilderPlace exists in the database & has no owner
     */
    const builderPlace = await getBuilderPlaceById(body.builderPlaceId);
    if (!builderPlace) {
      return res.status(400).json({ error: "BuilderPlace doesn't exist" });
    }

    if (builderPlace.ownerId !== owner.id) {
      return res.status(401).json({ error: 'Restricted Access' });
    }

    if (builderPlace.status === EntityStatus.VALIDATED) {
      return res.status(401).json({ error: 'Domain already has an owner' });
    }

    /**
     * @dev: Check whether the subdomain is already taken
     */
    const existingSubDomain = await getBuilderPlaceBySubdomain(body.subdomain);

    if (existingSubDomain && existingSubDomain.status === EntityStatus.VALIDATED) {
      return res.status(401).json({ error: 'Subdomain already taken' });
    }

    try {
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
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
