import mongoose from 'mongoose';
import { connection } from '../../mongo/mongodb';
import {
  addDomainToVercel,
  getApexDomain,
  removeDomainFromVercelProject,
  removeDomainFromVercelTeam,
  validDomainRegex,
} from './domains';
import { BuilderPlace } from './models/BuilderPlace';
import {
  AddBuilderPlaceCollaborator,
  CreateBuilderPlaceAction,
  RemoveBuilderPlaceCollaborator,
  UpdateBuilderPlace,
  UpdateBuilderPlaceDomain,
} from './types';

export const deleteBuilderPlace = async (_id: string) => {
  await connection();
  const builderPlace = await BuilderPlace.deleteOne({ _id: _id });
  console.log(builderPlace, 'builderPlace deleted');
  if (builderPlace.deletedCount === 0) {
    return {
      error: 'BuilderPlace not found',
    };
  }
  return {
    message: 'BuilderPlace deleted successfully',
  };
};

export const updateBuilderPlace = async (builderPlace: UpdateBuilderPlace) => {
  try {
    await connection();
    await BuilderPlace.updateOne(
      { ownerTalentLayerId: builderPlace.ownerTalentLayerId },
      builderPlace,
    ).exec();
    return {
      message: 'BuilderPlace updated successfully',
      id: builderPlace._id,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const addBuilderPlaceCollaborator = async (body: AddBuilderPlaceCollaborator) => {
  try {
    await connection();
    await BuilderPlace.updateOne(
      { _id: body.builderPlaceId },
      {
        $push: {
          owners: body.newCollaborator,
        },
      },
    ).exec();
    console.log('Collaborator added successfully', body.newCollaborator);
    return {
      message: 'Collaborator added successfully',
      collaborator: body.newCollaborator,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const removeBuilderPlaceCollaborator = async (body: RemoveBuilderPlaceCollaborator) => {
  try {
    await connection();
    await BuilderPlace.updateOne(
      { _id: body.builderPlaceId },
      {
        $pull: {
          owners: body.newCollaborator,
        },
      },
    ).exec();
    console.log('Collaborator removed successfully', body.newCollaborator);
    return {
      message: 'Collaborator removed successfully',
      collaborator: body.newCollaborator,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const createBuilderPlace = async (data: CreateBuilderPlaceAction) => {
  try {
    await connection();

    const newBuilderPlace = new BuilderPlace({
      _id: new mongoose.Types.ObjectId(),
      name: data.name,
      about: data.about,
      preferredWorkTypes: data.preferredWorkTypes,
      profilePicture: data.profilePicture,
      palette: {
        primary: '#FF71A2',
        primaryFocus: '#FFC2D1',
        primaryContent: '#ffffff',
        base100: '#ffffff',
        base200: '#fefcfa',
        base300: '#fae4ce',
        baseContent: '#000000',
        info: '#f4dabe',
        infoContent: '#000000',
        success: '#C5F1A4',
        successContent: '#000000',
        warning: '#FFE768',
        warningContent: '#000000',
        error: '#FFC2D1',
        errorContent: '#000000',
      },
      status: 'pending',
    });
    const { _id } = await newBuilderPlace.save();
    return {
      message: 'BuilderPlace created successfully',
      _id: _id,
    };
  } catch (error: any) {
    console.log('Error creating new builderPlace:', error);
    return {
      error: error.message!,
    };
  }
};

export const getBuilderPlaceByDomain = async (domain: string) => {
  await connection();
  console.log('getting builderPlace ', domain);
  let builderPlace;
  if (domain.includes(process.env.NEXT_PUBLIC_ROOT_DOMAIN as string)) {
    builderPlace = await BuilderPlace.findOne({ subdomain: domain });
  } else {
    builderPlace = await BuilderPlace.findOne({ customDomain: domain });
  }
  console.log('fetched builderPlaces, ', builderPlace);

  return builderPlace;
};

export const getBuilderPlaceById = async (id: string) => {
  try {
    await connection();
    console.log('getting builderPlace with id:', id);
    const builderPlaceSubdomain = await BuilderPlace.findOne({ _id: id });
    console.log('fetched builderPlace, ', builderPlaceSubdomain);
    if (builderPlaceSubdomain) {
      return builderPlaceSubdomain;
    }

    return null;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const getBuilderPlaceByOwnerId = async (id: string) => {
  try {
    await connection();
    console.log("getting builderPlace with owner's id:", id);
    const builderPlaceSubdomain = await BuilderPlace.findOne({ ownerTalentLayerId: id });
    console.log('fetched builderPlace, ', builderPlaceSubdomain);
    if (builderPlaceSubdomain) {
      return builderPlaceSubdomain;
    }

    return null;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const getBuilderPlaceByOwnerAddressAndId = async (address: string, _id: string) => {
  try {
    await connection();
    console.log("getting builderPlace with owner's address & mongo _id:", address, _id);
    const builderPlaceSubdomain = await BuilderPlace.findOne({
      owners: address,
      _id: _id,
    });
    console.log('fetched builderPlace, ', builderPlaceSubdomain);
    if (builderPlaceSubdomain) {
      return builderPlaceSubdomain;
    }

    return null;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const getBuilderPlaceByOwnerTlIdAndId = async (ownerId: string, _id: string) => {
  try {
    await connection();
    console.log("getting builderPlace with owner's TlId & mongo _id:", ownerId, _id);
    const builderPlaceSubdomain = await BuilderPlace.findOne({
      ownerTalentLayerId: ownerId,
      _id: _id,
    });
    console.log('fetched builderPlace, ', builderPlaceSubdomain);
    if (builderPlaceSubdomain) {
      return builderPlaceSubdomain;
    }

    return null;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

// TODO! createBuilderPlace, can be used for the onboarding workflow maybe for the creating the subdomain & deleteBuilderPlace
export const updateDomain = async (builderPlace: UpdateBuilderPlaceDomain) => {
  try {
    console.log('Update Domain invoke, ', builderPlace);
    await connection();
    let response;

    if (builderPlace.customDomain.includes('builder.place')) {
      console.log('Domain contains builder.place');
      return {
        error: 'Cannot use builder.place subdomain as your custom domain',
      };

      // if the custom domain is valid, we need to store it and add it to Vercel
    } else if (validDomainRegex.test(builderPlace.customDomain!)) {
      console.log('Custom Domain is valid');
      // Update the MongoDB document with the new custom domain
      // await BuilderPlace.updateOne({ _id: new mongoose.Types.ObjectId(builderPlace.id) }, { customDomain: builderPlace.customDomain }).exec();
      console.log('Searching subdomain, ', builderPlace.subdomain);
      const entity = await BuilderPlace.findOne({ subdomain: builderPlace.subdomain });
      console.log('Search result', builderPlace.subdomain);
      entity.customDomain = builderPlace.customDomain;
      entity.save();

      // Add the custom domain to Vercel
      console.log('Adding domain to vercel');

      await addDomainToVercel(builderPlace.customDomain!);

      // null means remove the custom domain
    } else if (builderPlace.customDomain! === '') {
      // Remove the custom domain from the MongoDB document
      console.log('Removing custom domain from MongoDB document');
      // await BuilderPlace.updateOne({ _id: new mongoose.Types.ObjectId(builderPlace.id) }, { customDomain: "asd.de" }).exec();

      const entity = await BuilderPlace.findOne({ subdomain: builderPlace.subdomain });
      entity.customDomain = '';
      entity.save();
    }

    // Get the current custom domain from the MongoDB document
    // const currentBuilderPlace = await BuilderPlace.findById(new mongoose.Types.ObjectId(builderPlace.id)).exec();
    const currentBuilderPlace = await BuilderPlace.findOne({ subdomain: builderPlace.subdomain });
    const currentDomain = currentBuilderPlace?.customDomain || '';

    // If the site had a different customDomain before, we need to remove it from Vercel
    if (builderPlace.customDomain !== currentDomain) {
      response = await removeDomainFromVercelProject(builderPlace.customDomain!);

      // Check if the apex domain is being used by other sites
      const apexDomain = getApexDomain(`https://${builderPlace.customDomain}`);
      const domainsWithApexDomain = await BuilderPlace.find({
        customDomain: new RegExp(`.${apexDomain}$`),
      }).exec();
      const domainCount = domainsWithApexDomain.length;

      // we should only remove it from our Vercel project
      if (domainCount >= 1) {
        await removeDomainFromVercelProject(builderPlace.customDomain!);
      } else {
        // this is the only site using this apex domain
        // so we can remove it entirely from our Vercel team
        await removeDomainFromVercelTeam(builderPlace.customDomain!);
      }
    }

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
