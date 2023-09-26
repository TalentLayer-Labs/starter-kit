import { connection } from '../../mongo/mongodb';
import {
  addDomainToVercel,
  getApexDomain,
  removeDomainFromVercelProject,
  removeDomainFromVercelTeam,
  validDomainRegex,
} from './domains';
import { SpaceModel } from './models/SpaceModel';
import { CreateSpaceAction, Space } from './types';

export const deleteSpace = async (spaceId: string) => {
  await connection();
  const space = await SpaceModel.findById(spaceId).exec();
  space.remove();
  return {
    message: 'Space deleted successfully',
  };
}

export const updateSpace = async (space: Space) => {
  try {
    await connection();
    await SpaceModel.updateOne({ _id: space.id }, space).exec();
    return {
      message: 'Space updated successfully',
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
}


export const createSpace = async (data: CreateSpaceAction) => {
  try {
    await connection();

    const space = await SpaceModel.findOne({ subDomain: data.subDomain });
    console.log(space)
    if (space) {
      console.log('Space already exists');
      return {
        error: 'Space already exists',
      };
    }

    const newSpace = new SpaceModel({
      name: data.name,
      subDomain: data.subDomain,
      customDomain: "null",
      logo: "a",
      cover: "a",
      primaryColor: data.primaryColor,
      secondaryColor: data.secondaryColor,
      presentation: "a",
      owners: data.owners,
      status: 'pending',
    });
    await newSpace.save();

    return {
      message: 'Space created successfully',
    };

  } catch (error: any) {
    console.log('Error creating new space:', error);
    return {
      error: error.message!,
    };
  }
}

// TODO! createSpace, can be used for the onboarding workflow maybe for the creating the subdomain & deleteSpace
export interface UpdateSpaceDomain {
  id: string,
  customDomain: string
}

export const updateSpaceDomain = async (space: UpdateSpaceDomain) => {
  try {
    await connection();
    let response;

    if (space.customDomain.includes('builders.space')) {
      return {
        error: 'Cannot use builders.space subdomain as your custom domain',
      };

      // if the custom domain is valid, we need to store it and add it to Vercel
    } else if (validDomainRegex.test(space.customDomain!)) {
      // Update the MongoDB document with the new custom domain
      await SpaceModel.updateOne({ _id: space.id }, { customDomain: space.customDomain }).exec();
      // Add the custom domain to Vercel
      await addDomainToVercel(space.customDomain!);

      // null means remove the custom domain
    } else if (space.customDomain! === null) {
      // Remove the custom domain from the MongoDB document
      console.log('Removing custom domain from MongoDB document');
      await SpaceModel.updateOne({ _id: space.id }, { customDomain: null }).exec();
    }

    // Get the current custom domain from the MongoDB document
    const currentSpace = await SpaceModel.findById(space.id).exec();
    const currentDomain = currentSpace?.customDomain || '';

    // If the site had a different customDomain before, we need to remove it from Vercel
    if (space.customDomain !== currentDomain) {
      response = await removeDomainFromVercelProject(space.customDomain!);

      // Check if the apex domain is being used by other sites
      const apexDomain = getApexDomain(`https://${space.customDomain}`);
      const domainsWithApexDomain = await SpaceModel.find({ customDomain: new RegExp(`.${apexDomain}$`) }).exec();
      const domainCount = domainsWithApexDomain.length;

      // we should only remove it from our Vercel project
      if (domainCount >= 1) {
        await removeDomainFromVercelProject(space.customDomain!);
      } else {
        // this is the only site using this apex domain
        // so we can remove it entirely from our Vercel team
        await removeDomainFromVercelTeam(space.customDomain!);
      }
    }

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
