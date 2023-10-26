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
  CreateBuilderPlaceAction,
  IBuilderPlace,
  UpdateBuilderPlace,
  UpdateBuilderPlaceDomain,
} from './types';

export const deleteBuilderPlace = async (subdomain: string) => {
  await connection();
  const builderPlace = await BuilderPlace.deleteOne({ subdomain: subdomain });
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
    await BuilderPlace.updateOne({ subdomain: builderPlace.subdomain }, builderPlace).exec();
    return {
      message: 'BuilderPlace updated successfully',
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

    const builderPlace = await BuilderPlace.findOne({ subdomain: data.subdomain });
    console.log(builderPlace);
    if (builderPlace) {
      console.log('BuilderPlace already exists');
      return {
        error: 'BuilderPlace already exists',
      };
    }

    const newBuilderPlace = new BuilderPlace({
      _id: new mongoose.Types.ObjectId(),
      name: data.name,
      subdomain: data.subdomain,
      customDomain: 'null',
      logo: 'a',
      cover: 'a',
      primaryColor: data.primaryColor,
      secondaryColor: data.secondaryColor,
      ownerTalentLayerId: data.ownerTalentLayerId,
      presentation: 'a',
      owners: data.owners,
      status: 'pending',
    });
    await newBuilderPlace.save();

    return {
      message: 'BuilderPlace created successfully',
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
